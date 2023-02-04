

// 08 - 제어문

// <1. 블록문 >
// 블록문은 0개 이상의 문을 중괄호로 묶은것.
// 블록문은 단독으로 사용할 수도 있으나, 일반적으로 제어문이나 함수를 정의할때 사용하는 것이 일반적이다.
// 문의 끝에는 세미콜론을 붙이는 것이 일반적이다.
// 하지만 블록문은 언제나 문의 종료를 의미하는 자체 종결성을 갖기 떄문에 블록문의 끝에는 세미콜론을 붙이지 않는다.





// 08-01
// 블록문
{
  let foo = 10;
}

// 제어문 (if문 다음에 나오는 블록문)
let x = 1;
if (x < 10) {
  x++;
}

// 함수 선언문
function sum(a, b) {
  return a + b;
}

//08-16 while문
let count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2

//08-17 do... while문
let count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count);
  count++;
} while (count < 3); // 0 1 2

// < 4.break 문 >
// 08-18
if (true) {
  break; // Uncaught SyntaxError: Illegal break statement
}
