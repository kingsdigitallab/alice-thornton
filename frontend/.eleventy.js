const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const utils = require("./_includes/js/utils.js");
const inspect = require("util").inspect;
const path = require("node:path");
const debug = require("debug")("Eleventy:KDL");
// TODO: import shouldn't need the ()
const metadata = require("./_data/metadata.js")();
const stripHtml = require("string-strip-html");

// https://plug11ty.com/plugins/table-of-contents/
const pluginTOC = require("eleventy-plugin-toc");

module.exports = function (config) {
  utils.configureMarkdown(config);

  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(pluginTOC);

  utils.configureSass(config);

  // just copy the assets folder as is to the static site _site
  // config.addPassthroughCopy("**/*.css");
  // TODO: check assets/css ?
  config.addPassthroughCopy("assets/node_modules");
  config.addPassthroughCopy("assets/fonts");
  config.addPassthroughCopy("assets/img");
  config.addPassthroughCopy("assets/js");

  let postsCategoriesTags = metadata.postsCategories.map((c) => c.tag);
  config.addCollection("postsCategoriesTags", function (collectionApi) {
    return postsCategoriesTags;
  });

  // all non-draft posts, in reverse chronological order
  function getLivePosts(collectionApi) {
    return collectionApi
      .getFilteredByTag("posts")
      .reverse()
      .filter((post) => {
        return post?.data?.status != "draft";
      });
  }

  // all non-draft posts, in reverse chronological order
  config.addCollection("postsLive", function (collectionApi) {
    return getLivePosts(collectionApi);
  });

  // all tags applied to posts
  config.addCollection("postsTags", function (collectionApi) {
    let ret = {};
    getLivePosts(collectionApi).map((post) => {
      for (let tag of post.data.tags) {
        if (!postsCategoriesTags.includes(tag)) {
          ret[tag] = ret[tag] || { name: tag, count: 0 };
          ret[tag].count++;
        }
      }
    });
    ret = Object.values(ret).sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase()
        ? -1
        : a.name.toLowerCase() == b.name.toLowerCase()
        ? 0
        : 1
    );
    return ret;
  });

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

  // TODO: duplicate with liquid: a contains b ?
  config.addFilter("contains", (a, b) => a.includes(b));

  config.addFilter(
    // TODO: avoid truncating an element e.g. "[...]<img "
    "excerpt",
    (s) => stripHtml.stripHtml(s).result.substring(0, 200) + "..."
  );
};
