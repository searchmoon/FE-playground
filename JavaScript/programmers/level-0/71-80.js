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
