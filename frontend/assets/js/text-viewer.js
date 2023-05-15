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
          view: "View",
          _chunks: "Chunks",
        },
        panels: [
          {
            selectors: {
              source: window.metadata.text_viewer.source,
              source_old: {
                // "http://localhost:3000": "AT DTS (local:3000)",
                "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/dts/dts.json":
                  "AT SDTS (github)",
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
              view: {
                semidip: "Semi-diplomatic",
                modern: "Modernised",
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
              view: "",
            },
            responses: {
              entryPoint: "",
              rootCollection: "",
              collection: "",
              navigation: "",
              document: "",
            },
            error: "",
            loaded: false,
          },
        ],
      };
    },
    mounted() {
      // for (let panel of this.panels) {
      //   let key = "source";
      //   this.selectDefaultOption(panel, key);
      //   this.onChangeSelector(panel, key);
      //   // this.onChangeSelector(panel, 'document')
      // }
      // http://localhost:8080/books/viewer/?&p0.lo=p.1&p1.do=https://thornton.kdl.kcl.ac.uk/dts/ids/thornton-books/book_one/&p1.lo=p.2&p1.vi=modern
      this.setSelectionFromAddressBar();
    },
    methods: {
      canClonePanel() {
        return window.metadata.text_viewer.can_clone_panel;
      },
      clonePanel(panelIdx) {
        this.panels.push(JSON.parse(JSON.stringify(this.panels[panelIdx])));
        this.setAddressBarFromSelection();
      },
      closePanel(panelIdx) {
        // Do not use delete, this will confuse Vue
        this.panels = this.panels.filter((p, idx) => idx != panelIdx);
        this.setAddressBarFromSelection();
      },
      isControlHidden(controlKey) {
        return (
          controlKey[0] == "_" ||
          this.settings.hiddenControls.includes(controlKey)
        );
      },
      async onChangeSelector(panel, key) {
        if (key.startsWith("_")) return;
        this.setAddressBarFromSelection();

        let value = panel.selections[key];
        await this.fetchOptions(panel, key, value);
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
              if (this.isDocumentVisible(member["@id"])) {
                panel.selectors.document[member["@id"]] = member.title;
              }
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
              if (this.isLocusVisible(panel.selections.document, ref)) {
                panel.selectors.locus[ref] = ref;
              }
            });
          }
        }
        if (key == "locus") {
          await this.setLocus(panel, value);
        }

        this.selectDefaultOption(panel, nextKey);
        await this.onChangeSelector(panel, nextKey);
      },
      isDocumentVisible(documentId) {
        let ret = true;
        let rules = window.metadata.text_viewer.visible_documents[documentId];
        if (typeof rules !== "undefined") {
          ret = rules.length;
        }
        return ret;
      },
      isLocusVisible(documentId, locus) {
        let ret = true;
        let rules = window.metadata.text_viewer.visible_documents[documentId];
        if (typeof rules !== "undefined") {
          let locusNumber = locus.match(/\d+/);
          if (locusNumber) {
            locusNumber = parseInt(locusNumber[0]);
            ret = locusNumber >= rules[0] && locusNumber <= rules[1];
          }
        }
        return ret;
      },
      async setLocus(panel, locus) {
        panel.selections.locus = locus;
        // panel.responses.document = `Loading ${locus}...`;
        if (panel.selections.document && locus) {
          panel.responses.document = await this.fetchDTS(
            panel,
            "documents",
            panel.selections.document,
            locus,
            "html"
          );
          this.postProcessDocument(panel);
          this.setAddressBarFromSelection();
        }
      },
      postProcessDocument(panel) {
        // CLEAN-UP HTML

        // convert entities to hyperlinks
        let doc = panel.responses.document;
        // console.log(doc)
        doc = doc.replace(/<\/br>/g, "");
        // remove spaces around a line break in the middle of a word
        doc = doc.replace(/\s*(<br[^>]+data-tei-break="no"[^>]*>)\s*/g, "$1");
        // remove spaces around a line break in the middle of a word
        doc = doc.replace(
          /<span class="tei-pc not-a-word" data-tei="pc">-<\/span>(<br[^>]+data-tei-break="no"[^>]*>)/g,
          '<span class="tei-pc not-a-word divide-word" data-tei="pc">-</span>$1'
        );
        panel.responses.document = doc;

        // EVENTS

        this.$nextTick(() => {
          // TODO: attach events only to current panel
          const anchors = window.document.querySelectorAll(".tei-anchor");
          anchors.forEach((anchors) => {
            if (anchors.classList.contains("managed")) return;
            anchors.addEventListener(
              "click",
              () => {
                anchors.classList.toggle("expanded");
              },
              false
            );
            anchors.classList.add("managed");
          });

          // TODO: attach events only to current panel
          const btnFigures = window.document.querySelectorAll(".btn-figure");

          btnFigures.forEach((btn) => {
            if (btn.classList.contains("managed")) return;
            const figure = btn.parentNode.querySelector("figure");
            for (let element of [btn, figure]) {
              element.addEventListener(
                "click",
                () => {
                  figure.classList.toggle("hidden");
                },
                false
              );
            }
            btn.classList.add("managed");
          });
        });
      },
      selectDefaultOption(panel, key) {
        if (key.startsWith("_")) return;
        if (!panel.selectors[key][panel.selections[key]]) {
          panel.selections[key] = this.getDefaultOption(panel, key);
        }
      },
      getDefaultOption(panel, key) {
        return Object.keys(panel.selectors[key])[0];
      },
      async fetchDTS(panel, service, id, ref, format) {
        panel.error = "";
        let ret = null;

        panel.loaded = false;
        try {
          ret = await window.dtsutils.fetchDTS(panel, service, id, ref, format);
          panel.loaded = true;
        } catch (err) {
          console.log(err);
          this.setError(
            panel,
            `Text download failed. (${service}, ${id}, ${ref})`
          );
        }

        return ret;
      },
      setError(panel, message) {
        panel.error = message;
      },
      incrementLocus(panel, steps) {
        let locus = panel.selections.locus;
        let lokeys = Object.keys(panel.selectors.locus);
        locus = lokeys[lokeys.indexOf(locus) + steps];
        if (locus) {
          this.setLocus(panel, locus);
        }
      },
      setAddressBarFromSelection() {
        // ?p1.so=&p1.co=&p2.so=...
        // let searchParams = new URLSearchParams(window.location.search)
        let searchParams = "";
        for (let panelIdx = 0; panelIdx < this.panels.length; panelIdx++) {
          let panel = this.panels[panelIdx];
          for (let k of Object.keys(this.controls)) {
            if (k.startsWith("_")) continue;
            if (
              k == "locus" ||
              panel.selections[k] != this.getDefaultOption(panel, k)
            ) {
              searchParams += `&p${panelIdx}.${k.substring(0, 2)}=${
                panel.selections[k]
              }`;
            }
          }
        }
        let newRelativePathQuery =
          window.location.pathname + "?" + searchParams;
        history.pushState(null, "", newRelativePathQuery);
      },
      async setSelectionFromAddressBar() {
        let searchParams = new URLSearchParams(window.location.search);

        for (let panelIdx = 0; panelIdx < 10; panelIdx++) {
          if (this.panels.length <= panelIdx) {
            if (!searchParams.get(`p${panelIdx}.lo`)) break;
            this.clonePanel(0);
          }
          let panel = this.panels[panelIdx];
          for (let k of Object.keys(this.controls)) {
            if (k.startsWith("_")) continue;
            let v = searchParams.get(`p${panelIdx}.${k.substring(0, 2)}`);
            if (!v) v = this.getDefaultOption(panel, k);
            // console.log(panelIdx, k, v);
            panel.selections[k] = v;
          }
          await this.onChangeSelector(panel, "source");
        }
      },
      getContentClasses(panel) {
        let ret = `view-${panel.selections.view} ${
          panel.loaded ? "loaded" : ""
        }`;
        return ret;
      },
    },
  });
  app.component("panel-control", PanelControl);
  // app.component('c1', c1)
  app.mount("#text-viewer");
}

setUpTextViewer();
