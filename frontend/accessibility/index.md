---
title: Accessibility Statement for Alice Thornton's Books
---

This statement applies to the Alice Thornton's Books site (https://thornton.kdl.kcl.ac.uk/).

This website is run by [King's Digital Lab, King's College London (KDL)](https://kdl.kcl.ac.uk) in collaboration with the [University of Edinburgh](https://www.ed.ac.uk/). We want as many people as possible to be able to use this website. For example, that means you should be able to:

- zoom in up to 200% without the text spilling off the screen
- navigate most of the website using just a keyboard
- listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)

We’ve also made the website text as simple as possible to understand.

[AbilityNet](https://mcmw.abilitynet.org.uk/) has advice on making your device easier to use if you have a disability.

## <a id="how"></a>How accessible this website is

We know some part of this website are not fully accessible:

### Various pages

- On the Edition and Search pages the content is handled with [VueJS](https://vuejs.org/) and we are aware that the rendered HTML includes custom tags that don't pass the [W3 Validator](https://validator.w3.org/). This may interfere with assistive technologies;
- The top navigation menu on every page will not show the last items when the browser zoom level exceeds 200%

### Edition page

- The text of the edition use a narrow range of html elements, rather than the most meaningful ones matching their editorial function. The function is mainly conveyed through visual style and can't be parsed and expressed by assistive technologies such as screen readers.
- The book, version and page selectors may cause issues with assistive technologies due to missing labels;
- The mentions of blank or deleted pages, lines or words on the Edition may be difficult to read due to the lack of contrasting color with the background. The ⊢ ⊣ symbols demarcating events also lack sufficient contrast.
- Some elements are not fully accessible through keyboard navigation alone, and may not work consistently across all browsers, namely:
  - the information box for underlined entries (such as people, place names, and events) in the text are not accessible; 
  - the keyboard outline for the clone button on each panel appears out of sequential order;
  - after clicking on image icon to open modal image window it may not be possible to use keyboard navigation to close that window.
- Although it is possible to access the controls to change the book, the version and the current page using the keyboard, there are unwanted or hidden elements between those controls that greatly complicate the transition between the controls.
- The clone button is hidden in 200% zooming to avoid overcrowding the screen with too many panes. It may not be working consistently across all browsers;

### Index page

- the long list of filters may cause issues for keyboard navigation alone. Due to some limitation of the design and layout, it is not possible to bypass the filters to view the search results. Users may find similar issues when they enlarge the page to 200% zoom;

### Timeline page

- When the page is enlarged beyond 150%, the Guidelines and Key drawer on the right hand side will not show completely on screen. The text on the timeline itself will not resize proportionally with the zoom level and remain smaller than it should be.
- When using the keyboard to navigate the years, the Enter key will open a modal window with the events on that year. To close the model window, users need to press Enter again. Pressing the tab key on the modal is not recommended as it may move the focus to elements hidden under the modal.

## Reporting accessibility problems with this website

Please email Jo.Edge@ed.ac.uk with details of the problems.

## Compliance status

This website is partially compliant with the Web Content Accessibility Guidelines version 2.1 AA standard, due to the non-compliances listed above and the work in progress still happening on the site.

## What we’re doing to improve accessibility

This wesite is hosted by KDL, but the development ended in February 2025 and accessibility issues will only be minimally looked after during our yearly maintenance schedule. The above list of known issues is most likely final.

## Preparation of this accessibility statement

This statement was initally prepared on 7 July 2022. It was **last reviewed on 25 Februart 2024** by Geoffroy Noël.

This website was last tested on 25 Februat 2025. The test was carried out by KDL.

We used this approach to decide on a sample of pages to test:

- The <a href="/">Homepage</a>
- The <a href="/books/">Books listing</a> page
- The <a href="//books/book_of_remembrances/">Book of Rememberances </a> page
- The <a href="/about/">About</a> page
- The <a href="/posts/">Blog listing</a> page
- The <a href="/posts/blog/2023-09-15-digital-edition-eleanor-picks/">Blog</a> page
- The <a href="/entities/">Entity Index</a> page
- The <a href="/entities/textsearch">Text Search</a> page
- The <a href="/viewer/?p0.vi=modern">Edition</a> page
- The <a href="/timeline/">Timeline</a> page
- The <a href="/credits/">Credits &amp; Acknowledgements</a> page
- The <a href="/edition/bibliography/">Bibliography</a> page
- The <a href="/edition/guidelines/">Edition Guidelines</a> page

This page is based on the [sample template](https://www.gov.uk/government/publications/sample-accessibility-statement/sample-accessibility-statement-for-a-fictional-public-sector-website) provided by gov.uk.
