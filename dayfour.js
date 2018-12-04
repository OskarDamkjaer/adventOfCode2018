testData = [
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

const input = testData;

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
  for (let i = 0; i < guard.sleep.length; i = i + 2) {
    guard.list.push(
      (guard.sleep[i + 1].timestamp - guard.sleep[i].timestamp) / (1000 * 60),
    );
  }
});

const sleepList = guardList.map(item => ({
    guard: item.guard,
    sleepy: item.list.reduce((acc, curr) => acc + curr, 0),
  }));



