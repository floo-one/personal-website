const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats("njk,md");

    eleventyConfig.addPassthroughCopy("src/styles.css");
    eleventyConfig.addPassthroughCopy("src/blog-styles.css");
    eleventyConfig.addPassthroughCopy("src/colors.css");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/light-mode-icon.png");
    eleventyConfig.addPassthroughCopy("src/dark-mode-icon.png");
    eleventyConfig.addPassthroughCopy("src/scripts.js");
    eleventyConfig.addPassthroughCopy("src/authentication.js");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/sitemap.xml");

    // Create a collection for the sections and sort them by order
    eleventyConfig.addCollection("sections", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/content/*.md").sort((a, b) => a.data.order - b.data.order);
    });

    // Create a collection for the blog posts
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
            layouts: "_includes",
            output: "dist"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};
