---
title: Digital Edition
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

<div id="text-viewer" class="text-viewer columns">

  <div id="image-modal" :class="{'modal': true, 'is-active': !!image.title}">
    <div class="modal-background" @click="onClickCloseImageModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" v-html="image.title"></p>
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

  <nav v-for="(panel, panelIdx) in panels" class="panel column">
    <div class="panel-heading field is-grouped is-grouped-multiline">
      <div class="field is-grouped pull-right btn-icons">
        <p class="control" v-if="!hidePrintLink">
          <a class="button is-hidden-mobile" :href="getPrintURL(panelIdx)" title="Print">
            <svg class="icon is-small"><use href="/assets/img/icons.svg#print" /></svg>
            <span class="btn-label">Print</span>
          </a>
        </p>
        <p class="control">
          <a v-if="canClonePanel" class="button is-hidden-mobile" href="#" @click.stop.prevent="clonePanel(panelIdx)" title="Clone">
            <svg class="icon is-small"><use href="/assets/img/icons.svg#clone" /></svg>
            <span class="btn-label">Clone</span>
          </a>
        </p>
        <p class="control">
          <a v-if="panels.length > 1" class="button" href="#" @click.stop.prevent="closePanel(panelIdx)" title="Close">
            <svg class="icon is-small"><use href="/assets/img/icons.svg#close" /></svg>
            <span class="btn-label">Close</span>
          </a>
        </p>
      </div>      
      <!-- <div class="field is-grouped is-grouped-multiline"> -->
        <panel-control :panel-idx="panelIdx" control-key="document" hide-label="1"></panel-control>
        <panel-control :panel-idx="panelIdx" control-key="view" hide-label="1"></panel-control>
        <span class="field has-addons">
          <p class="control">
            <button class="button btn-icons" @click="incrementLocus(panel, -1)" title="Previous page">
              <svg class="icon is-small"><use href="/assets/img/icons.svg#angle-left" /></svg>
              <!-- <span>Prev</span> -->
            </button>
          </p>
          <panel-control :panel-idx="panelIdx" control-key="locus" hide-label="1"></panel-control>
          <p class="control">
            <button class="button btn-icons" @click="incrementLocus(panel, 1)" title="Next page">
              <!-- <span>Next</span> -->
              <svg class="icon is-small"><use href="/assets/img/icons.svg#angle-right" /></svg>
            </button>
          </p>
        </span>
      <!-- </div> -->
    </div>
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
