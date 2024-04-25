const { createApp } = window.Vue;

const CHILD_HOVERED_CLASS = "child-hovered";

function setUpTextViewer() {
  let template = `
  <p class="control" v-if="!isHidden">
    <template v-if="!hideLabel">{{label}}:</template>
    <span class="select is-normal">
      <select @change="$parent.onChangeSelector(panel, controlKey)" v-model="panel.selections[controlKey]">
        <option v-for="(title, id) in panel.selectors[controlKey]" :value="id" v-html="title"></option>
      </select>
    </span>
  </p>
  `;
  let templateDOM = window.document.getElementById("vue-panel-selector");
  if (templateDOM) {
    template = templateDOM.innerHTML;
  }

  let PanelControl = {
    template: template,
    props: ["panelIdx", "controlKey", "hideLabel", "tooltip"],
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
        image: {
          title: "",
          description: "",
        },
        controls: {
          source: "Source",
          collection: "Collection",
          document: "Document",
          locus: "Locus",
          extent: "Extent",
          view: "View",
          _chunks: "Chunks",
        },
        selection: {
          // which entity to highlight in the text
          highlightedText: "",
          selectedPanelIndex: 0,
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
              extent: {
                1: 1,
              },
            },
            selections: {
              source: "",
              collection: "",
              document:
                "https://thornton.kdl.kcl.ac.uk/dts/thornton-books/book_one/",
              locus: "",
              extent: 1,
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
      this.setSelectionFromAddressBar("landing");
      window.addEventListener("popstate", () => {
        this.setSelectionFromAddressBar("back");
      });
    },
    computed: {
      canClonePanel() {
        return (
          !this.isPrint &&
          window.metadata.text_viewer.can_clone_panel &&
          this.panels.length < window.metadata.text_viewer.max_panels
        );
      },
      isPrint() {
        return window.TEXT_VIEWER_PRINT_MODE || false;
      },
      hidePrintLink() {
        return window.metadata.text_viewer.hide_print_link;
      },
      selectedPanel() {
        return this.panels[this.selection.selectedPanelIndex];
      },
      drawerTitle() {
        let ret = "";
        let panel = this.selectedPanel;
        if (panel) {
          let pageNumber = panel.selections.locus.replace(/\D+/g, "");
          ret = `${panel.selectors.document[panel.selections.document]}, ${
            panel.selectors.view[panel.selections.view]
          }, page ${pageNumber}`;
          // selectedPanel.selections.document
        }
        return ret;
      },
      selectedPanelCitation() {
        let panel = this.selectedPanel;
        let ret = "";
        if (panel) {
          let pageNumber = panel.selections.locus.replace(/\D+/g, "");
          let format = { year: "numeric", month: "long", day: "numeric" };
          let today = new Date().toLocaleDateString("en-GB", format);
          ret = `Cordelia Beattie, Suzanne Trill, Joanne Edge, Sharon Howard. '${
            panel.selectors.document[panel.selections.document]
          }, ${
            panel.selectors.view[panel.selections.view]
          } edition, p. ${pageNumber}'. Alice Thornton's Books. Accessed ${today}. https://thornton.kdl.kcl.ac.uk/books/viewer2/?${this.getQueryStringFromPanelIdx(
            this.selection.selectedPanelIndex,
            true
          )}`;
        }
        return ret;
      },
    },
    methods: {
      clonePanel(panelIdx) {
        this.panels.push(JSON.parse(JSON.stringify(this.panels[panelIdx])));
        this.addEventsToTexts();
        this.setAddressBarFromSelection();
      },
      closePanel(panelIdx) {
        // Do not use delete, this will confuse Vue
        this.panels = this.panels.filter((p, idx) => idx != panelIdx);
        if (this.selection.selectedPanelIndex == panelIdx) {
          this.selection.selectedPanelIndex = 0;
        }
        this.setAddressBarFromSelection();
      },
      onClickInfo(panelIdx) {
        this.selection.selectedPanelIndex = panelIdx;
      },
      onClickCopyCitation() {
        let citation = this.selectedPanelCitation;
        navigator.clipboard.writeText(citation);
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
        if (key == "extent") {
          await this.setExtent(panel, value);
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
        // TODO: return window.isLocusVisible(bookId, page)
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
        // this.loadDocument(panel)
      },
      async setExtent(panel, extent) {
        panel.selections.extent = extent;
        this.loadDocument(panel);
      },
      getPrintURL(panelIdx = null) {
        if (panelIdx == null) {
          panelIdx = this.selection.selectedPanelIndex;
        }
        return `../print/?${this.getQueryStringFromPanelIdx(panelIdx, true)}`;
      },
      async loadDocument(panel) {
        // panel.responses.document = `Loading ${locus}...`;
        let locus = panel.selections.locus;
        if (panel.selections.document && locus) {
          let document = "";
          let lokeys = Object.keys(panel.selectors.locus);
          for (let i = 0; i < panel.selections.extent; i++) {
            let locusIndexToFetch = lokeys[lokeys.indexOf(locus) + i];
            if (!locusIndexToFetch) break;
            document += await this.fetchDTS(
              panel,
              "documents",
              panel.selections.document,
              panel.selectors.locus[locusIndexToFetch],
              "html"
            );
          }
          panel.responses.document = document;
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
        this.addEventsToTexts();

        this.$nextTick(() => {
          this.correctPopovers();
        });
      },
      correctPopovers() {
        let popovers = document.querySelectorAll(".info-box");
        let margin = 15;
        for (let popover of popovers) {
          popover.style.display = "inline-block";
          let container = popover.closest(".panel-chunk");
          let inRect = popover.getBoundingClientRect();
          let outRect = container.getBoundingClientRect();
          // left border
          let diff = outRect.left - inRect.left;
          if (diff > 0) {
            // console.log(popover, diff)
            popover.style.right = `calc(50% - ${diff + margin}px)`;
            inRect = popover.getBoundingClientRect();
          }
          // right border
          diff = inRect.right - outRect.right;
          if (diff > 0) {
            // console.log(popover, diff)
            popover.style.maxWidth = `calc(20em - ${diff + margin}px)`;
            popover.style.transform = `translateX(calc(50% - ${
              (diff + margin) / 2
            }px))`;
          }
          popover.style.display = "";
        }
      },
      addEventsToTexts() {
        // add the javascript events to all loaded texts
        this.$nextTick(() => {
          // TODO: attach events only to current panel
          // const anchors = window.document.querySelectorAll(".tei-anchor");
          // anchors.forEach((anchors) => {
          //   if (anchors.classList.contains("managed")) return;
          //   anchors.addEventListener(
          //     "click",
          //     () => {
          //       anchors.classList.toggle("expanded");
          //     },
          //     false
          //   );
          //   anchors.classList.add("managed");
          // });
          const highlightedElements = window.document.querySelectorAll(
            `span[data-tei-ref="${this.selection.highlightedText}"]`
          );
          highlightedElements.forEach((element) => {
            element.classList.add("highlighted");
          });

          // We set a hover class on hover.
          // fixes the bug where hover on nested info-box
          // would trigger :hover selector on both boxes
          // and they would overlap.
          const withInfoBox = window.document.querySelectorAll(".has-info-box");

          withInfoBox.forEach((element) => {
            if (element.classList.contains("managed")) return;
            let closestInfoBoxContainer =
              element.parentElement.closest(".has-info-box");

            if (closestInfoBoxContainer) {
              element.addEventListener("mouseenter", () => {
                // set child-hovered class on .has-info-box ancestors
                closestInfoBoxContainer.classList.add(CHILD_HOVERED_CLASS);
              });
              element.addEventListener("mouseleave", () => {
                // unset hover-parent class on .has-info-box ancestors
                closestInfoBoxContainer.classList.remove(CHILD_HOVERED_CLASS);
              });
            }
            element.classList.add("managed");
          });

          // TODO: attach events only to current panel
          const btnFigures = window.document.querySelectorAll(".btn-figure");

          btnFigures.forEach((btn) => {
            if (btn.classList.contains("managed")) return;
            const figure = btn.parentNode.querySelector("figure");
            for (let element of [btn]) {
              element.addEventListener(
                "click",
                () => {
                  // figure.classList.toggle("hidden");
                  this.onClickImageIcon(figure);
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
        if (key == "extent") return; // extent is numeric, not a list
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
          this.fetchOptions(panel, "locus", locus);
          // this.setLocus(panel, locus);
        }
      },
      setAddressBarFromSelection() {
        // ?p1.so=&p1.co=&p2.so=...
        // let searchParams = new URLSearchParams(window.location.search)
        let searchParams = "";
        for (let panelIdx = 0; panelIdx < this.panels.length; panelIdx++) {
          searchParams += this.getQueryStringFromPanelIdx(panelIdx);
        }

        if (this.selection.highlightedText) {
          searchParams += `&hi=${this.selection.highlightedText}`;
          console.log(searchParams);
        }

        let newRelativePathQuery =
          window.location.pathname + "?" + searchParams.replace(/^&/, "");
        // console.log(`SetAddr ${newRelativePathQuery}`)
        if (location.pathname + location.search != newRelativePathQuery) {
          // this.setPageTitle()
          // console.log(`PUSH ${newRelativePathQuery}  !=  ${location.pathname+location.search}`)
          if (!this.navigationCause) {
            history.pushState(null, "", newRelativePathQuery);
          }
          if (this.navigationCause == "landing") {
            console.log(`REPLACE state: ${newRelativePathQuery}`);
            history.replaceState(null, "", newRelativePathQuery);
          }
          // document.title = newRelativePathQuery
          this.setPageTitle();
        }
      },
      getQueryStringFromPanelIdx(panelIdx, ignoreOtherPanels = false) {
        let ret = "";
        let panel = this.panels[panelIdx];
        if (ignoreOtherPanels) {
          panelIdx = 0;
        }
        for (let k of Object.keys(this.controls)) {
          if (k.startsWith("_")) continue;
          if (
            k == "locus" ||
            panel.selections[k] != this.getDefaultOption(panel, k)
          ) {
            ret += `&p${panelIdx}.${k.substring(0, 2)}=${panel.selections[k]}`;
          }
        }
        return ret;
      },
      async setSelectionFromAddressBar(navigationCause = "landing") {
        this.navigationCause = navigationCause;

        let searchParams = new URLSearchParams(window.location.search);
        // console.log('SetSel [')

        this.selection.highlightedText = searchParams.get("hi");

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
            if (k == "extent") {
              v = parseInt(v);
            }
            panel.selections[k] = v;
          }
          await this.onChangeSelector(panel, "source");
        }

        this.navigationCause = null;
      },
      setPageTitle() {
        let title = "";
        for (let panelIdx = 0; panelIdx < this.panels.length; panelIdx++) {
          let panel = this.panels[panelIdx];
          if (title) title += " vs ";
          title += [
            panel.selections.document,
            panel.selections.locus,
            panel.selections.view,
          ]
            .map(this.getAbbreviation)
            .join(" ");
        }
        document.title = title + " | " + window.metadata.siteTitle;
      },
      getAbbreviation(str) {
        let abbreviations = {
          book_of_remembrances: "Book Rem",
          book_one: "Book One",
          book_two: "Book Two",
          book_three: "Book Three",
          semidip: "(SD)",
          modern: "(M)",
        };
        str = abbreviations[str] || str;
        return str;
      },
      getContentClasses(panel) {
        let ret = `view-${panel.selections.view} ${
          panel.loaded ? "loaded" : ""
        }`;
        return ret;
      },
      onClickImageIcon(figure) {
        let figcaption = figure.querySelector("figcaption");
        let img = figure.querySelector("img");
        let description = "";
        for (let child of figure.querySelectorAll("p")) {
          description += child.outerHTML;
        }
        let zoomifyUrl = img.getAttribute("data-src").replace(/\.[^.]+$/, "");
        zoomifyUrl = `/assets/img/books/viewer/zoomify/${zoomifyUrl}/`;
        this.openImageModal(
          zoomifyUrl,
          img.getAttribute("data-width"),
          img.getAttribute("data-height"),
          figcaption.innerHTML,
          description
        );
      },
      onClickCloseImageModal() {
        this.image.title = "";
      },
      openImageModal(zoomifyUrl, width, height, title, description) {
        this.image.title = title;
        this.image.description = description;
        let tileSources = [
          {
            //required
            type: "zoomifytileservice",
            width: Number(width),
            height: Number(height),
            tilesUrl: zoomifyUrl, // "/assets/img/books/viewer/zoomify/GB-0033-CCOM_38-i/",
            //optional
            tileSize: 256,
            fileFormat: "jpg",
          },
        ];
        if (!this.imageViewer) {
          this.imageViewer = window.OpenSeadragon({
            id: "image-viewer",
            prefixUrl:
              "/assets/node_modules/openseadragon/build/openseadragon/images/",
            tileSources: tileSources,
          });
        } else {
          this.imageViewer.open(tileSources);
        }
      },
    },
  });
  app.component("panel-control", PanelControl);
  // app.component('c1', c1)
  app.mount("#text-viewer");
}

setUpTextViewer();
