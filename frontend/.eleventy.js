const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const utils = require("./_includes/js/utils.js");
const inspect = require("util").inspect;
const path = require("node:path");
const debug = require("debug")("Eleventy:KDL");
const stripHtml = require("string-strip-html");

module.exports = function (config) {
  utils.configureMarkdown(config);

  config.addPlugin(eleventyNavigationPlugin);

  utils.configureSass(config);

  // just copy the assets folder as is to the static site _site
  // config.addPassthroughCopy("**/*.css");
  config.addPassthroughCopy("assets/node_modules");
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

  config.addFilter(
    "exclude",
    function (collection, property_path, rejected_values) {
      return utils.lookup(collection, property_path, rejected_values, true);
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
    (s) => stripHtml.stripHtml(s).result.substring(0, 200) + "..."
  );
};
