const fs = require('fs');
const file = fs.readFileSync('inputs/dayfour', 'utf8');

const testData = [
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-01 00:05] falls asleep',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:55] wakes up',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-03 00:05] Guard #10 begins shift',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-05 00:03] Guard #99 begins shift',
  '[1518-11-05 00:45] falls asleep',
  '[1518-11-05 00:55] wakes up',
];

const input = file.trim().split('\n');

const parseObj = data => {
  const [timestamp, rest] = data.slice(1).split(']');
  let idObj = true;
  if (rest.includes('wake') || rest.includes('falls')) {
    idObj = false;
    const wakeUp = rest.includes('wake');
    return {timestamp: new Date(timestamp), idObj, wakeUp};
  }
  const id = rest
    .trim()
    .split(' ')[1]
    .slice(1);
  return {timestamp: new Date(timestamp), idObj, id};
};

const sorted = input.map(parseObj).sort((a, b) => a.timestamp - b.timestamp);

let currentGuard = null;
const guards = {};
sorted.forEach(data => {
  if (data.idObj) {
    currentGuard = data.id;
    if (!guards[currentGuard]) guards[currentGuard] = [];
  } else {
    guards[currentGuard].push(data);
  }
});

const guardList = Object.entries(guards).map(obj => ({
  guard: obj[0],
  sleep: obj[1],
}));

guardList.forEach(guard => {
  guard.list = [];
  guard.minuteStamps = [];
  for (let i = 0; i < guard.sleep.length; i = i + 2) {
    guard.list.push(
      (guard.sleep[i + 1].timestamp - guard.sleep[i].timestamp) / (1000 * 60),
    );
    guard.minuteStamps.push({
      start: parseInt(
        guard.sleep[i].timestamp
          .toString()
          .split(':')[1]
          .split('.')[0],
        10,
      ),
      end: parseInt(
        guard.sleep[i + 1].timestamp
          .toString()
          .split(':')[1]
          .split('.')[0],
        10,
      ),
    });
  }
});

const sleepList = guardList.map(item => ({
  guard: item.guard,
  sleepy: item.list.reduce((acc, curr) => acc + curr, 0),
  minuteStamps: item.minuteStamps,
}));

const sleepiest = sleepList.reduce(
  (acc, curr) => (acc.sleepy > curr.sleepy ? acc : curr),
  guardList[0],
);

const getSleepiestMinute = guard => {
  let bestIndex = 0;
  let bestTime = 0;
  for (let i = 0; i < 59; i++) {
    const sleepTimes = guard.minuteStamps.filter(
      item => i >= item.start && i < item.end,
    ).length;
    if (sleepTimes > bestTime) {
      best = i;
      bestTime = sleepTimes;
    }
  }
  return {bestMinute: best, bestTime};
};

const minuteScores = sleepList.map(item => ({
  ...item,
  ...getSleepiestMinute(item),
}));
const guardPart2 = minuteScores.reduce(
  (acc, curr) => (acc.bestTime > curr.bestTime ? acc : curr),
  sleepList[0],
);

console.log(
  'part one:',
  parseInt(sleepiest.guard, 10) * getSleepiestMinute(sleepiest).bestMinute,
);
console.log('part two', parseInt(guardPart2.guard, 10) * guardPart2.bestMinute);
