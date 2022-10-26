---
layout: base.liquid
# so it's not treated as a post
override:tags: []
title: "Tags applied to posts"
isContentHTML: true
---

<ul>
  {% for postsTag in collections.postsTags %}
    <li><a href="{{ postsTag.name }}/">{{ postsTag.name }} ({{ postsTag.count }})</a></li>
  {% endfor %}
</ul>
