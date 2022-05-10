# Introduction to editing the web site

## Prerequisites

You will need a github account with access to the project repository and familiarity with basic github operations. 
More on this in our separate [github starter page](github.md).

## File formats

### Markdown

Files ending in .md are in [markdown format](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), a simple text-based notation to
format the body of your document for the web.

The Front-matter is an optional section in the beginning of the file used
to define metadata associated with the document. For instance the title of the document or its authors. A line with --- separate the front-matter from the body of the document.

Here's an example of a blog post in markdown:

```markdown
title: Our first blog post  
publicationDate: 
authors: 
 - jsmith
 - jdoe
categories:
 - blog
---

# Introduction

This is an example of a post written by [KDL](https://kdl.kcl.ac.uk) in markdown...

```

### HTML

Files end in with .html use the HTML5 standard instead of the simpler markdown language.

### Liquid

In both .html and .md files you may see some constructs surrounded by curly braces. They follow the Liquid notation, which is templating language to generate HTML or markdown from metadata. It is best to let developers maintain them.

## Organisation of the editable content

The .md and .html files correspond to individual web pages on the site
and their location in the folder hierarchy match the web path of those pages.

For instance /about/team.md is the markdown file that will generate the 
web page at the URL /about/team . /about/index.md would map to the /about
web page. And /index.html to the site home page, i.e. / .

You can find the blog posts and news articles under the /blogPostings folder. The people and teams are located under the /people folder.

## Editorial workflow

There are two instances of the site: one is your public site and the other 
a private **staging** site where content can be edited and preview more freely.
Each site uses a different branch in your github repository: the live site
is driven by the `main` branch whereas the staging site is driven by the `staging` branch.

Whenever a file is modified on github the site will be republished automatically so you can preview your changes.

Let KDL know when you want to publish your staging content to your live site (what we call a **release**).

## How to edit a markdown file?

As an illustration, here's how you would edit the about page (/about):

1. go to your repository on github and select the desired branch (`main` is selected by default in the dropdown just above the file list)
2. browse down to /about 
3. click the index.md file
4. you can see a basic preview of the body of the about page
5. click the pencil icon on the right side of the toolbar just above the document
6. a text editor appears to let you modify the the front-matter or the
body of the about page
7. you can click the Preview tab above the text editor to check how your
document will be rendered
8. When you are done editing, write a short sentence summarising your
changes in the text input just under the "Commit changes" heading underneath
the text editor. This will also push your changes to the branch.

