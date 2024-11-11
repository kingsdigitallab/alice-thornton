const { createApp } = window.Vue;
// const entitiesSource = "/assets/js/entities.json";
const pagefind = await import("/pagefind/pagefind.js");
const FACETS_INITIAL = {
  book: {
    any: [],
  },
  version: {
    any: ["Modernised"],
  },
};

function setUpSearch() {
  let app = createApp({
    data() {
      return {
        selection: {
          // view: "collapsed",
          query: "",
          // hi: "", // the entity id passed by the viewer
          // type: "", // ??? unused?
          perPage: 10,
          page: 1,
          // filterByAnyOrAllBooks: "any",
          // Holds the list of selected options under each facet.
          // Facets not defined below won't be shown
          // The format is compatible with PageFind filter argument.
          facets: {},
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
      await this.resetSelection(true);
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

        // note that pagefind won't request same query twice in a row
        this.response = await this._search(this.selection.facets);
        // load data for items on the current pagination page
        let start = this.selection.perPage * (this.selection.page - 1);

        this.items = await Promise.all(
          this.allItems
            .slice(start, start + this.selection.perPage)
            .map((r) => r.data())
        );

        await this.updateFacetsCounts();
        this.sortFacets();

        window.Vue.nextTick(() => {
          // this.setAddressBarFromSelection();
          this.updating = false;
        });
      },
      async _search(filters = {}) {
        // null is needed by PageFind to show all results
        let query = this.selection.query.trim() || null;
        return await await this.pagefind.search(query, {
          sort: { "book-page": "asc" },
          filters: filters,
        });
      },
      sortFacets() {
        // ensure that Book of Remembrances appears first
        let facetBooks = this.facets["book"];
        if (facetBooks) {
          let sortedKeys = Object.keys(facetBooks).sort((a, b) => {
            if (a.toLowerCase().includes("remembrance")) a = "0";
            if (b.toLowerCase().includes("remembrance")) b = "0";
            return a > b ? 1 : a < b ? -1 : 0;
          });
          this.facets["book"] = {};
          sortedKeys.forEach((k) => {
            this.facets["book"][k] = facetBooks[k];
          });
        }
      },
      async updateFacetsCounts() {
        // update count for all facet>option
        this.facets = this.response.filters;

        // Issue:
        // PageFind .filters will have 0 count
        // for all deselected options under a facet with a selected option.
        //
        // Work around:
        // For each facet with a selected option,
        // we run a search with that facet totally deselected.
        // And we update the counts under that facets.

        for (let facetKey of Object.keys(this.selection.facets)) {
          // Not needed if no selection under hte current facet
          if (!(this.selection.facets[facetKey]?.any || []).length) continue;

          // Copy all facet options selected by the user
          let partialFilters = JSON.parse(
            JSON.stringify(this.selection.facets)
          );
          // Remove selection for the current facet
          partialFilters[facetKey] = {};
          // Search with that filter
          let response = await this._search(partialFilters);
          // Copy the counts for the current facet
          this.facets[facetKey] = response.filters[facetKey];
        }
      },
      getFacetTitleFromKey(facetKey) {
        return facetKey.charAt(0).toUpperCase() + facetKey.slice(1);
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
      async resetSelection(dontSearch = false) {
        this.selection.query = "";
        this.selection.facets = JSON.parse(JSON.stringify(FACETS_INITIAL));

        if (!dontSearch) {
          await this.search();
        }
      },
      pluralise(count, singular, plural = null) {
        let ret = singular;
        if (count != 1) {
          ret = plural;
          if (ret === null) {
            ret = singular + "s";
          }
        }
        return ret;
      },
    },
  });
  app.mount("#search");
}

setUpSearch();
