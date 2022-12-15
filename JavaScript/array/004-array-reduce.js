

const arr = [1, 2, 3, 4, 5];
//덧셈
const 덧셈리듀서 = (acc, cur) => acc + cur;
const 덧셈초기값 = 0;
const 덧셈리듀서결과 = arr.reduce(덧셈리듀서, 덧셈초기값);
console.log('1, 2,3, 4,5 - 덧셈리듀서결과 : ', 덧셈리듀서결과); // 15


//곱셈
const 곱셈리듀서 = (누적값, 지금값) => 누적값 * 지금값;
const 초기값 = 1;
const mul = [1, 2, 3, 4].reduce(곱셈리듀서, 초기값);
console.log('1, 2, 3, 4 - 곱하기 리듀서 결과 :: ', mul); // 24




//문제1. 개발자목록 배열을 가지고 빈 오브젝트에  { '루미' : false, '레오': false } 형태로 변환해보시오

//reduce 사용 예제
const 개발자목록 = ['루미', '레오', '루카스']

let obj = 개발자목록.reduce((acc, cur, idx) => {
  // if(개발자목록[idx].length <= 2){
  console.log(개발자목록[idx].length)
   return {...acc, [cur]: false};
  // }
}, [])

console.log('obj', obj);

//
// let obj2 = 개발자목록.reduce((acc, cur, idx) => {
//   // console.log({...acc,[cur]: false});
//   return cur !== '루카스' && {...acc, [cur]: false};
// }, {})
//
// console.log('obj2', obj2);



