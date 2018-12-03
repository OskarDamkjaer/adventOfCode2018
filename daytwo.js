const fs = require('fs');
file = fs.readFileSync('inputs/daytwo', 'utf8');

const inputList = file.split('\n');

const numOfEach = inputList //['aaaaa', 'abc']
  .map(word =>
    word
      .split('')
      .map(
        (letter, index, og_array) => og_array.filter(l => l === letter).length,
      ),
  )
  .map(occurCount => Array.from(new Set(occurCount)))
  .reduce((acc, curr) => (acc.includes(curr) ? acc : acc.concat(curr)), [])
  .reduce(
    (acc, curr) =>
      acc[curr] ? {...acc, [curr]: acc[curr] + 1} : {...acc, [curr]: 1},
    {},
  );

const answer = [2, 3, 4].reduce((acc, curr) => acc * numOfEach[curr], 1)

console.log(answer)
