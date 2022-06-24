{% comment %}
Renders the given array of category keys as a comma separated list of names
categories: array of post categories keys e.g. ['blog']
{% endcomment %}
{% assign selected_categories = metadata.post_categories | lookup:'key',categories %}
{%- for category in selected_categories -%}
<a href="/posts/{{ category.key }}" class="category-link tag is-accent">
{{ category.title }}
</a>
{%- endfor -%}
