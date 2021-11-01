/*
Santa needs help mining some AdventCoins (very similar to bitcoins) to use as gifts for all the economically forward-thinking little girls and boys.

To do this, he needs to find MD5 hashes which, in hexadecimal, start with at least five zeroes. The input to the MD5 hash is some secret key (your puzzle input, given below) followed by a number in decimal. To mine AdventCoins, you must find Santa the lowest positive number (no leading zeroes: 1, 2, 3, ...) that produces such a hash.

For example:

If your secret key is abcdef, the answer is 609043, because the MD5 hash of abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest such number to do so.
If your secret key is pqrstuv, the lowest number it combines with to make an MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of pqrstuv1048970 looks like 000006136ef....
*/

const crypto = require('crypto');
const { mainModule } = require('process');

main();

function main(){
    let str = 'bgvyzdsv';
    let num = 0;
    let numberOfZeros = 5

    do{
        num++;
        //Instantiate the hash object
        var hash = crypto.createHash('md5')
        //Compute the hash for this permutation
        hash.update(str+num);
        //Compare the first n digits of the hash to see if it matches our precision limit
    } while(hash.digest('Hex').substring(0,numberOfZeros) != '0'.repeat(numberOfZeros))

    console.log(num)
};
