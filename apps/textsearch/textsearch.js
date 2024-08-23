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
const XSLTPath = {
  'modern': "html-to-html-modern.xslt",
  // 'semidip': "html-to-html-semidip.xslt"
};
const LABEL_FROM_KEY = {
  'book_of_remembrances': 'Book of Remembrances',
  'book_one': 'Book 1',
  'book_two': 'Book 2',
  'book_three': 'Book 3',
  'modern': 'Modernised',
  'semidip': 'Semi-diplomatic',
}
const TO_BE_INDEXED_PATH = 'to-be-indexed'

class TextSearch {
  constructor() {
    this.entities = [];
  }

  async transformHTMLs() {
    var paths = fs.readdirSync(sourceBase);

    fs.rmSync(TO_BE_INDEXED_PATH, { recursive: true })

    let limit = 2;
    let processed = 0;

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
          processed++;
          if (limit && processed >= limit) break;
        }
      }
    }
  }

  async transformHTML(path) {
    console.log(path);
    for (let version of Object.keys(XSLTPath)) {
      this.transformHTMLVersion(path, version)
    }
  }

  async transformHTMLVersion(path, version='modern') {
    let htmlString = await this.xslt(path, XSLTPath[version]);

    let metadata = this.getMetadataFromPath(path, version);

    for (let k of Object.keys(metadata)) {
      htmlString = htmlString.replace(`#${k}#`, metadata[k])
    }

    let targetPath = path.replace('clone/dts/documents', TO_BE_INDEXED_PATH)
    targetPath = targetPath.replace('.html', '-' + version + '.html')
    fs.mkdirSync(pathp.dirname(targetPath), { recursive: true })
    fs.writeFileSync(targetPath, htmlString, 'utf8')
  }

  getMetadataFromPath(path, version='modern') {
    // clone/dts/documents/book_two/p.99.html
    let ret = null;

    const regex = /\/dts\/documents\/(?<bookKey>\w+)\/p\.(?<page>\d+)\.html$/;
    const match = regex.exec(path);
    if (match) {
      ret = {
        book: LABEL_FROM_KEY[match.groups.bookKey],
        page: match.groups.page,
        version: LABEL_FROM_KEY[version],
        url: `/edition/?p0.do=${match.groups.bookKey}&p0.lo=p.${match.groups.page}&p0.vi=${version}`,
        title: `${LABEL_FROM_KEY[match.groups.bookKey]}, page ${match.groups.page}`,
      }
    }

    return ret
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

    // convert html to xhtml so saxonjs is happy
    docString = this.readFile(docPath);
    const { DOMParser, XMLSerializer } = require('xmldom');
    const parser = new DOMParser();
    let node = parser.parseFromString(docString, 'text/html');
    const serializer = new XMLSerializer();
    docString = serializer.serializeToString(node);

    let output = SaxonJS.transform(
      {
        stylesheetFileName: jsonSheetPath,
        sourceText: docString,
        // sourceFileName: docPath,
        // sourceNode: node,
        destination: "serialized",
      },
      "sync"
    );

    let ret = output.principalResult;

    // TODO: find another way to remove first line
    let firstLine = '<?xml version="1.0" encoding="UTF-8"?>';
    ret = ret.replace(firstLine, "");

    console.log(ret.substring(0, 300))

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
