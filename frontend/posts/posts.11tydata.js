module.exports = {
  layout: "post.liquid",
  tags: "posts",
  eleventyComputed: {
    // returns the postCategory (see metadata.json) of this post
    postCategory: (data) =>
      data.metadata.postsCategories.filter((c) => data.tags.includes(c.tag))[0],
  },
};
