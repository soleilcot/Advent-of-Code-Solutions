const fs = require('fs');

main();

function main(){
    //The map will track the coordinates at which we have made at least one delivery and will enumerate the number of deliveries there.
    let map = new Map();
    //These two variables will track the cartesian coordinates of where we are currently.
    let x = 0;
    let y = 0;

    //Get the inputs from file
    let sInput = readInput();

    //Register delivery at the starting point first as only subsequent deliveries are caught below
    map.set(x + ',' + y , 1);
    
    for (const value of sInput){
        //Update the coordinates based on instructions read in
        switch(value){
            case '>':
                x++;
                break;
            case '^':
                y++;
                break;
            case '<':
                x--;
                break;
            case 'v':
                y--;
                break;
        }
        
        //Update the map to mark a new delivery. Set to 1 if we've never been here, increment otherwise.
        if (map.has(x + ',' + y)){
            map.set(x + ',' + y , map.get(x + ',' + y) + 1);
        }
        else{
            map.set(x + ',' + y , 1);
        }
    }
    console.log('We delivered to',map.size,'houses.');
}

function readInput(){
    try {
        const data = fs.readFileSync('input.txt', 'utf8');
        return data;
    }   
    catch (err) {
        console.error(err);
    }
}
