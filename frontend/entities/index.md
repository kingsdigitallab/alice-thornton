---
title: Entities
---

{% raw %}

<div id="search">
  <div class="columns">
    <form @submit.prevent="onSubmitInputs" class="search-inputs column is-3">
      <nav class="panel is-info">
        <p class="panel-heading">
          Search Terms
        </p>
        <div class="panel-block">
          <div class="control has-icons-left">
            <input class="input" type="text" v-model="selection.query">
            <span class="icon is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <template v-for="(facet, facetKey) in facets">
          <p class="panel-heading">
            {{ facet['name'] }}
          </p>
          <div class="panel-block">
            <ul>
              <li v-for="(option, optionKey) in facet.options">
                <label class="checkbox">
                  <input type="checkbox" v-model="option.selected">
                  {{ option['name'] }}
                </label>
              </li>
            </ul>
          </div>
        </template>

      </nav>
    </form>

    <div class="search-results column">
      <h2>Search results ({{ results.pagination.total }})</h2>
      <ul>
        <li v-for="item in items" :class="`entity-${item.type}`">
          <template v-if="item.type=='person'">👤</template>
          <template v-if="item.type=='place'">🏳</template>
          <template v-if="item.type=='event'">🗓</template>
          <span class="is-hidden">{{ item['id'] }}</span>
          {{ item.title }}
        </li>
      </ul>
    </div>

  </div>
</div>
{% endraw %}

<script src="/assets/node_modules/itemsjs/dist/itemsjs.js"></script>
<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/js/entities.js?ts={{ "now" | date: "%s" }}"></script>
