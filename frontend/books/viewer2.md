---
layout: viewer2.liquid
title: Edition
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
---

{% raw %}

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
  <h1><span>Information for:</span>{{ drawerTitle }}</h1>
  <div class="tabs">
  <label>BOOK</label>
    <div class="tab">
      <input
        type="radio"
        id="tab-1"
        name="tab-group-1"
        checked>
      <label for="tab-1">
        <i class="fas fa-list"></i><h2>Legend</h2></label>
      <div class="content"> 
      <h2>Legend</h2>
<div class="textblock">  
  <h3>Text block</h3>
<ul>
  <li>Page title heading<br>
    <span>largest size, centred, bold font</span>
  </li>
  <li>Other headings and some dates<br>
    <span>medium size, centred, bold font</span>
  </li>
  <li>(Running) headers like dates <br>
    <span>medium size, centred, font</span>
  </li>
  <li>Blank page or lines<br>
    <span>grey brackets with information within</span>
  </li>
  <li>
    Page number in the author's original book<br><span>Number bottom left of display</span>
  </li>
  <li>
    Items are bracketed together<br><span>Curly bracket on the right of text</span>
  </li>  
    <li>
    Marginal comment<br><span>Displayed in left margin </span>
  </li>  
  </ul>
  
  <div class="transcription">  
  <h3>Transcription</h3>
<ul>
  
  <li>Addition information added by the author<br>
    <span>text placed higher on a note icon</span>
  </li>
  <li>Thornton frequently uses the heart symbol instead of the word 'heart' in her books.<br>
    <span>Heart icon - a glyph or non-standard character</span>
  </li>
  <li>Physical Damage on page<br>
    <span>grey brackets with information of damage within (e.g. cut, tear, deletion)</span>
  </li> 
  <li>Text deleted by author<br>
    <span>strikethrough</span>
  </li>
 
  <li>Author's superscript for some letters <br>
    <span>superscript - small font size, text placed higher</span>
  </li>
  
  
  <li>visual elements/drawings by the author<br><span>gylphs</span>
  </li>

  </ul>
        </div>  
      <div class="features">  
  <h3>Discursive and Contextual Features </h3>
<ul>
  
 <li>a person's name/monogram<br><span>cursive font (replicating handwriting)</span></li>

  <li>Entity (● Person) <br><span>dashed underline with circle at the </span></li>
  
  <li>Entity (⏷ Place) <br><span>dashed underline </span></li>
  
    <li>Entity (■ Event) <br><span>dashed underline </span></li>
  
    <li>Biblical reference <br><span>cross icon </span></li>
  
  </ul>
        </div>  
  
  
    <div class="editorial">  
  <h3>Editorial Interventions</h3>
<ul>
  
 <li>Editorial Notes<br><span>note icon on side margin</span></li>
<li>Glossary<br><span>double underline</span></li>
  
  <li>material interpreted as superfluous<br><span>dashed box around the material</span> </li>
    <li>page number missing from original book<br><span>Square brackets around number</span> </li>
  </ul>
        </div>  
  
      <div class="images">  
  <h3>Images</h3>
<ul>
    <li>scanned image of page in the author's original book<br><span>image icon</span>
  </li>
  </ul>
        </div>  
      </div>
    </div>
    </div>
<div class="tab">
      <input
        type="radio"
        id="tab-2"
        name="tab-group-1">
      <label for="tab-2">
        <i class="fas fa-quote-left"></i><h2>Citation</h2>
      </label>
      <div class="content">
      <h2>Citation</h2>
        <p>How to cite this page of the digital edition?</p>
        <p>{{ selectedPanelCitation }}</p>
        <button class="button is-secondary" @click="onClickCopyCitation()">Copy</button>
      </div>
    </div>
 <div class="tab">
      <input
        type="radio"
        id="tab-3"
        name="tab-group-1">
      <label for="tab-3">
        <i class="fas fa-print"></i><h2>Print</h2>
      </label>
      <div class="content">
      <h2>Print</h2>
        <p>
          Use the following link for a print-friendly preview of one of more pages from this book.
        </p>
        <a :href="getPrintURL()" class="button is-secondary">Preview</a>
      </div>
    </div>
     <div class="tab">
      <input
        type="radio"
        id="tab-4"
        name="tab-group-1">
      <label for="tab-4">
        <i class="fas fa-search"></i><h2>Search</h2>
      </label>
      <div class="content">
      <h2>Search</h2>
        <p><a href="/entities/" class="button is-secondary">Find people and place names in the books.</a></p>
      </div>
    </div>
    <br>
    <label>PAGE</label>
    <div class="tab">
      <input
        type="radio"
        id="tab-5"
        name="tab-group-1">
      <label for="tab-5">
        <i class="fas fa-pen-fancy"></i><h2>Editorial Notes</h2>
      </label>
      <div class="content">
      <h2>Editorial Notes</h2>
        <ul>
          <li>
            <span class="body">
              <span class="tei-p" data-tei="p">
                A cross in the left hand margin: appears to be an "omission sign" or
                "signe de renvoi". See Benjamin Neudorf and Yin Liu, 'Signes-de-Renvoi',
                <span
                  class="tei-hi"
                  data-tei="hi"
                  data-tei-rend="italic">Architectures of the Book</span>, December 21, 2016,
                <span
                  class="tei-ref"
                  data-tei="ref"
                  data-tei-target="https://drc.usask.ca/projects/archbook/signes_de_renvoi.php">https://drc.usask.ca/projects/archbook/signes_de_renvoi.php</span>.
                It perhaps relates to material at the back of this book as the first entry there (page 186) relates to
                                                                  an incident in 1629.
              </span>
            </span>
          </li>
          <li>
            <span class="body">
              <span class="tei-p" data-tei="p">
                Surfeit: 'Excessive consumption of food or drink; overindulgence in
                eating or drinking; gluttony’,
                <span
                  class="tei-hi"
                  data-tei="hi"
                  data-tei-rend="italic">OED</span>.
              </span>
            </span>
          </li>
          <li>
            <span class="body">
              <span class="tei-p" data-tei="p">
                On seventeenth-century measles see Alan Dyer, ‘Epidemics of Measles in
                a Seventeenth Century English Town’,
                <span
                  class="tei-hi"
                  data-tei="hi"
                  data-tei-rend="italic">Local
                  Population Studies</span>
                34 (1985): 35–45. In early use, ‘measles’ could denote various diseases
                causing a red rash:
                <span
                  class="tei-hi"
                  data-tei="hi"
                  data-tei-rend="italic">OED</span>.</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab">
      <input
        type="radio"
        id="tab-6"
        name="tab-group-1">
      <label for="tab-6">
        <i class="fas fa-shapes"></i><h2>Entities</h2>
      </label>
      <div class="content">
      <h2>Entities</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec consectetur nisi, non scelerisque
          justo. Aenean sed ultrices sem. Pellentesque non efficitur quam. Praesent nec odio egestas, aliquet nulla
                                          id, dapibus magna. Integer eu eros enim. Donec quis sapien vel metus ullamcorper dictum sit amet et mauris.
                                          Cras quam urna, tincidunt et ullamcorper tempus, condimentum eu nunc. Cum sociis natoque penatibus et magnis
                                          dis parturient montes, nascetur ridiculus mus. Vestibulum felis ex, tempor ac fringilla vitae, euismod
                                          ornare ante.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec consectetur nisi, non scelerisque
          justo. Aenean sed ultrices sem. Pellentesque non efficitur quam. Praesent nec odio egestas, aliquet nulla
                                          id, dapibus magna. Integer eu eros enim. Donec quis sapien vel metus ullamcorper dictum sit amet et mauris.
                                          Cras quam urna, tincidunt et ullamcorper tempus, condimentum eu nunc. Cum sociis natoque penatibus et magnis
                                          dis parturient montes, nascetur ridiculus mus. Vestibulum felis ex, tempor ac fringilla vitae, euismod
                                          ornare ante.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec consectetur nisi, non scelerisque
          justo. Aenean sed ultrices sem. Pellentesque non efficitur quam. Praesent nec odio egestas, aliquet nulla
                                          id, dapibus magna. Integer eu eros enim. Donec quis sapien vel metus ullamcorper dictum sit amet et mauris.
                                          Cras quam urna, tincidunt et ullamcorper tempus, condimentum eu nunc. Cum sociis natoque penatibus et magnis
                                          dis parturient montes, nascetur ridiculus mus. Vestibulum felis ex, tempor ac fringilla vitae, euismod
                                          ornare ante.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec consectetur nisi, non scelerisque
          justo. Aenean sed ultrices sem. Pellentesque non efficitur quam. Praesent nec odio egestas, aliquet nulla
                                          id, dapibus magna. Integer eu eros enim. Donec quis sapien vel metus ullamcorper dictum sit amet et mauris.
                                          Cras quam urna, tincidunt et ullamcorper tempus, condimentum eu nunc. Cum sociis natoque penatibus et magnis
                                          dis parturient montes, nascetur ridiculus mus. Vestibulum felis ex, tempor ac fringilla vitae, euismod
                                          ornare ante.</p>
      </div>
    </div>
    <div class="tab">
      <input
        type="radio"
        id="tab-7"
        name="tab-group-1">
      <label for="tab-7">
        <i class="fas fa-cross"></i><h2>Biblical Refererences</h2>
      </label>
      <div class="content">
      <h2>Biblical Refererences</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec consectetur nisi, non scelerisque
          justo. Aenean sed ultrices sem. Pellentesque non efficitur quam. Praesent nec odio egestas, aliquet nulla
                                          id, dapibus magna. Integer eu eros enim. Donec quis sapien vel metus ullamcorper dictum sit amet et mauris.
                                          Cras quam urna, tincidunt et ullamcorper tempus, condimentum eu nunc. Cum sociis natoque penatibus et magnis
                                          dis parturient montes, nascetur ridiculus mus. Vestibulum felis ex, tempor ac fringilla vitae, euismod
                                          ornare ante.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec consectetur nisi, non scelerisque
          justo. Aenean sed ultrices sem. Pellentesque non efficitur quam. Praesent nec odio egestas, aliquet nulla
                                          id, dapibus magna. Integer eu eros enim. Donec quis sapien vel metus ullamcorper dictum sit amet et mauris.
                                          Cras quam urna, tincidunt et ullamcorper tempus, condimentum eu nunc. Cum sociis natoque penatibus et magnis
                                          dis parturient montes, nascetur ridiculus mus. Vestibulum felis ex, tempor ac fringilla vitae, euismod
                                          ornare ante.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec consectetur nisi, non scelerisque
          justo. Aenean sed ultrices sem. Pellentesque non efficitur quam. Praesent nec odio egestas, aliquet nulla
                                          id, dapibus magna. Integer eu eros enim. Donec quis sapien vel metus ullamcorper dictum sit amet et mauris.
                                          Cras quam urna, tincidunt et ullamcorper tempus, condimentum eu nunc. Cum sociis natoque penatibus et magnis
                                          dis parturient montes, nascetur ridiculus mus. Vestibulum felis ex, tempor ac fringilla vitae, euismod
                                          ornare ante.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec consectetur nisi, non scelerisque
          justo. Aenean sed ultrices sem. Pellentesque non efficitur quam. Praesent nec odio egestas, aliquet nulla
                                          id, dapibus magna. Integer eu eros enim. Donec quis sapien vel metus ullamcorper dictum sit amet et mauris.
                                          Cras quam urna, tincidunt et ullamcorper tempus, condimentum eu nunc. Cum sociis natoque penatibus et magnis
                                          dis parturient montes, nascetur ridiculus mus. Vestibulum felis ex, tempor ac fringilla vitae, euismod
                                          ornare ante.</p>
      </div>
    </div>
  </div>
</aside>
<div class="panel-wrapper">
  <div class="panel" v-for="(panel, panelIdx) in panels">
    <nav class="panel-nav">
        <div>
          <template id="vue-panel-selector">
            <div class="select-dropdown">
              {{tooltip}}
              <!-- removed id="image_switcher" -->
              <select aria-label="image switcher" @change="$parent.onChangeSelector(panel, controlKey)" v-model="panel.selections[controlKey]">
                <option v-for="(title, id) in panel.selectors[controlKey]" :value="id" v-html="title"></option>
              </select>
              <i class="fas fa-caret-down"></i>
            </div>
          </template>
          <panel-control :panel-idx="panelIdx" control-key="document"></panel-control>
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
          <div class="clone">
          <div class="icon is-hidden-mobile" v-if="canClonePanel" @click.stop.prevent="clonePanel(panelIdx)">
            <i class="far fa-clone"></i>
            <h2>Clone</h2>
          </div>
          <div class="icon" v-if="panels.length > 1" @click.stop.prevent="closePanel(panelIdx)">
            <i class="fas fa-times"></i>
            <h2>Close</h2>
          </div>
          </div>
    </nav>
    <div class="panel-chunk">
      <div :class="'content '+getContentClasses(panel)" v-html="panel.responses.document">
      </div>
    </div>
     <nav class="panel-nav bottom">
               <div>
          <panel-control :panel-idx="panelIdx" control-key="locus"></panel-control>
          </div>
          <div>
          <button class="pagination" href="#" @click.stop.prevent="incrementLocus(panel, -1)" aria-label ="previous page"><i class="fas fa-arrow-left"></i></button>
        <button class="pagination" href="#" @click.stop.prevent="incrementLocus(panel, 1)" aria-label ="next page"><i class="fas fa-arrow-right"></i></button>
        </div>
    </nav>
  </div>
</div>
{% endraw %}
