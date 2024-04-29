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
    return my_string.toLowerCase().split('').sort().join('');
}


