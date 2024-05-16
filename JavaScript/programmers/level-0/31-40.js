//31. k의 개수 https://school.programmers.co.kr/learn/courses/30/lessons/120887

//풀이 1.
function solution(i, j, k) {
  let answer = 0;

  for (let index = i; index <= j; index++) {
    let stringNum = String(index);

    for (let char of stringNum) {
      if (char == k) {
        answer++;
      }
    }
  }

  return answer;
}

//풀이 2.
// function solution(i, j, k) {
//   const fillArr = Array(j - i + 1)
//     .fill()
//     .map((item, idx) => i + idx);
//   const filtered = fillArr.filter((item) => String(item).includes(k));

//   const joined = filtered.join("").split("");
//   const resultArr = joined.filter((item) => Number(item) === k);

//   return resultArr.length;
// }

//32. 한 번만 등장한 문자 https://school.programmers.co.kr/learn/courses/30/lessons/120896
// map 을 for문으로 돌릴때.
// 반복문 안에서 key, value 쌍을 대상으로 순회할때,
// -> for (let [key, value] of map) {}
// key를 대상으로 순회할때,
// -> for (let key of map.keys()) {}
// value를 대상으로 순회할때,
// -> for (let value of map.values()) {}

//풀이 1. 생성자 Map을 이용
function solution(s) {
  let answer = "";
  let map = new Map();

  for (let letter of s) {
    if (map.get(letter)) {
      map.set(letter, map.get(letter) + 1);
    } else {
      map.set(letter, 1);
    }
  }

  for (let [key, value] of map) {
    if (value === 1) {
      answer += key;
    }
  }

  return answer.split("").sort().join("");
}

//풀이2.
function solution(s) {
  var answer = "";

  let array = s.split("").sort();
  array.push("!");

  let temp = array[0];
  let count = 1;

  for (let i = 1; i < array.length; i++) {
    let char = array[i];

    if (char == temp) {
      count++;
      continue;
    } else {
      if (count == 1) {
        answer += temp;
      }

      temp = char;
      count = 1;
    }
  }

  return answer;
}

//풀이 3. 풀이 2와 비슷
function solution(s) {
  let answer = [];
  let sortArr = s.split("").sort();
  sortArr.push("!");

  let count = 1;
  for (let i = 0; i < sortArr.length - 1; i++) {
    if (sortArr[i] === sortArr[i + 1]) {
      count++;
      continue;
    }
    if (sortArr[i] !== sortArr[i + 1] && count === 1) {
      answer.push(sortArr[i]);
      continue;
    } else {
      count = 1;
    }
  }

  return answer.join("");
}

//33. 문자열 뒤집기 https://school.programmers.co.kr/learn/courses/30/lessons/181905

function solution(my_string, s, e) {
  const sliced = my_string.slice(s, e + 1);
  const reversed = sliced.split("").reverse().join("");

  return my_string.replace(sliced, reversed);
}

//34. 배열 만들기 5 https://school.programmers.co.kr/learn/courses/30/lessons/181912

function solution(intStrs, k, s, l) {
  let answer = [];

  for (let item of intStrs) {
    if (item.slice(s, l + s) > k) {
      answer.push(Number(item.slice(s, l + s)));
    }
  }

  return answer;
}

//35. 특정 문자열로 끝나는 가장 긴 부분 문자열 찾기 https://school.programmers.co.kr/learn/courses/30/lessons/181872
function solution(myString, pat) {
  const indexOfStr = myString.lastIndexOf(pat);

  return myString.slice(0, indexOfStr + pat.length);
}

//36. 1로 만들기 https://school.programmers.co.kr/learn/courses/30/lessons/181880

//풀이 1.
function solution(num_list) {
  let answer = 0;
  for (let num of num_list) {
    if (num === 0) continue;
    if (num > 15) {
      answer += 4;
    } else if (num > 7) {
      answer += 3;
    } else if (num > 3) {
      answer += 2;
    } else if (num > 1) {
      answer += 1;
    }
    console.log(answer);
  }
  return answer;
}

//풀이2.
function solution(num_list) {
  let answer = 0;

  for (let num of num_list) {
    while (1 < num) {
      num = parseInt(num / 2);
      answer++;
    }
  }

  return answer;
}

//37. 2차원으로 만들기 https://school.programmers.co.kr/learn/courses/30/lessons/120842

//풀이 1.
function solution(num_list, n) {
  let answer = [];

  for (let i = 0; i < num_list.length; i += n) {
    answer.push([]);
    for (let j = 0; j < n; j++) {
      console.log(i / n, i + j);
      answer[parseInt(i / n)].push(num_list[i + j]);
    }
  }

  return answer;
}

//풀이 2.
function solution(num_list, n) {
  const result = [];
  for (let i = 0; i < num_list.length; i += n) {
    result.push(num_list.slice(i, i + n));
  }
  return result;
}

//38. 배열 만들기 4 https://school.programmers.co.kr/learn/courses/30/lessons/181918

function solution(arr) {
  let stk = [];
  let i = 0;

  while (i < arr.length) {
    if (stk.length === 0 || stk[stk.length - 1] < arr[i]) {
      stk.push(arr[i]);
      i++;
    } else {
      stk.pop();
    }
  }

  return stk;
}

//39. 리스트 자르기 https://school.programmers.co.kr/learn/courses/30/lessons/181897

function solution(n, slicer, num_list) {
  let answer = [];

  if (n === 1) {
    answer = num_list.slice(0, slicer[1] + 1);
  } else if (n === 2) {
    answer = num_list.slice(slicer[0]);
  } else if (n === 3) {
    answer = num_list.slice(slicer[0], slicer[1] + 1);
  } else if (n === 4) {
    for (let i = slicer[0]; i <= slicer[1]; i += slicer[2]) {
      answer.push(num_list[i]);
    }
  }

  return answer;
}

//40. 빈 배열에 추가, 삭제하기 https://school.programmers.co.kr/learn/courses/30/lessons/181860

function solution(arr, flag) {
  let X = [];
  for (let i = 0; i < arr.length; i++) {
    if (flag[i]) {
      let leng = arr[i] * 2;

      while (leng > 0) {
        X.push(arr[i]);
        leng--;
      }
    } else {
      while (arr[i] > 0) {
        X.pop();
        arr[i]--;
      }
    }
  }
  return X;
}
