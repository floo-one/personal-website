module.exports = function(eleventyConfig) {
  // Create a collection for the sections and sort them by order
  eleventyConfig.addCollection("sections", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/*.md").sort((a, b) => a.data.order - b.data.order);
  });

  // Create a collection for the blog posts and sort them by date
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date);
  });

  // Add collections for public, private, and draft blog posts
  eleventyConfig.addCollection("publicBlog", function(collection) {
    return collection.getAll().filter(function(item) {
      return item.data.privacy === "public";
    });
  });

  eleventyConfig.addCollection("privateBlog", function(collection) {
    return collection.getAll().filter(function(item) {
      return item.data.privacy === "private";
    });
  });

  eleventyConfig.addCollection("draftBlog", function(collection) {
    return collection.getAll().filter(function(item) {
      return item.data.privacy === "draft";
    });
  });
};
