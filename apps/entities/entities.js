"use strict";

const gfetch = require("node-fetch");
const SaxonJS = require("saxon-js");
const fs = require("fs");

const sourceBase = "./edition/entities/";
// const sourceBase =
//   "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/edition/entities/";
// const sources = ["people.xml", "places.xml", "events.xml"];
const sources = ["events.xml"];
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
    let entitiesJson = await this.xslt(source, jsonSheetPath);

    let entities = [];

    if (entitiesJson) {
      // console.log(entitiesJson)
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

  async xslt(docPath, jsonSheetPath) {
    let docString = null;
    if (docPath.startsWith("http")) {
      let res = await gfetch(docPath);
      if (res && res.status == 200) {
        docString = await res.text();
      }
    } else {
      docString = this.readFile(docPath);
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

new Entities().writeJsonFromTei();
