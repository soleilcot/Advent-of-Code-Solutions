const fs = require('fs');
var brightness_count = 0;


main();

function main(){
  let grid = Array.from({ length: 1000 }, () => Array.from({ length: 1000 }, () => 0));
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

  //Go through the grid and count the brightness
  grid.forEach((grid) => {
    grid.forEach((data) => {
      brightness_count += data;
    });
  });

  console.log(`Total brightness is ${brightness_count}`);
}

function updateGrid(grid,first_coord,second_coord,command){
  for (let x = Math.min(first_coord[0],second_coord[0]); x <= Math.max(first_coord[0],second_coord[0]); x++){
    for (let y = Math.min(first_coord[1],second_coord[1]); y <= Math.max(first_coord[1],second_coord[1]); y++){
      if (command.includes("off")){
        if (grid[x][y] == 0) continue;
        if (grid[x][y] == 1) grid[x][y] = 0;
        else grid[x][y]--;
      } else if (command.includes("on")){
        grid[x][y]++;
      } else{
        grid[x][y] += 2;
      }
    }
  }
}

function readInput(){
    try {
        const data = fs.readFileSync('input.txt', 'utf8');
        return data.toString().split("\n");
    }
    catch (err) {
        console.error(err);
    }
}
