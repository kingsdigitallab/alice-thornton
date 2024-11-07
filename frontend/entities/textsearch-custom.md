---
title: Search
searchTab: text
---

{% raw %}

<div id="textsearch">
{% endraw %}
    {% include "search_tabs.liquid" %}
{% raw %}
    <p class="tab-intro">
        Start typing to find relevant passages within the modernised edition. 
        For exact matches put the word/phrase in double quotation marks. 
        Results can be filtered by Book.
    </p>
    <div id="search-input"></div>
    <div class="columns">
      <div class="column is-one-quarter" id="search-filters">
        <div id="filter-book"></div>
        <div id="filter-version"></div>
      </div>
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
              <a :href="item.meta.url">{{ item.meta.title }}</a>
            </div>
            <div v-html="item.excerpt">
            </div>
          </li>
        </div>
      </div>
    </div>
</div>
{% endraw %}

<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/js/textsearch.js" type="module"></script>
