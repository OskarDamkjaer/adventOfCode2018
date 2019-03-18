defmodule Dayone do
  def recur_solve(input) do
    input
    |> String.split("\n", trim: true)
    |> sum_lines(0)
  end

  defp sum_lines([head | tail], sum) do
    sum_lines(tail, sum + String.to_integer(head))
  end

  defp sum_lines([], sum) do
    sum
  end

  def enum_solve(input) do
    input
    |> String.split("\n", trim: true)
    # Enum is eager and will bring entire list into memory, which recur will not
    |> Enum.map(fn x -> String.to_integer(x) end)
    |> Enum.reduce(fn curr, acc -> acc + curr end)
  end

  def better_mem(input) do
    input
    |> Stream.map(fn x ->
      {int, _} = Integer.parse(x)
      int
    end)
    |> Stream.cycle()
    |> Enum.reduce_while({0, MapSet.new()}, fn x, {curr, map} ->
      sum = curr + x

      if MapSet.member?(map, sum) do
        {:halt, sum}
      else
        {:cont, {sum, MapSet.put(map, sum)}}
      end
    end)
  end
end

case System.argv() do
  ["--test"] ->
    ExUnit.start()

    defmodule DayoneTest do
      use ExUnit.Case

      import Dayone

      test "solve with recursion" do
        ans = File.read!("dayone") |> recur_solve()
        assert ans == 538
      end

      test "solve with enum methods" do
        ans = File.read!("dayone") |> enum_solve()
        assert ans == 538
      end

      test "solve daytwo with ok mem use" do
        ans = "dayone" |> File.stream!([], :line) |> better_mem()
        assert ans == 77271
      end
    end

  [input_file] ->
    input_file
    |> File.stream!([], :line)
    |> Dayone.better_mem()
    |> IO.puts()

  _ ->
    IO.puts(:stderr, "we expected file or --test flag")
    System.halt(1)
end
