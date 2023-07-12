const readline = require('readline');
const fs = require('fs');

readInput();

function encodeQuotes(str) {
  return str.replace(/"/g, '\\"');
}

function encodeSlashes(str) {
  return str.replace(/\\/g, '\\\\');
}

function getNumInCode(str) {
  return str.trim().length;
}

function wrapInQuotes(str) {
  return `"${str}"`;
}

function getNumInNewRep(str) {
  str = encodeSlashes(str);
  str = encodeQuotes(str);
  str = wrapInQuotes(str);

  return str.length;
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
    numInMemory += getNumInNewRep(line);
  });

  rl.on('close', () => {
    console.log(numInMemory - numInCode);
  });

  rl.on('error', (err) => {
    console.log(err);
  });
}
