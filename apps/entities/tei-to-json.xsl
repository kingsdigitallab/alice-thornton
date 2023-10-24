<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" 
  xmlns="http://www.tei-c.org/ns/1.0" 
  xmlns:html="http://www.w3.org/1999/xhtml" 
  xmlns:tei="http://www.tei-c.org/ns/1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:dts="https://w3id.org/dts/api#">

<!-- <xsl:variable name="book_of_remembrances" select="document('edition/texts/00_book_of_remembrances/book_of_remembrances.xml')" /> -->
<xsl:key name="names_book_of_remembrances" match="//tei:*[@ref]" use="@ref" />

<!-- 
Format of entity references in the texts:

ppl:PERSONID
place:PLACEID

Example:

<placeName ref="place:Kirk_131" n="place2">Kirklington</placeName>
 -->

    <xsl:template match="comment()">
    </xsl:template>

    <xsl:template match="/">
        <xsl:apply-templates select="//tei:listPerson"/>
        <xsl:apply-templates select="//tei:listPlace"/>
    </xsl:template>

    <xsl:template match="tei:listPerson">
        [
            <xsl:apply-templates select="tei:person"/>
        ]
    </xsl:template>
    <xsl:template match="tei:listPlace">
        [
            <xsl:apply-templates select="tei:place"/>
        ]
    </xsl:template>

    <xsl:template match="tei:person">
        {
            "id": "ppl:<xsl:value-of select='@xml:id'/>",
            "title": "<xsl:value-of select='normalize-space(tei:persName[@type="label"]/text())'/>",
            "type": "person",
            "sortkey": "<xsl:value-of select='normalize-space(tei:persName/tei:surname[1]/text())'/> <xsl:value-of select='normalize-space(tei:persName/tei:forename/text())'/> <xsl:value-of select='normalize-space(tei:birth/@when-custom)'/>",
            "pages": {<xsl:call-template name='insertBooksPages'><xsl:with-param name="entity" select="."/><xsl:with-param name="entityPrefix" select="'ppl:'"/></xsl:call-template>},
            "bio": "<xsl:value-of select="normalize-space(tei:noteGrp/tei:note[@type='bio']/text())"/>"
        }
        <xsl:if test="position()!=last()">,</xsl:if>
    </xsl:template>

    <xsl:template match="tei:place">
        {
            "id": "place:<xsl:value-of select='@xml:id'/>",
            "title": "<xsl:value-of select='tei:placeName[@type="label"]/text()'/><xsl:value-of select='tei:geogName[@type="label"]/text()'/>",
            "type": "place",
            "subtype": "<xsl:value-of select='@type'/>",
            "sortkey": "<xsl:value-of select='tei:placeName[@type="label"]/text()'/><xsl:value-of select='tei:geogName[@type="label"]/text()'/>",
            "region": "<xsl:value-of select='(tei:location/tei:region/text(),"Europe")[1]'/>",
            "settlement": "<xsl:value-of select='tei:location/tei:settlement/text()'/>",
            "pages": {<xsl:call-template name='insertBooksPages'><xsl:with-param name="entity" select="."/><xsl:with-param name="entityPrefix" select="'place:'"/></xsl:call-template>}
        }
        <xsl:if test="position()!=last()">,</xsl:if>
    </xsl:template>

    <xsl:template name="insertBooksPages">
        <xsl:param name="entityPrefix"/>
        <xsl:param name="entity"/>
        <xsl:for-each select="tokenize('book_of_remembrances,book_one,book_two,book_three', ',')">
            <!-- edition/texts/00_book_of_remembrances/book_of_remembrances.xml -->
            <xsl:variable name="documentPath" select="concat('edition/texts/0', position() - 1, '_', ., '/', ., '.xml')" />
            <!-- <xsl:value-of select="$documentPath" /> -->
            <xsl:call-template name='insertBookPages'>
                <xsl:with-param name="entityPrefix" select="$entityPrefix"/>
                <xsl:with-param name="document" select="document($documentPath)"/>
                <xsl:with-param name="bookName" select="."/>
                <xsl:with-param name="entity" select="$entity"/>
            </xsl:call-template>
            <xsl:if test="position() != last()">,</xsl:if>
        </xsl:for-each>
        <!-- <xsl:call-template name="insertBookPages"><xsl:with-param name="document" select="document('edition/texts/00_book_of_remembrances/book_of_remembrances.xml')"/> <xsl:with-param name="bookName" select="'book_of_remembrances'"/> </xsl:call-template>,
        <xsl:call-template name="insertBookPages"><xsl:with-param name="document" select="document('edition/texts/01_book_one/book_one.xml')"/> <xsl:with-param name="bookName" select="'book_one'"/> </xsl:call-template> -->
    </xsl:template>

    <xsl:template name="insertBookPages">
        <xsl:param name="document"/>
        <xsl:param name="bookName"/>
        <xsl:param name="entityPrefix"/>
        <xsl:param name="entity"/>
        "<xsl:value-of select="$bookName"/>": [
            <xsl:for-each select="key('names_book_of_remembrances', concat($entityPrefix, $entity/@xml:id), $document)">
                <xsl:value-of select="number(preceding::tei:pb[1]/@n)"/>
                <xsl:if test="position() != last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

</xsl:stylesheet>
