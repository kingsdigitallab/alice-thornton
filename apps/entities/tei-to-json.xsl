<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" 
  xmlns="http://www.tei-c.org/ns/1.0" 
  xmlns:html="http://www.w3.org/1999/xhtml" 
  xmlns:tei="http://www.tei-c.org/ns/1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:dts="https://w3id.org/dts/api#">

<xsl:variable name="book_of_remembrances" select="document('edition/texts/00_book_of_remembrances/book_of_remembrances.xml')" />
<xsl:key name="names_book_of_remembrances" match="//tei:persName" use="@ref" />

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
            "id": "<xsl:value-of select='@xml:id'/>",
            "title": "<xsl:value-of select='normalize-space(tei:persName[@type="label"]/text())'/>",
            "type": "person",
            "sortkey": "<xsl:value-of select='normalize-space(tei:persName/tei:surname[1]/text())'/> <xsl:value-of select='normalize-space(tei:persName/tei:forename/text())'/>",
            "books": {
                <!-- "book_one": [<xsl:for-each select="key('names_book_one', concat('ppl:', @xml:id), $book_one)">"<xsl:value-of select="preceding::tei:pb[1]/@n"/>", "<xsl:for-each select=".//text()"><xsl:value-of select="normalize-space(replace(replace(., '&quot;', ' '), '&#10;', ' '))" /></xsl:for-each>"<xsl:if test="position() != last()">,</xsl:if></xsl:for-each>] -->
                "book_of_remembrances": [<xsl:for-each select="key('names_book_of_remembrances', concat('ppl:', @xml:id), $book_of_remembrances)"><xsl:value-of select="preceding::tei:pb[1]/@n"/><xsl:if test="position() != last()">,</xsl:if></xsl:for-each>]
            }
        }
        <xsl:if test="position()!=last()">,</xsl:if>
    </xsl:template>

    <xsl:template match="tei:place">
        {
            "id": "<xsl:value-of select='@xml:id'/>",
            "title": "<xsl:value-of select='tei:placeName[@type="label"]/text()'/><xsl:value-of select='tei:geogName[@type="label"]/text()'/>",
            "type": "place",
            "subtype": "<xsl:value-of select='@type'/>",
            "sortkey": "<xsl:value-of select='tei:placeName[@type="label"]/text()'/><xsl:value-of select='tei:geogName[@type="label"]/text()'/>",
            "region": "<xsl:value-of select='tei:location/tei:region/text()'/>",
            "settlement": "<xsl:value-of select='tei:location/tei:settlement/text()'/>"
        }
        <xsl:if test="position()!=last()">,</xsl:if>
    </xsl:template>

</xsl:stylesheet>
