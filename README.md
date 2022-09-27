# Alice Thornton Digital Edition (edition branch)

![TEI Validation](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/validate-tei.yml/badge.svg?branch=edition)

This branch holds the source files of the digital edition.

Conventions:

- please use only digits, lowercase letters and underscore for file names. No space, dash or other characters;
- to reduce risks of conflicts (i.e. same portion of a file modified by two different editors), please pull, commit and push often;
- please avoid pushing breaking changes;
- when you revert changes, be mindful of not losing work done by others;

# Alice Thornton project code (other branches)

[![Build Site](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/build.yml/badge.svg)](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/build.yml)
[![TEI Validation](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/validate-tei.yml/badge.svg?branch=edition)](https://github.com/kingsdigitallab/alice-thornton/actions/workflows/validate-tei.yml)

The web site is developed using a Static Site Generator called [11ty](https://www.11ty.dev/).

- [Documentation for editors](https://github.com/kingsdigitallab/vault-101/blob/main/docs/howto/editing-markdown-files-on-github.rst)
- [Documentation for developers](https://github.com/kingsdigitallab/vault-101/blob/main/docs/howto/11ty.rst)

Site deployment:

- [The live site](//thornton.kdl.kcl.ac.uk) is generated from the `main` branch every 10 minutes. Researchers can edit the markdown content of the site directly on this branch.
- [The staging site](//thornton-stg.kdl.kcl.ac.uk) is generated from the `release` branch every 10 minutes.
  This branch and site are used by the KDL team to test and demonstrate new features and fixes before publishing them to `main` branch.
- [The development site](//thornton-dev.kdl.kcl.ac.uk) is generated from the `develop` branch every 30 minutes.
  This branch and site are used by the KDL team to experiment with new, unstable features.
