module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("exampleShortcode", function (text) {
    return `<strong>${text}</strong>`;
  });
};
