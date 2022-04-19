const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const utils = require("./_includes/js/utils.js");
const inspect = require("util").inspect;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // just copy the assets folder as is to the static site _site
  eleventyConfig.addPassthroughCopy("assets");

  // just copy the admin folder as is to the static site _site
  eleventyConfig.addPassthroughCopy("admin");

  // {{ myvar | debug }} => displays full content of myvar object
  eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);

  // Returns all entries from an array which have a given value for a given property
  // Note: this filter can't beused in a {% for loop, use {% assign first 
  // {{ collections.posts | lookup:'.categories','news' }}
  eleventyConfig.addFilter(
    "lookup",
    function (collection, property_path, accepted_values) {
      return utils.lookup(collection, property_path, accepted_values);
    }
  );

  eleventyConfig.addFilter(
    "includes",
    function (collection, accepted_values) {
      let ret = utils.lookup(collection, "", accepted_values);
      return (ret.length > 0);
    }
  );

  eleventyConfig.addFilter(
    "contains", (a, b) => a.includes(b)
  );

  eleventyConfig.addFilter(
    // TODO: avoid truncating an element e.g. "[...]<img "
    "excerpt", s => s.substring(0, 200)+'...'
  )
};
