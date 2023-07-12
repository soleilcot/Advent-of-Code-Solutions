/* https://adventofcode.com/2015/day/3

The next year, to speed up the process, Santa creates a robot version of himself, Robo-Santa, to deliver presents with him.

Santa and Robo-Santa start at the same location (delivering two presents to the same starting house), then take turns moving based on instructions from the elf, who is eggnoggedly reading from the same script as the previous year.

This year, how many houses receive at least one present?

For example:

^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.
*/

const fs = require('fs');
//The map will track the coordinates at which we have made at least one delivery and will enumerate the number of deliveries there.
const map = new Map();

main();

function main() {
  //These two objects will track the cartesian coordinates of where each Santa is.
  const santa = { x: 0, y: 0 };
  const roboSanta = { x: 0, y: 0 };

  //Get the inputs from file
  let sInput = readInput();

  //Register delivery at the starting point first as only subsequent deliveries are caught below
  map.set('0,0', 1);

  //Initialize the counter for the coming loop
  let count = 0;

  for (const value of sInput) {
    //Update the coordinates based on instructions read in and whether the instructions as meant for Santa or RoboSanta
    if (count % 2) {
      updateCoordinates(roboSanta, value);
      updateMap(roboSanta);
    } else {
      updateCoordinates(santa, value);
      updateMap(santa);
    }

    count++;
  }

  console.log('We delivered to', map.size, 'houses.');
}

function readInput() {
  try {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}

function updateCoordinates(obj, value) {
  switch (value) {
    case '>':
      obj.x++;
      break;
    case '^':
      obj.y++;
      break;
    case '<':
      obj.x--;
      break;
    case 'v':
      obj.y--;
      break;
  }
}

function updateMap(obj) {
  //Update the map to mark a new delivery. Set to 1 if we've never been here, increment otherwise.
  if (map.has(obj.x + ',' + obj.y)) {
    map.set(obj.x + ',' + obj.y, map.get(obj.x + ',' + obj.y) + 1);
  } else {
    map.set(obj.x + ',' + obj.y, 1);
  }
}
