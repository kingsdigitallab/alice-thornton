module.exports = {
  // localPath: "../../texts",
  localPath: "/home/jeff/src/prj/tst/alice-thornton/texts",
  // localPath: "https://github.com/kingsdigitallab/alice-thornton/tree/edition/texts",
  // The stable and base of the URI for most ids (mainly collections & documents).
  // Only used for identifiction, it may not be accessible on the web.
  baseUri: "https://thornton.kdl.kcl.ac.uk/dts/ids/",
  rootCollection: {
    slug: "thornton-books",
    title: "Alice Thornton's Books",
  },
  services: {
    root: "/",
    collections: "/collections/",
    navigation: "/navigation/",
    documents: "/documents/",
  },
};
