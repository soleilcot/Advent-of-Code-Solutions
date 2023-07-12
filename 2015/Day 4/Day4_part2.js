/*
Now find one that starts with six zeroes.
*/

const crypto = require('crypto');

main();

function main() {
  let str = 'bgvyzdsv';
  let num = 0;
  let numberOfZeros = 6;
  let hash = crypto.createHash('md5');

  do {
    num++;

    //Compute the hash for this permutation
    hash.update(str + num);
    
    //Compare the first n digits of the hash to see if it matches our precision limit
  } while (
    hash.digest('Hex').substring(0, numberOfZeros) != '0'.repeat(numberOfZeros)
  );

  console.log(num);
}
