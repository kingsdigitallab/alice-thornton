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
          query: "",
          // type: "", // ??? unused?
          perPage: 10,
          page: 1,
          // filterByAnyOrAllBooks: "any",
          // Holds the list of selected options under each facet.
          // Facets not defined below won't be shown
          // The format is compatible with PageFind filter argument.
          facets: {},
        },
        // true if a search is ongoing
        updating: false,
        // response object from a PageFind.search()
        response: {},
        // the items on the current pagination page
        resultsOnCurrentPage: [],
        // the facets, options and counts returned by each search
        // this may contain more facets than selection.facets
        facets: {},
      };
    },
    async mounted() {
      await this.resetSelection(true);
      this.setSelectionFromAddressBar();
      await this.initSearch();
      await this.search();
    },
    computed: {
      results() {
        return this?.response?.results || [];
      },
      resultsCount() {
        return this.results.length;
      },
      // resultsOnCurrentPage() {
      //   let start = this.selection.perPage * (this.selection.page - 1)
      //   return this.results.slice(start, start + this.selection.perPage)
      // },
      lastPageNumber() {
        return Math.trunc((this.resultsCount - 1) / this.selection.perPage) + 1;
      },
      publicFacets() {
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
      async search(keepPage = false, debounce = false) {
        this.updating = true;

        // note that pagefind won't request same query twice in a row
        this.response = await this._search(this.selection.facets, debounce);
        if (this.response) {
          this.setPageIndex(0, keepPage);

          await this.updateFacetsCounts();
          this.sortFacets();

          window.Vue.nextTick(() => {
            this.updating = false;
          });
          this.setAddressBarFromSelection();
        }
      },
      async _search(filters = {}, debounce = false) {
        // null is needed by PageFind to show all results
        let query = this.selection.query.trim() || null;
        // debounced will return null if another debounced has been sent
        // But... will this work is we do await?
        return await this.pagefind[debounce ? "debouncedSearch" : "search"](
          query,
          {
            sort: { "book-page-version": "asc" },
            filters: filters,
          },
          200
        );
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
      async onClickPrevPage() {
        this.setPageIndex(-1, true);
      },
      async onClickNextPage() {
        this.setPageIndex(1, true);
      },
      async onKeyUp() {
        await this.search(false, true);
      },
      async onSubmitInputs() {
        await this.search();
      },
      setPageIndex(pageIndex = 1, relative = false) {
        // keep the index within bounds
        this.selection.page = relative
          ? this.selection.page + pageIndex
          : pageIndex;
        if (this.selection.page > this.lastPageNumber) {
          this.selection.page = this.lastPageNumber;
        }
        if (this.selection.page < 1) {
          this.selection.page = 1;
        }
        // copy the relevant items from the full search results
        let start = this.selection.perPage * (this.selection.page - 1);
        this.resultsOnCurrentPage = [];
        this.results
          .slice(start, start + this.selection.perPage)
          .forEach((result) => {
            let copy = { ...result };
            this.resultsOnCurrentPage.push(copy);
          });
        // trigger title & snippet loading
        this.loadVisibleItemsAfterRender();
      },
      loadVisibleItemsAfterRender() {
        window.Vue.nextTick(() => {
          this.loadVisibleItems();
        });
      },
      loadVisibleItems() {
        // Load the result items listed screen.
        // TODO: only what's on screen, not everything on the web page.
        // So we need to narrow the selection and trigegr this function on page scroll/resize.
        document
          .querySelectorAll(".result-item.not-loaded")
          .forEach((element) => {
            let indexOnCurrentPage = parseInt(
              element.getAttribute("data-item-index")
            );
            let item = this.resultsOnCurrentPage[indexOnCurrentPage];
            item.data().then((data) => {
              item.extra = data;
            });
          });
      },
      onClickOption(facetKey, optionKey) {
        let selections = this.getFacetSelections(facetKey);
        let idx = selections.indexOf(optionKey);
        if (idx == -1) {
          selections.push(optionKey);
        } else {
          selections.splice(idx, 1);
        }
        // console.log(JSON.stringify(this.selection.facets));
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
      setAddressBarFromSelection() {
        let params = {
          q: this.selection.query,
        };
        for (let [facetKey, facet] of Object.entries(this.selection.facets)) {
          params["f." + facetKey] = (facet?.any || []).join("|");
        }
        for (const k of Object.keys(params)) {
          if (!params[k]) delete params[k];
        }
        let newPath = "?" + new URLSearchParams(params).toString();
        history.replaceState(null, "", newPath);
        this.setPageTitle();
      },
      setSelectionFromAddressBar() {
        let searchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of searchParams.entries()) {
          if (key == "q") {
            this.selection.query = value;
          }
          if (key.startsWith("f.")) {
            let facet = this.selection.facets[key.substring(2)];
            if (facet) {
              this.selection.facets[key.substring(2)].any = value.split("|");
            }
          }
        }
      },
      setPageTitle() {
        let title = "Search";
        let query = this.selection.query;
        if (query) {
          title += ` '${query}'`;
        }
        document.title = title + " | " + window.metadata.siteTitle;
      },
    },
  });
  app.mount("#search");
}

setUpSearch();
