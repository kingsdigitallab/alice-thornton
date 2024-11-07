const { createApp } = window.Vue;
// const entitiesSource = "/assets/js/entities.json";
const pagefind = await import("/pagefind/pagefind.js");

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
          query: "alice",
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
        response: {},
        // results: {
        //   data: {
        //     items: [],
        //     aggregations: {},
        //   },
        //   pagination: {
        //     page: 1,
        //     per_page: 10,
        //     total: 1,
        //   },
        // },
      };
    },
    async mounted() {
      this.initSearch();
      // this.setSelectionFromAddressBar();
      // this.fetchRecords();
      await this.search();
    },
    computed: {
      items() {
        return this?.response?.results || [];
      },
    },
    watch: {},
    methods: {
      async search() {
        this.response = await this.pagefind.search(this.selection.query);
      },
      initSearch() {
        this.pagefind = pagefind;
        this.pagefind.init();
      },
    },
  });
  app.mount("#textsearch");
}

setUpSearch();
