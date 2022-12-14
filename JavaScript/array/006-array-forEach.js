
const arr = ['a', 'b', 'c'];

const result = arr.forEach(item => console.log(item));

console.log('result :', result); //undefined
// forEach는 배열의 각 요소에 대해 callback 함수를 실행하고, undefined를 반환한다.




//문제: 개발자목록 배열을 가지고 빈 오브젝트에  { '루미' : false, '레오': false } 형태로 변환해보시오

//forEach 사용 예제
const 개발자목록 = ['루미', '레오', '루카스' ]
let obj = {};

개발자목록.forEach((item, index) => {
  if(item.length <= 2){
    obj[item] = false;
  }
});
console.log('obj', obj);




