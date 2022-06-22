const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const utils = require("./_includes/js/utils.js");
const inspect = require("util").inspect;
const sass = require("sass");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addTemplateFormats("scss");

  // Creates the extension for use
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    // `compile` is called once per .scss file in the input directory
    compile: async function (content, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }
      let res = sass.compileString(content);

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return res.css;
      };
    },
  });

  // just copy the assets folder as is to the static site _site
  eleventyConfig.addPassthroughCopy("assets");

  // just copy the admin folder as is to the static site _site
  eleventyConfig.addPassthroughCopy("admin");

  // {{ myvar | debug }} => displays full content of myvar object
  eleventyConfig.addFilter(
    "debug",
    (content) => `<pre>${inspect(content)}</pre>`
  );

  // Returns all entries from an array which have a given value for a given property
  // Note: this filter can't beused in a {% for loop, use {% assign first
  // {{ collections.posts | lookup:'.categories','news' }}
  eleventyConfig.addFilter(
    "lookup",
    function (collection, property_path, accepted_values) {
      return utils.lookup(collection, property_path, accepted_values);
    }
  );

  eleventyConfig.addFilter("sortby", function (collection, property_name) {
    return collection.sort(
      (a, b) => a.data[property_name] - b.data[property_name]
    );
  });

  eleventyConfig.addFilter("hasContent", function (item) {
    return item.template.frontMatter.content.length > 5;
  });

  eleventyConfig.addFilter("includes", function (collection, accepted_values) {
    let ret = utils.lookup(collection, "", accepted_values);
    return ret.length > 0;
  });

  eleventyConfig.addFilter("contains", (a, b) => a.includes(b));

  eleventyConfig.addFilter(
    // TODO: avoid truncating an element e.g. "[...]<img "
    "excerpt",
    (s) => s.substring(0, 200) + "..."
  );
};
