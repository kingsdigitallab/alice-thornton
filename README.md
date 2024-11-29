# Alice Thornton project code

[![Build Site](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/build.yml/badge.svg)](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/build.yml)
[![TEI Validation](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/validate-tei.yml/badge.svg?branch=edition)](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/validate-tei.yml)

Open in Gitpod: [design branch](https://gitpod.io/#https://github.com/kingsdigitallab/alice-thornton/tree/design) | [develop branch](https://gitpod.io/#https://github.com/kingsdigitallab/alice-thornton/tree/develop)

The web site is developed using a Static Site Generator called [11ty](https://www.11ty.dev/).

- [Documentation for editors](https://github.com/kingsdigitallab/vault-101/blob/main/docs/howto/editing-markdown-files-on-github.rst)
- [Documentation for developers](https://github.com/kingsdigitallab/vault-101/blob/main/docs/howto/11ty.rst)

## Site deployment

- [The live site](//thornton.kdl.kcl.ac.uk) is generated from the `main` branch every 10 minutes. Researchers can edit the markdown content of the site directly on this branch.
- [The staging site](//thornton-stg.kdl.kcl.ac.uk) is generated from the `release` branch every 10 minutes.
  This branch and site are used by the KDL team to test and demonstrate new features and fixes before publishing them to `main` branch.
- [The development site](//thornton-dev.kdl.kcl.ac.uk) is generated from the `develop` branch every 30 minutes.
  This branch and site are used by the KDL team to experiment with new, unstable features.

## Edition

- [The TEI editions of the books](https://github.com/kingsdigitallab/alice-thornton/tree/edition) are kept in the `edition` branch
- [The HTML chunks](https://github.com/kingsdigitallab/alice-thornton/tree/dts) are generated from the TEI editions every day at 1pm & 6pm and saved into the `dts` branch (Use [github action](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/publish-tei.yml) or `npm run tei2html` to run it manually.)
- The [Text Viewer](https://thornton-stg.kdl.kcl.ac.uk/books/viewer/) reads HTML chunks from the `dts` branch
- The [development site](https://thornton-dev.kdl.kcl.ac.uk/books/viewer/) shows the latest HTML chunks
- Snapshots of the `dts` branch will be manually tagged with following format: 'eYYYY-MM-DD', example 'e2023-05-23'

## Developing the DTS server

To edit the code of the DTS server locally while testing it with the AT Text Viewer on the AT edition:

1. git clone [kdl-dts-server](https://github.com/kingsdigitallab/kdl-dts-server) in a new folder outside the project
2. Start the server: `npm run start:at` (will run on localhost:3000)

## Server build for each type (dev|stg|liv) of site:

`export SITE_ENV='dev'; npm run rebuild`

.
