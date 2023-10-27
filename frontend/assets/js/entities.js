const { createApp } = window.Vue;
const entitiesSource = "/assets/js/entities.json";

function setUpTextViewer() {
  let app = createApp({
    data() {
      return {
        meta: {
          dateCreated: "2023-10-23T21:42:39.127Z",
        },
        views: {
          expanded: {
            title: "Expanded",
            description: "Expand results",
            icon: "fa-expand-arrows-alt",
          },
          collapsed: {
            title: "Collapsed",
            description: "Collapse results",
            icon: "fa-compress-alt",
          },
        },
        selection: {
          view: "expanded",
          query: "",
          type: "",
          perPage: 10,
          page: 1,
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
      indexTimeStamp() {
        return new Date(this.meta.dateCreated).toUTCString();
      },
      searchConfiguration() {
        return {
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
              conjunction: false,
            },
            type: {
              title: "By result type",
              size: 10,
              conjunction: false,
            },
            region: {
              title: "By region",
              size: 100,
              conjunction: false,
              forType: "place",
            },
          },
          searchableFields: ["title", "id"],
        };
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
        let selectedType = this.selectedTypes;
        selectedType = selectedType.length == 1 ? selectedType[0] : null;
        return Object.fromEntries(
          Object.entries(this.facets).filter(([facetKey, facet]) => {
            let forType =
              this.searchConfiguration.aggregations[facetKey || facet.name]
                .forType;
            return forType ? forType === selectedType : true;
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
    },
    methods: {
      onChangeView(viewKey) {
        this.selection.view = viewKey;
      },
      isResultExpanded(item) {
        return this.selection.view == "expanded" ? item.id : false;
      },
      getClassFromType(type) {
        const typesClass = {
          person: "fa-user",
          place: "fa-map-pin",
          event: "fa-calendar",
        };
        return typesClass[type];
      },
      isLocusVisible(bookId, page) {
        return window.isLocusVisible(bookId, page);
      },
      getBookLabelFromId(bookId) {
        let labelFromId = {
          book_of_remembrances: "Book Rem",
          book_one: "Book 1",
          book_two: "Book 2",
          book_three: "Book 3",
        };
        return labelFromId[bookId] || bookId;
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

        this.results = this.itemsjs.search({
          per_page: this.selection.perPage,
          page: this.selection.page,
          sort: "name_asc",
          query: this.selection.query,
          filters: filters,
        });

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
            this.itemsjs = window.itemsjs(
              this.records,
              this.searchConfiguration
            );
            this.search();
          });
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
        let q = searchParams.get("q");
        if (q) {
          q = q.replace(/^(ppl|place):/, "");
          this.selection.query = q;
        }
        console.log(searchParams);
      },
      getContentClasses(panel) {
        return `view-${panel.selections.view}`;
      },
    },
  });
  app.mount("#search");
}

setUpTextViewer();
