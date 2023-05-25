---
title: Digital Edition
authors:
  - cbeattie
  - strill
  - jedge
  - showard
  - pcaton
  - gferraro
  - tong
  - gnoel
isContentHTML: true
---

{% raw %}

<div id="text-viewer" class="text-viewer columns">

  <div id="image-modal" :class="{'modal': true, 'is-active': !!image.title}">
    <div class="modal-background" @click="onClickCloseImageModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ image.title }}</p>
        <button class="delete" aria-label="close" @click="onClickCloseImageModal"></button>
      </header>
      <section class="modal-card-body">
        <div id="image-viewer" style="width: 100%; height: 50vh">
        </div>
      </section>
      <footer class="modal-card-foot" v-html="image.description">
      </footer>
    </div>
  </div>

  <nav v-for="(panel, panelIdx) in panels" class="panel column buttons">
    <p class="panel-heading">
      <panel-control :panel-idx="panelIdx" control-key="document" hide-label="1"></panel-control>
      <span class="unbreakable-control-group">
        <button class="button" @click="incrementLocus(panel, -1)">
          <span class="icon is-small">
            <!-- Font Awesome angle-left -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
          </span>
          <span>Prev</span>
        </button>
        <panel-control :panel-idx="panelIdx" control-key="locus" hide-label="1"></panel-control>
        <button class="button" @click="incrementLocus(panel, 1)">
          <span>Next</span>
          <span class="icon is-small">
            <!-- Font Awesome angle-right -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
          </span>
        </button>
      </span>
      <span class="button-bar">
        <a v-if="canClonePanel()" class="button" href="#" @click.stop.prevent="clonePanel(panelIdx)">
          <span class="icon is-small">
            <!-- Font Awesome clone -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H224c-53 0-96-43-96-96V160H64c-35.3 0-64 28.7-64 64V448zm224-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"/></svg>
          </span>
          <span>Clone</span>
        </a>
        <a v-if="panels.length > 1" class="button is-danger" href="#" @click.stop.prevent="closePanel(panelIdx)">
          <span class="icon is-small">
            <!-- Font Awesome xmark -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
          </span>
          <span>Close</span>
        </a>
      </span>
      <panel-control :panel-idx="panelIdx" control-key="view" hide-label="1"></panel-control>
    </p>
    <div v-if="true" class="panel-block panel-controls">
      <panel-control :panel-idx="panelIdx" control-key="source"></panel-control>
      <panel-control :panel-idx="panelIdx" control-key="collection"></panel-control>
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

<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/node_modules/kdl-dts-client/index.js?ts={{ "now" | date: "%s" }}"></script>
<script src="/assets/js/text-viewer.js?ts={{ "now" | date: "%s" }}"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.0.0/openseadragon.min.js"></script>
