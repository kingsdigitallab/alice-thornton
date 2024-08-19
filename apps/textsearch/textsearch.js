"use strict";

// const gfetch = require("node-fetch");
const { execSync } = require("child_process");
const SaxonJS = require("saxon-js");
const pathp = require("path");
const fs = require("fs");

const sourceBase = "./clone/dts/documents/";
// const sourceBase =
//   "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/edition/entities/";
const sources = ["people.xml", "places.xml", "events.xml"];
// const sources = ["events.xml"];
const target = "../../frontend/assets/js/entities.json";
// const jsonSheetPath = "html-to-html.sef.json";
const XSLTPath = "html-to-html.xslt";

class TextSearch {
  constructor() {
    this.entities = [];
  }

  async transformHTMLs() {
    var paths = fs.readdirSync(sourceBase);
    while (paths.length) {
      let path = paths.pop();
      let pathAbs = pathp.join(sourceBase, path);
      if (fs.lstatSync(pathAbs).isDirectory()) {
        for (let p of fs.readdirSync(pathAbs)) {
          paths.push(pathp.join(path, p));
        }
      } else {
        if (path.endsWith(".html")) {
          await this.transformHTML(pathAbs);
          break;
        }
      }
    }
  }

  async transformHTML(path) {
    console.log(path);
    let entitiesJson = await this.xslt(path, XSLTPath);
  }

  async writeJsonFromTei() {
    this.entities = [];

    for (let source of sources) {
      await this.loadTei(sourceBase + source);
    }

    this.postProcessEntities();

    this.writeJson(target, this.entities);
  }

  postProcessEntities() {
    // processing which is much simpler in JS than XSLT
    for (let entity of this.entities) {
      // remove duplicate pages in entity.pages
      entity.pages = Object.fromEntries(
        Object.entries(entity.pages).map(([k, v]) => [k, [...new Set(v)]])
      );
      // remove books from entity.pages which have no pages
      entity.pages = Object.fromEntries(
        Object.entries(entity.pages).filter(([k, v]) => v.length)
      );
      // entity.books = list of books they appear in
      entity.books = Object.keys(entity.pages);
      // missing key for people with no first/surname
      if (!entity?.sortkey && entity.type == "person") {
        // 'John Thornton (1633-1669)' => "Thornton-John"
        entity.sortkey = entity.title
          .replace(/\([^)]+\)/g, "")
          .trim()
          .split(/\s+/)
          .reverse()
          .join("-");
        console.log(
          `WARNING: fixed missing sorkey for ${entity.type}:${entity.id} = ${entity.sortkey}`
        );
      }
      if (!entity?.search) {
        entity.search = entity.title;
      }
      // remove text between []
      entity.search = entity.search.replace(/\[.*?\]/g, "");
    }

    // sort by sortKey, optional, only for debugging purpose as itemjs will sort anyway
    this.entities = this.entities.sort((a, b) =>
      a.sortkey.localeCompare(b.sortkey)
    );
  }

  async loadTei(source) {
    // let docString = this.readFile(source)
    let entitiesJson = await this.xslt(source, jsonSheetPath);
    // console.log(entitiesJson.substring(0, 1000));
    // fs.writeFileSync('tmp.json', entitiesJson, "utf8");

    let entities = [];

    if (entitiesJson) {
      entities = JSON.parse(entitiesJson);
    } else {
      console.log(
        `WARNING: entities file (${source}) transformed into an empty string.`
      );
    }

    for (let i in entities) {
      this.entities.push(entities[i]);
    }
  }

  readFile(source) {
    return fs.readFileSync(source).toString();
  }

  xslt(docPath, XSLTPath) {
    let docString = null;

    let jsonSheetPath = this.writeTransformJson(XSLTPath);

    docString = this.readFile(docPath);

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

  writeTransformJson(transformXsltPath) {
    if (!fs.existsSync(transformXsltPath)) {
      throw new Error(`Transform file not found: ${transformXsltPath}`);
    }
    let ret = transformXsltPath.replace(".xsl", ".sef.json");
    if (
      this.getFileModifiedTime(ret) <
      this.getFileModifiedTime(transformXsltPath)
    ) {
      execSync(
        `npx xslt3 -xsl:${transformXsltPath} -export:${ret} -t -ns:##html5 -nogo`
      );
    }
    return ret;
  }

  getFileModifiedTime(path) {
    let ret = 0;
    if (fs.existsSync(path)) {
      ret = fs.statSync(path).mtime.getTime();
    }
    return ret;
  }

  writeJson(path, data) {
    // envelope: add metadata; format inspired by JSON:API
    data = {
      meta: {
        dateCreated: new Date().toISOString(),
      },
      data: data,
    };
    // console.log(data)
    let dataStr = JSON.stringify(data, null, 2);
    fs.writeFileSync(path, dataStr, "utf8");
    console.log(
      `WRITE ${path} (${(dataStr.length / 1024 / 1024).toFixed(2)} MB)`
    );
  }
}

new TextSearch().transformHTMLs();
