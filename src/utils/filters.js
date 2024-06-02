module.exports = function(eleventyConfig) {
  // Example filter to format dates
  eleventyConfig.addFilter("dateFormat", function(date, format) {
    return require("luxon").DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(format);
  });

  // Add more custom filters as needed
};
