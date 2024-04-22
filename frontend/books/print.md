---
title: "Digital Edition - Print View"
authors:
  - cbeattie
  - strill
  - jedge
  - showard
  - pcaton
  - gferraro
  - pshah
  - tong
  - gnoel
isContentHTML: true
isPageFluid: true
---

{% raw %}

<div id="text-viewer" class="text-viewer columns printable-viewer">

  <nav v-for="(panel, panelIdx) in panels" class="panel column">
    <div class="panel-heading field is-grouped is-grouped-multiline">
      <panel-control :panel-idx="panelIdx" control-key="document" hide-label="1"></panel-control>
      <panel-control :panel-idx="panelIdx" control-key="view" hide-label="1"></panel-control>
      <panel-control :panel-idx="panelIdx" control-key="locus" hide-label="1"></panel-control>
      <p class="control dont-print">
        <label class="field-label">
          <input type="number" class="input" v-model="panel.selections.extent" @change="onChangeSelector(panel, 'extent')" min="1" max="300">
          Pages
        </label>
      </p>
    </div>
    <div class="panel-block panel-chunk">
      <div v-if="panel.error" class="message is-danger">
        <div class="message-header">Error</div>
        <div class="message-body" v-html="panel.error"></div>
      </div>
      <div :class="'content '+getContentClasses(panel)" v-html="panel.responses.document">
      </div>
    </div>
  </nav>
</div>
{% endraw %}

<script>
window.TEXT_VIEWER_PRINT_MODE = true;
</script>
<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/node_modules/kdl-dts-client/index.js?ts={{ "now" | date: "%s" }}"></script>
<script src="/assets/js/text-viewer.js?ts={{ "now" | date: "%s" }}"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.0.0/openseadragon.min.js"></script>
