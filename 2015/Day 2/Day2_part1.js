const lineReader = require('line-reader');

main();

function main() {
  let totalPaper = 0;

  lineReader.eachLine('input.txt', function (line, last) {
    const dimensions = line.split('x');

    if (dimensions.length == 3) {
      totalPaper += getAreaNeeded(dimensions);
    }

    if (last) {
      console.log(
        totalPaper,
        ' square feet of wrapping paper must be ordered.',
      );
    }
  });
}

function getAreaNeeded(dimensions) {
  let length = dimensions[0];
  let width = dimensions[1];
  let height = dimensions[2];

  let area1 = length * width;
  let area2 = width * height;
  let area3 = height * length;
  let minArea = Math.min(area1, area2, area3);

  return 2 * (area1 + area2 + area3) + minArea;
}
