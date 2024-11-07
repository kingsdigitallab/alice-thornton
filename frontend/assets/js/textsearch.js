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
          perPage: 5,
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
        results: {
          data: {
            items: [],
            aggregations: {},
          },
        },
        items: [],
      };
    },
    async mounted() {
      this.initSearch();
      // this.setSelectionFromAddressBar();
      // this.fetchRecords();
      await this.search();
    },
    computed: {
      // items() {
      //   // only returns the items on the current page of the pagination
      //   return this?.response?.results ? this.response.results.slice(start, start + this.selection.perPage) : [];
      // },
      allItems() {
        return this?.response?.results || [];
      },
      lastPageNumber() {
        return (
          Math.trunc((this.allItems.length - 1) / this.selection.perPage) + 1
        );
      },
    },
    watch: {},
    methods: {
      async search() {
        // todo: don't call again if same as last time
        this.response = await this.pagefind.search(this.selection.query);
        // load data for items on the current pagination page
        let start = this.selection.perPage * (this.selection.page - 1);
        //
        this.items = await Promise.all(
          this.allItems
            .slice(start, start + this.selection.perPage)
            .map((r) => r.data())
        );
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
