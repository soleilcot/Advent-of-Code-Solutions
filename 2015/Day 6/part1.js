const fs = require('fs');
var on_count = 0;


main();

function main(){
  let grid = Array.from(Array(1000), () => new Array(1000));
  let sInput = readInput();
  let first_coord;
  let second_coord;
  let arr;

  for (let command of sInput){
    if (!command) continue;

    arr = command.split(' ');
    second_coord = arr[arr.length - 1].split(',');
    first_coord = arr[arr.length - 3].split(',');

    updateGrid(grid,first_coord,second_coord,command);
  }

  //Go through the grid and count the number of lights that are on (true entries)
  grid.forEach((grid) => {
    grid.forEach((data) => {
      if(data) on_count++;
    });
  });

  console.log(`Total number of lights on is ${on_count}`);
}

function updateGrid(grid,first_coord,second_coord,command){
  for (let x = Math.min(first_coord[0],second_coord[0]); x <= Math.max(first_coord[0],second_coord[0]); x++){
    for (let y = Math.min(first_coord[1],second_coord[1]); y <= Math.max(first_coord[1],second_coord[1]); y++){
      if (command.includes('off')){
        grid[x][y] = false;
      } else if (command.includes('on')){
        grid[x][y] = true;
      } else{
        grid[x][y] = !grid[x][y];
      }
    }
  }
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
