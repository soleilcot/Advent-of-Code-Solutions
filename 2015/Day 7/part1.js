const readline = require('readline');
const fs = require('fs');

readInput((err, schema) => {
  if (err) {
    console.error('An error occurred:', err);
    return;
  }

  let result = findValue('a', schema);
  console.log(result);
});

function findValue(wire, schema) {
  if (!isNaN(wire)) return wire; //Wire identifier must be alphabetic, if not this  is a value and should be returned immediately.
  let given_by = schema[wire]; //Uses the schema to tell us how to determine the value for this wire

  //console.log(wire,given_by);
  //If the wire value is given by a number, then no processing is needed since we already know.
  if (!isNaN(given_by)) {
    schema[wire] = parseInt(given_by);
    return schema[wire];
  }
  //If the wire value is dependent on other wire values that we don't know, then we must figure it out
  //using recursion
  let arr = given_by.split(' ');
  //console.log(arr);

  if (arr[0] == 'NOT') {
    schema[wire] = ~findValue(arr[1], schema);
  } else if (arr[1] == 'OR') {
    schema[wire] = findValue(arr[0], schema) | findValue(arr[2], schema);
  } else if (arr[1] == 'AND') {
    schema[wire] = findValue(arr[0], schema) & findValue(arr[2], schema);
  } else if (arr[1] == 'RSHIFT') {
    schema[wire] = findValue(arr[0], schema) >> arr[2];
  } else if (arr[1] == 'LSHIFT') {
    schema[wire] = findValue(arr[0], schema) << arr[2];
  } else {
    schema[wire] = findValue(arr[0], schema);
  }
  return schema[wire];
}

function readInput(callback) {
  const fileStream = fs.createReadStream('input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let schema = {};

  rl.on('line', (line) => {
    let line_arr = line.split(' -> ');
    if (!isNaN(line_arr[1])) {
      schema[line_arr[0]] = line_arr[1];
    } else {
      schema[line_arr[1]] = line_arr[0];
    }
  });

  rl.on('close', () => {
    callback(null, schema);
  });

  rl.on('error', (err) => {
    callback(err);
  });
}

