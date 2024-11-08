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
          // Holds the list of selected options under each facet.
          // Facets not defined below won't be shown
          // The format is compatible with PageFind filter argument.
          facets: {
            book: {
              any: [],
            },
            version: {
              any: ["Modernised"],
            },
          },
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
        // the items on the current pagination page
        items: [],
        // the facets, options and counts returned by each search
        // this may contain more facets than selection.facets
        facets: {},
      };
    },
    async mounted() {
      await this.initSearch();
      // this.setSelectionFromAddressBar();
      // this.fetchRecords();
      await this.search();
    },
    computed: {
      allItems() {
        return this?.response?.results || [];
      },
      lastPageNumber() {
        return (
          Math.trunc((this.allItems.length - 1) / this.selection.perPage) + 1
        );
      },
      visibleFacets() {
        // returns the visible facets from last search
        return Object.fromEntries(
          Object.entries(this.facets).filter(
            // eslint-disable-next-line no-unused-vars
            ([key, _]) => key in this.selection.facets
          )
        );
      },
    },
    watch: {},
    methods: {
      async initSearch() {
        this.pagefind = pagefind;
        this.pagefind.init();
        // this.facets = await pagefind.filters();
        // this call is needed for PageFind.search() to return all the filters in each result
        await pagefind.filters();
      },
      async search(keepPage = false) {
        this.updating = true;

        if (!keepPage) {
          this.selection.page = 1;
        }

        // null is needed by PageFind to show all results
        let query = this.selection.query.trim() || null;
        // note that pagefind won't request same query twice in a row
        this.response = await this.pagefind.search(query, {
          sort: { "book-page": "asc" },
          filters: this.selection.facets,
        });
        // load data for items on the current pagination page
        let start = this.selection.perPage * (this.selection.page - 1);
        //
        this.items = await Promise.all(
          this.allItems
            .slice(start, start + this.selection.perPage)
            .map((r) => r.data())
        );

        // this.facets = await pagefind.filters();
        this.facets = this.response.filters;

        window.Vue.nextTick(() => {
          // this.setAddressBarFromSelection();
          this.updating = false;
        });
      },
      async onClickNextPage() {
        this.selection.page++;
        if (this.selection.page > this.lastPageNumber) {
          this.selection.page = this.lastPageNumber;
        }
        await this.search(true);
      },
      async onClickPrevPage() {
        this.selection.page--;
        if (this.selection.page < 1) {
          this.selection.page = 1;
        }
        await this.search(true);
      },
      async onSubmitInputs() {
        await this.search();
      },
      onClickOption(facetKey, optionKey) {
        let selections = this.getFacetSelections(facetKey);
        let idx = selections.indexOf(optionKey);
        if (idx == -1) {
          selections.push(optionKey);
        } else {
          selections.splice(idx, 1);
        }
        console.log(JSON.stringify(this.selection.facets));
        this.search();
      },
      isOptionSelected(facetKey, optionKey) {
        return this.getFacetSelections(facetKey).includes(optionKey);
      },
      getFacetSelections(facetKey) {
        return this.selection.facets[facetKey]?.any || [];
      },
      async clearSelection(dontSearch = false) {
        this.selection.hi = "";
        this.selection.query = "";
        this.selection.type = "";

        // for (let facetKey of Object.keys(this.filteredFacets)) {
        //   let facet = this.filteredFacets[facetKey];
        //   for (let option of facet.buckets) {
        //     option.selected = false;
        //   }
        // }

        if (!dontSearch) {
          await this.search();
        }
      },
    },
  });
  app.mount("#search");
}

setUpSearch();
