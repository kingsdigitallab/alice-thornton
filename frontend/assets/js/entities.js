const { createApp } = window.Vue;
const entitiesSource = "/assets/js/entities.json";

function setUpSearch() {
  let app = createApp({
    data() {
      return {
        meta: {
          dateCreated: "2023-10-23T21:42:39.127Z",
        },
        views: {
          collapsed: {
            title: "Expand results",
            action: "Expand/Collapse",
            icon: "fa-caret-right",
          },
          expanded: {
            title: "Collapse results",
            action: "Expand/Collapse",
            icon: "fa-caret-down",
          },
        },
        selection: {
          view: "collapsed",
          query: "",
          hi: "", // the entity id passed by the viewer
          type: "", // ??? unused?
          perPage: 10,
          page: 1,
          filterByAnyOrAllBooks: "any",
        },
        _facets: {
          type: {
            name: "Type",
            options: {
              person: { name: "People", selected: false },
              place: { name: "Places", selected: false },
              event: { name: "Events", selected: false },
            },
          },
        },
        updating: false,
        results: {
          data: {
            items: [],
            aggregations: {},
          },
          pagination: {
            page: 1,
            per_page: 10,
            total: 1,
          },
        },
      };
    },
    mounted() {
      this.setSelectionFromAddressBar();
      this.fetchRecords();
    },
    computed: {
      selectedView() {
        return this.views[this.selection.view];
      },
      indexTimeStamp() {
        return new Date(this.meta.dateCreated).toUTCString();
      },
      searchConfiguration() {
        let ret = {
          sortings: {
            name_asc: {
              field: "sortkey",
              order: "asc",
            },
          },
          aggregations: {
            books: {
              title: "By book",
              size: 5,
              sort: "key",
              conjunction: this.selection.filterByAnyOrAllBooks == "all",
            },
            type: {
              title: "By result type",
              size: 10,
              sort: "key",
              conjunction: false,
            },
            cat: {
              title: "By event type",
              size: 100,
              conjunction: false,
              forType: "event",
            },
            region: {
              title: "By region",
              size: 100,
              conjunction: false,
              forType: "place",
            },
          },
          // we can't make the 'id' field searchable,
          // otherwise user typing 'p', would bring up all the ppl:XXX.
          // The offline indexer has prefixed the id with _
          // and stuck it at the end of 'search'.
          // We also replace : with _. : is used by itemjs for field:value query syntax.
          searchableFields: ["search"],
          removeStopWordFilter: true,
        };
        if (window.metadata.hideEventsFromSearchPage) {
          delete ret["aggregations"]["cat"];
        }
        return ret;
      },
      facets() {
        return this.results.data.aggregations;
      },
      selectedTypes() {
        // return an array of selected result types. E.g. ['person']
        return (this.facets?.type?.buckets || [])
          .filter((b) => b.selected)
          .map((b) => b.key);
      },
      filteredFacets() {
        // only returns facets relevant to the selected result type (itself a facet)
        // see .forType in this.searchConfiguration
        let selectedTypes = this.selectedTypes;
        return Object.fromEntries(
          Object.entries(this.facets).filter(([facetKey, facet]) => {
            let forType =
              this.searchConfiguration.aggregations[facetKey || facet.name]
                .forType;
            return forType
              ? selectedTypes.length == 0 || selectedTypes.includes(forType)
              : true;
          })
        );
      },
      items() {
        return this.results.data.items;
      },
      lastPageNumber() {
        return (
          Math.trunc(
            (this.results.pagination.total - 1) /
              this.results.pagination.per_page
          ) + 1
        );
      },
    },
    watch: {
      // "results.data.aggregations": {
      //   // eslint-disable-next-line
      //   handler(newValue, oldValue) {
      //     if (newValue != oldValue) {
      //       this.search();
      //     }
      //   },
      //   deep: true,
      // },
      "selection.filterByAnyOrAllBooks": {
        // eslint-disable-next-line
        handler(newValue, oldValue) {
          this.configureSearch();
        },
      },
    },
    methods: {
      isBioVisible(item) {
        // hidden if the bio is surrounded by square brackets.
        return !item.bio.match(/^\s*\[.*\]\s*$/);
      },
      onChangeView(viewKey) {
        if (viewKey) {
          this.selection.view = viewKey;
        } else {
          // just rotate through the views
          let keys = Object.keys(this.views);
          let index = keys.indexOf(this.selection.view) + 1;
          if (index >= keys.length) index = 0;
          viewKey = keys[index];
        }
        this.selection.view = viewKey;
      },
      isResultExpanded(item) {
        return this.selection.view == "expanded" ? item.id : false;
      },
      getClassFromType(type) {
        const typesClass = {
          person: "fa-user",
          place: "fa-map-marker-alt",
          event: "fa-calendar",
        };
        return typesClass[type];
      },
      isLocusVisible(bookId, page) {
        return window.isLocusVisible(bookId, page);
      },
      getLabelFromOptionKey(optionKey) {
        let labelFromKey = {
          book_of_remembrances: "Book Rem",
          book_one: "Book 1",
          book_two: "Book 2",
          book_three: "Book 3",

          person: "Person",
          place: "Place, region",
          event: "Event",
        };
        return labelFromKey[optionKey] || optionKey;
      },
      onClickNextPage() {
        this.selection.page++;
        if (this.selection.page > this.lastPageNumber) {
          this.selection.page = this.lastPageNumber;
        }
        this.search(true);
      },
      onClickPrevPage() {
        this.selection.page--;
        if (this.selection.page < 1) {
          this.selection.page = 1;
        }
        this.search(true);
      },
      getBuckets(facet) {
        return facet.buckets.sort((a, b) => {
          if (a.doc_count < b.doc_count) return 1;
          if (a.doc_count > b.doc_count) return -1;
          return 0;
        });
      },
      onClickOption() {
        window.Vue.nextTick(() => {
          this.search();
        });
      },
      onSubmitInputs() {
        this.search();
      },
      clearSelection() {
        this.selection.hi = "";
        this.selection.query = "";
        this.selection.type = "";

        for (let facetKey of Object.keys(this.filteredFacets)) {
          let facet = this.filteredFacets[facetKey];
          for (let option of facet.buckets) {
            option.selected = false;
          }
        }

        this.search();
      },
      search(keepPage = false) {
        this.updating = true;

        if (!keepPage) {
          this.selection.page = 1;
        }

        let filters = {};
        for (let facetKey of Object.keys(this.filteredFacets)) {
          let facet = this.filteredFacets[facetKey];
          for (let option of facet.buckets) {
            if (option.selected) {
              if (!filters[facetKey]) {
                filters[facetKey] = [];
              }
              filters[facetKey].push(option.key);
            }
          }
        }

        let searchParameters = {
          per_page: this.selection.perPage,
          page: this.selection.page,
          sort: "name_asc",
          filters: filters,
        };

        let entityId = this.selection.hi;
        if (entityId) {
          searchParameters.filter = (e) => {
            return e.id == entityId;
          };
        } else {
          searchParameters.query = this.selection.query;
        }

        this.results = this.itemsjs.search(searchParameters);

        window.Vue.nextTick(() => {
          this.updating = false;
        });

        //console.log(this.itemsjs.aggregations())
      },
      fetchRecords() {
        this.records = [];
        fetch(entitiesSource)
          .then((res) => res.json())
          .then((data) => {
            this.meta = data.meta;
            this.records = data.data;
            this.processRecords();
            this.configureSearch();
          });
      },
      configureSearch() {
        this.itemsjs = window.itemsjs(this.records, this.searchConfiguration);
        this.search();
      },
      processRecords() {
        // for (let record of this.records) {
        //   // record.titleSearch = record.title.replace(/\b(c|mr|mrs|sir|born|lady)\b/ig, '').replace(/\W+/g, ' ')
        //   if (record.search != record.title) {
        //     // console.log(`${record.title} => ${record.search}`);
        //   }
        // }
        if (window.metadata.hideEventsFromSearchPage) {
          this.records = this.records.filter((r) => r.type != "event");
        }
      },
      setAddressBarFromSelection() {
        // ?p1.so=&p1.co=&p2.so=...
        // let searchParams = new URLSearchParams(window.location.search)
        let searchParams = "";
        let newRelativePathQuery =
          window.location.pathname + "?" + searchParams;
        history.pushState(null, "", newRelativePathQuery);
      },
      async setSelectionFromAddressBar() {
        let searchParams = new URLSearchParams(window.location.search);
        // let q = searchParams.get("q");
        // if (q) {
        //   q = q.replace(/^(ppl|place):/, "");
        //   this.selection.query = q;
        // }
        //
        let hi = searchParams.get("hi");
        if (hi) {
          // hi = hi.replace(/^(ppl|place):/, "");
          this.selection.hi = hi;
          this.selection.view = "expanded";
        }
        // console.log(searchParams);
      },
      getContentClasses(panel) {
        return `view-${panel.selections.view}`;
      },
      getPageParts(page) {
        // '123-130' => [123, 130]
        // '123' => [123]
        let ret = [...new Set(`${page}`.split("-"))];
        return ret;
      },
      isSinglePage(pages) {
        let ret = pages.length == 1 && this.getPageParts(pages[0]).length == 1;
        return ret;
      },
    },
  });
  app.mount("#search");
}

setUpSearch();
