{% comment %}
Renders a list of members for a given team key
team: the key of a team (e.g. sdt), see metadata.json
{% endcomment %}
{% assign team_members = collections.people | lookup:'.data.teams',team | sortby:'order' %}

<h3 class="subtitle"> {{ metadata.people_teams[team] }}</h3>

<div class="gallery-by-4">
  {%- for person in team_members -%}
    <div class="person">
      {%- if person | hasContent -%}<a href="{{ person.url | url }}">{%- endif -%}
        <img src="{{ person.data.image | url }}" alt="A photograph of {{ person.data.firstName }} {{ person.data.lastName }}">
        <p>
          <strong>{{ person.data.firstName }} {{ person.data.lastName }}</strong><br>
          <em>{{ person.data.jobTitle }}</em>
        </p>
      {%- if person | hasContent -%}</a>{%- endif -%}
    </div>
  {%- endfor -%}
</div>
