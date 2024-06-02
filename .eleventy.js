const collections = require("./src/utils/collections");
const filters = require("./src/utils/filters");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats("njk,md");

    // Add Eleventy Navigation plugin
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Passthrough copy for assets and admin directory
    eleventyConfig.addPassthroughCopy("src/assets");

    // Import collections and filters
    collections(eleventyConfig);
    filters(eleventyConfig);

    console.log("Configuring Eleventy directories");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            layouts: "_includes/layouts",
            data: "_data",
            output: "_site"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};
