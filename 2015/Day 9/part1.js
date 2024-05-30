let permutations = []

function swap(arr, ndx1, ndx2){
    [arr[ndx1], arr[ndx2]] = [arr[ndx2], arr[ndx1]];
}

function permute(array, i) {
    const n = array.length;
    if ( i === (n-1) ){
        permutations.push(array.slice());
        return;
    }
    for (let j = i; j < n; j++){
        swap(array, i, j);
        permute(array, i+1)
        swap(array, j, i);
    }
}

permute(['a', 'b', 'c'], 0)

console.log(permutations);