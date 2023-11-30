module.exports = {
  eleventyComputed: {
    // see metadata.js, returns true if the book has visible pages
    isReadable: (data) =>
      data.metadata?.text_viewer?.visible_documents[data.slug]?.length !== 0,
  },
};
