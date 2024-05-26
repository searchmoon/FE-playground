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

//53. 접미사 배열 https://school.programmers.co.kr/learn/courses/30/lessons/181909

function solution(my_string) {
  let answer = [];
  for (let i = 0; i < my_string.length; i++) {
    answer.push(my_string.slice(i));
  }
  return answer.sort();
}

//54. 문자 개수 세기 https://school.programmers.co.kr/learn/courses/30/lessons/181902

function solution(my_string) {
  let arr = Array(52).fill(0);
  const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let character of my_string) {
    let index = str.indexOf(character);
    arr[index]++;
  }

  return arr;
}

//55. 문자열 계산하기 https://school.programmers.co.kr/learn/courses/30/lessons/120902#

function solution(my_string) {
  const arr = my_string.split(" ");
  let result = Number(arr[0]);

  for (let i = 1; i < arr.length; i += 2) {
    const operator = arr[i];
    const nextNumber = Number(arr[i + 1]);

    if (operator === "+") {
      result += nextNumber;
    } else if (operator === "-") {
      result -= nextNumber;
    }
  }

  return result;
}

//56. 커피 심부름 https://school.programmers.co.kr/learn/courses/30/lessons/181837
function solution(order) {
  let answer = 0;

  for (let pick of order) {
    if (pick.includes("cafelatte")) {
      answer += 5000;
    } else {
      answer += 4500;
    }
  }

  return answer;
}

//57. qr code https://school.programmers.co.kr/learn/courses/30/lessons/181903
function solution(q, r, code) {
  let answer = "";
  let arr = code.split("");

  for (let i = r; i < code.length; i += q) {
    answer += arr[i];
  }

  return answer;
}
