var readline = require('readline');
var fs = require('fs');
var schema = {}

main();

async function main(){
  await readInput();
  schema['b'] = 3176;
  console.log(findValue('a'));
}

function findValue(wire){
  if (!isNaN(wire)) return wire; //Wire identifier must be alphabetic, if not this  is a value and should be returned immediately.
  let given_by = schema[wire]; //Uses the schema to tell us how to determine the value for this wire

  //console.log(wire,given_by);
  //If the wire value is given by a number, then no processing is needed since we already know.
  if (!isNaN(given_by)){
    schema[wire] = parseInt(given_by)
    return schema[wire];
  }
  //If the wire value is dependent on other wire values that we don't know, then we must figure it out
  //using recursion
  let arr = given_by.split(' ');
  //console.log(arr);

  if (arr[0] == 'NOT'){
    schema[wire] = ~findValue(arr[1]);
  } else if (arr[1] == 'OR'){
    schema[wire] = findValue(arr[0]) | findValue(arr[2]);
  } else if (arr[1] == 'AND'){
    schema[wire] = findValue(arr[0]) & findValue(arr[2]);
  } else if (arr[1] == 'RSHIFT'){
    schema[wire] =  findValue(arr[0]) >> arr[2];
  } else if (arr[1] == 'LSHIFT'){
    schema[wire] = findValue(arr[0]) << arr[2];
  } else{
    schema[wire] = findValue(arr[0]);
  }
  return schema[wire]
}

async function readInput() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  //We need an object that given a wire identifier will tell us how to get its value
  for await (const line of rl) {
    let line_arr = line.split(' -> ');
    if (!isNaN(line_arr[1])){

      schema[line_arr[0]] = line_arr[1];
    }
    else{
      schema[line_arr[1]] = line_arr[0];
    }
  }
}
