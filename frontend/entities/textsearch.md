---
title: Search
searchTab: text
eleventyNavigation:
  key: Search
  order: 4
---

{% raw %}

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search">
{% endraw %}
    {% include "search_tabs.liquid" %}
{% raw %}
    <p class="tab-intro">
        Start typing to find relevant passages within the modernised edition. 
        For exact matches put the word/phrase in double quotation marks. 
        Results can be filtered by Book.
    </p>
    <div id="text-search">
    </div>
</div>
<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        let pageFind = new PagefindUI({ 
            element: "#text-search", 
            showSubResults: false,
            pageSize: 15,
            showImages: false,
            autofocus: true,
            sort: { "book-page": "asc" },
            openFilters: ['Book', "Version"]
        });
        const params = new URLSearchParams(window.location.search);
        const userQuery = params.get('q');
        pageFind.triggerFilters({ "version": [ "Modernised" ] });
        if (userQuery) {
            pageFind.triggerSearch(userQuery)
        }
    });
</script>
{% endraw %}
