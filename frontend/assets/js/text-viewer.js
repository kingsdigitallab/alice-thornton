const { createApp } = window.Vue;

function setUpTextViewer() {
  createApp({
    data() {
      return {
        controls: {
          source: "Source",
          collection: "Collection",
          document: "Document",
          locus: "Locus",
          _chunks: "Chunks",
        },
        panels: [
          {
            selectors: {
              source: {
                "http://localhost:3000/": "AT",
                "https://dev.chartes.psl.eu/api/nautilus/dts": "PSL Chartes",
                // no navigation API, responses not compliant (e.g. type)
                // 'https://edh.ub.uni-heidelberg.de/api/dts/': 'EDH',
                // Perseid: uses ref instead of dts:ref in navigation members
                "https://dts.perseids.org/": "Perseids",
                // CORS policy exclude 2rd party calls
                // 'http://texts.alpheios.net/api/dts': 'Alpheios',
                // request to navigation times out
                // 'https://betamasaheft.eu/api/dts': 'Beta maṣāḥǝft',
              },
              collection: {
                c1: "Collection 1",
                c2: "Collection 2",
              },
              document: {
                d1: "Doc 1",
                d2: "Doc 2",
              },
              locus: {
                l1: "Locus 1",
                l2: "Locus 2",
              },
            },
            selections: {
              source: "",
              collection: "",
              document: "",
              locus: "",
            },
            responses: {
              entryPoint: "",
              rootCollection: "",
              collection: "",
              navigation: "",
              document: "",
            },
          },
        ],
      };
    },
    mounted() {
      // this.clonePanel(0)
      for (let panel of this.panels) {
        let key = "source";
        this.selectDefaultOption(panel, key);
        this.onChangeSelector(panel, key);
      }
    },
    methods: {
      clonePanel(panelIdx) {
        this.panels.push(JSON.parse(JSON.stringify(this.panels[panelIdx])));
      },
      closePanel(panelIdx) {
        this.panels = this.panels.filter((p, idx) => idx != panelIdx);
        // delete this.panels[panelIdx]
      },
      onChangeSelector(panel, key) {
        if (key.startsWith("_")) return;

        let value = panel.selections[key];
        this.fetchOptions(panel, key, value);
      },
      async fetchOptions(panel, key, value) {
        function addCollection(collection, parentId) {
          let parentTitle = panel.selectors.collection[parentId];
          let prefix = "";
          if (parentTitle) {
            console.log(parentTitle);
            prefix = parentTitle.match(/^(\s|&nbsp;)*/)[0];
            prefix += "&nbsp;&nbsp;- ";
          }

          let title = `${prefix}${collection.title} (${collection.totalItems})`;
          panel.selectors.collection[collection["@id"]] = title;
        }
        function addSubCollections() {
          // we add sub-collections found in Collections?id=X response
          // to the flatten list of available collections.
          // Because JS objects or Map don't have an insert function
          // we have to copy front-part, insert new collections, then
          // copy rest...
          // 1. copy existing list
          let copy = { ...panel.selectors.collection };
          console.log(copy);
          panel.selectors.collection = {};
          let parentId = panel.responses.collection["@id"];
          for (let cid of Object.keys(copy)) {
            panel.selectors.collection[cid] = copy[cid];
            if (cid == parentId) {
              panel.responses.collection.member.map((member) => {
                if (member["@type"] == "Collection") {
                  addCollection(member, parentId);
                }
              });
            }
          }
        }

        let keys = Object.keys(this.controls);
        let nextKey = keys[keys.indexOf(key) + 1];

        if (key == "source") {
          panel.responses.entryPoint = await this.fetchDTS(panel);
          panel.responses.rootCollection = await this.fetchDTS(
            panel,
            "collections"
          );
          panel.selectors.collection = {};

          addCollection(panel.responses.rootCollection);
          // todo, paginate
        }
        if (key == "collection") {
          if (value == panel.responses.rootCollection["@id"]) {
            panel.responses.collection = panel.responses.rootCollection;
          } else {
            panel.responses.collection = await this.fetchDTS(
              panel,
              "collections",
              value
            );
          }
          // todo, paginate
          panel.selectors.document = {};
          panel.responses.collection.member.map((member) => {
            // EDH uses type instead of @type
            if (member["@type"] == "Resource" || member["type"] == "Resource") {
              panel.selectors.document[member["@id"]] = member.title;
            }
          });
          addSubCollections();
        }
        if (key == "document") {
          // todo, paginate
          panel.selectors.locus = {};
          if (value) {
            panel.responses.navigation = await this.fetchDTS(
              panel,
              "navigation",
              value
            );
            let members =
              panel.responses.navigation.member ||
              panel.responses.navigation["hydra:member"];
            members.map((member) => {
              let ref = member["dts:ref"] || member["ref"];
              panel.selectors.locus[ref] = ref;
            });
          }
        }
        if (key == "locus") {
          panel.responses.document = "";
          if (panel.selections.document && value) {
            panel.responses.document = await this.fetchDTS(
              panel,
              "documents",
              panel.selections.document,
              value
            );
          }
        }

        this.selectDefaultOption(panel, nextKey);
        this.onChangeSelector(panel, nextKey);
      },
      selectDefaultOption(panel, key) {
        if (key.startsWith("_")) return;
        if (!panel.selectors[key][panel.selections[key]]) {
          panel.selections[key] = Object.keys(panel.selectors[key])[0];
        }
      },
      async fetchDTS(panel, service, id, ref, format) {
        let url = this.getDTSUrl(panel, service, id, ref, format);
        if (!format && service == "documents") {
          // ? or content-type?
          format = "tei";
        }
        let ret = await this.fetch(url, format);
        return ret;
      },
      getDTSUrl(panel, service, id, ref, format) {
        let ret = panel.selections.source;
        if (service) {
          // console.log((new URL(ret)))
          ret = new URL(ret).origin;
          ret = `${ret}${panel.responses.entryPoint[service]}?`;
          if (id) {
            ret += `&id=${id}`;
          }
          if (ref) {
            ret += `&ref=${ref}`;
          }
          if (format) {
            ret += `&format=${format}`;
          }
        }
        return ret;
      },
      async fetch(url, format) {
        let ret = null;
        let res = await fetch(url);
        if (res && res.status == 200) {
          if (!format) {
            ret = await res.json();
          } else {
            ret = await res.text();
          }
        }
        return ret;
      },
    },
  }).mount("#text-viewer");
}

setUpTextViewer();
