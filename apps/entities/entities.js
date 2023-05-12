"use strict";

const SaxonJS = require("saxon-js");
const fs = require("fs");
const gfetch = require("node-fetch");

// const sourceBase = '../../tmp/'
const sourceBase = 'https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/edition/entities/'
const sources = ["people.xml", "places.xml"];
const target = "../../frontend/assets/js/entities.json";
const jsonSheetPath = "xslt/tei-to-json.sef.json";

class Entities {
  constructor() {
    this.entities = [];
  }

  async writeJsonFromTei() {
    this.entities = [];

    for (let source of sources) {
      await this.loadTei(sourceBase + source);
    }

    this.writeJson(target, this.entities);
  }

  async loadTei(source) {
    // let docString = this.readFile(source)
    let entitiesJson = await this.xslt(source, jsonSheetPath);
    // console.log(entitiesJson);
    let entities = JSON.parse(entitiesJson);
    // console.log(entities);

    for (let i in entities) {
      this.entities.push(entities[i]);
    }
  }

  readFile(source) {
    return fs.readFileSync(source).toString();
  }

  async xslt(docPath, jsonSheetPath) {
    let docString = null
    if (docPath.startsWith('http')) {
      let res = await gfetch(docPath);
      if (res && res.status == 200) {
        docString = await res.text();
      }
    } else {
      docString = this.readFile(docPath)
    }

    let output = SaxonJS.transform(
      {
        stylesheetFileName: jsonSheetPath,
        sourceText: docString,
        // sourceFileName: docPath,
        destination: "serialized",
      },
      "sync"
    );

    let ret = output.principalResult;

    // TODO: find another way to remove first line
    let firstLine = '<?xml version="1.0" encoding="UTF-8"?>';
    ret = ret.replace(firstLine, "");

    return ret;
  }

  writeJson(path, data) {
    // console.log(data)
    fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
    console.log(`WRITE ${path}`);
  }
}

new Entities().writeJsonFromTei();
