module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats("njk,md");

    eleventyConfig.addPassthroughCopy("src/styles.css");
    eleventyConfig.addPassthroughCopy("src/scripts.js");
    eleventyConfig.addPassthroughCopy("src/colors.css");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/light-mode-icon.png");
    eleventyConfig.addPassthroughCopy("src/dark-mode-icon.png");

    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/sitemap.xml");


    // Create a collection for the sections and sort them by order
    eleventyConfig.addCollection("sections", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/content/*.md").sort((a, b) => a.data.order - b.data.order);
    });

    console.log("Configuring Eleventy directories");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            layouts: "_includes",
            output: "dist"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};
