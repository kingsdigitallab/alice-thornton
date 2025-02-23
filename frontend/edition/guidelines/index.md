---
title: Editorial guidelines
toc: true
---

## Transcription Process

Although all of _Book 2_ had been transcribed from the original
manuscript by Dr Lisa Liddy before the AHRC project began, as Covid-19
protocols were still in place in its early stages, the initial
transcriptions of the other books were predominantly made from digital
images. Patrick Comber gave permission for Cordelia Beattie to photograph the *Book of Remembrances*,
while the British Library supplied images of *Book 1* and *Book 3*.
Durham Cathedral Library produced images of *Book 2* which allowed
us to cross check transcriptions remotely. Team members noted queries
that required checking in the original manuscripts which were updated
when it became possible to do so. In order to ensure these provided a
firm foundation for future work, the first set of transcriptions were
fully diplomatic in format and were saved as word documents for future
reference.

Workflow has ensured that several different project team members have
been involved in the transcription process.

- first transcription: fully diplomatic

  - transcribed by two members of the team

  - cross-checked by transcribers

  - checked by another team member

- second transcription: semi-diplomatic

  - transcribed by two members of the team

  - cross-checked by transcribers

  - checked by another team member

  - shared with the Project Board and the contributors to the volume
    of essays commissioned to accompany the Digital Scholarly
    Edition (DSE).

## Editorial Principles

### Semi-Diplomatic

The semi-diplomatic version of the text retains some original textual
features, including original lineation, paragraphing, punctuation and
capitalisation. It also includes evidence of authorial corrections, such
as insertions and deletions, and records spaces left intext and blank
pages. Further details on how these features are recorded in our DSE can
be found below.

However, we have silently modernised Thornton's use of u/v, i/j and long
S, and expanded her contractions of common words such as 'the', 'which',
and 'that' (from 'y^e'^, 'w^ch'^ and' y^t'^), alongside her more unusual
use of 'o.^r^' for 'our'. We have not retained end of line fillers (e.g.
\~) and variant forms of hyphenation have been standardised to '-'.

Thornton's hand is predominantly italic and mostly highly legible;
however, this is not always the case \[see images?\] and, especially
where her hand is less legible, Thornton makes frequent use of
idiosyncratic abbreviations in which vowels are omitted. Two features of
Thornton's orthography we were unable to record that may be of interest
to historical linguists are her use of 'i' for 'c' and her frequent use
of 'hn' for 'him'.

### Modernisation

This modernised version of the text follows the conventions of UK
English, supplemented by Chicago Manual of Style (CMS, 17)
recommendations. However, to retain a sense of Thornton's distinctive
voice, we have retained some archaic forms for which we have provided
glosses. Sometimes Thornton's syntax deviates from modern expectations
and where further intervention is required to clarify sense supplied
materials are identified by square brackets; to retain a clean reading
experience in this modernised edition of her Books, these are displayed
in the SD version.

As is common in Early Modern English (EME), Thornton's sentences
frequently commence with a conjunction (most often, 'and', 'but' or
'which').


### Structural Divisions

The four texts share a [standard basic TEI
structure](https://tei-c.org/release/doc/tei-p5-doc/en/html/DS.html):
**\<teiHeader\>** (metadata) and **\<text\>** (the transcription of the
text), with an additional **\<standOff\>** container for editorial
notes. Within **\<text\>**, all four of the texts contain a main
**\<body\>** and some kind of **\<front\>** matter. Two of the books
also contain **\<back\>** matter.




## Element Set

### Standard TEI and teiHeader

The \<teiHeader\> element holds some metadata about the marked up file.

##### \<TEI\>

[`TEI`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(TEI document) contains a single TEI-conformant document, combining a
single TEI header with one or more members of the model.resource class.

**attributes**: @xml:id

##### \<altIdentifier\>

[`altIdentifier`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/MS.html#msid)
(alternative identifier) contains an alternative or former structured
identifier used for a manuscript or other object, such as a former
catalogue number.

##### \<appInfo\>

[`appInfo`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HDAPP)
(application information) records information about an application which
has edited the TEI file.

##### \<application\>

[`application`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HDAPP)
() provides information about an application which has acted upon the
document.

**attributes**: @ident, @version, @xml:id

##### \<author\>

[`author`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COBICOR)
(author) in a bibliographic reference, contains the name(s) of an
author, personal or corporate, of a work; for example in the same form
as that provided by a recognized bibliographic name authority.

##### \<calendar\>

[`calendar`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD44)
(calendar) describes a calendar or dating system used in a dating
formula in the text.

**attributes**: @xml:id

##### \<calendarDesc\>

[`calendarDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD4)
(calendar description) contains a description of the calendar system
used in any dating expression found in the text.

##### \<change\>

[`change`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD6)
(change) documents a change or set of changes made during the production
of a source document, or during the revision of an electronic file.

##### \<charDecl\>

[`charDecl`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/WD.html#D25-20)
(character declarations) provides information about nonstandard
characters and glyphs.

##### \<collection\>

[`collection`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/MS.html#msid)
(collection) contains the name of a collection of manuscripts or other
objects, not necessarily located within a single repository.

##### \<date\>

[`date`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONADA)
(date) contains a date in any format.

##### \<desc\>

[`desc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/TD.html#TDcrystalsCEdc)
(description) contains a short description of the purpose, function, or
use of its parent element, or when the parent is a documentation
element, describes or defines the object being documented.

##### \<edition\>

[`edition`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD22)
(edition) describes the particularities of one edition of a text.

##### \<editionStmt\>

[`editionStmt`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD22)
(edition statement) groups information relating to one edition of a
text.

##### \<editor\>

[`editor`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COBICOR)
() contains a secondary statement of responsibility for a bibliographic
item, for example the name of an individual, institution or
organization, (or of several such) acting as editor, compiler,
translator, etc.

##### \<encodingDesc\>

[`encodingDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD5)
(encoding description) documents the relationship between an electronic
text and the source or sources from which it was derived.

##### \<fileDesc\>

[`fileDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD2)
(file description) contains a full bibliographic description of an
electronic file.

##### \<glyph\>

[`glyph`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/WD.html#D25-20)
(character glyph) provides descriptive information about a character
glyph.

**attributes**: @xml:id

##### \<handDesc\>

[`handDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/MS.html#msph2)
(description of hands) contains a description of all the different hands
used in a manuscript or other object.

##### \<hi\>

[`hi`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COHQHE)
(highlighted) marks a word or phrase as graphically distinct from the
surrounding text, for reasons concerning which no claim is made.

**attributes**: @rend

##### \<idno\>

[`idno`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPERSbp)
(identifier) supplies any form of identifier used to identify some
object, such as a bibliographic item, a person, a title, an
organization, etc. in a standardized way.

##### \<label\>

[`label`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(label) contains any label or heading used to identify part of a text,
typically but not exclusively in a list or glossary.

##### \<listChange\>

[`listChange`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD6)
() groups a number of change descriptions associated with either the
creation of a source text or the revision of an encoded text.

##### \<msDesc\>

[`msDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/MS.html#msov)
(manuscript description) contains a description of a single identifiable
manuscript or other text-bearing object such as an early printed book.

##### \<msIdentifier\>

[`msIdentifier`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/MS.html#msid)
(manuscript identifier) contains the information required to identify
the manuscript or similar object being described.

##### \<msName\>

[`msName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/MS.html#msid)
(alternative name) contains any form of unstructured alternative name
used for a manuscript or other object, such as an ‘ocellus nominum’, or
nickname.

##### \<name\>

[`name`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONARS)
(name, proper noun) contains a proper noun or noun phrase.

##### \<objectDesc\>

[`objectDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/MS.html#msph1)
(object description) contains a description of the physical components
making up the object which is being described.

##### \<p\>

[`p`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COPA)
(paragraph) marks paragraphs in prose.

##### \<physDesc\>

[`physDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/MS.html#msph)
(physical description) contains a full physical description of a
manuscript, manuscript part, or other object optionally subdivided using
more specialized elements from the model.physDescPart class.

##### \<profileDesc\>

[`profileDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD4)
(text-profile description) provides a detailed description of
non-bibliographic aspects of a text, specifically the languages and
sublanguages used, the situation in which it was produced, the
participants and their setting.

##### \<publicationStmt\>

[`publicationStmt`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD24)
(publication statement) groups information concerning the publication or
distribution of an electronic or other text.

##### \<publisher\>

[`publisher`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COBICOI)
(publisher) provides the name of the organization responsible for the
publication or distribution of a bibliographic item.

##### \<ref\>

[`ref`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COXR)
(reference) defines a reference to another location, possibly modified
by additional text or comment.

**attributes**: @target

##### \<repository\>

[`repository`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/MS.html#msid)
(repository) contains the name of a repository within which manuscripts
or other objects are stored, possibly forming part of an institution.

##### \<revisionDesc\>

[`revisionDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD6)
(revision description) summarizes the revision history for a file.

##### \<sourceDesc\>

[`sourceDesc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD3)
(source description) describes the source(s) from which an electronic
text was derived or generated, typically a bibliographic description in
the case of a digitized text, or a phrase such as ‘born digital’ for a
text which has no previous existence.

##### \<teiHeader\>

[`teiHeader`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD11)
(TEI header) supplies descriptive and declarative metadata associated
with a digital resource or set of resources.

##### \<title\>

[`title`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COBICOR)
(title) contains a title for any kind of work.

**attributes**: @type

##### \<titleStmt\>

[`titleStmt`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD21)
(title statement) groups information about the title of a work and those
responsible for its content.

##### \<unicodeProp\>

[`unicodeProp`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/WD.html#ucsprops)
(unicode property) provides a Unicode property for a character (or
glyph).

**attributes**: @name, @value

### Books

#### The texts

##### \<abbr\>

[`abbr`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONAAB)
(abbreviation) contains an abbreviation of any sort.

##### \<add\>

[`add`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COEDADD)
(addition) contains letters, words, or phrases inserted in the source
text by an author, scribe, or a previous annotator or corrector.

**attributes**: @place, @rend, @xml:id

- @place possible values:
  - above
  - below
  - centre
  - inline
  - left
  - left margin
  - superimposed

##### \<add\>

[`add`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COEDADD)
(addition) contains letters, words, or phrases inserted in the source
text by an author, scribe, or a previous annotator or corrector.

**attributes**: @place, @rend, @xml:id

- @rend possible values:
  - differentInk
  - post(rule)
  - size(smaller)
  - underline

##### \<am\>

[`am`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHAB)
(abbreviation marker) contains a sequence of letters or signs present in
an abbreviation which are omitted or replaced in the expanded form of
the abbreviation.

**attributes**: @rend

- @rend possible values:
  - italic
  - superscript

##### \<anchor\>

[`anchor`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/TS.html#TSSAPA)
(anchor point) attaches an identifier to a point within a text, whether
or not it corresponds with a textual element.

**attributes**: @corresp, @n, @resp, @type, @xml:id

- @resp possible values:
  - ednote

##### \<anchor\>

[`anchor`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/TS.html#TSSAPA)
(anchor point) attaches an identifier to a point within a text, whether
or not it corresponds with a textual element.

**attributes**: @corresp, @n, @resp, @type, @xml:id

- @type possible values:
  - event
  - letter

##### \<back\>

[`back`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSBACK)
(back matter) contains any appendixes, etc. following the main part of a
text.

##### \<body\>

[`body`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text body) contains the whole body of a single unitary text, excluding
any front or back matter.

##### \<choice\>

[`choice`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COED)
(choice) groups a number of alternative encodings for the same point in
a text.

##### \<corr\>

[`corr`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COEDCOR)
(correction) contains the correct form of a passage apparently erroneous
in the copy text.

**attributes**: @rend

- @rend possible values:
  - italic

##### \<damage\>

[`damage`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHDA)
(damage) contains an area of damage to the text witness.

**attributes**: @agent

- @agent possible values:
  - excised
  - tear

##### \<date\>

[`date`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONADA)
(date) contains a date in any format.

**attributes**: @datingMethod, @notAfter-custom, @notBefore-custom,
@type, @when-custom

- @datingMethod possible values:
  - \#JulianJan
  - \#JulianMar
  - \#JulianSic
  - \#JulianSlash

##### \<date\>

[`date`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONADA)
(date) contains a date in any format.

**attributes**: @datingMethod, @notAfter-custom, @notBefore-custom,
@type, @when-custom

- @type possible values:
  - accident
  - birth
  - burial
  - death
  - illness
  - labour
  - legal
  - letter
  - marriage
  - notEvent
  - political
  - religion

##### \<del\>

[`del`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COEDADD)
(deletion) contains a letter, word, or passage deleted, marked as
deleted, or otherwise indicated as superfluous or spurious in the copy
text by an author, scribe, or a previous annotator or corrector.

**attributes**: @rend, @xml:id

- @rend possible values:
  - doublestrikethrough
  - overwritten
  - strikethrough

##### \<div\>

[`div`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSDIV)
(text division) contains a subdivision of the front, body, or back of a
text.

**attributes**: @ana, @corresp, @rend, @subtype, @type, @xml:id

- @ana possible values:
  - prayer

##### \<div\>

[`div`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSDIV)
(text division) contains a subdivision of the front, body, or back of a
text.

**attributes**: @ana, @corresp, @rend, @subtype, @type, @xml:id

- @rend possible values:
  - differentInk
  - post(rule short right)
  - post(rule)
  - pre(rule)

##### \<div\>

[`div`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSDIV)
(text division) contains a subdivision of the front, body, or back of a
text.

**attributes**: @ana, @corresp, @rend, @subtype, @type, @xml:id

- @subtype possible values:
  - prayer
  - sonnet

##### \<div\>

[`div`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSDIV)
(text division) contains a subdivision of the front, body, or back of a
text.

**attributes**: @ana, @corresp, @rend, @subtype, @type, @xml:id

- @type possible values:
  - correspondence
  - index
  - poetry
  - prayer
  - preface
  - supplementary

##### \<docAuthor\>

[`docAuthor`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSTITL)
(document author) contains the name of the author of the document, as
given on the title page (often but not always contained in a byline).

##### \<docTitle\>

[`docTitle`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSTITL)
(document title) contains the title of a document, including all its
constituents, as given on a title page.

##### \<epigraph\>

[`epigraph`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSAE)
(epigraph) contains a quotation, anonymous or attributed, appearing at
the start or end of a section or on a title page.

**attributes**: @rend

- @rend possible values:
  - post(rule)
  - pre(rule)

##### \<ex\>

[`ex`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHAB)
(editorial expansion) contains a sequence of letters added by an editor
or transcriber when expanding an abbreviation.

**attributes**: @xml:id

##### \<expan\>

[`expan`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONAAB)
(expansion) contains the expansion of an abbreviation.

**attributes**: @rend

- @rend possible values:
  - italic

##### \<figure\>

[`figure`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/FT.html#FTGRA)
(figure) groups elements representing or containing graphic information
such as an illustration, formula, or figure.

##### \<front\>

[`front`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSTITL)
(front matter) contains any prefatory matter (headers, abstracts, title
page, prefaces, dedications, etc.) found at the start of a document,
before the main body.

##### \<fw\>

[`fw`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHSK)
(forme work) contains a running head (e.g. a header, footer), catchword,
or similar material appearing on the current page.

**attributes**: @corresp, @place, @rend, @resp, @type, @xml:id

- @place possible values:
  - centre
  - left
  - left margin
  - right
  - top

##### \<fw\>

[`fw`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHSK)
(forme work) contains a running head (e.g. a header, footer), catchword,
or similar material appearing on the current page.

**attributes**: @corresp, @place, @rend, @resp, @type, @xml:id

- @rend possible values:
  - differentInk
  - italic
  - post(rule)
  - pre(rule)
  - underline

##### \<fw\>

[`fw`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHSK)
(forme work) contains a running head (e.g. a header, footer), catchword,
or similar material appearing on the current page.

**attributes**: @corresp, @place, @rend, @resp, @type, @xml:id

- @resp possible values:
  - \#awt1

##### \<fw\>

[`fw`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHSK)
(forme work) contains a running head (e.g. a header, footer), catchword,
or similar material appearing on the current page.

**attributes**: @corresp, @place, @rend, @resp, @type, @xml:id

- @type possible values:
  - catch
  - head
  - header
  - list-like
  - pageNum
  - reference

##### \<g\>

[`g`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/WD.html#WD)
(character or glyph) represents a glyph, or a non-standard character.

**attributes**: @ref

##### \<gap\>

[`gap`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COEDADD)
(gap) indicates a point where material has been omitted in a
transcription, whether for editorial reasons described in the TEI
header, as part of sampling practice, or because the material is
illegible, invisible, or inaudible.

**attributes**: @quantity, @reason, @unit, @xml:id

- @reason possible values:
  - damage
  - deleted
  - obliterated
  - unclear

##### \<gap\>

[`gap`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COEDADD)
(gap) indicates a point where material has been omitted in a
transcription, whether for editorial reasons described in the TEI
header, as part of sampling practice, or because the material is
illegible, invisible, or inaudible.

**attributes**: @quantity, @reason, @unit, @xml:id

- @unit possible values:
  - char
  - line
  - word

##### \<geogName\>

[`geogName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPLAC)
(geographical name) identifies a name associated with some geographical
feature such as Windrush Valley or Mount Sinai.

**attributes**: @n, @ref

##### \<graphic\>

[`graphic`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COGR)
(graphic) indicates the location of a graphic or illustration, either
forming part of a text, or providing an image of it.

**attributes**: @url

##### \<head\>

[`head`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSHD)
(heading) contains any type of heading, for example the title of a
section, or the heading of a list, glossary, manuscript description,
etc.

**attributes**: @place, @rend, @xml:id

- @place possible values:
  - centre
  - right

##### \<head\>

[`head`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSHD)
(heading) contains any type of heading, for example the title of a
section, or the heading of a list, glossary, manuscript description,
etc.

**attributes**: @place, @rend, @xml:id

- @rend possible values:
  - post(rule double)
  - post(rule pattern)
  - post(rule)
  - pre(rule double)
  - pre(rule pattern)
  - pre(rule)
  - underline

##### \<hi\>

[`hi`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COHQHE)
(highlighted) marks a word or phrase as graphically distinct from the
surrounding text, for reasons concerning which no claim is made.

**attributes**: @rend

- @rend possible values:
  - italic
  - italic-mod-only
  - place(centre)
  - superscript
  - underline

##### \<item\>

[`item`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(item) contains one component of a list.

**attributes**: @corresp, @rend

- @rend possible values:
  - first-line-indent

##### \<l\>

[`l`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COVE)
(verse line) contains a single, possibly incomplete, line of verse.

**attributes**: @n

##### \<label\>

[`label`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(label) contains any label or heading used to identify part of a text,
typically but not exclusively in a list or glossary.

**attributes**: @place, @rend

- @place possible values:
  - left margin
  - right bottom
  - right mid
  - right top

##### \<label\>

[`label`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(label) contains any label or heading used to identify part of a text,
typically but not exclusively in a list or glossary.

**attributes**: @place, @rend

- @rend possible values:
  - underline

##### \<lb\>

[`lb`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CORS5)
(line beginning) marks the beginning of a new (typographic) line in some
edition or version of a text.

**attributes**: @break

- @break possible values:
  - no

##### \<lg\>

[`lg`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COVE)
(line group) contains one or more verse lines functioning as a formal
unit, e.g. a stanza, refrain, verse paragraph, etc.

**attributes**: @type

- @type possible values:
  - stanza

##### \<list\>

[`list`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(list) contains any sequence of items organized as a list.

**attributes**: @rend, @type

- @rend possible values:
  - braced(})

##### \<list\>

[`list`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(list) contains any sequence of items organized as a list.

**attributes**: @rend, @type

- @type possible values:
  - correspondence
  - documents
  - expenses
  - index
  - mixed
  - names

##### \<measure\>

[`measure`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONANU)
(measure) contains a word or phrase referring to some quantity of an
object or commodity, usually comprising a number, a unit, and a
commodity name.

**attributes**: @quantity, @type, @unit

- @type possible values:
  - currency

##### \<measure\>

[`measure`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONANU)
(measure) contains a word or phrase referring to some quantity of an
object or commodity, usually comprising a number, a unit, and a
commodity name.

**attributes**: @quantity, @type, @unit

- @unit possible values:
  - £

##### \<metamark\>

[`metamark`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PH-meta)
() contains or describes any kind of graphic or written signal within a
document the function of which is to determine how it should be read
rather than forming part of the actual content of the document.

**attributes**: @corresp, @xml:id

##### \<milestone\>

[`milestone`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CORS5)
(milestone) marks a boundary point separating any kind of section of a
text, typically but not necessarily indicating a point at which some
part of a standard reference system changes, where the change is not
represented by a structural element.

**attributes**: @corresp, @n, @rend, @spanTo, @unit, @xml:id

- @rend possible values:
  - delim(diagonal)
  - delim(diagonal2)
  - delim(dots3)
  - delim(dots5)
  - delim(fleuron)
  - delim(hash)
  - delim(rule fill right)
  - delim(rule short right)
  - delim(rule)

##### \<milestone\>

[`milestone`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CORS5)
(milestone) marks a boundary point separating any kind of section of a
text, typically but not necessarily indicating a point at which some
part of a standard reference system changes, where the change is not
represented by a structural element.

**attributes**: @corresp, @n, @rend, @spanTo, @unit, @xml:id

- @unit possible values:
  - event
  - letter
  - marker

##### \<note\>

[`note`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONONO)
(note) contains a note or annotation.

**attributes**: @place, @rend, @resp, @style, @xml:id

- @place possible values:
  - left
  - left margin
  - top

##### \<note\>

[`note`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONONO)
(note) contains a note or annotation.

**attributes**: @place, @rend, @resp, @style, @xml:id

- @rend possible values:
  - post(rule)
  - pre(rule double)
  - pre(rule)

##### \<note\>

[`note`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONONO)
(note) contains a note or annotation.

**attributes**: @place, @rend, @resp, @style, @xml:id

- @resp possible values:
  - \#awt1

##### \<p\>

[`p`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COPA)
(paragraph) marks paragraphs in prose.

**attributes**: @ana, @corresp, @rend, @style, @xml:id

- @ana possible values:
  - prayer

##### \<p\>

[`p`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COPA)
(paragraph) marks paragraphs in prose.

**attributes**: @ana, @corresp, @rend, @style, @xml:id

- @rend possible values:
  - first-line-indent
  - modernised(append-following-sibling)
  - place(centre)
  - post(rule)
  - pre(rule short left)
  - size(larger)

##### \<pb\>

[`pb`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CORS5)
(page beginning) marks the beginning of a new page in a paginated
document.

**attributes**: @n, @xml:id

##### \<pc\>

[`pc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/AI.html#AIPC)
(punctuation character) contains a character or string of characters
regarded as constituting a single punctuation mark.

**attributes**: @norm

##### \<persName\>

[`persName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPER)
(personal name) contains a proper noun or proper-noun phrase referring
to a person, possibly including one or more of the person’s forenames,
surnames, honorifics, added names, etc.

**attributes**: @n, @ref, @type

- @type possible values:
  - author
  - monogram

##### \<placeName\>

[`placeName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPLAC)
(place name) contains an absolute or relative place name.

**attributes**: @n, @ref, @xml:id

##### \<quote\>

[`quote`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COHQQ)
(quotation) contains a phrase or passage attributed by the narrator or
author to some agency external to the text.

**attributes**: @source, @type, @xml:id

- @type possible values:
  - allusion
  - direct
  - paraphrase
  - partial
  - phrase

##### \<ref\>

[`ref`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COXR)
(reference) defines a reference to another location, possibly modified
by additional text or comment.

**attributes**: @n, @source, @type

- @type possible values:
  - atb
  - biblical
  - bibliog
  - page

##### \<rs\>

[`rs`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPER)
(referencing string) contains a general purpose name or referring
string.

**attributes**: @n, @ref, @type

- @type possible values:
  - geog
  - group
  - person
  - place

##### \<seg\>

[`seg`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/SA.html#SASE)
(arbitrary segment) represents any segmentation of text below the
‘chunk’ level.

**attributes**: @rend, @type, @xml:id

- @rend possible values:
  - braced(})
  - differentInk
  - italic
  - place(centre)
  - place(right)
  - size(larger)
  - underline

##### \<seg\>

[`seg`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/SA.html#SASE)
(arbitrary segment) represents any segmentation of text below the
‘chunk’ level.

**attributes**: @rend, @type, @xml:id

- @type possible values:
  - epigraph

##### \<sic\>

[`sic`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COEDCOR)
(Latin for thus or so) contains text reproduced although apparently
incorrect or inaccurate.

##### \<space\>

[`space`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHSP)
(space) indicates the location of a significant space in the text.

**attributes**: @quantity, @unit

- @unit possible values:
  - line
  - page
  - word

##### \<subst\>

[`subst`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHSU)
(substitution) groups one or more deletions (or surplus text) with one
or more additions when the combination is to be regarded as a single
intervention in the text.

**attributes**: @xml:id

##### \<supplied\>

[`supplied`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHDA)
(supplied) signifies text supplied by the transcriber or editor for any
reason; for example because the original cannot be read due to physical
damage, or because of an obvious omission by the author or scribe.

**attributes**: @reason

- @reason possible values:
  - damage
  - ink mark
  - missing
  - mod
  - obscured
  - omitted
  - smudge
  - unclear

##### \<surplus\>

[`surplus`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/PH.html#PHDA)
(surplus) marks text present in the source which the editor believes to
be superfluous or redundant.

**attributes**: @reason

- @reason possible values:
  - repetition
  - superfluous

##### \<term\>

[`term`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COHTG)
(term) contains a single-word, multi-word, or symbolic designation which
is regarded as a technical term.

**attributes**: @n, @ref, @xml:id

##### \<text\>

[`text`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text) contains a single text of any kind, whether unitary or composite,
for example a poem or drama, a collection of essays, a novel, a
dictionary, or a corpus sample.

##### \<titlePage\>

[`titlePage`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSTITL)
(title page) contains the title page of a text, appearing within the
front or back matter.

**attributes**: @xml:id

##### \<titlePart\>

[`titlePart`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DSTITL)
(title part) contains a subsection or division of the title of a work,
as indicated on a title page.

##### \<unit\>

[`unit`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONANU)
() contains a symbol, a word or a phrase referring to a unit of
measurement in any kind of formal or informal system.

##### \<w\>

[`w`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/AI.html#AILC)
(word) represents a grammatical (not necessarily orthographic) word.

**attributes**: @norm, @type, @xml:space

- @type possible values:
  - add
  - archaism
  - break
  - l
  - u

##### \<w\>

[`w`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/AI.html#AILC)
(word) represents a grammatical (not necessarily orthographic) word.

**attributes**: @norm, @type, @xml:space

- @xml:space possible values:
  - preserve

#### Editorial notes

##### \<hi\>

[`hi`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COHQHE)
(highlighted) marks a word or phrase as graphically distinct from the
surrounding text, for reasons concerning which no claim is made.

**attributes**: @rend

##### \<listAnnotation\>

[`listAnnotation`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/SA.html#SASOstdf)
() contains a list of annotations, typically encoded as annotation,
annotationBlock, or note, possibly organized with nested listAnnotation
elements.

##### \<note\>

[`note`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONONO)
(note) contains a note or annotation.

**attributes**: @n, @place, @type, @xml:id

##### \<p\>

[`p`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COPA)
(paragraph) marks paragraphs in prose.

##### \<ref\>

[`ref`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COXR)
(reference) defines a reference to another location, possibly modified
by additional text or comment.

**attributes**: @target

##### \<seg\>

[`seg`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/SA.html#SASE)
(arbitrary segment) represents any segmentation of text below the
‘chunk’ level.

**attributes**: @rend

##### \<standOff\>

[`standOff`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/SA.html#SASOstdf)
() Functions as a container element for linked data, contextual
information, and stand-off annotations embedded in a TEI document.

### Linked data files

#### People

##### \<addName\>

[`addName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPER)
(additional name) contains an additional name component, such as a
nickname, epithet, or alias, or any other descriptive phrase used within
a personal name.

**attributes**: @type

- @type possible values:
  - alias
  - nickname

##### \<anchor\>

[`anchor`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/TS.html#TSSAPA)
(anchor point) attaches an identifier to a point within a text, whether
or not it corresponds with a textual element.

**attributes**: @xml:id

##### \<bibl\>

[`bibl`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COBITY)
(bibliographic citation) contains a loosely-structured bibliographic
citation of which the sub-components may or may not be explicitly
tagged.

##### \<birth\>

[`birth`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CC.html#CCAHPA)
(birth) contains information about a person’s birth, such as its date
and place.

**attributes**: @type, @when-custom

- @type possible values:
  - baptism
  - birth

##### \<body\>

[`body`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text body) contains the whole body of a single unitary text, excluding
any front or back matter.

##### \<death\>

[`death`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CC.html#CCAHPA)
(death) contains information about a person’s death, such as its date
and place.

**attributes**: @type, @when-custom

- @type possible values:
  - burial
  - death

##### \<forename\>

[`forename`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPER)
(forename) contains a forename, given or baptismal name.

##### \<gender\>

[`gender`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPERSEpc)
(gender) specifies the gender identity of a person, persona, or
character.

##### \<hi\>

[`hi`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COHQHE)
(highlighted) marks a word or phrase as graphically distinct from the
surrounding text, for reasons concerning which no claim is made.

**attributes**: @rend

##### \<listBibl\>

[`listBibl`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COBITY)
(citation list) contains a list of bibliographic citations of any kind.

##### \<listPerson\>

[`listPerson`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPERSE)
(list of persons) contains a list of descriptions, each of which
provides information about an identifiable person or a group of people,
for example the participants in a language interaction, or the people
referred to in a historical source.

##### \<note\>

[`note`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONONO)
(note) contains a note or annotation.

**attributes**: @type

- @type possible values:
  - bio
  - marriages
  - parents
  - sources

##### \<noteGrp\>

[`noteGrp`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONONOGR)
(note group) contains a group of notes

##### \<persName\>

[`persName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPER)
(personal name) contains a proper noun or proper-noun phrase referring
to a person, possibly including one or more of the person’s forenames,
surnames, honorifics, added names, etc.

**attributes**: @n, @ref, @role, @type

- @role possible values:
  - child
  - father
  - mother
  - spouse

##### \<persName\>

[`persName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPER)
(personal name) contains a proper noun or proper-noun phrase referring
to a person, possibly including one or more of the person’s forenames,
surnames, honorifics, added names, etc.

**attributes**: @n, @ref, @role, @type

- @type possible values:
  - label

##### \<person\>

[`person`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPERSE)
(person) provides information about an identifiable individual, for
example a participant in a language interaction, or a person referred to
in a historical source.

**attributes**: @xml:id

##### \<ref\>

[`ref`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COXR)
(reference) defines a reference to another location, possibly modified
by additional text or comment.

**attributes**: @target

##### \<roleName\>

[`roleName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPER)
(role name) contains a name component which indicates that the referent
has a particular role or position in society, such as an official title
or rank.

**attributes**: @type

- @type possible values:
  - peerage

##### \<seg\>

[`seg`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/SA.html#SASE)
(arbitrary segment) represents any segmentation of text below the
‘chunk’ level.

**attributes**: @rend

##### \<surname\>

[`surname`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPER)
(surname) contains a family (inherited) name, as opposed to a given,
baptismal, or nick name.

**attributes**: @type

- @type possible values:
  - birth
  - married

##### \<text\>

[`text`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text) contains a single text of any kind, whether unitary or composite,
for example a poem or drama, a collection of essays, a novel, a
dictionary, or a corpus sample.

#### Places

##### \<anchor\>

[`anchor`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/TS.html#TSSAPA)
(anchor point) attaches an identifier to a point within a text, whether
or not it corresponds with a textual element.

**attributes**: @xml:id

##### \<body\>

[`body`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text body) contains the whole body of a single unitary text, excluding
any front or back matter.

##### \<country\>

[`country`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPLAC)
(country) contains the name of a geo-political unit, such as a nation,
country, colony, or commonwealth, larger than or administratively
superior to a region and smaller than a bloc.

##### \<geo\>

[`geo`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDGEOGva)
(geographical coordinates) contains any expression of a set of
geographic coordinates, representing a point, line, or area on the
surface of the earth in some notation.

##### \<geogName\>

[`geogName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPLAC)
(geographical name) identifies a name associated with some geographical
feature such as Windrush Valley or Mount Sinai.

**attributes**: @type

- @type possible values:
  - label

##### \<hi\>

[`hi`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COHQHE)
(highlighted) marks a word or phrase as graphically distinct from the
surrounding text, for reasons concerning which no claim is made.

**attributes**: @rend

##### \<item\>

[`item`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(item) contains one component of a list.

##### \<linkGrp\>

[`linkGrp`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/SA.html#SAPT)
(link group) defines a collection of associations or hypertextual links.

##### \<list\>

[`list`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(list) contains any sequence of items organized as a list.

##### \<listPlace\>

[`listPlace`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/HD.html#HD3)
(list of places) contains a list of places, optionally followed by a
list of relationships (other than containment) defined amongst them.

##### \<location\>

[`location`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDGEOG)
(location) defines the location of a place as a set of geographical
coordinates, in terms of other named geo-political entities, or as an
address.

##### \<note\>

[`note`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONONO)
(note) contains a note or annotation.

**attributes**: @type

- @type possible values:
  - desc
  - sources

##### \<noteGrp\>

[`noteGrp`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CONONOGR)
(note group) contains a group of notes

##### \<place\>

[`place`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDGEOG)
(place) contains data about a geographic location

**attributes**: @type, @xml:id

- @type possible values:
  - country
  - geo
  - non-country
  - region
  - settlement
  - subregion
  - unit

##### \<placeName\>

[`placeName`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPLAC)
(place name) contains an absolute or relative place name.

**attributes**: @type

- @type possible values:
  - label

##### \<ptr\>

[`ptr`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COXR)
(pointer) defines a pointer to another location.

**attributes**: @target, @type

- @type possible values:
  - historic_england_research_records
  - irish_sites_and_monuments
  - national_heritage_list_for_england
  - victoria_county_history
  - vision_of_britain
  - website
  - wikidata
  - wikipedia

##### \<region\>

[`region`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPLAC)
(region) contains the name of an administrative unit such as a state,
province, or county, larger than a settlement, but smaller than a
country.

##### \<settlement\>

[`settlement`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPLAC)
(settlement) contains the name of a settlement such as a city, town, or
village identified as a single geo-political or administrative unit.

##### \<text\>

[`text`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text) contains a single text of any kind, whether unitary or composite,
for example a poem or drama, a collection of essays, a novel, a
dictionary, or a corpus sample.

#### Events

##### \<body\>

[`body`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text body) contains the whole body of a single unitary text, excluding
any front or back matter.

##### \<desc\>

[`desc`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/TD.html#TDcrystalsCEdc)
(description) contains a short description of the purpose, function, or
use of its parent element, or when the parent is a documentation
element, describes or defines the object being documented.

##### \<event\>

[`event`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPERSbp)
(event) contains data relating to anything of significance that happens
in time.

**attributes**: @from-custom, @n, @notAfter-custom, @notBefore-custom,
@to-custom, @type, @when-custom, @xml:id

- @type possible values:
  - group
  - sgl
  - sub

##### \<label\>

[`label`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(label) contains any label or heading used to identify part of a text,
typically but not exclusively in a list or glossary.

##### \<linkGrp\>

[`linkGrp`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/SA.html#SAPT)
(link group) defines a collection of associations or hypertextual links.

**attributes**: @type

- @type possible values:
  - sgl
  - sub

##### \<listEvent\>

[`listEvent`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ND.html#NDPERSbp)
(list of events) contains a list of descriptions, each of which provides
information about an identifiable event.

**attributes**: @type

- @type possible values:
  - events
  - groups

##### \<ptr\>

[`ptr`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COXR)
(pointer) defines a pointer to another location.

**attributes**: @subtype, @target, @type

- @type possible values:
  - book
  - group

##### \<text\>

[`text`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text) contains a single text of any kind, whether unitary or composite,
for example a poem or drama, a collection of essays, a novel, a
dictionary, or a corpus sample.

#### Glosses

##### \<body\>

[`body`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text body) contains the whole body of a single unitary text, excluding
any front or back matter.

##### \<gloss\>

[`gloss`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COHTG)
(gloss) identifies a phrase or word used to provide a gloss or
definition for some other word or phrase.

##### \<hi\>

[`hi`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COHQHE)
(highlighted) marks a word or phrase as graphically distinct from the
surrounding text, for reasons concerning which no claim is made.

**attributes**: @rend

##### \<item\>

[`item`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(item) contains one component of a list.

**attributes**: @xml:id

##### \<list\>

[`list`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COLI)
(list) contains any sequence of items organized as a list.

**attributes**: @type, @xml:id

##### \<ref\>

[`ref`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#COXR)
(reference) defines a reference to another location, possibly modified
by additional text or comment.

**attributes**: @target

##### \<seg\>

[`seg`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/SA.html#SASE)
(arbitrary segment) represents any segmentation of text below the
‘chunk’ level.

**attributes**: @rend

##### \<text\>

[`text`](https://www.tei-c.org/release/doc/tei-p5-doc/en/html/DS.html#DS)
(text) contains a single text of any kind, whether unitary or composite,
for example a poem or drama, a collection of essays, a novel, a
dictionary, or a corpus sample.
