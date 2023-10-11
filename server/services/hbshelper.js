const handlebars = require("handlebars");

handlebars.registerHelper("addOne", function (index) {
  return index + 1;
});

// Define a custom helper for concatenation
handlebars.registerHelper("concat", function () {
  // The arguments passed to the helper are accessible as arguments[]
  return Array.prototype.slice.call(arguments, 0, -1).join("");
});

module.exports = handlebars;
