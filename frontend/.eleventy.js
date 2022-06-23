const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const utils = require("./_includes/js/utils.js");
const inspect = require("util").inspect;
const markdownItFootnote = require("markdown-it-footnote");
const markdownIt = require("markdown-it");
const path = require("node:path");
const sass = require("sass");
const debug = require("debug")("Eleventy:KDL");
const eleventySass = require("eleventy-sass");

module.exports = function (config) {
  let options = {
    html: true, // Enable HTML tags in source
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true, // Autoconvert URL-like text to links
  };
  // configure the library with options
  let markdownLib = markdownIt(options).use(markdownItFootnote);
  // set the library to process markdown files
  config.setLibrary("md", markdownLib);

  config.addPlugin(eleventyNavigationPlugin);

  // config.on("eleventy.after", (dir) => {
  //   console.log("Validate HTML", dir);
  // });

  utils.configureSass(config);

  // Problem1: impossible to exclude .sass files, bulma assumes var
  // declared before theyare parsed but their name doesn't start with _.
  // Problem2: sutainable? only one maintainer.
  // config.addPlugin(eleventySass);

  // just copy the assets folder as is to the static site _site
  // config.addPassthroughCopy("assets");
  // config.addPassthroughCopy("assets/css");
  config.addPassthroughCopy("**/*.css");
  config.addPassthroughCopy("assets/fonts");
  config.addPassthroughCopy("assets/img");
  config.addPassthroughCopy("assets/js");

  // just copy the admin folder as is to the static site _site
  // config.addPassthroughCopy("admin");

  // {{ myvar | debug }} => displays full content of myvar object
  config.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);

  // Returns all entries from an array which have a given value for a given property
  // Note: this filter can't beused in a {% for loop, use {% assign first
  // {{ collections.posts | lookup:'.categories','news' }}
  config.addFilter(
    "lookup",
    function (collection, property_path, accepted_values) {
      return utils.lookup(collection, property_path, accepted_values);
    }
  );

  config.addFilter("sortby", function (collection, property_name) {
    return collection.sort(
      (a, b) => a.data[property_name] - b.data[property_name]
    );
  });

  config.addFilter("hasContent", function (item) {
    return item.template.frontMatter.content.length > 5;
  });

  config.addFilter("includes", function (collection, accepted_values) {
    let ret = utils.lookup(collection, "", accepted_values);
    return ret.length > 0;
  });

  config.addFilter("contains", (a, b) => a.includes(b));

  config.addFilter(
    // TODO: avoid truncating an element e.g. "[...]<img "
    "excerpt",
    (s) => s.substring(0, 200) + "..."
  );
};
