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

//62. 이차원 배열 대각선 순회하기 https://school.programmers.co.kr/learn/courses/30/lessons/181829
function solution(board, k) {
  let answer = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (i + j <= k) {
        answer += board[i][j];
      }
    }
  }

  return answer;
}

// 63. 세 개의 구분자 https://school.programmers.co.kr/learn/courses/30/lessons/181862
// 풀이 1. 정규표현식 사용. [abc] 는 문자 클래스. "a", "b", "c" 중 하나와 일치하는 패턴을 나타낸다.
function solution(myStr) {
  let parts = myStr.split(/[abc]/);

  let filteredParts = parts.filter((part) => part.length > 0);

  if (filteredParts.length === 0) {
    return ["EMPTY"];
  }

  return filteredParts;
}

// 풀이 2.
function solution(myStr) {
  let answer = [];
  let tempStr = "";

  for (let char of myStr) {
    if (char === "a" || char === "b" || char === "c") {
      if (tempStr.length > 0) {
        answer.push(tempStr);
        tempStr = "";
      }
    } else {
      tempStr += char;
    }
  }

  if (tempStr.length > 0) {
    answer.push(tempStr);
  }

  if (answer.length === 0) {
    return ["EMPTY"];
  }

  return answer;
}

//64. 다른 사람의 풀이 https://school.programmers.co.kr/learn/courses/30/lessons/181857
//풀이 1.
function solution(arr) {
  let length = arr.length;

  let newLength = 1;
  while (newLength < length) {
    newLength *= 2;
  }

  while (arr.length < newLength) {
    arr.push(0);
  }

  return arr;
}

// 65. 문자열이 몇 번 등장하는지 세기 https://school.programmers.co.kr/learn/courses/30/lessons/181871
function solution(myString, pat) {
  let count = 0;
  let index = 0;

  while ((index = myString.indexOf(pat, index)) !== -1) {
    count++;
    index++;
  }

  return count;
}

//66. 왼쪽 오른쪽 https://school.programmers.co.kr/learn/courses/30/lessons/181890
// 풀이 1.
function solution(str_list) {
  let list = [...str_list];
  let answer = [];

  for (let i = 0; i < list.length; i++) {
    if (list[i] === "l") {
      answer = list.slice(0, i);
      break;
    } else if (list[i] === "r") {
      answer = list.slice(i + 1);
      break;
    }
  }

  return answer;
}

//풀이 2.
function solution(str_list) {
  let list = [...str_list];

  for (let i = 0; i < list.length; i++) {
    if (list[i] === "l") {
      return list.slice(0, i);
    } else if (list[i] === "r") {
      return list.slice(i + 1);
    }
  }
  return [];
}

//67. 구슬을 나누는 경우의 수 https://school.programmers.co.kr/learn/courses/30/lessons/120840
// 풀이 1.
function solution(balls, share) {
  if (share > balls) return 0;
  if (share === 0 || share === balls) return 1;

  let num = 1;
  for (let i = 0; i < share; i++) {
    num *= balls - i;
    num /= i + 1;
  }

  return num;
}

//풀이 2. Math.round() 사용한 풀이
const factorial = (n) => {
  let num = 1;
  while (n) {
    num *= n;
    n--;
  }
  return num;
};

function solution(balls, share) {
  return Math.round(
    factorial(balls) / (factorial(balls - share) * factorial(share))
  );
}
