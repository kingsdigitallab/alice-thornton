{% comment %}
Renders the given array of person ids as a comma separated list of names
people: array of person ids e.g. ['bobama']
{% endcomment %}
{% assign selected_people = collections.people | lookup:'.data.slug',people %}

{%- for person in selected_people -%}
<span class="person-link">
{{ person.data.firstName }} {{ person.data.lastName }}
</span>
{%- endfor -%}
