#!/usr/local/bin/python3

numberList = open('inputs/dayone', 'r').read().split('\n')[:-1]

def solve_first():
    total = 0
    for line in numberList:
        total += int(line)
    return total

def solve_second():
    seen = set()
    seen.add(0)
    total, i = 0, 0

    while len(seen) > i:
        num = int(numberList[i % len(numberList)])
        total += num
        seen.add(total)
        i += 1
    return total

print("Part one is:", solve_first())
print("Part two is:", solve_second())

