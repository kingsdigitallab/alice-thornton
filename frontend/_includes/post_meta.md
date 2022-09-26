<p class="post-meta">
  {% include 'post_categories_names.md', categories: post.categories %} article
  published by <strong>{% include 'people_names.md', people: post.authors %}</strong>
  on {{ post.page.date | date:metadata.date_format }}
  {% if post.tags.1 %}
  {% for tag in post.tags %}{% if tag != 'posts' %}<span class="tag is-info is-light">{{ tag }}</span>{% endif %}{% endfor %}
  {% endif %}
</p>
