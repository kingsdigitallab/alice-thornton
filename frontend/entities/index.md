---
title: Search
eleventyNavigation:
  key: Search
  order: 3
---

{% raw %}

<div id="search">
  <div class="columns">
    <form @submit.prevent="onSubmitInputs" class="search-inputs column is-3">
      <h2 class="undecorated">Filters</h2>
      <nav class="panel is-info">
        <p class="panel-heading">
          Text search
        </p>
        <div class="panel-block">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input" type="search" v-model="selection.query" autoComplete="off" placeholder="Find people or places" @search="search()" @keyup="search()">
              <span class="icon is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
        <template v-for="(facet, facetKey) in filteredFacets">
          <p class="panel-heading">
            {{ facet.title }}
          </p>
          <div class="panel-block">
            <ul class="undecorated-list">
              <li v-for="option in getBuckets(facet)">
                <label class="checkbox">
                  <input type="checkbox" v-on:change="onClickOption" v-model="option.selected">
                  <template v-if="option.key=='person'"><i class="fas fa-user" aria-hidden="true"></i></template>
                  <template v-if="option.key=='place'"><i class="fas fa-map-pin" aria-hidden="true"></i></template>
                  <template v-if="option.key=='event'"><i class="fas fa-calendar" aria-hidden="true"></i></template>
                  {{ getBookLabelFromId(option.key) }} ({{ option.doc_count }})
                </label>
              </li>
            </ul>
          </div>
        </template>
      </nav>
    </form>
    <div class="search-results column">
      <h2 class="undecorated">Results ({{ results.pagination.total }})</h2>
      <nav class="pagination" aria-label="pagination">
        <ul class="pagination-list">
          <li>
            <a href="#"
              v-on:click.prevent="onClickPrevPage"
              class="pagination-link"
              aria-label="Previous page"
            >Previous</a>
          </li>
          <li>
            Page {{ selection.page }} of {{ lastPageNumber }}
          </li>
          <li>
            <a href="#"
              v-on:click.prevent="onClickNextPage"
              class="pagination-link"
              aria-label="Next page"
            >Next</a>
          </li>
        </ul>
      </nav>
      <ul class="undecorated-list">
        <li v-for="item in items" :class="`entity-${item.type} search-result`">
          <div class="result-head">
            <template v-if="item.type=='person'"><i class="fas fa-user" aria-hidden="true"></i></template>
            <template v-if="item.type=='place'"><i class="fas fa-map-pin" aria-hidden="true"></i></template>
            <template v-if="item.type=='event'"><i class="fas fa-calendar" aria-hidden="true"></i></template>
            <span class="is-hidden">{{ item['id'] }}</span>
            {{ item.title }}
          </div>
          <div v-for="(pages, bookId) in item.pages" class="result-book">
            <template v-if="pages.length">
              {{ getBookLabelFromId(bookId) }}: 
              p<template v-if="pages.length > 1">p</template>.
              <template v-for="(page, index) in pages">
                <template v-if="isLocusVisible(bookId, page)">
                  <a :href="`/books/viewer/?p0.do=${bookId}&p0.lo=p.${page}&hi=${item['id']}`">{{ page }}</a>
                </template>
                <template v-else>
                  {{ page }}
                </template>
                <template v-if="index < (pages.length - 1)">, </template>
              </template>
            </template>
          </div>
        </li>
      </ul>
    </div>

  </div>

  <p class="dev-info">Indexed on {{ this.indexTimeStamp }}</p>
</div>
{% endraw %}

<script src="/assets/node_modules/itemsjs/dist/itemsjs.js"></script>
<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/js/entities.js?ts={{ "now" | date: "%s" }}"></script>
