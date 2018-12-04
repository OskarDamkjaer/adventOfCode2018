% we get. graph_size, start, n_dests, dest, n_edges, from, to, cost
include "globals.mzn";
include "dayone.dzn";

% solve part one
%int: partOne = sum (i in input)(i);
%solve satisfy;
%output[show(partOne)]

% solve part two
var 1..1000: index;
var 1..1000: index2;
int: len = length(input);
var int: total = sum(i in 1..index)(input[i mod len]);
var int: total2 = sum(i in 1..index)(input[i mod len]);
 
constraint index < index2;
constraint total = total2;

solve satisfy;
output[show(total)]
