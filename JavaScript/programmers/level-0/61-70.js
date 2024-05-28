//61. 팩토리얼 https://school.programmers.co.kr/learn/courses/30/lessons/120848

function solution(n) {
  let num = 1;

  for (let i = 1; i <= 10; i++) {
    num *= i;

    if (n < num) {
      return i - 1;
    } else if (n === num) {
      return i;
    }
  }
}
