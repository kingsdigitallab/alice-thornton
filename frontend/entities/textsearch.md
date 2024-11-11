---
title: Search
searchTab: text
eleventyNavigation:
  key: Search
  order: 4
---

<div id="search">
{% include "search_tabs.liquid" %}
{% raw %}
  <p class="tab-intro">
      Start typing to find relevant passages in the edition. For exact matches put the word or phrase in double quotation marks. Results can be filtered by Book and Version.
  </p>
  <div class="columns">
    <form @submit.prevent="onSubmitInputs" class="search-inputs column is-3">
      <h2 class="undecorated">Filters</h2>
      <p><a @click="resetSelection()" class="button is-secondary is-small">Reset filters to show all pages</a></p>
      <nav class="panel is-info" v-if="!selection.hi">
        <p class="panel-heading">
          Keyword search
        </p>
        <div class="panel-block">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input" type="search" v-model="selection.query" autoComplete="off" placeholder='search the edition' @search="search()" @keyup="search()">
              <span class="icon is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
        <template v-for="(facet, facetKey) in visibleFacets">
          <p class="panel-heading">
            {{ getFacetTitleFromKey(facetKey) }}
          </p>
          <div class="panel-block">
            <ul class="undecorated-list">
              <li v-for="(count, optionKey) in facet">
                <label class="checkbox">
                  <input type="checkbox" v-on:change="onClickOption(facetKey, optionKey)" :checked="isOptionSelected(facetKey, optionKey)">
                  {{ optionKey }} 
                  ({{ count }})
                </label>
              </li> 
            </ul>
          </div>
        </template>
      </nav>
    </form>
    <div :class="{'search-results': true, 'column': true, 'updating': this.updating, 'updated': !this.updating }">
      <template v-if="allItems.length">
        <h2 class="undecorated">Results: {{ allItems.length }} {{ pluralise(allItems.length, 'edition page') }}</h2>
        <nav class="pagination" aria-label="pagination">
          <ul class="pagination-list">
            <li>
              <a href="#"
                v-on:click.prevent="onClickPrevPage"
                class="pagination-link button is-primary"
                aria-label="Previous page"
              >
              <!--TO: Unable to remove icon span without breaking page -->
              <span class="icon">
                  <i class="fas fa-caret-left" aria-hidden="true"></i>
                </span>
              ❮ Previous</a>
            </li>
            <li class="pagination-state">
              {{ selection.page }} of {{ lastPageNumber }}
            </li>
            <li>
              <a href="#"
                v-on:click.prevent="onClickNextPage"
                class="pagination-link button is-primary"
                aria-label="Next page"
              >Next ❯
              <!--TO: Unable to remove icon span without breaking page -->
                <span class="icon">
                  <i class="fas fa-caret-right" aria-hidden="true"></i>
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <ul class="undecorated-list">
          <li v-for="item in items">
            <div class="result-head">
              <a :href="item.meta.url">
                {{ item.meta.title }} 
                <span class="tag is-light">({{ item.meta.version }})</span>
              </a>
            </div>
            <div class="result-description" v-html="item.excerpt">
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <h2>No results</h2>
        <p>Your query didn't return any result. 
          You may want to try different keywords or filters. 
          You can also <a @click.prevent="resetSelection()">reset</a> the search.
        </p>
      </template>
    </div>
  </div>
</div>
{% endraw %}

<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/js/textsearch.js" type="module"></script>
