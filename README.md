[![Build Site](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/build.yml/badge.svg)](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/build.yml)
[![TEI Validation](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/validate-tei.yml/badge.svg?branch=edition)](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/validate-tei.yml)

# Alice Thornton project code

The web site is developed using a Static Site Generator called [11ty](https://www.11ty.dev/).

- [Documentation for editors](https://github.com/kingsdigitallab/vault-101/blob/main/docs/howto/editing-markdown-files-on-github.rst)
- [Documentation for developers](https://github.com/kingsdigitallab/vault-101/blob/main/docs/howto/11ty.rst)

Site deployment:

- [The live site](//thornton.kdl.kcl.ac.uk) is generated from the `main` branch every 10 minutes. Researchers can edit the markdown content of the site directly on this branch.
- [The staging site](//thornton-stg.kdl.kcl.ac.uk) is generated from the `release` branch every 10 minutes.
  This branch and site are used by the KDL team to test and demonstrate new features and fixes before publishing them to `main` branch.
- [The development site](//thornton-dev.kdl.kcl.ac.uk) is generated from the `develop` branch every 30 minutes.
  This branch and site are used by the KDL team to experiment with new, unstable features.
