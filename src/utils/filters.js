const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    // Add a date filter using Luxon
    eleventyConfig.addFilter("dateFormat", (dateObj, format = "LLLL dd, yyyy") => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
    });
};
