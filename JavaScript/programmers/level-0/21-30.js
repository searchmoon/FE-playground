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

//풀이 1.
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
