# Alice Thornton project code

The website is developed using a Static Site Generator called [11ty](https://www.11ty.dev/).

## Installing 11ty

You need [node.js v16+ & npm installed on your machine](https://nodejs.dev/download/).

To install 11ty, run the following command from within alice-thornton folder.

`npm ci`

## Generating the site

To generate the whole static site into the _site folder.

`npm run build`

To run it as a development server:

`npm run serve`

Then go to [localhost:8000](localhost:8000). Each time you modify a source file, 11ty will automatically rebuild the site and refresh it in your browser.

