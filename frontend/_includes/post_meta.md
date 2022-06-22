<p class="post-meta">
  {% include 'post_categories_names.md', categories: post.categories %} article
  published by <strong>{% include 'people_names.md', people: post.authors %}</strong>
  on {{ post.page.date | date:metadata.date_format }}
</p>
