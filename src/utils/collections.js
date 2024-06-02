module.exports = function(eleventyConfig) {
    // Create a collection for the sections and sort them by order
    eleventyConfig.addCollection("sections", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/content/*.md").sort((a, b) => a.data.order - b.data.order);
    });

    // Create a collection for the blog posts and sort them by date
    eleventyConfig.addCollection("blog", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date);
    });
};
