---
title: Search
searchTab: text
---

{% include "search_tabs.liquid" %}

{% raw %}

<div id="search">
  <p class="tab-intro">
      Start typing to find relevant passages within the modernised edition. For exact matches put the word/phrase in double quotation marks. Results can be filtered by Book.
  </p>
  <div class="columns">
    <form @submit.prevent="onSubmitInputs" class="search-inputs column is-3">
      <h2 class="undecorated">Filters</h2>
      <p><a @click="clearSelection()" class="button is-secondary is-small">Clear filters to show all entries</a></p>
      <nav class="panel is-info" v-if="!selection.hi">
        <p class="panel-heading">
          Keyword search
        </p>
        <div class="panel-block">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input" type="search" v-model="selection.query" autoComplete="off" placeholder="Person, place or event" @search="search()" @keyup="search()">
              <span class="icon is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </form>
    <div class="column search-results">
      <h2 class="undecorated">Pages ({{ allItems.length }})</h2>
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
    </div>
  </div>
</div>
{% endraw %}

<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/js/textsearch.js" type="module"></script>
