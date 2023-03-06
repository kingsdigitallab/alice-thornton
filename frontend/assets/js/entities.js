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
        },
        facets: {
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
      items() {
        return this.results.data.items;
      },
    },
    watch: {
      facets: {
        // eslint-disable-next-line
        handler(newValue, oldValue) {
          this.search();
        },
        deep: true,
      },
    },
    methods: {
      onSubmitInputs() {
        this.search();
      },
      search() {
        let filters = {};
        for (let facetKey of Object.keys(this.facets)) {
          let facet = this.facets[facetKey];
          for (let optionKey of Object.keys(facet.options)) {
            let option = facet.options[optionKey];
            if (option.selected) {
              if (!filters[facetKey]) {
                filters[facetKey] = [];
              }
              filters[facetKey].push(optionKey);
            }
          }
        }
        console.log(filters);

        this.results = this.itemsjs.search({
          per_page: this.perPage,
          sort: "name_asc",
          query: this.selection.query,
          filters: filters,
        });
      },
      fetchRecords() {
        const configuration = {
          aggregations: {
            type: {
              title: "Type",
              size: 10,
              conjunction: false,
            },
          },
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
