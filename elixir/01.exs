defmodule Dayone do
  def solve([head | tail], sum) do
    {num, _} = Integer.parse(head)
    solve(tail, sum + num)
  end

  def solve([], sum) do
    sum
  end
end

File.read!("dayone")
|> String.split("\n")
|> Enum.drop(-1)
|> Dayone.solve(0)
|> IO.inspect()
