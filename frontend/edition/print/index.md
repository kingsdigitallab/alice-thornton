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
isPageFluid: false
customCSS: "/assets/css/text-viewer2.css"
customBodyClasses: "body-text-viewer viewer-print"
---

{% raw %}

  <section id="text-viewer">
    <!-- <div id="text-viewer" class="text-viewer columns printable-viewer"> -->
    <div class="panel-wrapper">
      <div class="panel" v-for="(panel, panelIdx) in panels">
        <nav class="panel-nav">
          <div>
            <!-- GN: what is this for? 
              it's invisible but when removed the dropdowns on the right display differently
            -->
            <template id="vue-panel-selector">
              <div class="select-dropdown">
                {{tooltip}}
                <!-- removed id="image_switcher" -->
                <select aria-label="image switcher" @change="$parent.onChangeSelector(panel, controlKey)"
                  v-model="panel.selections[controlKey]">
                  <option v-for="(title, id) in panel.selectors[controlKey]" :value="id" v-html="title"></option>
                </select>
                <i class="fas fa-caret-down"></i>
              </div>
            </template>
            <panel-control :panel-idx="panelIdx" control-key="document"></panel-control>
            <panel-control :panel-idx="panelIdx" control-key="view"></panel-control>
            <panel-control :panel-idx="panelIdx" control-key="locus" hide-label="1"></panel-control>
            <span class="control dont-print">
              <label class="field-label">
                <input type="number" class="input" v-model="panel.selections.extent" @change="onChangeSelector(panel, 'extent')" min="1" max="300">
                Pages
              </label>
            </span>
          </div>
        </nav>
        <div class="panel-chunk">
          <div :class="'content '+getContentClasses(panel)" v-html="panel.responses.document">
          </div>
        </div>
      </div>
    </div>
  </section>
{% endraw %}

<script>
  window.TEXT_VIEWER_PRINT_MODE = true;
</script>
<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/node_modules/kdl-dts-client/index.js?ts={{ "now" | date: "%s" }}"></script>
<script src="/assets/js/text-viewer.js?ts={{ "now" | date: "%s" }}"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.0.0/openseadragon.min.js"></script>
