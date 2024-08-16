---
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
hideFooter: true
hideCitation: true
isCustomContent: true
customCSS: "/assets/css/text-viewer2.css"
customBodyClasses: "body-text-viewer"
eleventyNavigation:
  key: Edition
  url: /edition/?p0.vi=modern
  order: 3
---

{% if metadata.hideEventsFromViewer %}

  <style>
    .dts-fragment .is-event, .dts-fragment .event {
      display: none;
    }
  </style>

{% endif %}

{% raw %}

<template id="vue-panel-selector">
  <div class="select-dropdown">
    {{ tooltip }}
    <!-- removed id="image_switcher" -->
    <select aria-label="image switcher" @change="$parent.onChangeSelector(panel, controlKey)"
      v-model="panel.selections[controlKey]">
      <option v-for="(title, id) in panel.selectors[controlKey]" :value="id" v-html="title"></option>
    </select>
    <i class="fas fa-caret-down"></i>
  </div>
</template>

<section id="text-viewer">

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

  <input id="drawer-switch" type="checkbox" />

  <aside id="drawer" role="complementary">
    <!-- <h1><span>Information for:</span>{{ drawerTitle }}</h1> -->
    <h1>
      <dl>
        <dt>Volume:</dt>
        <dd>{{ selectedPanelCitationDict.titleShort }}&nbsp;
          <a :title="`About ${ selectedPanelCitationDict.titleShort }`" :href="`/books/${selectedPanelCitationDict.previewPath}/`"><i class="fas fa-list-alt"></i></a>
        </dd>
        <br>
        <dt>Version:</dt>
        <dd>{{ selectedPanelCitationDict.version }}</dd>
        <br>
        <dt>Page:</dt>
        <dd><!-- page -->{{ selectedPanelCitationDict.pageNumber }}</dd>
      </dl>
    </h1>
    <div class="tabs">
      <label>BOOK</label>
      <div class="tab">
        <input
          type="radio"
          id="tab-1"
          name="tab-group-1"
          checked>
        <label for="tab-1">
          <i class="fas fa-key"></i><h2>Key</h2></label>
        <div class="content"> 
        <h2>Key</h2>
    <h3>Transcription</h3>
  <ul>
    <li class="monogram">Alice Thornton’s monogram<br><span>cursive font (replicating handwriting)</span></li>
    <li class="additions">Authorial additions<br><span>text in italics</span></li>
    <li class="above">Authorial insertions/contractions <br><span>superscript - text placed higher</span></li>
    <li class="dashed">Authorial repetition <br><span>dashed box around the material</span></li>
    <li class="bracket">Items bracketed together <br><span>Curly bracket on the right of text</span></li>
    <li class="strikethrough">Text deleted by author <br><span>strikethrough – words or characters are crossed through with a line</span></li>
    <li class="doublestrikethrough">[Content to be added] <br><span>strikethrough – words or characters are crossed through with a line</span></li>
    <li class="heart">Use of heart symbol instead of the word 'heart'<br>
      <span>Heart icon - a glyph or non-standard character</span>
    </li>
    </ul>
 <h3>Text block</h3>
  <ul>
    <li class="blank">Blank page or lines<br>
      <span>grey brackets (details supplied within)</span>
    </li>
    <li class="largebold">Page title heading<br>
      <span>largest size, centred, bold font. light grey thick underline</span></li>
      <li class="mediumbold">Other headings and some dates<br>
      <span>medium size, centred, bold font. light grey medium underline</span>
      </li>
      <li class="running">(Running) headers like dates<br>
        <span>medium size, centred font</span>
      </li>
      <li class="rule">Ruled lines in the author's original book<br>
        <span>standard single grey ruled line, across full width of the page</span>
      </li>
    <li class="pnumber">
      Page number in the author's original book<br><span>Number in italics, top left of display</span>
    </li>
    <li class="cut">Physical damage on page<br><span>grey brackets (details supplied within)</span>
    </li>   
    </ul>
    <h3>Contextual Materials</h3>
    <ul>
    <li class="enotes">Editorial Notes<br><span>number in note icon intext</span></li>
    <li class="glossary">Gloss<br><span>double underline </span></li>
    <li class="person">Entity (Person) <br><span>dashed underline (circle icon) </span></li>
    <li class="place">Entity (Place) <br><span>dashed underline (square icon) </span></li>
    <li class="event">Entity (Event) <br><span>dashed underline (start and end time icon) </span></li>
    <li class="biblical">Biblical reference <br><span>gray black underline (cross icon) </span></li>
    </ul> 
    <h3>Images</h3>
  <ul>
      <li class="image">scanned image of page in the author's original book<br><span>image icon</span>
    </li>
    </ul>
        </div>
      </div>
      <div class="tab" v-if="!hidePrintLink">
        <input type="radio" id="tab-3" name="tab-group-1">
        <label for="tab-3">
          <i class="fas fa-print"></i>
          <h2>Print</h2>
        </label>
        <div class="content">
          <h2>Print</h2>
          <p>
            Use the following link for a print-friendly preview of one of more pages from this book.
          </p>
          <a :href="getPrintURL()" class="button is-secondary"><i class="far fa-file-alt"></i>&nbsp; Preview</a>
        </div>
      </div>
      <div class="tab">
        <input type="radio" id="tab-4" name="tab-group-1">
        <label for="tab-4">
          <i class="fas fa-search"></i>
          <h2>Search</h2>
        </label>
        <div class="content">
          <h2>Search</h2>
          <p>Find people and places mentioned across the four Books.</p>
          <a href="/entities/" class="button is-secondary">
            <i class="fas fa-filter"></i> &nbsp; Search and Filter</a>
        </div>
      </div>
      <div class="tab">
        <input type="radio" id="tab-0" name="tab-group-1">
        <label for="tab-0">
          <i class="fas fa-pen-fancy"></i>
          <h2>Editorial Principles</h2>
        </label>
        <div class="content">
          <h2>Editorial Principles</h2>
          <h3>Semi-diplomatic</h3>
          <p>The semi-diplomatic version of the text retains some original textual features, including original lineation, paragraphing, punctuation, spelling and capitalisation. It also includes evidence of authorial corrections, such as insertions and deletions. However, to make this version more accessible we have silently modernised Thornton’s use of u/v, i/j and long S, and expanded her contractions of words such as ‘the’, ‘which’, and ‘that’ (from ye, wch and yt). </p>
          <h3>Modernised</h3>
          <p>This version modernises according to the conventions of UK English, supplemented by Chicago Manual of Style (CMS) referencing recommendations. To retain a sense of Thornton’s distinctive voice, we have retained archaic forms and provided glosses. Sometimes this means that Thornton’s syntax deviates from modern expectations, especially regarding single/plural subject/verb agreement. Occasionally, further intervention is required to clarify sense; in these cases, supplied materials are identified by square brackets. </p>
        </div>
      </div>
      <br>
      <label>PAGE</label>
      <div class="tab">
        <input type="radio" id="tab-2" name="tab-group-1">
        <label for="tab-2">
          <i class="fas fa-quote-left"></i>
          <h2>Citation</h2>
        </label>
        <div class="content">
          <h2>Citation</h2>
          <!-- <p>Cite the Research team that worked on this page of the digital edition</p> -->
          <div class="citation">
            <p v-html="selectedPanelCitationString"></p>
            <button class="button is-secondary" @click="onClickCopyCitation()"><i class="far fa-copy"></i> &nbsp;
              Copy</button>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <div class="panel-wrapper">
    <div class="panel" v-for="(panel, panelIdx) in panels">
      <nav class="panel-nav">
        <div>
          <label>Volume:</label>
          <panel-control :panel-idx="panelIdx" control-key="document"></panel-control>
          <label>Version:</label>
          <panel-control :panel-idx="panelIdx" control-key="view"></panel-control>
        </div>
        <div class="icons">
          <div class="icon" @click="onClickInfo(panelIdx)">
            <label for="drawer-switch" id="drawer-toggle">
              <i class="fas fa-info-circle"></i>
              <h2>Info</h2>
            </label>
          </div>
          <!---->
          <!-- <div class="icon">
              <i class="fas fa-print"></i>
              <h2>Print</h2>
            </div> -->
          <div class="cl">
            <div class="icon is-hidden-mobile" v-if="canClonePanel" @click.stop.prevent="clonePanel(panelIdx)">
              <i class="far fa-clone"></i>
              <h2>Add</h2>
            </div>
            <div class="icon" v-if="panels.length > 1" @click.stop.prevent="closePanel(panelIdx)">
              <i class="fas fa-times"></i>
              <h2>Close</h2>
            </div>
          </div>
        </div>
      </nav>
      <div class="panel-chunk">
        <div :class="'content '+getContentClasses(panel)" v-html="panel.responses.document">
        </div>
      </div>
      <nav class="panel-nav bottom">
        <div>
          <label>Edition page:</label><panel-control :panel-idx="panelIdx" control-key="locus"></panel-control>
        </div>
        <div>
          <button class="pagination" href="#" @click.stop.prevent="incrementLocus(panel, -1)"
            aria-label="previous page"><i class="fas fa-arrow-left"></i></button>
          <button class="pagination" href="#" @click.stop.prevent="incrementLocus(panel, 1)" aria-label="next page"><i
              class="fas fa-arrow-right"></i></button>
        </div>
      </nav>
    </div>
  </div>
</section>
{% endraw %}

<script src="/assets/node_modules/vue/dist/vue.global.js"></script>
<script src="/assets/node_modules/kdl-dts-client/index.js?ts={{ " now" | date: "%s" }}"></script>
<script src="/assets/js/text-viewer.js?ts={{ " now" | date: "%s" }}"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.0.0/openseadragon.min.js"></script>
