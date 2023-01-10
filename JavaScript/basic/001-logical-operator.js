
// 논리곱(&&), 논리합(||) 연산자

const run = (person) => {
  if(person) {
    console.log(`${person} is running`)
  } else {
    console.log('nobody run')
  }
}

const run2 = (person) => {
  person || console.log(`nobody run`);
}

const run3 = (person) => {
  person && console.log(`${person} is running`);
}

run('rumi');
run2('rumi2');
run3('rumi3');

// &&는 모든 조건이 참이여야 true를 반환한다.
// true && true // true
// true && false // false
// false && true // false
// false && false // false

// ||는 하나라도 참이면 true를 반환한다.
// true || true // true
// true || false // true
// false || true // true
// false || false // false

// ?. 옵셔널 체이닝
// 객체의 속성이 없는 경우, typeError가 발생하지 않고 undefined를 반환한다. (ts)
const obj = {
  name: 'ru mi',
}
console.log(obj.name.length) // 5
console.log(obj.age?.length) // undefined


// ?? Nullish 병합 연산자
// ??는 좌항의 피연산자가 null 또는 undefined일 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.
const foo = null ?? 'default string';
console.log(foo) // 'default string'

const oper1 = 0 ?? 42;
console.log(oper1) // 0
const oper2 = 0 || 42;
console.log(oper2) // 42
// 논리합 연산자와의 차이. 구분 잘하기
// '??' 와 '||'의 차이
// ||는 첫 번째 truthy 값을 반환합니다.
// ??는 첫 번째 정의된(defined) 값을 반환합니다.

height = height ?? 100;

let height = 0;

console.log(height || 100); //100
// height가 0이기 때문에 falthy한 값으로 취급되어 100이 출력됩니다.

console.log(height ?? 100); //0
// height가 0이라 falthy한 값이지만, undefined나 null이 아니기 때문에(falthy 하나 false는 아니기 때문에) 0이 출력됩니다.


