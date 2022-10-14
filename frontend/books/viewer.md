---
title: Text Viewer
isContentHTML: true
---

{% raw %}

<div id="text-viewer" class="text-viewer columns">
  <nav v-for="(panel, panelIdx) in panels" class="panel column">
    <p class="panel-heading">
      {{ panel.selectors.document[panel.selections.document] }}
      <span class="button-bar">
        <a class="button" href="#" @click.stop.prevent="clonePanel(panelIdx)">Clone</a>
        <a v-if="panels.length > 1" class="button" href="#" @click.stop.prevent="closePanel(panelIdx)">Close</a>
      </span>
    </p>
    <div class="panel-block panel-controls">
      <template v-for="(label, key) in controls">
        <div class="panel-selector" v-if="key[0] != '_'">
          {{label}}:
          <div class="select is-normal">
            <select @change="onChangeSelector(panel, key)" v-model="panel.selections[key]">
              <option v-for="(title, id) in panel.selectors[key]" :value="id" v-html="title"></option>
            </select>
          </div>
          <br v-if="key == 'collection'">
        </div>
      </template>
    </div>
    <div class="panel-block panel-chunk">
      <div class="content" v-html="panel.responses.document">
      </div>
    </div>
  </nav>
</div>
{% endraw %}

<script src="https://unpkg.com/vue@3"></script>
<script src="/assets/js/text-viewer.js?ts={{ "now" | date: "%s" }}"></script>
