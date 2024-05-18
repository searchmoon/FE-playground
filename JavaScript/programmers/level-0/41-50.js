//41. 이진수 더하기 https://school.programmers.co.kr/learn/courses/30/lessons/120885

function solution(bin1, bin2) {
  const answer = parseInt(bin1, 2) + parseInt(bin2, 2);

  return answer.toString(2);
}

//42. 2의 영역 https://school.programmers.co.kr/learn/courses/30/lessons/181894
function solution(arr) {
  const firstIdx = arr.indexOf(2);
  const lastIdx = arr.lastIndexOf(2);

  if (firstIdx === -1) {
    return [-1];
  }

  return arr.slice(firstIdx, lastIdx + 1);
}
