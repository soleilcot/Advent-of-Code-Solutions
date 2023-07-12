const fs = require('fs');

main();

function main(){
    let sInput = readInput();
    let nice_count = 0;

    //Declare REGEX
    let first_req = new RegExp('[aeiou]','ig');
    let second_req = new RegExp('([a-z])\\1+','i');
    let third_req = new RegExp('(ab)|(cd)|(pq)|(xy)','i');

    //Declare loop variables
    let first_req_matches;
    let string_requirements;
    let isNice;


    for (let str of sInput){
      if (!str) continue;

      //Process requirements for given string
      first_req_matches = str.match(first_req);
      string_requirements = [first_req_matches ? first_req_matches.length >= 3 : false, second_req.test(str), !third_req.test(str)];

      //Determine if all criteria are met for niceness
      isNice = string_requirements.every(Boolean);
      if (isNice) nice_count++;
    }
    console.log(nice_count);
    return;
}

function readInput(){
    try {
        const data = fs.readFileSync('input.txt', 'utf8');
        return data.toString().split('\n');
    }
    catch (err) {
        console.error(err);
    }
}
