# KDL Static DTS Generator

This command line javascript tool allows you to meet some of the same key objectives of a Distributed Text Services (DTS) API but without permanently running a dedicated web service. This lowers the technical bar and the cost of publishing your TEI or HTML digital editions to the web.

The principle is similar to Static Site Generators (SSG) or IIIF Static Tiles Generator or Zoomify.

## How does it work?

This tool downloads the collections metadata and the document passages from a dynamic DTS API. The downloaded files can then be uploaded to a static web host (e.g. github.com) for public access. The resulting dataset is almost compliant with a subset of the DTS specification. It is called "Static DTS".

The main difference with DTS is that requests pass parameters (e.g. id, ref) entirely via the webpath rather than the query string. Apart from that the content structure, the concepts and the responses are compliant with the DTS spec (draft 1, 2022).

Existing DTS API client (e.g. a Text Viewer) can be easily adapted to interact with Static DTS datasets.

## How do I generate a Static DTS dataset?

It is assumed that you already have a working DTS API server (e.g. Nautilus, TEIPublisher, KDL DTS Server) running over your TEI corpus.

`npm ci`

`node dtsstaticgen.js --source S --local L --target T`

This will download all documents and collections from a running DTS API server which entry point URL is S and save the files under a local path L. T is the entry point URL of the resulting Static DTS API.

## How to map DTS requests to Static DTS?

- entry point: X => X.json
- collections: X/documents/?id=ID => X/collections/ID.json
- navigation: X/navigation/?id=ID&ref=REF => X/navigation/ID/REF.json
- documents: X/documents/?id=ID&ref=REF&format=F => X/documents/ID/REF.F
