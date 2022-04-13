# Netlify CMS admin area

## Questions

* filter out 11ty index and other non-collection pages?
    * re-arange 11ty content instead 
    * possible to filter by field=value
    *also possible to filter by file extension
* pre-defined choices for certain fields (e.g. categories)?
    * possible
* filter by field values?
    * use facets to filter but no user input
* search by field value (e.g. firstName="Bill")?
    * BUT search is only for the identifier...
* add fields to the list display?
    * use summary: "{{ fields.firstName }}"
* how customisable is the md editor (e.g. new formats)?
    * https://www.neotericdesign.com/articles/editor-components-with-netlify-cms/
* is there a widget for a reference to another collection?
    * yes: https://www.netlifycms.org/docs/widgets/#relation
    * also accepts multiple values in a relation field (e.g. authors)
* can sort by any field?
    * yes: sortable_fields
* faceting:
    * yes: view_groups
* nested content/fields:
    * yes: use Object widget, very handy for complex entities or compliance to hierarchical standards.

## Observations

* Two main issues:
    * 1. not possible to search collection by other fields than the identifier (i.e. filename)
    * 2. support for hierarchy of pages/files is limited. It can scan subdirectories but the list display remains flat.
    * 3. not UI to order items in collection

* best feature: it can run off the website. No need to have one CMS app hosted on our servers for each site >>> headless CMSes. BUT we need a single github authentication instance.

* easier for netlify if the posts all in the same dir and the categories are represented with a tag or special fields. Folder for categories is better for direct github categorisation and edition though.
    * even if possible for netlify to support that, it would be more coding and replication of logic between CMS and 11ty.
    * this thus means that netlify influences the way 11ty content is organised. Flat lists are better.
    * also why we have to use category fields for news/blog. We can't predefined tags in CMS because open tags. But then 11ty can't find news through collection (unless we defined it in JS).
* no good support for tree / sub-folders (e.g. sub-pages)
* CMS doesn't understand 11ty tags, and thus maps content type to folders => another reason to put all pages under a pages folder rather than root.

