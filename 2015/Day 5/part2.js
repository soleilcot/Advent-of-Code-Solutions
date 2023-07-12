const fs = require('fs');

main();

function main() {
  let sInput = readInput();
  let nice_count = 0;

  for (let str of sInput) {
    if (!str) continue;
    //Declare REGEX
    let first_req = new RegExp('([a-z][a-z]).*\\1', 'i');
    let second_req = new RegExp('([a-z]).{1}\\1', 'i');

    //Process requirements for given string
    let string_requirements = [first_req.test(str), second_req.test(str)];

    //Determine if all criteria are met for niceness
    let isNice = string_requirements.every(Boolean);
    if (isNice) nice_count++;
  }
  console.log(nice_count);
  return;
}

function readInput() {
  try {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.toString().split('\n');
  } catch (err) {
    console.error(err);
  }
}
