<p class="post-meta">
  {% include 'post_categories_names.md', categories: post.categories %} article
  published by {% include 'people_names.md', people: post.authors %}
  on {{ post.page.date | date:metadata.date_format }}.
  <br>
</p>
