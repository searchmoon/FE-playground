//71. 문자열 묶기 https://school.programmers.co.kr/learn/courses/30/lessons/181855

// Map 을 사용한 방법
function solution(strArr) {
  let answer = 0;
  const lengArr = strArr.map((item) => item.length);
  const map = new Map();

  for (let item of lengArr) {
    if (!map.has(item)) {
      map.set(item, 1);
    } else {
      map.set(item, map.get(item) + 1);
    }
    if (answer < map.get(item)) {
      answer = map.get(item);
    }
  }

  return answer;
}

//72. 조건에 맞게 수열 변환하기 2 https://school.programmers.co.kr/learn/courses/30/lessons/181881

function solution(arr) {
  let answer = 0;

  while (true) {
    let prevArr = [...arr];
    let newArr = [];

    for (let num of arr) {
      if (num >= 50 && num % 2 === 0) {
        newArr.push(num / 2);
      } else if (num < 50 && num % 2 === 1) {
        newArr.push(num * 2 + 1);
      } else {
        newArr.push(num);
      }
    }

    if (prevArr.every((val, index) => val === newArr[index])) {
      break;
    }

    arr = newArr;
    answer++;
  }

  return answer;
}

//73. 코드 처리하기 https://school.programmers.co.kr/learn/courses/30/lessons/181932

function solution(code) {
  let mode = 0; 
  let ret = []; 

  for (let i = 0; i < code.length; i++) {
    if (code[i] === "1") {
      mode = 1 - mode;
    } else {
      if ((mode === 0 && i % 2 === 0) || (mode === 1 && i % 2 === 1)) {
        ret.push(code[i]);
      }
    }
  }

  return ret.join("") || "EMPTY";
}

//74. 등수 매기기 https://school.programmers.co.kr/learn/courses/30/lessons/120882
function solution(score) {
  let answer = [];
  let aver = [];
  let rank = [];

  for (let item of score) {
    aver.push((item[0] + item[1]) / 2);
  }

  const sorted = [...aver].sort((a, b) => b - a);
  const uniqueSorted = sorted.map((value, i) => [value, i]);// 중복제거

  for (let item of score) {
    const avg = (item[0] + item[1]) / 2;
    const idx = uniqueSorted.find((pair) => pair[0] === avg)[1];
    rank.push(idx + 1);
  }

  return rank;
}
