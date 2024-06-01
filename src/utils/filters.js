module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("exampleFilter", function (value) {
    return value.toUpperCase();
  });
};
