# DTS branch: publishes TEI editions into static DTS files

The DTS files are stored on github,
from which they can be directly serve by the Text Viewer
hosted on the Alice Thornton website.

## Installation

```bash
npm ci
```

## Commands

### Generate the static DTS files from the TEI editions

```bash
npm run static
```

TEI files are requested from the `edition` branch.

Configuration in settings-server.json and settings-static.json.

### Run a local DTS server over the static DTS files

```bash
npm run serve
```
