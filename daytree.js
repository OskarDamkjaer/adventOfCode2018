const testinput = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];
const fs = require('fs');
const file = fs.readFileSync('inputs/daythree', 'utf8');

const inputList = file.trim().split('\n');

const input = inputList;

const parseObj = textRow => {
  const spaceSplit = textRow.split(' ');
  const id = spaceSplit[0].slice(1);
  const startPositions = spaceSplit[2].split(',');
  const inchesFromLeft = parseInt(startPositions[0]);
  const inchesFromTop = parseInt(startPositions[1].split(':')[0]);

  const moveLenghts = spaceSplit[3].split('x');
  const width = parseInt(moveLenghts[0]);
  const height = parseInt(moveLenghts[1]);
  const spans = {
    nw: {x: inchesFromLeft, y: inchesFromTop},
    ne: {x: inchesFromLeft + width, y: inchesFromTop},
    sw: {x: inchesFromLeft, y: inchesFromTop + height},
    se: {x: inchesFromLeft + width, y: inchesFromTop + height},
  };

  return {id, inchesFromLeft, inchesFromTop, width, height, spans};
};

const answer = input.map(parseObj);
//console.dir(answer);

const field = {};

for (let i = 0; i < input.length; i++) {
  const currentInput = parseObj(input[i]);
  const {width, height, inchesFromLeft, inchesFromTop} = currentInput;
  for (let x = inchesFromLeft; x < inchesFromLeft + width; x++) {
    for (let y = inchesFromTop; y < inchesFromTop + height; y++) {
      const spot = x + '#' + y;
      field[spot] = field[spot] ? field[spot] + 1 : 1;
    }
  }
}

//console.log(field);

console.log(Object.values(field).filter(item => item !== 1).length);
