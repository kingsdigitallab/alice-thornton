---
title: Text Viewer
isContentHTML: true
---

{% raw %}

<div id="text-viewer" class="text-viewer columns">
  <nav v-for="(panel, panelIdx) in panels" class="panel column">
    <p class="panel-heading">
      <panel-control :panel-idx="panelIdx" control-key="document" hide-label="1"></panel-control>
      <button class="button" @click="incrementLocus(panel, -1)">Prev.</button>
      <panel-control :panel-idx="panelIdx" control-key="locus" hide-label="1"></panel-control>
      <button class="button" @click="incrementLocus(panel, 1)">Next</button>
      <span class="button-bar">
        <a class="button" href="#" @click.stop.prevent="clonePanel(panelIdx)">Clone</a>
        <a v-if="panels.length > 1" class="button" href="#" @click.stop.prevent="closePanel(panelIdx)">Close</a>
      </span>
      <panel-control :panel-idx="panelIdx" control-key="view" hide-label="1"></panel-control>
    </p>
    <div v-if="true" class="panel-block panel-controls">
      <panel-control :panel-idx="panelIdx" control-key="source"></panel-control>
      <panel-control :panel-idx="panelIdx" control-key="collection"></panel-control>
    </div>
    <div class="panel-block panel-chunk">
      <div :class="'content '+getContentClasses(panel)" v-html="panel.responses.document">
      </div>
    </div>
  </nav>
</div>
{% endraw %}

<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/node_modules/kdl-dts-client/index.js?ts={{ "now" | date: "%s" }}"></script>
<script src="/assets/js/text-viewer.js?ts={{ "now" | date: "%s" }}"></script>
