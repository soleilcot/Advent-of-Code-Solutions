const readline = require('readline');
const fs = require('fs');

readInput();

function stripQuotes(str) {
  return str.replace(/^"|"$/g, '');
}

function getNumInCode(str) {
  return str.trim().length;
}

function getNumInMemory(str) {
  str = stripQuotes(str);
  return str.replace(/\\\\|\\"|\\x[0-9A-Fa-f]{2}/g, '?').length;
}

function readInput() {
  const fileStream = fs.createReadStream('input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let numInCode = 0;
  let numInMemory = 0;

  rl.on('line', (line) => {
    numInCode += getNumInCode(line);
    numInMemory += getNumInMemory(line);
  });

  rl.on('close', () => {
    console.log(numInCode - numInMemory);
  });

  rl.on('error', (err) => {
    console.log(err);
  });
}
