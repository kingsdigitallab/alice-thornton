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
                  <span v-if="getClassFromType(option.key)" class="icon"><i :class="`type-icon fas ${getClassFromType(option.key)}`" v-if="getClassFromType(option.key)" aria-hidden="true"></i></span>
                  {{ getLabelFromOptionKey(option.key) }} ({{ option.doc_count }})
                </label>
              </li>
            </ul>
          </div>
        </template>
      </nav>
    </form>
    <div :class="{'search-results': true, 'column': true, 'updating': this.updating, 'updated': !this.updating }">
      <h2 class="undecorated">Results ({{ results.pagination.total }})</h2>
      <nav class="pagination" aria-label="pagination">
        <ul class="pagination-list">
          <li>
            <a href="#"
              v-on:click.prevent="onClickPrevPage"
              class="pagination-link"
              aria-label="Previous page"
            ><span class="icon">
                <i class="fas fa-caret-left" aria-hidden="true"></i>
              </span>
            Previous</a>
          </li>
          <li class="pagination-state">
            Page {{ selection.page }} of {{ lastPageNumber }}
          </li>
          <li>
            <a href="#"
              v-on:click.prevent="onClickNextPage"
              class="pagination-link"
              aria-label="Next page"
            >Next
              <span class="icon">
                <i class="fas fa-caret-right" aria-hidden="true"></i>
              </span>
            </a>
          </li>
        </ul>
        <!-- <div class="buttons has-addons">
          <button :title="view.description" @click="onChangeView(viewKey)" v-for="(view, viewKey) in views" :class="{'button': true, 'is-primary is-selected': selection.view == viewKey}">
            <i :class="`fas ${view.icon}`"></i>
          </button>
        </div> -->
        <div class="buttons has-addons">
          <button :title="selectedView.title" @click="onChangeView()" class="button">
            <span class="icon is-medium"><i :class="`fas ${selectedView.icon}`"></i></span>
            <span>{{selectedView.action}}</span>
          </button>
        </div>
      </nav>
      <ul class="undecorated-list">
        <li v-for="item in items" :class="`entity-${item.type} search-result`">
          <details :open="isResultExpanded(item)">
            <summary class="result-head">
              <span class="icon"><i :class="`type-icon fas ${getClassFromType(item.type)}`" v-if="getClassFromType(item.type)" aria-hidden="true"></i></span>
              <span class="is-hidden">{{ item['id'] }}</span>
              {{ item.title }}
            </summary>
            <div v-if="item.type=='person' && isBioVisible(item)" class="result-description">
              {{ item.bio }}
            </div>
            <ul class="result-books">
              <li v-for="(pages, bookId) in item.pages" class="result-book">
                <template v-if="pages.length">
                  {{ getLabelFromOptionKey(bookId) }}: 
                  p<template v-if="pages.length > 1">p</template>.
                  <template v-for="(page, index) in pages">
                    <template v-if="isLocusVisible(bookId, page)">
                      <a :href="`/books/viewer/?p0.do=${bookId}&p0.lo=p.${page}&p0.vi=modern&hi=${item['id']}`">{{ page }}</a>
                    </template>
                    <template v-else>
                      {{ page }}
                    </template>
                    <template v-if="index < (pages.length - 1)">, </template>
                  </template>
                </template>
              </li>
            </ul>
          </details>
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
