---
title: Text Search
---

{% raw %}
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        new PagefindUI({ 
            element: "#search", 
            showSubResults: false,
            pageSize: 15,
            showImages: false,
            autofocus: true,
            sort: { "book-page": "asc" }
        });
    });
</script>
{% endraw %}
