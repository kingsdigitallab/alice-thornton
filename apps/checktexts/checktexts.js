"use strict";

const gfetch = require("node-fetch");
const fs = require("fs");
const Dom = require("@xmldom/xmldom").DOMParser;
const XPath = require("xpath");

const TEINS = "http://www.tei-c.org/ns/1.0";
const TEXT_NAMES = [
  "00_book_of_remembrances",
  "01_book_one",
  "02_book_two",
  "03_book_three",
];

class Checker {
  constructor() {
    this.dom = null;
    this.xpath = XPath.useNamespaces({ tei: TEINS });
  }

  async checkAll() {
    for (let textName of TEXT_NAMES) {
      this.textName = textName;
      let textPath = `edition/texts/${textName}/${textName.substring(3)}.xml`;
      let content = this.readFile(textPath);
      this.dom = new Dom().parseFromString(content);
      await this.checkImages();
    }
    console.log("done.");
  }

  async checkImages() {
    const nodes = this.xpath("//tei:graphic", this.dom);
    this.log(`${nodes.length} images`);
    for (let node of nodes) {
      let imageFilename = node.getAttribute("url");
      if (imageFilename.endsWith(".jpg")) {
        imageFilename = imageFilename.substring(0, imageFilename.length - 4);
        let gitUrl = `https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/main/frontend/assets/img/books/viewer/zoomify/${imageFilename}/ImageProperties.xml`;
        let imageProperties = await this.fetchText(gitUrl);
        if (imageProperties) {
          this.log(`Image has tiles ${imageFilename}`, "PASS");
        } else {
          this.log(`Image tiles not found: ${imageFilename}`, "FAIL");
        }
      } else {
        this.log(`Image should end with .jpg: ${imageFilename}`, "FAIL");
      }
    }
  }

  async fetchText(url) {
    let ret = null;
    let res = await gfetch(url);
    if (res && res.status == 200) {
      ret = await res.text();
    }
    return ret;
  }

  readFile(source) {
    return fs.readFileSync(source).toString();
  }

  log(message, level = "INFO") {
    // level, one of: INFO, PASS, WARN, FAIL
    console.log(`${level}\t${this.textName}\t${message}`);
  }
}

let checker = new Checker();
checker.checkAll();
