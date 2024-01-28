const { sortBy, join } = require("lodash");

 function sortAndConcatenateStrings(arr) {
    const sortedArr = sortBy(arr);
    const concatenatedString = join(sortedArr, '_');
    return concatenatedString;
  }

  module.exports = {
    sortAndConcatenateStrings
  }