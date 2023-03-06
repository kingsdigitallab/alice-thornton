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
    </xsl:template>

    <xsl:template match="tei:listPerson">
        [
            <xsl:apply-templates select="tei:person"/>
        ]
    </xsl:template>

    <xsl:template match="tei:listPerson">
        {
            "id": "",
            "title2": ""
        }
    </xsl:template>


</xsl:stylesheet>
