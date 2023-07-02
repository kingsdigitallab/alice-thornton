---
title: "At the Margins of Alice Thornton's Books"
feature: /assets/img/posts/book1-286-detail.jpg
status: draft
authors:
  - showard
tags:
  - TEI
  - manuscripts
  - marginalia
---


"The great blank space provided by the margins"[^1] was filled with
many kinds of text and image in early modern manuscripts and printed
books, and a number of recent and current digital projects reflect the
rise of scholarly interest in this material. Of particular interest to
ATB is the [Marginalia and the Early Modern Woman
Writer](https://cems.anu.edu.au/marginalia-and-the-early-modern-woman-writer-1530-1660/)
project which is investigating "how early modern women readers engaged
with the margins of their books".[^2]

However, these projects are largely interested in marginal annotations
as readers' engagements with *other people's* writing. Thornton's
marginalia, in the main, are author's signposts to the reader, more
like the printed marginal additions commonly used in early modern books
to provide commentary, explanation, summaries or references (much of
which would later make its way to the foot of the page[^3]).

## TEI and marginalia

Marginalia make a good example of the TEI's
[meaning-first](https://thornton.kdl.kcl.ac.uk/posts/blog/2022-08-25-encoding-alice-thorntons-books/)
emphasis. TEI has nothing like a &lt;margin&gt; tag or any tag that is
*exclusively* for marginal use. As Paul Schaffner puts it, this is
because

> marginalia (even print marginalia, much more manuscript marginalia)
> can express many different relationships with the main text - substitution, 
> addition, commentary, summary, expansion, bibliographic
> reference, labelling, heading, gloss, etc. - each of which might be
> captured with a different tag.[^4]

Instead, markup depends on the *nature* of the marginal
material, with extra attributes used for location (@place) and the
identity of the author (@resp), if needed. Just some of the tags
commonly used include
&lt;[fw](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-fw.html)&gt;,
&lt;[label](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-label.html)&gt;,
&lt;[note](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-note.html)&gt;
and
&lt;[add](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-add.html)&gt;.

However, this pragmatic flexibility brings its own problems, as noted by
Laura Estill: it's difficult even within one project to search for all
its marginal elements if they are marked up differently, and even more
so to compare marginalia from different projects for any kind of
quantitative text analysis.[^5] (One significant marginalia project
eschewed TEI because of its downsides and limitations.[^6] I don't
think we'll go that far, but it is particularly important that the
project's decisions are thought through and well documented.)


## Marginal signs

![alt text....]({{ "/assets/img/posts/book1-forgotten.jpg" | url }} "Composite image showing a pair of omission signs at Book 1 p.286 and (inset) p.8"){.media-left}

![alt text....]({{ "/assets/img/posts/BookRem-10-dotted-cross.jpg" | url }} "Book Rem p.12 showing an omission sign"){.media-left}

Book 1 and Book Rem contain the most distinctive and intriguing
non-textual markers in Thornton's books. Both books include additional
material at the end which Thornton had "forgotten" to enter in the
main narrative, beginning in each case with an account of her falling
and cutting her head at the age of three.[^7] In *Book 1*, Thornton
signals where she intends this story to be inserted in the main text (at
p.8) by using a pair of matching marginal symbols that look like a
decorative dagger. I've been calling them "signes-de-renvoi", though
that may not be strictly accurate (because the text being connected is
not itself in the margin), but she *does* use the graphical symbols as
"bi-directional linking devices, requiring the reader to leave and
return to the main text".[^8] In *Book Rem*, she uses a more
recognisable symbol (a [dotted
cross](http://www.medievalcodes.ca/2014/08/asterisks-in-middle-ages.html),
an early form of asterisk), *but* she only uses it on the page she
points to (see image,
[p.12](https://thornton.kdl.kcl.ac.uk/books/viewer/?&p0.lo=p.12)), not
on both pages. (Physically it isn't actually in the margin either, but
there isn't any real marginal space on that page and it has been placed
as close to the edge of the page as possible.[^9])

## Textual directions

![alt text....]({{ "/assets/img/posts/book1_80-left-margin-crop.jpg" | url }} "Part of the marginal annotations at Book 1 p.80"){.media-right}

There is a good deal of marginalia summarising the main text in the
margins of the books, but far from evenly distributed: it appears only
in *Book 1* and *Book 3*. It's most extensive in the first 64 pages of
*Book 3*, which has a large space set aside throughout. But even there
the marginal annotation stops very abruptly.

In *Book 1*, most of it is on one heavily annotated page (p.80), where
she refers to five distinct events in the text. Not all of them relate
to text on that page. So why are they there? Between pages 78 and 85,
Thornton gives an account of her family's Civil War journey, leaving
Chester in late August 1643 and eventually settling at [Hipswell
Hall](https://historicengland.org.uk/listing/the-list/list-entry/1179639)
in November 1644. But between those two moments, the narrative becomes
rather disordered, jumping from events around [Marston
Moor](http://bcw-project.org/military/english-civil-war/northern-england/battle-of-marston-moor)
and its aftermath in 1644, back to an episode of food poisoning in
September 1643, and then forward again to arrival at Hipswell. The
marginal notes on p.80 summarise the actual chronology of events between
September and November 1643. Perhaps they were an attempt to provide a
guide to the poor confused reader.

## Thornton as scribe

In seventeenth-century England manuscript and print publication
co-existed.[^10] The marginal markers in Alice Thornton's Books connect
her particularly to the world of scribal publication; she seems to have
understood scribal practices, even if she applied them in idiosyncratic
and inconsistent ways (she was, after all, not a professional scribe and
she didn't have an editor). Moreover, these marginal features, along
with other aids to the reader that are equally part of the apparatus of
printed books, indicate that she was consciously writing for an
audience, not simply for private consumption. Her uses of chapters and
titles, page numbering and headings, indexes (really more like [tables
of
contents](https://drc.usask.ca/projects/archbook/tableofcontents.php)),
and other features, could all be similarly eccentric,[^11] but they are
a key element of what makes Alice Thornton's Books *books*.



[^1]: Erik Kwakkel, *Books Before Print* (Amsterdam University Press,
    2018), 56, https://doi.org/10.1017/9781942401636.

[^2]: Several projects have focused on the marginalia of particular
    authors, eg [Whitman](https://whitmanarchive.org/manuscripts/marginalia/introduction.html);
    [Melville](https://melvillesmarginalia.org/);
    [Blake](https://blog.blakearchive.org/?s=marginalia).

[^3]: Anthony Grafton, *The Footnote: A Curious History* (Harvard
    University Press, 1999).

[^4]: Paul Schaffner, 'Re: Marginalia', *TEI-L Archives*, 28 January
    2014,
    https://listserv.brown.edu/cgi-bin/wa?A2=ind1401&L=TEI-L&D=0&P=68937.

[^5]: Laura Estill, 'Encoding the Edge: Manuscript Marginalia and the
    TEI', *Digital Literary Studies* 1, no. 1 (5 May 2016),
    https://doi.org/10.18113/P8dls1159715.

[^6]: Christopher Ohge, *Publishing Scholarly Editions: Archives,
    Computing, and Experience* (Cambridge University Press, 2021),
    65--66, http://www.cambridge.org/core/elements/publishing-scholarly-editions/D5A9FCEA4DECF1DE798B938BA48B2ED3.

[^7]: Book 1: 286ff; Book Rem: 186ff

[^8]: 'ArchBook: Architectures of the Book --
    &lt;em&gt;Signes-de-Renvoi&lt;/em&gt;', 3 March 2022, https://web.archive.org/web/20220303113341/http://drc.usask.ca/projects/archbook/signes_de_renvoi.php.

[^9]: Kwakkel, *Books Before Print*, 47, notes how space for margins had
    to be planned before writing the manuscript book could even begin.

[^10]: See, for example, Harold Love, *Scribal Publication in
    Seventeenth-Century England* (Oxford: Oxford University Press,
    1993);
    Peter Beal, *In Praise of Scribes: Manuscripts and Their Makers in
    Seventeenth-Century England* (Oxford, 1998); Mark Bland, *A Guide to
    Early Printed Books and Manuscripts* (John Wiley & Sons, 2013).

[^11]: There is, for example, a solitary example of a
    [catchword](https://en.wikipedia.org/wiki/Catchword) in the four
    books (*Book 2*, 17).
