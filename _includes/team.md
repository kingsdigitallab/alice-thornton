{% comment %}
Renders a list of members for a given team key
team: the key of a team (e.g. sdt), see metadata.json
{% endcomment %}
{% assign team_members = collections.people | lookup:'.data.teams',team %}

<h3 class="subtitle"> {{ metadata.people_teams[team] }}</h3>

<div class="team">
  {%- for person in team_members -%}
    <div class="person">
      <img src="{{ person.data.image | url }}" alt="A photograph of {{ person.data.firstName }} {{ person.data.lastName }}">
      <p>
        {{ person.data.firstName }} {{ person.data.lastName }}
        <br>
        {{ person.data.title }}
      </p>
    </div>
  {%- endfor -%}
</div>
