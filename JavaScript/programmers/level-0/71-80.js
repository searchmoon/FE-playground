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