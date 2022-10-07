module.exports = {
  // why? to allow the same included fragment to be used from
  // a page (e.g. a post):            {% include X.md, post: context %}
  // and from a loop (post in posts): {% include X.md, post: post.data %}
  // otherwise the front matter data is addressed differently
  // which means we have to pass the all specific data to the {% include
  // see how it's being used on post_meta.liquid
  context: (data) => data,
  date: (data) => data.page.date,
  slug: (data) => data.page.fileSlug,
  body_class: (data) => {
    let ret = "";
    if (data.tags) {
      for (let tag of data.tags) {
        ret += "type-" + tag + " ";
      }
    }
    ret = ret || "type-page ";
    ret += "slug-" + data.page.fileSlug;
    return ret;
  },
  authors: (data) => {
    return data.authors || data.metadata.authors;
  },
  pageShortTitle: (data) => {
    return data?.eleventyNavigation?.key || data.title;
  },
};
