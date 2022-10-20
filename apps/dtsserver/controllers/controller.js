"use strict";
// TODO: add text metadata from TEI

const SaxonJS = require("saxon-js");
const fs = require("fs");
let Dom = require("xmldom").DOMParser;
const settings = require("../settings.js");
const collectionRoot = settings.localPath;

let idPrefix = settings.baseUri;
// only one collection in our project at the moment,
// it contains the four books/editions
let idCollection = `${idPrefix}${settings.rootCollection.slug}/`;

var controllers = {
  root: (req, res) => {
    let ret = {
      "@context": "/contexts/EntryPoint.jsonld",
      "@id": `${settings.services.root}`,
      "@type": "EntryPoint",
    };
    // add abs path of each DTS service (e.g. collections: '/collections/')
    for (let key of Object.keys(settings.services)) {
      if (key != "root") {
        ret[key] = settings.services[key];
      }
    }
    res.json(ret);
  },
  collections: async (req, res) => {
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

    members = await findTEIFiles(collectionRoot);

    let ret = {
      "@context": {
        "@vocab": "https://www.w3.org/ns/hydra/core#",
        dc: "http://purl.org/dc/terms/",
        dts: "https://w3id.org/dts/api#",
      },
      "@id": `${idCollection}`,
      "@type": "Collection",
      title: settings.rootCollection.title,
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
        "dts:references": `${settings.services.navigation}?id=${mid}`,
        "dts:passage": `${settings.services.documents}?id=${mid}`,
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
      "dts:passage": `${settings.services.documents}?id=${q.id}`,
    };
    res.json(ret);
  },
  documents: (req, res) => {
    // id, ref, start, end, after, before, token, format
    let q = req.query;
    let rid = q.id;

    let chunk = getXMLFromPageNumber(rid, q.ref);
    if (!chunk) {
      chunk = `<?xml version="1.0" encoding="UTF-8"?>
      <TEI xmlns="http://www.tei-c.org/ns/1.0" xml:id="atb-book-of-remembrances"></TEI>`;
    }
    res.set("Content-Type", "text/plain");
    // res.type('html')

    if (q.format == "html") {
      chunk = getHTMLfromTEI(chunk);
    }

    res.send(chunk);
  },
};

// TODO: convert those functions into a class

async function findTEIFiles(collectionPath, ret) {
  // TODO: handle collections & sub-collections
  if (typeof ret === "undefined") {
    ret = [];
  }

  const directory = collectionPath;
  const path = require("path");
  const fs = require("fs");

  for (let file of fs.readdirSync(directory)) {
    let filePath = path.resolve(directory, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      await findTEIFiles(filePath, ret);
    } else {
      if (file.endsWith(".xml")) {
        let handle = file.replace(/\.[^.]*$/, "");
        let documentId = `${idCollection}${handle}/`;
        let teiMeta = await getMetadataFromTEIFile(filePath);
        ret.push({
          "@id": documentId,
          test: "test",
          title: teiMeta.title,
        });
      }
    }
  }

  return ret;
}

async function getMetadataFromTEIFile(filePath) {
  let content = readFile(filePath);
  // optimisation: we extract the TEI header (so less xml to parse)
  let m = content.match(/^.*<\/teiHeader>/s);
  content = `${m[0]}</TEI>`;
  let doc = await SaxonJS.getResource({ text: content, type: "xml" });

  let ret = {
    title: "//teiHeader/fileDesc/titleStmt/title/text()",
  };

  for (const [k, v] of Object.entries(ret)) {
    ret[k] = SaxonJS.XPath.evaluate(v, doc, {
      xpathDefaultNamespace: "http://www.tei-c.org/ns/1.0",
    }).data;
  }

  return ret;
}

function getHTMLfromTEI(tei) {
  let ret = "";

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
  let filePath = getTEIFilePathFromDocumentId(documentId);
  return readFile(filePath);
}

function readFile(filePath) {
  return fs.readFileSync(filePath).toString();
}

function getTEIFilePathFromDocumentId(documentId) {
  let parts = documentId.split("/");
  // todo: use doc index instead and check whole pid
  let fileName = parts[parts.length - 2];
  return `${collectionRoot}/${fileName}/${fileName}.xml`;
}

function getXMLFromPageNumber(documentId, ref) {
  // let ret = `Ref '${ref}' not found in doc '${documentId}'`;
  let ret = null;
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

    let headerMatch = content.match(/^.*<\/teiHeader>/s);

    if (m) {
      ret = `${headerMatch[0]}
        <dts:fragment xmlns:dts="https://w3id.org/dts/api#">
          ${m[1]}
        </dts:fragment>
      </TEI>`;
      // Why doing this?
      let doc = new Dom().parseFromString(ret);
      ret = doc.toString();
    }
  }
  return ret;
}

module.exports = controllers;
