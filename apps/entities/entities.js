"use strict";

const SaxonJS = require("saxon-js");
const fs = require("fs");

const sources = ["../../tmp/people.xml"];
const target = "../../frontend/_site/assets/js/entities.json";

class Entities {
  constructor() {
    this.entities = [];
  }

  writeJsonFromTei() {
    this.entities = [];

    for (let source of sources) {
      this.loadTei(source);
    }

    this.writeJson(target, this.entities);
  }

  loadTei(source) {
    let jsonSheetPath = "tei-to-json.sef.json";
    // let docString = this.readFile(source)
    let entitiesJson = this.xslt(source, jsonSheetPath);
    console.log(entitiesJson);
    let entities = JSON.parse(entitiesJson);
    console.log(entities);

    for (let e in entities) {
      console.log(e);
      this.entities.push(e);
    }
  }

  readFile(source) {
    return fs.readFileSync(source).toString();
  }

  xslt(docPath, jsonSheetPath) {
    let output = SaxonJS.transform(
      {
        stylesheetFileName: jsonSheetPath,
        // sourceText: docString,
        sourceFileName: docPath,
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
    fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
    console.log(`WRITE ${path}`);
  }
}

new Entities().writeJsonFromTei();
