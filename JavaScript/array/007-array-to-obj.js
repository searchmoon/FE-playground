// 배열을 객체로 전환하는 3가지 방법

// 1. object.assign()
// 2. array.reduce()
// 3. spread operator(전개 연산자)

// 공통 배열
const array = ['a', 'b', 'c'];

//1. object.assign() 예제


const obj1 = Object.assign({}, array);

console.log('obj1:',obj1); // { '0': 'a', '1': 'b', '2': 'c' }
// 빈 객체에 배열을 객체로 변환하여 할당한다. 배열의 요소는 value로 할당되고, 인덱스는 key로 할당된다.

const fruitsArray = {'apple': '1', 'banana': '2'};

const obj2 = Object.assign({...fruitsArray}, array);

console.log('obj2:',obj2); // { '0': 'a', '1': 'b', '2': 'c', apple: '1', banana: '2' }
// 이런식으로 원래 있는 배열과도 합칠 수 있다.



//2. array.reduce() 예제

const obj3 = array.reduce(function(누적값, 현재값, 인덱스) {
  누적값[인덱스] = 현재값;
  return 누적값;
}, {})
console.log('obj3:', obj3)
// { '0': 'a', '1': 'b', '2': 'c' }


//3. spread operator(전개 연산자) 예제
const obj4 = {...array};
console.log('obj4:',obj4); // { '0': 'a', '1': 'b', '2': 'c' }
