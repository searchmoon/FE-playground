//11. 문자열 겹쳐쓰기 https://school.programmers.co.kr/learn/courses/30/lessons/181943

//11. 풀이 1.
function solution(my_string, overwrite_string, s) {
  let strArr = my_string.split("");

  for (let i = 0; i < overwrite_string.length; i++) {
    strArr[s + i] = overwrite_string[i];
  }

  return strArr.join("");
}

//11. 풀이 2.
function solution(my_string, overwrite_string, s) {
  return (
    my_string.substring(0, s) +
    overwrite_string +
    my_string.substring(s + overwrite_string.length)
  );
}

//12. 할 일 목록 https://school.programmers.co.kr/learn/courses/30/lessons/181885

//12. 풀이 1.
function solution(todo_list, finished) {
  let result = [];

  for (let i = 0; i < todo_list.length; i++) {
    if (!finished[i]) {
      result.push(todo_list[i]);
    }
  }

  return result;
}

//12. 풀이 2.
function solution(todo_list, finished) {
  let answer = [];
  return todo_list.filter((e, i) => !finished[i]);
}

//13. 문자열 정렬하기 (2) https://school.programmers.co.kr/learn/courses/30/lessons/120911

//13. 풀이 1.
function solution(my_string) {
  return my_string.toLowerCase().split("").sort().join("");
}

//14. 특별한 이차원 배열 1 https://school.programmers.co.kr/learn/courses/30/lessons/181833

//14. 풀이
function solution(n) {
  let answer = [];
  for (let i = 0; i < n; i++) {
    answer.push([]);
    for (let j = 0; j < n; j++) {
      if (i === j) {
        answer[i].push(1);
      } else {
        answer[i].push(0);
      }
    }
  }

  return answer;
}

//15. 분수의 덧셈 https://school.programmers.co.kr/learn/courses/30/lessons/120808
const gcd = (d1, d2) => {
  while (d2 !== 0) {
    [d1, d2] = [d2, d1 % d2];
  }

  return d1;
};

const lcm = (d1, d2) => {
  return (d1 * d2) / gcd(d1, d2);
};

function solution(n1, d1, n2, d2) {
  const parentsLcm = lcm(d1, d2);
  const sumNumerator = (parentsLcm / d1) * n1 + (parentsLcm / d2) * n2;

  //최대공약수 구한후에 기약분수로 변환하기
  const commonDivisor = gcd(sumNumerator, parentsLcm);
  const resultNumerator = sumNumerator / commonDivisor;
  const resultDenominator = parentsLcm / commonDivisor;

  return [resultNumerator, resultDenominator];
}

//16. 정수를 나선형으로 배치하기
//풀이 1.
function solution(n) {
  let dy = [0, 1, 0, -1];
  let dx = [1, 0, -1, 0];

  const baseRow = Array(n).fill(0);
  let answer = [...Array.from({ length: n }, (_) => [...baseRow])];

  let count = 1;
  let ny = 0;
  let nx = 0;
  let direction = 0;

  while (count <= n * n) {
    answer[ny][nx] = count;

    ny = ny + dy[direction];
    nx = nx + dx[direction];

    //answer[ny][nx] != 0 이부분은 다음에 넣을 숫자를 놓을 자리가 비어있는지 확인하는 조건
    if (nx >= n || ny >= n || nx < 0 || ny < 0 || answer[ny][nx] != 0) {
      // 이전방향으로 한칸 물러나기
      ny = ny - dy[direction];
      nx = nx - dx[direction];

      direction = (direction + 1) % 4;

      //방향을 바꾼 뒤 다시 이동 실행하기
      ny = ny + dy[direction];
      nx = nx + dx[direction];
    }

    count++;
  }

  return answer;
}

// 풀이 2.
function solution(n) {
  const baseRow = Array(n).fill(0);
  let result = [...Array.from({ length: n }, (_) => [...baseRow])];

  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const repeatTime = n * 2 - 1;

  let dirIndex;
  let loop = n;
  const mappingArray = [];
  for (let i = 0; i < repeatTime; i++) {
    dirIndex = i % 4;

    mappingArray.push([loop, dirIndex]);

    if (dirIndex % 2 === 0) {
      loop--;
    }
  }

  let value = 1,
    row = 0,
    col = -1;
  for (let i = 0; i < mappingArray.length; i++) {
    for (let j = 0; j < mappingArray[i][0]; j++) {
      row += direction[mappingArray[i][1]][0];
      col += direction[mappingArray[i][1]][1];
      result[row][col] = value++;
    }
  }

  return result;
}

// 17. 문자열 여러번 뒤집기 https://school.programmers.co.kr/learn/courses/30/lessons/181913
// 풀이
function solution(my_string, queries) {
  for (const [start, end] of queries) {
      my_string = reverseSubstring(my_string, start, end);
  }

  return my_string;
}

function reverseSubstring(str, start, end) {
  return str.substring(0, start) + str.substring(start, end + 1).split('').reverse().join('') + str.substring(end + 1);
}
