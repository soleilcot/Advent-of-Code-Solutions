const fs = require('fs');

main();

function main() {
  //Variable declaration
  const sInput = readInput();
  let nCurrentFloor = 0;
  let pos = 0;

  //Iterate through the string and process inputs
  for (const value of sInput) {
    if (value == '(') {
      nCurrentFloor++;
    } else {
      nCurrentFloor--;
    }

    //Increment the couter that is keeping track of string position index
    pos++;

    if (nCurrentFloor == -1) {
      break;
    }
  }

  console.log('Santa enters the basement at position ', String(pos));
}

//Helper to read the necessary input locally from file
function readInput() {
  try {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
