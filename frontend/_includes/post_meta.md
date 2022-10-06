<p class="post-meta">
  {%- include 'post_categories_labels.md' -%} article
  published by <strong>{% include 'people_names.md', people: post.authors %}</strong>
  on {{ post.page.date | date:metadata.date_format }} 
  {%- if post.tags.1 -%}
    {%- for tag in post.tags -%}
      {% assign cats = metadata.postCategories | lookup:".tag",tag %}
      {%- if tag != 'posts' and cats.length < 1 -%}
        <a href="/posts/tags/{{tag}}/" class="tag is-info is-light">{{ tag }}</a>
      {%- endif -%}
    {%- endfor -%}
  {%- endif -%}
</p>
