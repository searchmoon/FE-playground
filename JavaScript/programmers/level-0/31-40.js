//30. k의 개수 https://school.programmers.co.kr/learn/courses/30/lessons/120887

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

