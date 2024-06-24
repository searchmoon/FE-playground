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

//3. 9. Palindrome Number https://leetcode.com/problems/palindrome-number/description/

let isPalindrome = function(x) {
  const reverse = String(x).split("").reverse().join("");

  return reverse == x ? true : false;
};

//4. 58. Length of Last Word https://leetcode.com/problems/length-of-last-word/description/
let lengthOfLastWord = function(s) {
  const words = s.trim().split(' ');

  return words[words.length - 1].length;
};

//5. 136. Single Number https://leetcode.com/problems/single-number/description/
// XOR 연산
let singleNumber = function(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
};

//6. 2703. Return Length of Arguments Passed https://leetcode.com/problems/return-length-of-arguments-passed/
let argumentsLength = function(...args) {
  return args.length;
};