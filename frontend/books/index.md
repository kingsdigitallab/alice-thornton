---
title: The Four Books By Alice Thornton
eleventyNavigation:
  key: Books
  order: 2
---

## Digital Edition

Over the course of the next two years, this project will produce an interactive and fully searchable digital edition of Alice Thornton’s autobiographical ‘Books’ which will be freely accessible here.

The text of all four manuscript volumes will be available to read in both fully modernised and semi-diplomatic versions, either separately or side-by-side. As we are using the widely recognised Text Encoding Initiative (TEI) markup schema, the edition will be fully searchable (for example, users will be able to trace people and events across all four volumes).

<div class="bookshelf">
  {%- assign books = collections.books | sort:"data.bookOrder" -%}
  {%- for book in books -%}
    <figure class="book columns">
      <a href="{{ book.url | url }}" class="column is-half">
        <img src="{{ book.data.image }}">
      </a>
      <div class="column is-half is-flex is-flex-direction-column">
        <h3 class="book-title">{{ book.data.title }}</h3>
        <figcaption>
          {{ book.data.holdingArchive }},<br>
          {{ book.data.itemLocation }}
        </figcaption>
        <div class="book-buttons">
          <a href="{{ book.url | url }}" class="button">About</a>
          {% if book.data.isReadable %}<a href="viewer/?p0.do={{ book.fileSlug }}" class="button is-primary">Read</a>{% endif %}
        </div>
      </div>
    </figure>
  {%- endfor -%}
</div>

Although we are not digitising the manuscripts, we will provide some sample images from each of the volumes to offer a sense of how the original materials looked.

You can now access our [partial release](https://thornton.kdl.kcl.ac.uk/books/viewer/) of 103 pages from one book, in both semi-diplomatic and modernised versions. See also our first release of the [search function](https://thornton.kdl.kcl.ac.uk/entities/).

We would appreciate all feedback so please click on the button at the bottom right or email us - alicethorntonsbooks at gmail dot com - to let us know your thoughts.

## Background

When Alice Thornton died in 1707, she bequeathed ‘three Books of my own Meditations and Transactions of my life, and all the residue of my Papers and Books written with my own hand’ to her daughter, Alice Thornton Comber. In addition to those three Books, there exists another, smaller volume known as a _Book of Remembrances_.

In the introduction to his nineteenth-century edition, Charles C. Jackson refers to all four volumes; after this, however, the location of the manuscripts was unclear for many years.

In 1982 and 1994, two volumes re-emerged and were sold to a private buyer, Paula Peyraud. These volumes were resold in 2009 and are now held at the [British Library](http://searcharchives.bl.uk/IAMS_VU2:LSCOP_BL:IAMS032-000000125) (BL).

In 2018 and 2019, Cordelia Beattie located the other two manuscripts: one was still in the hands of the Comber family and the other had been in the possession of Durham Cathedral Library (DCL) since 1969 but had been misidentified in the catalogue. Today, both volumes form part of the [Comber Collection](https://n2t.durham.ac.uk/ark:/32150/s2hm50tr76x.xml) at DCL.

These are the four books that we are in the process of preparing for our digital edition.

It has become common to refer to Thornton’s volumes as the _Book of Remembrances_ (DCL, GB-0033-CCOM 38), _Book 1_ (BL, Add. MS 88897/1), _Book 2_ (DCL, GB-0033-CCOM 7), and _Book 3_ (BL, Add. MS 88897/2). However, material evidence suggests that the relationship between Thornton’s Books is not straightforwardly sequential. A key issue this project seeks to address is why and how these volumes are interconnected.

Our editorial and markup practice aims to make this possible. We prefer the following fuller titles, which use descriptions derived from her writings:

- _Book of Remembrances_
- _Book 1: The First Book of My Life_
- _Book 2: The First Book of My Widowed Condition_
- _Book 3: The Second Book of My Widowed Condition_

However, for ease of reference, we will also use abbreviated titles:

- _Book Rem_
- _Book 1_
- _Book 2_
- _Book 3_
