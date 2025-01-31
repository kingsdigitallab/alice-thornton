# Entities indexer

Note: Change in terminology, there are places where it has not been changed. Entities (previous) = Entries (current).

This app generates the index file used by the front-end entities (people, places) search page.

Install dependencies:

`npm ci`

Pull latest TEI entity files from github:

`npm run fetch`

Build the entities json search index from the TEI entity files (using XSLT):

`npm run build`

Push the index into github

```bash
git commit -am "updated entities index"
git push
```
