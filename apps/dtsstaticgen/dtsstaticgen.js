"use strict";
// https://github.com/kingsdigitallab/webval/blob/main/docs/utils.js
// TODO: rewrite all the paths in the responses
// TODO: error management!
// TODO: sync -> async

const dtsutils = require("../../frontend/assets/js/dtsutils");
const { exit } = require("process");
const path = require("path");
const fs = require("fs");

class Generator {
  constructor() {
    this.settings = require("./settings");
  }
  async generate() {
    this.validateSettings();

    if (this.settings.clear) this.clearLocalFolder();

    // get services URIs from DTS entrypoint
    this.responses = {
      entryPoint: await this.fetchDTS(),
    };

    // TODO: rewrite webpaths of the services
    // this.responses.collections = `${this.target}/collections`

    // get root collection
    // TODO: paginate
    let res = await this.fetchDTS("collections");

    // TODO: get subcollections (recursive fct)

    // get nav/documents
    for (let colMember of res.member) {
      if (colMember["@type"] == "Resource") {
        // get Navigation
        // TODO: paginate
        let nav = await this.fetchDTS("navigation", colMember["@id"]);

        // get Passages
        for (let ref of nav.member) {
          for (let format of this.settings.formats) {
            await this.fetchDTS(
              "documents",
              colMember["@id"],
              ref["dts:ref"],
              format
            );
          }
          break;
        }
      }
    }

    console.log("done.");
  }
  clearLocalFolder() {
    let apath = path.resolve(this.settings.local.replace(".json", ""));
    if (fs.existsSync(apath)) {
      console.log("  RMDIR " + apath);
      fs.rmSync(apath, { recursive: true });
    }
  }
  async fetchDTS(service, id, ref, format) {
    let res = await dtsutils.fetchDTS(
      {
        selections: { source: this.settings.source },
        responses: this.responses,
      },
      service,
      id,
      ref,
      format
    );
    if (!res)
      this.error(`DTS request failed. (${service}, ${id}, ${ref}, ${format})`);

    let ret = JSON.parse(JSON.stringify(res));

    res = this.tranformResponse(service, res);

    this.saveResponse(res, service, id, ref, format);

    return ret;
  }
  tranformResponse(service, res) {
    if (!service) {
      // let targetRoot = new URL(this.settings.target).pathname
      // res['@id'] = `${targetRoot}`
      // res.collections = `collections`
      // res.navigation = `navigation`
      // res.documents = `documents`
    }
    return res;
  }
  logjson(data) {
    console.log(JSON.stringify(data, null, 2));
  }
  saveResponse(data, service, id, ref, format) {
    let filePath = dtsutils.getDTSUrl(
      {
        selections: { source: this.settings.local },
      },
      service,
      id,
      ref,
      format
    );
    if (dtsutils.getFormatFromRequest(service, format) == "json") {
      data = JSON.stringify(data, null, 1);
    }
    let parentPath = path.dirname(filePath);
    fs.mkdirSync(parentPath, { recursive: true });

    console.log("  WRITE " + path.resolve(filePath));
    fs.writeFileSync(filePath, data, "utf8");
  }
  validateSettings() {
    let errors = [];
    let s = this.settings;
    let localParent = path.dirname(path.resolve(this.settings.local));
    if (!fs.existsSync(localParent)) {
      errors.push("settings.local parent path does not exist");
    }
    if (localParent == "/") {
      errors.push("settings.local cannot be a root folder");
    }
    if (!s.local.match(/\w+\.json$/)) {
      errors.push("settings.local must end with a valid .json filename");
    }
    if (!s.target.endsWith(".json")) {
      errors.push('settings.target must end with extension ".json"');
    }
    if (errors.length) {
      for (let error of errors) {
        console.error(error);
      }
      exit(1);
    }
  }
  error(message) {
    console.error(`ERROR: ${message}`);
    exit(1);
  }
}

new Generator().generate();
