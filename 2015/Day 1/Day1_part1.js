const fs = require('fs');

main();

function main() {
  let sInput = readInput();

  const climbCount = (sInput.match(/\(/g) || []).length;
  const descendCount = (sInput.match(/\)/g) || []).length;

  console.log('Santa ends up on floor', String(climbCount - descendCount));
}

function readInput() {
  try {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
