// 프로그래머스 레벨 1

//1. 폰켓몬 https://school.programmers.co.kr/learn/courses/30/lessons/1845

//1. 풀이
function solution(nums) {
  let answer = 0;
  const uniqueNums = new Set(nums);

  return uniqueNums.size < nums.length / 2 ? uniqueNums.size : nums.length / 2;
}

//2. 로또의 최고 순위와 최저 순위 https://school.programmers.co.kr/learn/courses/30/lessons/77484

//2. 풀이
function switchToRank(num) {
  switch (num) {
    case 6:
      return 1;
    case 5:
      return 2;
    case 4:
      return 3;
    case 3:
      return 4;
    case 2:
      return 5;
    default:
      return 6;
  }
}

function solution(lottos, win_nums) {
  let min = 0;
  let max = 0;

  for (let num of lottos) {
    if (win_nums.includes(num)) {
      min++;
      max++;
    }
  }

  const zeroSumLength = lottos.filter((item) => item === 0).length;
  max += zeroSumLength;

  return [switchToRank(max), switchToRank(min)];
}
