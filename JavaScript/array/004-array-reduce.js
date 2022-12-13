

const arr = [1, 2, 3, 4, 5];
//덧셈
export const 덧셈리듀서 = (acc, cur) => acc + cur;
const 덧셈초기값 = 0;
const 덧셈리듀서결과 = arr.reduce(덧셈리듀서, 덧셈초기값);
console.log('1, 2,3, 4,5 - 덧셈리듀서결과 : ', 덧셈리듀서결과); // 15


//곱셈
const 곱셈리듀서 = (누적값, 지금값) => 누적값 * 지금값;
const 초기값 = 1;
const mul = [1, 2, 3, 4].reduce(곱셈리듀서, 초기값);
console.log('1, 2, 3, 4 - 곱하기 리듀서 결과 :: ', mul); // 24
