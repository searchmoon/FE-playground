// 51. 숫자 찾기 https://school.programmers.co.kr/learn/courses/30/lessons/120904
// 풀이 1.
function solution(num, k) {
  let answer = -1;
  const hasIndex = num.toString().indexOf(k);

  if (hasIndex > -1) {
    answer = hasIndex + 1;
  }

  return answer;
}

//풀이 2.
function solution(num, k) {
  const numStr = num.toString();
  const kStr = k.toString();
  const index = numStr.indexOf(kStr);

  return index === -1 ? -1 : index + 1;
}

// 52. 콜라츠 수열 만들기
//풀이 1.
function solution(n) {
  let num = n;
  let answer = [num];

  while (num > 1) {
    if (num % 2 === 0) {
      num = num / 2;
      answer.push(num);
    } else if (num % 2 === 1) {
      num = 3 * num + 1;
      answer.push(num);
    }
  }

  return answer;
}

//풀이 2. 풀이 1을 조금 간단하게
function solution(n) {
  let num = n;
  let answer = [num];

  while (num > 1) {
    if (num % 2 === 0) {
      num = num / 2;
    } else {
      num = 3 * num + 1;
    }
    answer.push(num);
  }

  return answer;
}
