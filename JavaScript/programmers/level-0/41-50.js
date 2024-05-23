//41. 이진수 더하기 https://school.programmers.co.kr/learn/courses/30/lessons/120885

function solution(bin1, bin2) {
  const answer = parseInt(bin1, 2) + parseInt(bin2, 2);

  return answer.toString(2);
}

//42. 2의 영역 https://school.programmers.co.kr/learn/courses/30/lessons/181894
function solution(arr) {
  const firstIdx = arr.indexOf(2);
  const lastIdx = arr.lastIndexOf(2);

  if (firstIdx === -1) {
    return [-1];
  }

  return arr.slice(firstIdx, lastIdx + 1);
}

//43. 날짜 비교하기 https://school.programmers.co.kr/learn/courses/30/lessons/181838#
function solution(date1, date2) {
  for (let i = 0; i < 3; i++) {
    if (date1[i] < date2[i]) {
      return 1;
    } else if (date1[i] > date2[i]) {
      return 0;
    }
  }
  return 0;
}

//44. 간단한 논리 연산 https://school.programmers.co.kr/learn/courses/30/lessons/181917
function solution(x1, x2, x3, x4) {
  let bool1 = x1 || x2;
  let bool2 = x3 || x4;

  return bool1 && bool2;
}

//45. 주사위 게임 2 https://school.programmers.co.kr/learn/courses/30/lessons/181930
// 풀이 1.
function solution(a, b, c) {
  const pow1 = a + b + c;
  const pow2 = Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2);
  const pow3 = Math.pow(a, 3) + Math.pow(b, 3) + Math.pow(c, 3);
  if (a === b && b === c) {
    return pow1 * pow2 * pow3;
  } else if (a === b || b === c || a === c) {
    return pow1 * pow2;
  } else {
    return pow1;
  }
}

//풀이 2.
const solution = (a, b, c) => {
  if (a === b && b === c) {
    return calculate([a, b, c], 3);
  } else if (a === b || b === c || a === c) {
    return calculate([a, b, c], 2);
  } else {
    return calculate([a, b, c]);
  }
};

const calculate = (inc, n = 1) => {
  const [a, b, c] = inc;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= Math.pow(a, i) + Math.pow(b, i) + Math.pow(c, i);
  }
  return result;
};

//46. 간단한 식 계산하기 https://school.programmers.co.kr/learn/courses/30/lessons/181865

//풀이 1.
function solution(binomial) {
  const split = binomial.split(" ");
  const firstNum = Number(split[0]);
  const secondNum = Number(split[2]);
  const operator = split[1];

  if (operator === "+") {
    return firstNum + secondNum;
  } else if (operator === "-") {
    return firstNum - secondNum;
  } else if (operator === "*") {
    return firstNum * secondNum;
  }
}

//풀이 2.
function solution(binomial) {
  const split = binomial.split(" ");
  const firstNum = Number(split[0]);
  const secondNum = Number(split[2]);
  const operator = split[1];

  switch (operator) {
    case "+":
      return firstNum + secondNum;
    case "-":
      return firstNum - secondNum;
    case "*":
      return firstNum * secondNum;
  }
}

//47. 외계행성의 나이 https://school.programmers.co.kr/learn/courses/30/lessons/120834
function solution(age) {
  const splitAge = String(age).split("");
  const eng = "abcdefghijklmnopqrstuvwxyz";

  return splitAge.map((item) => eng[item]).join("");
}

//48. 배열 만들기 3 https://school.programmers.co.kr/learn/courses/30/lessons/181895
// 원본 배열을 변경하는 splice 를 쓰지않고, slice 를 써준다.
function solution(arr, intervals) {
  let answer = [];
  let array = [...arr];

  for (let item of intervals) {
    answer.push(array.slice(item[0], item[1] + 1));
  }

  return answer.flat();
}

//49. 9로 나눈 나머지 https://school.programmers.co.kr/learn/courses/30/lessons/181914

function solution(number) {
  const arr = number.split("");
  const sumNum = arr.reduce((acc, crr) => acc + Number(crr), 0);

  return sumNum % 9;
}

//50. 합성수 찾기 https://school.programmers.co.kr/learn/courses/30/lessons/120846

function solution(n) {
  function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  let count = 0;

  for (let i = 4; i <= n; i++) {
    if (!isPrime(i)) {
      count++;
    }
  }

  return count;
}
