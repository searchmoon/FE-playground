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

//3. 추억 점수 https://school.programmers.co.kr/learn/courses/30/lessons/176963

//3. 풀이
function solution(name, yearning, photo) {
  let answer = [];
  const yearningScore = new Map();

  for (let i = 0; i < name.length; i++) {
    yearningScore.set(name[i], yearning[i]);
  }

  for (let j = 0; j < photo.length; j++) {
    let sum = 0;

    for (let k = 0; k < photo[j].length; k++) {
      if (yearningScore.has(photo[j][k])) {
        sum += yearningScore.get(photo[j][k]);
      }
    }
    answer.push(sum);
  }

  return answer;
}

//4. 과일 장수 https://school.programmers.co.kr/learn/courses/30/lessons/135808

//4. 풀이
function solution(k, m, score) {
  let answer = 0;
  const sortScore = [...score].sort((a, b) => b - a);

  for (let i = m - 1; i < score.length; i += m) {
    answer += sortScore[i] * m;
  }

  return answer;
}
