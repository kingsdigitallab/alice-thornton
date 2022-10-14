<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" 
  xmlns="http://www.w3.org/1999/xhtml" 
  xmlns:tei="http://www.tei-c.org/ns/1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="yes" />

    <xsl:template match="*">
        <xsl:call-template name="lossless-span"/>
    </xsl:template>

    <xsl:template match="p|div">
        <xsl:copy>
            <xsl:call-template name="lossless-attributes"/>
            <xsl:apply-templates />
        </xsl:copy>
    </xsl:template>
 
    <xsl:template name="lossless-span">
        <span>
            <xsl:call-template name="lossless-attributes"/>
            <xsl:apply-templates />
        </span>
    </xsl:template>

    <xsl:template name="lossless-attributes">
        <xsl:attribute name="class">
            <xsl:value-of select="concat('tei-', local-name())"/>
            <xsl:if test="@type"> tei-type-<xsl:value-of select="@type"/></xsl:if>
        </xsl:attribute>
        <xsl:attribute name="data-tei"><xsl:value-of select="local-name()" /></xsl:attribute>
        <xsl:apply-templates select="@*" mode="data-tei" />
    </xsl:template>

    <xsl:template match="@*" mode="data-tei">
        <xsl:attribute name="{concat('data-tei-', local-name())}"><xsl:value-of select="." /></xsl:attribute>
    </xsl:template>

</xsl:stylesheet>
