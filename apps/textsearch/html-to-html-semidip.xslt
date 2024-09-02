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
        data-pagefind-meta="url[data-url],title[data-title]" 
        data-title="#title#" 
        data-url="#url#" 
        data-pagefind-filter="book[data-book],version[data-version]"
        data-book="#book#" 
        data-version="#version#" 
        >
        <xsl:call-template name="copy-element" />
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
