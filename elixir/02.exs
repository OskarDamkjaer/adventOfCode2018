defmodule Daytwo do
  def part_one(input) do
    {a, b} =
      input
      |> String.split("\n", trim: true)
      |> Enum.map(&counter/1)
      |> Enum.map(&twice_and_thrice/1)
      |> Enum.reduce(
        {0, 0},
        fn {two_count, three_count}, {two_total, three_total} ->
          {two_count + two_total, three_count + three_total}
        end
      )

    a * b
  end

  def part_two(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn x -> String.split(x, "", trim: true) end)
    |> find_match
  end

  def find_match([line | tail]) do
    match =
      Enum.reduce(tail, nil, fn
        item, nil ->
          case char_matcher(item, line) do
            {word, 1} -> word
            _ -> nil
          end

        _, acc ->
          acc
      end)

    if match do
      match
    else
      find_match(tail)
    end
  end

  def char_matcher(list1, list2) do
    char_matcher(list1, list2, [], 0)
  end

  def char_matcher([same_head | tail1], [same_head | tail2], acc, count) do
    char_matcher(tail1, tail2, [same_head | acc], count)
  end

  def char_matcher([_head1 | tail1], [_head2 | tail2], acc, count) do
    char_matcher(tail1, tail2, acc, count + 1)
  end

  def char_matcher([], [], acc, count) do
    {acc
     |> Enum.reverse()
     |> List.to_string(), count}
  end

  def counter(characterlist) do
    characterlist
    |> String.split("", trim: true)
    |> Enum.reduce(%{}, fn x, acc -> Map.update(acc, x, 1, &(&1 + 1)) end)
  end

  def twice_and_thrice(charmap) do
    twice = Enum.count(charmap, fn {_char, count} -> count == 2 end)
    thrice = Enum.count(charmap, fn {_char, count} -> count == 3 end)
    {min(twice, 1), min(thrice, 1)}
  end
end

case System.argv() do
  [input_file] ->
    input_file
    |> File.read!()
    |> Daytwo.part_two()
    |> IO.puts()

  _ ->
    ExUnit.start()

    defmodule DayoneTest do
      use ExUnit.Case
      import Daytwo

      test "testinput" do
        assert """
               bababc
               abbcde
               abcccd
               aabcdd
               abcdee
               ababab
               """
               |> part_one() == 12
      end

      test "charmatcher - same" do
        assert char_matcher(["a", "b", "c"], ["a", "b", "c"]) == {"abc", 0}
      end

      test "charmatcher - diff" do
        assert char_matcher(["b", "b", "c"], ["a", "b", "c"]) == {"bc", 1}
      end

      test "part two" do
        assert """
               abcde
               fghij
               klmno
               pqrst
               fguij
               axcye
               wvxyz
               """
               |> part_two() == "fgij"
      end
    end
end
