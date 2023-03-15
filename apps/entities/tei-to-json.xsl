<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" 
  xmlns="http://www.tei-c.org/ns/1.0" 
  xmlns:html="http://www.w3.org/1999/xhtml" 
  xmlns:tei="http://www.tei-c.org/ns/1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:dts="https://w3id.org/dts/api#">

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
            "title": "<xsl:value-of select='tei:persName[@type="label"]/text()'/>",
            "type": "person",
            "sortkey": "<xsl:value-of select='tei:persName/tei:surname[1]/text()'/> <xsl:value-of select='tei:persName/tei:forename/text()'/>"
        }
        <xsl:if test="position()!=last()">,</xsl:if>
    </xsl:template>

    <xsl:template match="tei:place">
        {
            "id": "<xsl:value-of select='@xml:id'/>",
            "title": "<xsl:value-of select='tei:placeName[@type="label"]/text()'/><xsl:value-of select='tei:geogName[@type="label"]/text()'/>",
            "type": "place",
            "subtype": "<xsl:value-of select='@type'/>",
            "sortkey": "<xsl:value-of select='tei:placeName[@type="label"]/text()'/><xsl:value-of select='tei:geogName[@type="label"]/text()'/>"
        }
        <xsl:if test="position()!=last()">,</xsl:if>
    </xsl:template>

</xsl:stylesheet>
