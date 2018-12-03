const fs = require('fs');
const file = fs.readFileSync('inputs/daytwo', 'utf8');

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

const answer = [2, 3, 4].reduce((acc, curr) => acc * numOfEach[curr], 1);

console.log(answer);

for (let i = 0; i < inputList.length - 1; i++) {
  // newline makes the list one too long
  for (let j = 0; j < inputList.length - 1; j++) {
    if (i == j) continue;
    //get two words, compare them ignoring one letter att a time.
    const firstList = inputList /*.slice().sort()*/[i];
    const secondList = inputList /*.slice().sort()*/[j];
    let numWrongs = 0;
    for (let k = 0; k < firstList.length; k++) {
      if (firstList[k] !== secondList[k]) {
        numWrongs++;
      }
    }
    if (numWrongs == 1) {
      console.log('========= yay');
      console.log(firstList, secondList, i, j);
    }
  }
  console.log('loops', Math.floor(100* i / inputList.length), '% done');
}
