<xsl:stylesheet version="2.0" 
  xmlns="http://www.w3.org/1999/xhtml" 
  xmlns:html="http://www.w3.org/1999/xhtml" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:tei="http://www.tei-c.org/ns/1.0" 
>

  <xsl:template match="@*|node()">
    <xsl:call-template name="copy-element" />
  </xsl:template>

  <xsl:template name="copy-element">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="/">
    <html>
      <head>
      </head>
      <body data-pagefind-body="" 
        data-pagefind-meta="url[data-url],title[data-title],version[data-version]" 
        data-pagefind-filter="book[data-book],version[data-version]"
        data-pagefind-sort="book-page[data-book-page]"
        data-title="#title#" 
        data-url="#url#" 
        data-book="#book#" 
        data-version="#version#"
        data-book-page="#bookPage#"
        >
        <xsl:call-template name="copy-element" />
      </body>
    </html>
  </xsl:template>

  <!-- <span class="tei-note tei-type-term info-box" data-tei="note" data-tei-type="term"> -->
  <xsl:template match="span[contains(@class, 'info-box') and not (contains(@class, 'has-info-box'))]">
  </xsl:template>

  <xsl:template match="span[@data-tei-resp='ednote']">
  </xsl:template>

  <xsl:template match="*[contains(@class, 'hidden')]">
  </xsl:template>

  <xsl:template match="span[@data-tei-type='event-mark']">
  </xsl:template>

  <!-- VERSION-SPECIFIC -->

  <!-- <span class="tei-w" data-tei="w" data-tei-norm="sins"><span class="norm">sins</span><span class="orig">sinns</span></span> -->
  <xsl:template match="span[@class='orig']">
  </xsl:template>

  <!-- <span class="tei-abbr" data-tei="abbr">hon.< -->
  <xsl:template match="span[@data-tei='abbr']">
  </xsl:template>

  <xsl:template match="span[@data-tei='surplus']">
  </xsl:template>

  <xsl:template match="span[@data-tei='sic']">
  </xsl:template>

  <!-- <span class="tei-measure tei-type-currency not-a-word" data-tei="measure" data-tei-type="currency" data-tei-unit="£">6<span class="tei-am" data-tei="am" data-tei-rend="superscript italic">l</span></span> -->
  <xsl:template match="span[@data-tei='am']">
  </xsl:template>

  <xsl:template match="del[@data-tei='del']">
  </xsl:template>

  <xsl:template match="span[@data-tei='fw' and contains(@data-tei-place, 'margin') and not(contains(@class, 'tei-type-head'))]">
  </xsl:template>

</xsl:stylesheet>
