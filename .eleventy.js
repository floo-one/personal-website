const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");


module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats("njk,md");

      eleventyConfig.addPlugin(eleventyNavigationPlugin);

      eleventyConfig.addPassthroughCopy("src/assets");
      eleventyConfig.addPassthroughCopy("src/admin");

    // Create a collection for the sections and sort them by order
    eleventyConfig.addCollection("sections", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/content/*.md").sort((a, b) => a.data.order - b.data.order);
    });

    // Create a collection for the blog _posts
    eleventyConfig.addCollection("blog", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date);
    });

    // Add a date filter using Luxon
    eleventyConfig.addFilter("dateFormat", (dateObj, format = "LLLL dd, yyyy") => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
    });

    console.log("Configuring Eleventy directories");

    return {
        dir: {
          input: "src",
          includes: "_includes",
          data: "_data",
          output: "_site"
        },

        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};
