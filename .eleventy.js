module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/scripts.js");
  eleventyConfig.addPassthroughCopy({
    "node_modules/jquery/dist/jquery.min.js": "js/jquery.min.js",
    "node_modules/jquery-scrollify/jquery.scrollify.js": "js/jquery.scrollify.js"
  });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
