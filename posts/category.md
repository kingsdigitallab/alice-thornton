---
# Creates /posts/news/, /posts/blog/, ... index pages
layout: posts.liquid
# so it's not treated as a post
override:tags: []
pagination:
    data: metadata.post_categories
    size: 1
    alias: category
permalink: "posts/{{category.key}}/index.html"
---
