//1. 2073. Time Needed to Buy Tickets https://leetcode.com/problems/time-needed-to-buy-tickets/?envType=daily-question&envId=2024-05-05

//풀이
let timeRequiredToBuy = function (tickets, k) {
  let second = 0;

  while (true) {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i] === 0) continue;

      tickets[i] = tickets[i] - 1;
      second++;

      if (tickets[k] === 0) {
        return second;
      }
    }
  }
};

//2. 2441. Largest Positive Integer That Exists With Its Negative https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative/description/?envType=daily-question&envId=2024-05-05

//풀이
let findMaxK = function (nums) {
  let answer = -1;
  let setNums = new Set();

  for (let num of nums) {
    if (setNums.has(-num)) {
      answer = Math.max(answer, Math.abs(num));
    } else {
      setNums.add(num);
    }
  }

  return answer;
};
