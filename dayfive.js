const fs = require('fs');
const file = fs.readFileSync('inputs/dayfive', 'utf8');

const testData = 'dabAcCaCBAcCcaDA';
const input = file.trim().split('');

const removeSomething = word => {
  const removeIndex = canRemoveIndex(word);
  return word.filter((item, index) => !removeIndex.includes(index));
};

const canRemoveIndex = word => {
  const canRemoveIndex = [];
  for (let i = 0; i < word.length - 1; i++) {
    if (word[i].toLowerCase() === word[i + 1].toLowerCase()) {
      if (
        (word[i].match(/[a-z]/) && word[i + 1].match(/[A-Z]/)) ||
        (word[i + 1].match(/[a-z]/) && word[i].match(/[A-Z]/))
      ) {
        canRemoveIndex.push(i, i + 1);
        i++;
      }
    }
  }
  return canRemoveIndex;
};

const react = word => {
  while (canRemoveIndex(word).length > 0) {
    word = removeSomething(word);
  }
  return word.length;
};

console.log('part one:', react(input));
const word = input;
const letters = [...new Set(input.map(a => a.toLowerCase()))]; // remove duplicates
const reactWithoutLetter = (word, letter) =>
  react(word.filter(i => i.toLowerCase() !== letter.toLowerCase()));
const scoreWithoutLetter = letters.map(item => reactWithoutLetter(word, item));
const best = Math.min(...scoreWithoutLetter);

console.log('part two', best);
