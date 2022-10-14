"use strict";

const fs = require("fs");

let idPrefix = "https://thornton.kdl.kcl.ac.uk/dts/";
// only one collection in our project at the moment,
// it contains the four books/editions
let idCollection = `${idPrefix}thornton-books/`;

var controllers = {
  root: (req, res) => {
    let ret = {
      "@context": "/contexts/EntryPoint.jsonld",
      "@id": `${idPrefix}`,
      "@type": "EntryPoint",
      // TODO: what are those paths relative to?
      collections: "/collections/",
      documents: "/documents/",
      navigation: "/navigation/",
    };
    res.json(ret);
  },
  collections: (req, res) => {
    // id, page, nav
    // let q = req.query
    let members = [
      {
        "@id": `${idCollection}book_one/`,
        title: "First Book of My Life",
        // "description": "Priapeia based on the edition of Aemilius Baehrens",
        // "dts:dublincore": {
        //     "dc:title": [{"@language": "la", "@value": "Priapeia"}],
        //     "dc:description": [{
        //        "@language": "en",
        //        "@value": "Anonymous lascivious Poems "
        //     }],
        //     "dc:type": [
        //         "http://chs.harvard.edu/xmlns/cts#edition",
        //         "dc:Text"
        //     ],
        //     "dc:source": ["https://archive.org/details/poetaelatinimino12baeh2"],
        //     "dc:dateCopyrighted": 1879,
        //     "dc:creator": [
        //         {"@language": "en", "@value": "Anonymous"}
        //     ],
        //     "dc:contributor": ["Aemilius Baehrens"],
        //     "dc:language": ["la", "en"]
        // },
        //"dts:download": "https://raw.githubusercontent.com/lascivaroma/priapeia/master/data/phi1103/phi001/phi1103.phi001.lascivaroma-lat1.xml",
      },
    ];
    let ret = {
      "@context": {
        "@vocab": "https://www.w3.org/ns/hydra/core#",
        dc: "http://purl.org/dc/terms/",
        dts: "https://w3id.org/dts/api#",
      },
      "@id": `${idCollection}`,
      "@type": "Collection",
      title: "Alice Thornton's Books",
      "dts:dublincore": {
        "dc:publisher": ["King's Digital Lab, King's College London"],
        // "dc:type": ["http://chs.harvard.edu/xmlns/cts#work"],
        // "dc:creator": [
        //     {"@language": "en", "@value": "Anonymous"}
        // ],
        // "dc:language": ["la", "en"],
        // "dc:title": [{"@language": "la", "@value": "Priapeia"}],
        // "dc:description": [{
        //    "@language": "en",
        //     "@value": "Anonymous lascivious Poems "
        // }]
      },
      totalItems: members.length,
      "dts:totalParents": 0,
      "dts:totalChildren": members.length,
      member: members,
    };
    for (let member of ret.member) {
      let mid = member["@id"];
      Object.assign(member, {
        totalItems: 0,
        "@type": "Resource",
        "dts:totalParents": 1,
        "dts:totalChildren": 0,
        "dts:references": `/navigation/?id=${mid}`,
        "dts:passage": `/documents/?id=${mid}`,
        "dts:maxCiteDepth": 1,
        "dts:citeStructure": [
          // TODO: chapters
          {
            "dts:citeType": "page",
          },
        ],
      });
    }
    res.json(ret);
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  },
  navigation: (req, res) => {
    // eg. https://betamasaheft.eu/api/dts/navigation?id=/api/dts/navigation?id=https://betamasaheft.eu/LIT6726AnastasiusPsalm
    // id, ref, start, end, down, groupBy, max, exclude
    // TODO: pagination ()
    let q = req.query;
    let pages = getPagesFromDocument(q.id);
    var ret = {
      "@context": {
        "@vocab": "https://www.w3.org/ns/hydra/core#",
        dc: "http://purl.org/dc/terms/",
        dts: "https://w3id.org/dts/api#",
      },
      "@id": req.originalUrl,
      "dts:maxCiteDepth": 1,
      "dts:level": 0,
      "dts:citeType": "page",
      member: pages.map((p) => {
        return { "dts:ref": `p.${p}`, "dts:level": 1 };
      }),
      "dts:passage": `/documents/?id=${q.id}`,
    };
    res.json(ret);
  },
  documents: (req, res) => {
    // id, ref, start, end, after, before, token, format
    let q = req.query;
    let rid = q.id;

    let chunk = getXMLFromPageNumber(rid, q.ref);
    res.set("Content-Type", "text/plain");
    // res.type('html')

    if (q.format == "html") {
      chunk = getHTMLfromTEI(chunk);
    }

    res.send(chunk);
  },
};

function getHTMLfromTEI(tei) {
  let ret = "";

  let SaxonJS = require("saxon-js");

  // todo: regenerate sef.json file if older than xslt
  // npx xslt3 -xsl:tei-to-html.xsl -export:tei-to-html.sef.json -t -ns:##html5 -nogo
  let output = SaxonJS.transform(
    {
      stylesheetFileName: "responses/tei-to-html.sef.json",
      sourceText: tei,
      destination: "serialized",
    },
    "sync"
  );

  ret = output.principalResult;

  // remove all namespaces
  ret = ret.replace(/\s*xmlns(:\w+)?="[^"]*"\s*/gs, " ");
  // remove xml declaration
  ret = ret.replace(/<\?xml\\s+version="1.0"\\s+encoding="UTF-8"\?>/, "");

  return ret;
}

function getPagesFromDocument(documentId) {
  let ret = [];
  let content = getContentFromDocument(documentId);
  let regex = RegExp('<pb [^>]*n="(\\d+)"\\s*/>', "sg");
  let matches = content.matchAll(regex);
  for (let match of matches) {
    ret.push(match[1]);
  }
  return ret;
}

function getContentFromDocument(documentId) {
  let parts = documentId.split("/");
  // todo: use doc index instead and check whole pid
  let fileName = parts[parts.length - 2];
  let filePath = `../../texts/${fileName}/${fileName}.xml`;
  return fs.readFileSync(filePath).toString();
}

function getXMLFromPageNumber(documentId, ref) {
  let ret = `Ref '${ref}' not found in doc '${documentId}'`;
  // TODO: extract page using xpath & dom
  // method: take all add all the elements
  // situated between the pbs and their nearest common ancestor

  let pageNumber = ref.match(/^p\.(\d+)$/);
  if (pageNumber) {
    let pn = pageNumber[1]; //.padStart(3, '0')
    let content = getContentFromDocument(documentId);
    let pnNext = "" + (parseInt(pn, 10) + 1);
    // console.log(pnNext)
    let regex = RegExp(
      `<pb [^>]*n="${pn}"\\s*/>(.*)<pb [^>]*n="${pnNext}"`,
      "s"
    );
    let m = content.match(regex);
    // console.log(m)
    if (m) {
      ret = `<div>${m[1]}</div>`;
      let dom = require("xmldom").DOMParser;
      let doc = new dom().parseFromString(ret);
      ret = doc.toString();
    }
  }
  return ret;
}

module.exports = controllers;
