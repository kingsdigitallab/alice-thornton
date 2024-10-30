<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" 
  xmlns="http://www.tei-c.org/ns/1.0" 
  xmlns:html="http://www.w3.org/1999/xhtml" 
  xmlns:tei="http://www.tei-c.org/ns/1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:dts="https://w3id.org/dts/api#"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:lookup="lookup"
  xmlns:internals="internals"
>

<!-- <xsl:key name="element_from_ref" match="//tei:*[@ref]" use="tokenize(normalize-space(@ref), ' ')" /> -->
<xsl:key name="element_from_ref" match="/tei:TEI/tei:text//tei:*[@ref]" use="tokenize(normalize-space(@ref), ' ')" />
<!-- <p xml:id="p-0021"><milestone spanTo="#ev13-end" xml:id="ev13-start" n="ev13" unit="event"/> -->
<!-- <xsl:key name="element_from_eventid" match="//tei:milestone" use="tokenize(normalize-space(@n), ' ')" /> -->
<xsl:key name="element_from_eventid" match="/tei:TEI/tei:text//tei:milestone" use="tokenize(normalize-space(@n), ' ')" />

<!-- 'book_of_remembrances,book_one,book_two,book_three' -->
<lookup:documents>
    <lookup:doc key="bookrem" filename="book_of_remembrances" order="0" />
    <lookup:doc key="book1" filename="book_one" order="1" />
    <lookup:doc key="book2" filename="book_two" order="2" />
    <lookup:doc key="book3" filename="book_three" order="3" />
</lookup:documents>
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
        <xsl:apply-templates select="//tei:listEvent[@type='events']"/>
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
    <xsl:template match="tei:listEvent">
        [
            <xsl:apply-templates select="../tei:listEvent[@type='events']/tei:event"/>,
            <xsl:apply-templates select="../tei:listEvent[@type='groups']/tei:event"/>
        ]
    </xsl:template>

    <xsl:template match="tei:person">
        {
            "type": "person",
            "id": "ppl:<xsl:value-of select='@xml:id'/>",
            <xsl:if test="tei:persName/tei:surname[1]">"sortkey": "<xsl:value-of select='normalize-space(tei:persName/tei:surname[1]/text())'/>-<xsl:value-of select='normalize-space(tei:persName/tei:forename/text())'/>-<xsl:value-of select="normalize-space(replace(tei:birth/@when-custom, '\D', ''))"/>",
            <!-- 11/06/2024: added label bc the title (Lady) should be searchable. Labal is partially rundundant with fore+surenames. -->
            <!-- Regexp is to remove bracketed content from title which may contain words or abbreviations (c.1630-1702) -->
            "search": "<xsl:value-of select='normalize-space(tei:persName/tei:surname[1]/text())'/>&#160;<xsl:value-of select='normalize-space(tei:persName/tei:surname[2]/text())'/>&#160;<xsl:value-of select='normalize-space(tei:persName/tei:forename/text())'/>&#160;<xsl:value-of select='replace(normalize-space(tei:persName[@type="label"]/text()), "\(.*", "")'/>",</xsl:if>
            "title": "<xsl:value-of select='normalize-space(tei:persName[@type="label"]/text())'/>",
            "bio": "<xsl:value-of select="normalize-space(tei:noteGrp/tei:note[@type='bio']/text())"/>",
            "pages": {<xsl:call-template name='insertBooksPages'><xsl:with-param name="entity" select="."/><xsl:with-param name="entityPrefix" select="'ppl:'"/></xsl:call-template>}
        }
        <xsl:if test="position()!=last()">,</xsl:if>
    </xsl:template>

    <xsl:template match="tei:place">
        {
            "type": "place",
            "id": "place:<xsl:value-of select='@xml:id'/>",
            "sortkey": "<xsl:value-of select='(tei:location/tei:country/text(),"(NOCOUNTRY)")[1]'/>-<xsl:value-of select='(tei:location/tei:region/text(),"(NOREGION)")[1]'/>-<xsl:value-of select='(tei:location/tei:settlement/text(), "(NOSETTLEMENT)")[1]'/>-<xsl:value-of select='(tei:location/tei:placeName/text(), "(NOPLACENAME)")[1]'/>-<xsl:value-of select='(tei:location/tei:settlement/text(), tei:location/tei:geogName/text(), tei:placeName[@type="label"]/text(), tei:geogName[@type="label"]/text())[1]'/>",
            "search": "<xsl:value-of select='tei:*[@type="label"]/text()'/>",
            "title": "<xsl:value-of select='tei:*[@type="label"]/text()'/>",
            "subtype": "<xsl:value-of select='@type'/>",
            "region": "<xsl:value-of select='(tei:location/tei:region/text(),"Europe")[1]'/>",
            "settlement": "<xsl:value-of select='tei:location/tei:settlement/text()'/>",
            "pages": {<xsl:call-template name='insertBooksPages'><xsl:with-param name="entity" select="."/><xsl:with-param name="entityPrefix" select="'place:'"/></xsl:call-template>}
        }
        <xsl:if test="position()!=last()">,</xsl:if>
    </xsl:template>

    <!--
        # events.xml

        <event xml:id="cw1_1640_death_illness" type="sub" when-custom="1640-11-29">
          <desc>Christopher Wandesford became ill after going to church</desc>
          <label>illness</label>
          <linkGrp type="sub">
            <ptr target="bookrem:ev13" type="book" subtype="bookrem"/>
            <ptr target="book1:ev18" type="book" subtype="book1"/>
            <ptr target="#cw1_1640_death" type="group"/>
          </linkGrp>
        </event>

        # book_of_remembrances.xml:1135
        <p xml:id="p-0021"><milestone spanTo="#ev13-end" xml:id="ev13-start" n="ev13" unit="event"/>
    -->
    <xsl:template match="tei:event">
        <xsl:variable name="desc" select="normalize-space(replace(tei:desc/text(), '&quot;', '&#92;&#92;&quot;'))" /> 
        <xsl:variable name="category" select='internals:capitaliseFirstLetter(normalize-space(tei:label/text()))'/>
        <xsl:variable name="title">
            <xsl:choose>
                <xsl:when test="@type = 'group'">
                    <xsl:value-of select='$desc'/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select='concat($category, ": ", $desc)'/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        {
            "type": "event<xsl:if test="@type = 'group'">_group</xsl:if>",
            "id": "<xsl:value-of select='@xml:id'/>",
            "sortkey": "<xsl:value-of select='$title'/>",
            "search": "<xsl:value-of select='$category'/>&#160;<xsl:value-of select='$desc'/>",
            "title": "<xsl:value-of select='$title' />",
            "cat": "<xsl:value-of select='$category'/>",
            "group": "<xsl:value-of select='tei:linkGrp/tei:ptr[@type="group"]/@target'/>",
            "date": "<xsl:value-of select='@when-custom'/>",
            "pages": {<xsl:call-template name='insertBooksPagesForEvent'><xsl:with-param name="entity" select="."/></xsl:call-template>}
        }
        <xsl:if test="position()!=last()">,</xsl:if>
    </xsl:template>

    <xsl:function name="internals:capitaliseFirstLetter" as="xs:string">
        <xsl:param name="input" as="xs:string"/>
        <xsl:sequence select="concat(
            upper-case(substring($input,1,1)),
            substring($input, 2),
            ' '[not(last())])" />
    </xsl:function>

    <xsl:template name="insertBooksPagesForEvent">
        <xsl:param name="entity"/>
        <!-- <linkGrp type="sgl">
            <ptr target="book1:ev206a" type="book" subtype="book1"/>
            <ptr target="book3:ev94 book3:ev96 book3:ev169 book3:ev212" type="book" subtype="book3"/>
        </linkGrp> -->
        <xsl:for-each select="$entity/tei:linkGrp/tei:ptr[@type='book']">
            <xsl:variable name="ptr" select="." />
            <xsl:variable name="document" select="document('')//lookup:documents/lookup:doc[@key=$ptr/@subtype]" />
            <xsl:variable name="documentPath" select="concat('edition/texts/0', $document/@order, '_', $document/@filename, '/', $document/@filename, '.xml')" />
            <!-- <ptr target="book3:ev94 book3:ev96 book3:ev169 book3:ev212" type="book" subtype="book3"/> -->
            <!-- <anchor xml:id="ev1-end" n="ev1" type="event"/> -->
            "<xsl:value-of select="$document/@filename"/>": [
            <xsl:for-each select="tokenize(./@target)">
                <xsl:variable name="eventNumber" select="tokenize(., ':')[2]" />
                <xsl:for-each select="key('element_from_eventid', $eventNumber, document($documentPath))">
                    "<xsl:value-of select="number(preceding::tei:pb[1]/@n)"/>-<xsl:value-of select="number(document($documentPath)//tei:anchor[@n=$eventNumber]/preceding::tei:pb[1]/@n)" />"
                </xsl:for-each>
                <xsl:if test="position() != last()">,</xsl:if>
            </xsl:for-each>
            ]
            <xsl:if test="position() != last()">,</xsl:if>
        </xsl:for-each>
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
            <xsl:for-each select="key('element_from_ref', concat($entityPrefix, $entity/@xml:id), $document)">
                <xsl:value-of select="number(preceding::tei:pb[1]/@n)"/>
                <xsl:if test="position() != last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

</xsl:stylesheet>
