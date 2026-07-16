---
title: "TEI and Narratives of Events in Alice Thornton's Books"
feature: /assets/img/posts/malton_Church_Festival_wmc_ccbysa30_detail.jpg
status: live
authors:
  - showard
tags:
  - TEI
  - illness
  - childbirth
---

In an [earlier post](https://thornton.kdl.kcl.ac.uk/posts/blog/2022-08-25-encoding-alice-thorntons-books/), I introduced some ways in which TEI markup and linkage can help the project to analyse patterns in Alice's writing and trace differences between her books, focusing on mentions of people. The project is also using TEI to mark up her descriptions of _events_ and link them across the books.

![photograph of an old church with market stalls in the foreground]({{"/assets/img/posts/malton_Church_Festival_wmc_ccbysa30.jpg" | url}} "[Malton Church and Market (2010)](https://commons.wikimedia.org/wiki/File:Church_Festival.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0), via Wikimedia Commons"){.media-left}

> My dear husband William Thornton
> Esquire went to Malton to sister Portington
> on Friday the 11th of September 1668, and
> was much as he used to be of late pretty
> well of his infirmity.[^1]

> But the time of that fair at Malton was come, and my
> dear heart would needs go thither, pretending to me some
> earnest business to speak with some about some money owed
> him. And I seeing a fit of his palsy drawing on was extremely
> against his going at that time.[^2]

There are striking differences between these two accounts of the same event a few days before William Thornton's death in September 1668. Why? We think that Alice Thornton wrote the first within a few months of his death and the second many years later. In the course of the later book it transpires that he had gone to Malton seeking revenge for slurs against Alice put about by one Mr Tancred, but she didn't know of this until some time later. It seems likely that this distressing piece of information influenced her later memory (which, as we already know, [was not always reliable](https://thornton.kdl.kcl.ac.uk/posts/blog/2022-07-25-alice-thornton-middleham-castle/)).

## Identifying and linking events

The project has been compiling a reference list of events in the books, which is a crucial resource both for linking mentions of events in the texts, and for thinking about their varying significance and relationships between them.

Even so, locating individual mentions of events within the texts can be difficult. Descriptions of events can be highly varied, encompassing anything from one sentence to several pages. Alice's prose is complex, and one event may flow into another - and back again - in ways that defy pinpointing for markup.

![title page: Scarbrough Spaw, or, A description of the nature and vertues of the spaw at Scarbrough in Yorkshire. Also a treatise of the nature and use of water in general, and the several sorts thereof, as sea, rain, snow, pond, lake, spring, and river water, with the original causes and qualities... By Robert Wittie, Dr. in Physick.]({{"/assets/img/posts/thornton_books_2022-Jun-08_scarborough-spaw.jpg" | url}} "Robert Wittie, 'Scarbrough-Spaw' (1667), frontispiece."){.media-right}

In most cases matching up events across books is quite straightforward, but there are exceptions. A mention of an event may be very short, so that it's difficult to be certain if it is the same as a longer version elsewhere, and Alice's dating is not always consistent. This one initially caught us out.

> 1658<br>
> The weakness of my body continued so great and long
> after my hard childbirth of my son that it brought me
> almost into a consumption, none expecting for many days
> together that I should at all recover, and when it was
> done I was lame almost a quarter of a year of my left
> knee, that I got in my labour.[^3]

> My Cure of Bleeding at Scarborough August 1659.<br>
> It was the good pleasure of God to continue me most wonderfully,
> though in much weakness, after that excessive loss of blood & spirits
> in childbed, with the continuance of lameness above 20 weeks after,
> and the loss of blood and strength by the bleeding of the haemorrhoids,
> which followed every day by siege and was caused by my last travail
> and torment in childbirth. Which brought me so low and weak that I fainted
> almost every day upon such occasions...[^4]

It didn't take long to work out that she was describing the same illness after giving birth to her fifth child in December 1657, but I think our initial confusion was caused by a change in narrative focus. Firstly, the two accounts have different dates, and this is because her emphasis is on different _stages_ of the same event. Not only does she emphasise different ailments, the passage in _BookRem_ only describes the illness, whereas in _Book 1_ it's just the first paragraph of a longer section in which she says much more about her treatment and cure at [Scarborough Spa](https://www.citizan.org.uk/blog/2017/Aug/24/scarborough-first-seaside-resort/). Taken together, though, the two accounts give a much fuller picture of her post-natal illness, and for how long she must have been unwell.

It's clear that not all events are of equal significance to Alice; her pregnancies and births of her children are among a number of major events that she describes repeatedly, including at least one long detailed narrative. It is these important and repeatedly described events that are of most interest to the project, but they're also the most complex and challenging to model as data.

Some types of major event lend themselves to dividing into sub-events. The narratives of pregnancy and birth, for example, have some clear repeated elements:

- early stages of awareness of being pregnant
- later illnesses or accidents during the pregnancy
- the final stages of labour and delivery
- the aftermath, notably
  - breastfeeding
  - general weakness
  - specific ailments, such as haemorrhaging

On the other hand, for example, Alice's accounts of the various legal battles, disputes over property and debts that troubled both the Wandesford and Thornton families over many years are often far less clearly structured and harder to disentangle.

## TEI markup

There are often tensions between the complexities of these narratives of life events and the demands of data structures for order and precision. They pose a particular problem for XML because it has a strictly hierarchical nested structure, but the events don't always fit neatly into the main hierarchy, in this case of section (&lt;div&gt;) and paragraph (&lt;p&gt;). A mention of an event might start in the middle of one paragraph and finish in the middle of another. Moreover, events can overlap each other, and one event might be mentioned (often briefly) in the middle of another largely unrelated event. Event mentions can become "fragmented" in other ways: for example, Alice might interrupt describing an event with a brief prayer or meditation and then resume her narrative flow.

TEI has a number of methods for handling the problem of overlapping structures[^5], but they often have downsides, particularly that they're less straightforward to work with and to process than nested tags. The project is using a [boundary marking](https://tei-c.org/release/doc/tei-p5-doc/en/html/NH.html#NHBM) technique in which the beginning and end of an event mention are marked up with "empty" tags (&lt;[milestone](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-milestone.html)/&gt; and &lt;[anchor](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-anchor.html)/&gt;), linked with a [@spanTo](https://tei-c.org/release/doc/tei-p5-doc/de/html/ref-att.spanning.html) attribute. We then have various options to link together fragmented mentions, such as [@next and @prev](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-att.global.linking.html) attributes or &lt;[join](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-join.html)&gt; tags.

Identifying, tagging and linking events are all considerably more challenging than the same task for entities such as names and places, but of crucial importance to the project. This work will make it possible to search and compare the ways in which Alice changed her accounts of key events in her life.

## Notes

[^1]: The text quoted above is from our work-in-progress edition of Alice Thornton's Books. The text is modernised in the body of the blog and the semi-diplomatic transcription is reproduced here in the notes. 'My deare Husband Will.m Thornton Esq went to Malton to sister Portington on fridy the 11th of September 1668. & was much as he used to be of late pritty well of his infirmity': Alice Thornton, _Book of Remembrances_ (_Book Rem_), Durham Cathedral Library, GB-0033-CCOM 38, 151.
[^2]:
    'But the time of that faire att maulton was come, and my
    deare heart, would needs goe thither. prettending to me some
    earnest bussiness to speake with somme, about some monney owed
    him. & I seeing a fitt of his Pallsye drawing on, was extreamly
    against his goeing att that time': _Book 3: The Second Book of My Widowed Condition_, British Library MS Add 88897/2, 96.

[^3]: '1658 The weakenesse of my bodie continued So great and long affter my hard Child birth of my sonne. that it brought me allmost into a consumtion. non expecting for manye daies together that I should at all recover. & when it was don I was lame allmost a qr of a yeare of my left knee, that I gott in my labour': _Book Rem_, 32.
[^4]:
    'My Cure of Bleeding at Scarbrough August. 1659. <br>
    It was the good pleasure of God to contineue me most
    wonderfully, though in much weakenesse, affter that excessive
    losse of Blood & spiritts, in Childe bed, with the contineuance
    of lamenesse aboue 20 weekes affter, and the losse of blood
    & strength by the bleeding of the Hemorides, which followed
    every day by seige and was caused by my last travell
    & torment in Childebirth. which brought me soe low & weake
    that I fainted allmost every day uppon such occasions...': Alice Thornton, _Book 1: The First Book of My Life_, BL MS Add 88897/1, 153.

[^5]: TEI _Guidelines_ (version 4.5.0), ["Chapter 20: Non-hierarchical Structures"](https://tei-c.org/release/doc/tei-p5-doc/en/html/NH.html)
