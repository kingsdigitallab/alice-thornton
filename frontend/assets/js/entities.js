const { createApp } = window.Vue;
const entitiesSource = "/assets/js/entities.json";

function setUpTextViewer() {
  let app = createApp({
    data() {
      return {
        selection: {
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
      facets() {
        return this.results.data.aggregations;
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
      onClickNextPage() {
        this.selection.page++;
        if (this.selection.page > this.lastPageNumber) {
          this.selection.page = this.lastPageNumber;
        }
        this.search();
      },
      onClickPrevPage() {
        this.selection.page--;
        if (this.selection.page < 1) {
          this.selection.page = 1;
        }
        this.search();
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
          this.selection.page = 1;
          this.search();
        });
      },
      onSubmitInputs() {
        this.selection.page = 1;
        this.search();
      },
      search() {
        let filters = {};
        for (let facetKey of Object.keys(this.facets)) {
          let facet = this.facets[facetKey];
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
          per_page: this.perPage,
          page: this.selection.page,
          sort: "name_asc",
          query: this.selection.query,
          filters: filters,
        });

        //console.log(this.itemsjs.aggregations())
      },
      fetchRecords() {
        const configuration = {
          sortings: {
            name_asc: {
              field: "sortkey",
              order: "asc",
            },
          },
          aggregations: {
            type: {
              title: "Type",
              size: 10,
              conjunction: false,
            },
            region: {
              title: "Region",
              size: 100,
              conjunction: false,
            },
          },
          searchableFields: ["title", "id"],
        };
        this.records = [];
        fetch(entitiesSource)
          .then((res) => res.json())
          .then((data) => {
            this.records = data;
            this.itemsjs = window.itemsjs(this.records, configuration);
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
