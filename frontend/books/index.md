---
title: The Four Books By Alice Thornton
eleventyNavigation:
  key: Books
  order: 1
---

## Digital Edition

This project (2021-25) has resulted in an an interactive and fully searchable digital edition of Alice Thornton’s autobiographical Books, freely accessible here.

The text of all four manuscripts are available to read in both fully modernised and semi-diplomatic versions, either separately or side-by-side. As we are using the widely recognised Text Encoding Initiative (TEI) markup schema, the edition is fully searchable (for example, users can trace people, places and events across all four Books).

<div class="bookshelf">
  {%- assign books = collections.books | sort:"data.bookOrder" -%}
  {%- for abook in books -%}
    {% if abook.url != page.url %}
      <figure class="book columns">
        <a href="{{ abook.url | url }}" class="column is-half">
          <img src="{{ abook.data.image }}" alt="Photograph of the original front of book, very used scuffed faded covers, showcasing charm and elegance">
        </a>
        <div class="column is-half is-flex is-flex-direction-column">
          <h3>{{ abook.data.title }}</h3>
          <figcaption>
            {{ abook.data.holdingArchive }},<br>
            {{ abook.data.itemLocation }}
          </figcaption>
          <div class="book-buttons">
          {% if abook.data.isReadable %}<a href="viewer/?p0.do={{ abook.fileSlug }}&p0.vi=modern" class="button is-primary">Read the edition</a>{% endif %}<br>
            <a href="{{ abook.url | url }}" class="button is-secondary">Book details</a>
          </div>
        </div>
      </figure>
    {% endif %}
  {%- endfor -%}
</div>

Although we have not digitised the manuscripts, we have provided some sample images from each of them to offer a sense of how the original materials look.


## Background

When Alice Thornton died in 1707, she bequeathed ‘three Books of my own Meditations and Transactions of my life, and all the residue of my Papers and Books written with my own hand’ to her daughter, Alice Thornton Comber. In addition to those three manuscript books, there exists another, smaller manuscript known as her _Book of Remembrances_.

In the introduction to his nineteenth-century edition, Charles C. Jackson refers to all four manuscripts; after this, however, the location of the manuscript books was unclear for many years.

In 1982 and 1994, two manuscripts re-emerged and were sold to a private buyer, Paula Peyraud. These manuscript books were resold in 2009 and are now held at the British Library (BL).

In 2018 and 2019, Cordelia Beattie located the other two manuscripts: one was still in the hands of the Comber family and the other had been in the possession of Durham Cathedral Library (DCL) since 1969 but had been misidentified in the catalogue. Today, both manuscript books form part of the [Comber Collection](https://n2t.durham.ac.uk/ark:/32150/s2hm50tr76x.xml) at DCL.

These are the four Books that make up our digital edition.

It has become common to refer to Thornton’s Books as the _Book of Remembrances_ (DCL, GB-0033-CCOM 38), _Book 1_ (BL, Add. MS 88897/1), _Book 2_ (DCL, GB-0033-CCOM 7), and _Book 3_ (BL, Add. MS 88897/2). However, material evidence suggests that the relationship between Thornton’s Books is not straightforwardly sequential. A key issue this project sought to address, using our editorial and markup practice, is why and how these Books are interconnected.

We prefer the following fuller titles, which use descriptions derived from her writings:

- _Book of Remembrances_
- _Book 1: The First Book of My Life_
- _Book 2: The First Book of My Widowed Condition_
- _Book 3: The Second Book of My Widowed Condition_

However, for ease of reference, we also use abbreviated titles:

- _Book Rem_
- _Book 1_
- _Book 2_
- _Book 3_
