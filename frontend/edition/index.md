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
  order: 2
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
    <label>{{label}}</label>
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

  <input id="drawer-switch" type="checkbox" :checked="selection.highlightedText" />

  <aside id="drawer" role="complementary">
    <!-- <h1><span>Information for:</span>{{ drawerTitle }}</h1> -->
    <h1>
      <dl>
        <dt>Book:</dt>
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
      <div class="tab tab-key">
        <input type="radio" id="tab-1" name="tab-group-1" :checked="!selection.highlightedText">
        <label for="tab-1">
          <i class="fas fa-key"></i><h2>Key</h2>
        </label>
        <div class="content"> 
          <h2>Key</h2>
            <p><sup>*</sup>Only in semi-diplomatic versions</p>
            <h3>Transcription</h3>
            <ul class="key-list">
              <li class="monogram">Monogram<br><span>cursive font (replicating handwriting)</span></li>
              <li class="additions">Authorial comments<br><span>text in italics</span></li>
              <li class="above">Authorial insertions/contractions<sup>*</sup><br><span>superscript - text placed higher</span></li>
              <li class="dashed">Authorial repetition<sup>*</sup><br><span>dashed box around the material</span></li>
              <li class="bracket">Items bracketed together<sup>*</sup><br><span>Curly bracket on the right of text</span></li>
              <li class="strikethrough">Text deleted by author that remains legible<sup>*</sup><br><span>strikethrough – words or   characters are crossed through with a single line</span></li>
              <li class="doublestrikethrough">Text deleted by author that is no longer legible<sup>*</sup><br><span>strikethrough –   words or characters are crossed through with a double line</span></li>
              <li class="supplied">Material supplied by the editors<sup>*</sup><br><span>square brackets around the material</span></li>
              <li class="heart">Used by Thornton in place of the word 'heart'<br>
                <span>Heart icon - a glyph or non-standard character</span>
              </li>
              <li class="livre">An abbreviation of 'livre' meaning pound<sup>*</sup><br>
                <span>a raised letter l in italics</span>
              </li>
            </ul>
            <h3>Text block</h3>
            <ul class="key-list">
              <li class="blank">Blank page or lines<br>
                <span>grey brackets (details supplied within)</span>
              </li>
              <li class="largebold">Page title heading<br>
                <span>largest size, centred, bold font</span>
              </li>
              <li class="mediumbold">Other headings and some dates<br>
                <span>medium size, centred, bold font. thick medium underline</span>
              </li>
              <li class="running">(Running) headers like dates<br>
                  <span>medium size, centred, italic font</span>
              </li>
              <li class="rule">Author’s lines that divide up text<br>
                  <span>single brown line across full width of the page</span>
              </li>
              <li class="pnumber">
                Page number in the author's original book<br><span>Number in italics, top left of display</span>
              </li>
              <li class="cut">Physical damage on page<br>
                <span>grey brackets (details supplied within)</span>
              </li>   
            </ul>
            <h3>Contextual Materials</h3>
            <ul class="key-list">
              <li class="enotes">Editorial Note<br><span>number in note icon intext</span></li>
              <li class="glossary">Gloss<br><span>double underline </span></li>
              <li class="person">Entity (Person) <br><span>dashed underline (circle icon) </span></li>
              <li class="place">Entity (Place) <br><span>dashed underline (square icon) </span></li>
              <li class="event">Entity (Event) <br><span>dashed underline (start and end time icon) </span></li>
              <li class="biblical">Biblical reference <br><span>gray black underline (cross icon) </span></li>
            </ul> 
            <h3>Images</h3>
            <ul class="key-list">
              <li class="image">scanned image of page in the author's original book
                <br><span>image icon</span>
              </li>
            </ul>
        </div>
      </div>
      <div class="tab tab-print" v-if="!hidePrintLink">
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
      <div class="tab tab-search">
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
      <div class="tab tab-principles">
        <input type="radio" id="tab-0" name="tab-group-1">
        <label for="tab-0">
          <i class="fas fa-pen-fancy"></i>
          <h2>Editorial Principles</h2>
        </label>
        <div class="content">
          <h2>Editorial Principles</h2>
          <h3>Semi-diplomatic</h3>
          <p>The semi-diplomatic version of the text retains some original textual features, including original lineation, paragraphing, punctuation, spelling and capitalisation. It also includes evidence of authorial corrections, such as insertions and deletions. However, to make this version more accessible we have silently modernised Thornton’s use of u/v, i/j and long S, and expanded her contractions of words such as ‘the’, ‘which’, and ‘that’ (from ye, wch and yt). Occasionally, Thornton omits a word that impedes sense; in such cases, we have supplied materials in square brackets (see key).</p>
          <h3>Modernised</h3>
          <p>This version modernises according to the conventions of UK English, supplemented by Chicago Manual of Style (CMS) referencing recommendations. To retain a sense of Thornton’s distinctive voice, we have retained archaic forms and provided glosses. Sometimes this means that Thornton’s syntax deviates from modern expectations, especially regarding single/plural subject/verb agreement. </p>
        </div>
      </div>
      <br>
      <label>PAGE</label>
      <div class="tab tab-notes">
        <input type="radio" id="tab-notes" name="tab-group-1">
        <label for="tab-notes">
          <i class="far fa-sticky-note"></i>
          <h2>Notes</h2>
        </label>
        <div class="content">
          <h2>Notes</h2>
          <ul v-if="selectedPanel.notes.length">
            <li v-for="note in selectedPanel.notes">
              <sup class="note-symbol">{{note.index}}</sup>
              <div v-html="note.body"></div>
            </li>
          </ul>
          <p v-else>
            There are no editorial notes on this page.
          </p>
        </div>
      </div>
      <div class="tab tab-entities">
        <input type="radio" id="tab-entities" name="tab-group-1" :checked="selection.highlightedText">
        <label for="tab-entities">
          <i class="fas fa-list"></i>
          <h2>Entries</h2>
        </label>
        <div class="content">
          <h2>Entries</h2>
          <ul class="decorated" v-if="selectedPanel.entities.length">
            <li v-for="entity in selectedPanel.entities">
              <div class="entity-title">
                <span v-if="getClassFromType(entity.index.type)" class="icon">
                  <i :class="`type-icon fas ${getClassFromType(entity.index.type)}`" aria-hidden="true"></i>
                </span>
                <a :href="`/entities/?hi=${entity.index.id}`">{{ entity.index.title }}</a>
              </div>
              <div class="entity-targets">
                <template v-for="(target, targetIdx) in entity.targets">
                  "<span :class="`text-rendered view-${selectedPanel.selections.view}`"    v-html="target"></span>"<template v-if="targetIdx != entity.targets.length - 1">, </template>
                </template>
              </div>
              <div v-if="entity?.index?.bio" class="entity-description">{{ entity.index.bio }}</div>
              <div v-if="entity?.index?.desc" class="entity-description">{{ entity.index.desc }}</div>
              <ul id="entity-references" class="result-books" v-if="selection.highlightedText == entity.index.id">
                <li v-for="(pages, bookId) in entity.index.pages" class="result-book">
                  <template v-if="pages.length">
                    <span>{{ getLabelFromOptionKey(bookId) }}</span>: 
                    p<template v-if="!isSinglePage(pages)">p</template>.
                    <template v-for="(page, index) in pages">
                      <template v-for="(pagePart, partIndex) in getPageParts(page)">
                        <template v-if="partIndex > 0">&mdash;</template>
                        <template v-if="isLocusVisible(bookId, pagePart)">
                          <a :class="{highlighted: selectedPanel.selections.document == bookId && `p.${pagePart}` == selectedPanel.selections.locus}" @click.stop.prevent="jumpTo(selectedPanel, bookId, `p.${pagePart}`)">{{ pagePart }}</a>
                        </template>
                        <template v-else>
                          {{ pagePart }}
                        </template>
                      </template>
                      <template v-if="index < (pages.length - 1)">, </template>
                    </template>
                  </template>
                </li>
              </ul>
            </li>
          </ul>
          <p v-else>
            There are no people or places referenced on this page.
          </p>
        </div>
      </div>
      <div class="tab tab-citation">
        <input type="radio" id="tab-citation" name="tab-group-1">
        <label for="tab-citation">
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
          <panel-control :panel-idx="panelIdx" control-key="document" label="Book:"></panel-control>
          <panel-control :panel-idx="panelIdx" control-key="view" label="Version:"></panel-control>
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
<script src="/assets/node_modules/kdl-dts-client/index.js?ts={{ "now" | date: "%s" }}"></script>
<script src="/assets/js/text-viewer.js?ts={{ "now" | date: "%s" }}"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.0.0/openseadragon.min.js"></script>
