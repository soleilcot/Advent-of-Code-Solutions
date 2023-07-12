const lineReader = require('line-reader');
const bubblesort = require('bubble-sort-js');

main();

function main() {
  let totalRibbon = 0;

  lineReader.eachLine('input.txt', function (line, last) {
    //Extract the dimensions from the line less the separator
    const dimensions = line.split('x');

    //If we parse out some number other than 3, the line is malformed and should be skipped.
    if (dimensions.length == 3) {
      totalRibbon += getLengthNeeded(dimensions);
    }

    if (last) {
      console.log(totalRibbon, ' feet of ribbon must be ordered.');
    }
  });
}

function getLengthNeeded(dimensions) {
  //Since we are going to be doing addition, we should convert the array elements to Number or else we will be concatenating
  dimensions = dimensions.map(Number);

  //Sort the array in ascending order
  bubblesort(dimensions);

  let shortestPerimeter = 2 * (dimensions[0] + dimensions[1]);
  let volume = dimensions[0] * dimensions[1] * dimensions[2];

  return shortestPerimeter + volume;
}
