const { createApp } = window.Vue;

function setUpTextViewer() {
  let PanelControl = {
    template: `
    <span class="panel-selector" v-if="!isHidden">
      <template v-if="!hideLabel">{{label}}:</template>
      <div class="select is-normal">
        <select @change="$parent.onChangeSelector(panel, controlKey)" v-model="panel.selections[controlKey]">
          <option v-for="(title, id) in panel.selectors[controlKey]" :value="id" v-html="title"></option>
        </select>
      </div>
    </span>
    `,
    props: ["panelIdx", "controlKey", "hideLabel"],
    computed: {
      panel() {
        return this.$parent.panels[this.panelIdx];
      },
      label() {
        return this.$parent.controls[this.controlKey];
      },
      isHidden() {
        return this.$parent.isControlHidden(this.controlKey);
      },
    },
  };

  let app = createApp({
    data() {
      return {
        settings: {
          hiddenControls: [], //["source", "collection"],
        },
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
                "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/develop/dts.json":
                  "AT SDTS (github)",
                "http://127.0.0.1:5500/alice-thornton/dts.json":
                  "AT SDTS (localhost)",
                "http://localhost:3000/": "AT DTS (local)",
                // format=X is ignored, will always return TEI
                "https://dev.chartes.psl.eu/api/nautilus/dts": "PSL Chartes",
                // CORS prevents call to Endpoint
                // "http://tnah.chartes.psl.eu/2019/dts/": "PSL Chartes (Songs, 2019)",
                // no navigation API, responses not compliant (e.g. type)
                // 'https://edh.ub.uni-heidelberg.de/api/dts/': 'EDH',
                // Perseid: uses ref instead of dts:ref in navigation members
                // format=X is ignored, will always return TEI
                "https://dts.perseids.org/": "Perseids",
                // CORS policy exclude 3rd party calls
                // 'http://texts.alpheios.net/api/dts': 'Alpheios',
                // request to navigation times out
                // 'https://betamasaheft.eu/api/dts': 'Beta maṣāḥǝft',
                // CORS policy exclude 3rd party calls
                // 'https://isicily-dts.herokuapp.com/dts/api': 'iSicily',
                // TEI Publisher: collections/member/@id=X doesn't match /documents?id=Y!
                // Could use collections/member/dts:passage URI instead, yet non-standard
                // Also no navigation Endpoint, not sure what the refs are...
                // "https://teipublisher.com/exist/apps/vangogh/api/dts": "Van Gogh Letters",
                // "https://raw.githubusercontent.com/geoffroy-noel-ddh/test-static-api/main/docs/index.html": "Test",
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
              document:
                "https://thornton.kdl.kcl.ac.uk/dts/thornton-books/book_one/",
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
      for (let panel of this.panels) {
        let key = "source";
        this.selectDefaultOption(panel, key);
        this.onChangeSelector(panel, key);
        // this.onChangeSelector(panel, 'document')
      }
    },
    methods: {
      clonePanel(panelIdx) {
        this.panels.push(JSON.parse(JSON.stringify(this.panels[panelIdx])));
      },
      closePanel(panelIdx) {
        // Do not use delete, this will confuse Vue
        this.panels = this.panels.filter((p, idx) => idx != panelIdx);
      },
      isControlHidden(controlKey) {
        return (
          controlKey[0] == "_" ||
          this.settings.hiddenControls.includes(controlKey)
        );
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
          await this.setLocus(panel, value);
        }

        this.selectDefaultOption(panel, nextKey);
        this.onChangeSelector(panel, nextKey);
      },
      async setLocus(panel, locus) {
        panel.selections.locus = locus;
        panel.responses.document = "";
        if (panel.selections.document && locus) {
          panel.responses.document = await this.fetchDTS(
            panel,
            "documents",
            panel.selections.document,
            locus,
            "html"
          );
        }
      },
      selectDefaultOption(panel, key) {
        if (key.startsWith("_")) return;
        if (!panel.selectors[key][panel.selections[key]]) {
          panel.selections[key] = Object.keys(panel.selectors[key])[0];
        }
      },
      async fetchDTS(panel, service, id, ref, format) {
        return window.dtsutils.fetchDTS(panel, service, id, ref, format);
        // if (!format && service == "documents") {
        //   // ? or content-type?
        //   // TODO: fallback to TEI?
        //   format = "html";
        // }
        // let url = this.getDTSUrl(panel, service, id, ref, format);
        // let ret = await this.fetch(url, format);
        // return ret;
      },
      incrementLocus(panel, steps) {
        let locus = panel.selections.locus;
        let lokeys = Object.keys(panel.selectors.locus);
        locus = lokeys[lokeys.indexOf(locus) + steps];
        if (locus) {
          this.setLocus(panel, locus);
        }
      },
      // getDTSUrl(panel, service, id, ref, format) {
      //   let ret = panel.selections.source;
      //   if (service) {
      //     ret = new URL(ret).origin;
      //     ret = `${ret}${panel.responses.entryPoint[service]}?`;
      //     if (id) {
      //       ret += `&id=${id}`;
      //     }
      //     if (ref) {
      //       ret += `&ref=${ref}`;
      //     }
      //     if (format) {
      //       ret += `&format=${format}`;
      //     }
      //   }
      //   return ret;
      // },
      // async fetch(url, format) {
      //   let ret = null;
      //   let res = await fetch(url);
      //   if (res && res.status == 200) {
      //     if (!format) {
      //       ret = await res.json();
      //     } else {
      //       ret = await res.text();
      //     }
      //   }
      //   return ret;
      // },
    },
  });
  app.component("panel-control", PanelControl);
  // app.component('c1', c1)
  app.mount("#text-viewer");
}

setUpTextViewer();
