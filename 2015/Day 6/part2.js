const fs = require('fs');

main();

function main() {
  let grid = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0),
  );
  let sInput = readInput();
  let brightness_count = 0;
  let first_coord;
  let second_coord;
  let arr;

  for (let command of sInput) {
    if (!command) continue;

    arr = command.split(' ');
    second_coord = arr[arr.length - 1].split(',');
    first_coord = arr[arr.length - 3].split(',');

    updateGrid(grid, first_coord, second_coord, command);
  }

  //Go through the grid and count the brightness
  grid.forEach((grid) => {
    grid.forEach((data) => {
      brightness_count += data;
    });
  });

  console.log(`Total brightness is ${brightness_count}`);
}

function updateCell(grid, x, y, command) {
  if (command.includes('off')) {
    grid[x][y] = Math.max(0, grid[x][y] - 1);
  } else if (command.includes('on')) {
    grid[x][y]++;
  } else {
    grid[x][y] += 2;
  }
}


function updateGrid(grid, first_coord, second_coord, command) {
  const [firstX, firstY] = first_coord;
  const [secondX, secondY] = second_coord;

  const minX = Math.min(firstX, secondX);
  const maxX = Math.max(firstX, secondX);
  const minY = Math.min(firstY, secondY);
  const maxY = Math.max(firstY, secondY);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++){
      updateCell(grid, x, y, command);
    }
  }
}

function readInput() {
  try {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.toString().split('\n');
  } catch (err) {
    console.error(err);
  }
}
