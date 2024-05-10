//21. 문자열 밀기 https://school.programmers.co.kr/learn/courses/30/lessons/120921

//풀이
function solution(A, B) {
  let answer = -1;
  if (A === B) return 0;
  let arr = A.split("");

  for (let i = 0; i < arr.length; i++) {
    const pop = arr.pop();
    arr.unshift(pop);
    if (arr.join("") === B) {
      answer = i + 1;
      break;
    }
  }

  return answer;
}

//22. 최빈값 구하기 https://school.programmers.co.kr/learn/courses/30/lessons/120812

//풀이
function solution(array) {
  const numList = Array(1000).fill(0);

  for (let num of array) {
    numList[num]++;
  }

  let maxCount = 0;
  let answerIndex = 0;
  let answerCount = 0;

  for (let i = 0; i < 1000; i++) {
    let nowMaxCount = numList[i];

    if (maxCount < nowMaxCount) {
      maxCount = nowMaxCount;
      answerIndex = i;
      answerCount = 1;
    } else if (maxCount === nowMaxCount) {
      answerCount++;
    }
  }

  if (answerCount > 1) {
    return -1;
  }

  return answerIndex;
}

//23. 7의 개수  https://school.programmers.co.kr/learn/courses/30/lessons/120912

//풀이
function solution(array) {
  let answer = 0;
  const arr = array.join("").split("");

  for (let num of arr) {
    if (num.includes(7)) {
      answer++;
    }
  }

  return answer;
}

//24. 중복된 문자 제거 https://school.programmers.co.kr/learn/courses/30/lessons/120888

//풀이 Set 사용
function solution(my_string) {
  const wordArr = my_string.split("");
  let setStr = new Set(wordArr);

  return [...setStr].join("");
}

//25. 문자열 잘라서 정렬하기 https://school.programmers.co.kr/learn/courses/30/lessons/181866

function solution(myString) {
  const sortArr = myString.split("x").sort();

  return sortArr.filter((item) => item);
}

//26. 글자 지우기

function solution(my_string, indices) {
  let answer = "";

  for (let i = 0; i < my_string.length; i++) {
    if (!indices.includes(i)) {
      answer += my_string[i];
    }
  }

  return answer;
}

// 27. 컨트롤 제트 https://school.programmers.co.kr/learn/courses/30/lessons/120853
function solution(s) {
  let answer = 0;
  let sArr = s.split(" ");

  for (let i = 0; i < sArr.length; i++) {
    const num = Number(sArr[i]);

    if (num) {
      answer += num;
    } else if (isNaN(num)) {
      answer -= Number(sArr[i - 1]);
    }
  }

  return answer;
}

//28. 가까운 수

// 정수배열 array[] 에서 각 요소에서 n 을 빼주고, 절대값으로 변환해서 배열에 담는다.
// 그 절대값이 가장 작은것이 들어있는 곳의 인덱스가 제일 가까운 수.
// array에서 그 인덱스 자리에 있는 수를 return 한다. 같은 차이가 나는 숫자들이 있다면, 더 작은 수를 return 한다.

//풀이 1.
function solution(array, n) {
  let answer = 0;
  let sortedArray = array.sort();
  let minDiff = Number.MAX_VALUE;

  for (let num of sortedArray) {
    let diff = Math.abs(n - num);

    if (minDiff > diff) {
      answer = num;
      minDiff = diff;
    }
  }

  return answer;
}

//풀이 2.
// function solution(array, n) {
//   const arr = array.sort().map((num) => Math.abs(num - n));
//   const min = Math.min(...arr);
//   const idx = arr.findIndex((item) => item === min);
//   return array[idx];
// }

//29. 숨어있는 숫자의 덧셈 (2) https://school.programmers.co.kr/learn/courses/30/lessons/120864

function solution(my_string) {
  let answer = 0;
  let temp = "";
  let myString = my_string + "a";

  for (let tempChar of myString) {
    if (isNaN(tempChar)) {
      answer += Number(temp);
      temp = "";
      continue;
    }

    temp += tempChar;
  }

  return answer;
}

//30. 배열 회전시키기 https://school.programmers.co.kr/learn/courses/30/lessons/120844

function solution(numbers, direction) {
  let answer = [...numbers];

  for (let i = 0; i < 1; i++) {
    if (direction === "right") {
      answer.unshift(answer.pop());
    } else {
      answer.push(answer.shift());
    }
  }

  return answer;
}
