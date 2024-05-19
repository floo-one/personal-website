module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/scripts.js");

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
