"use strict";

// const gfetch = require("node-fetch");
const { execSync } = require("child_process");
const SaxonJS = require("saxon-js");
const pathp = require("path");
const fs = require("fs");
const METADATA = require("../../frontend/_data/metadata")();

const SITE_ENV = process.env.SITE_ENV || 'lcl'
const sourceBase = "./clone/dts/documents/";
const target = "../../frontend/assets/js/entities.json";
const XSLTPath = {
  'modern': "html-to-html-modern.xslt",
  'semidip': "html-to-html-semidip.xslt"
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
const LIMIT = 0
const PATTERN_BOOK_PAGE = /\/([^/]+)\/p\.(\d+)\.html/

class TextSearch {
  constructor() {
    this.entities = [];
  }

  async transformHTMLs() {
    var paths = fs.readdirSync(sourceBase);

    if (fs.existsSync(TO_BE_INDEXED_PATH)) {
      fs.rmSync(TO_BE_INDEXED_PATH, { recursive: true })
    }

    let limit = SITE_ENV == 'lcl' ? LIMIT : 0;
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
    if (!this.isPagePublic(path)) return;
    console.log(path);
    for (let version of Object.keys(XSLTPath)) {
      await this.transformHTMLVersion(path, version)
    }
  }

  isPagePublic(path) {
    // Example:
    // path = clone/dts/documents/book_one/p.110.html
    // METADATA.text_viewer.visible_documents.book_one = [1, 96]
    // => false
    let ret = true
    // ['/book_one/p.110.html', 'book_one', '110']
    let parts = PATTERN_BOOK_PAGE.exec(path)
    // [1, 96]
    let pageRange = METADATA.text_viewer.visible_documents[parts[1]]
    if (typeof pageRange !== "undefined") {
      let pageNumber = parseInt(parts[2])
      ret = pageNumber >= pageRange[0] && pageNumber <= pageRange[1]
    }
    return ret
  }

  async transformHTMLVersion(path, version='modern') {
    let htmlString = await this.xslt(path, XSLTPath[version]);

    // variables substitution
    let metadata = this.getMetadataFromPath(path, version);
    for (let k of Object.keys(metadata)) {
      htmlString = htmlString.replace(`#${k}#`, metadata[k])
    }

    // con-<br...>form => conform
    // Join parts of a word separated by a line break
    htmlString = htmlString.replace(/<\/br>/g, "");
    // remove spaces around a line break in the middle of a word
    htmlString = htmlString.replace(/\s*(<br[^>]+data-tei-break="no"[^>]*>)\s*/g, "$1");
    // remove the hyphen 
    htmlString = htmlString.replace(
      /<span class="tei-pc not-a-word" data-tei="pc">-<\/span>(<br[^>]+data-tei-break="no"[^>]*>)/g,
      ''
    );

    let targetPath = path.replace('clone/dts/documents', TO_BE_INDEXED_PATH)
    targetPath = targetPath.replace('.html', '-' + version + '.html')
    fs.mkdirSync(pathp.dirname(targetPath), { recursive: true })
    fs.writeFileSync(targetPath, htmlString, 'utf8')
  }

  getMetadataFromPath(path, version='modern') {
    let ret = null;

    // clone/dts/documents/book_one/p.12.html
    const regex = /\/dts\/documents\/(?<bookKey>\w+)\/p\.(?<page>\d+)\.html$/;
    const match = regex.exec(path);

    if (match) {
      // 12
      const pageNumber = match.groups.page
      // 0012
      const pageNumberPadded = pageNumber.padStart(4, "0");
      ret = {
        book: LABEL_FROM_KEY[match.groups.bookKey],
        page: pageNumber,
        version: LABEL_FROM_KEY[version],
        url: `/edition/?p0.do=${match.groups.bookKey}&p0.lo=p.${pageNumber}&p0.vi=${version}`,
        // Book 1, page 12
        title: `${LABEL_FROM_KEY[match.groups.bookKey]}, page ${pageNumber}`,
        // 1-0012 for Book 1, page 12
        // bookPage: `${Object.keys(LABEL_FROM_KEY).indexOf(match.groups.bookKey)}-${pageNumberPadded}`,
        bookPageVersion: `${Object.keys(LABEL_FROM_KEY).indexOf(match.groups.bookKey)}-${pageNumberPadded}-${version[0]}`,
      }
    }

    return ret
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

    // console.log(ret.substring(0, 300))

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

}

new TextSearch().transformHTMLs();
