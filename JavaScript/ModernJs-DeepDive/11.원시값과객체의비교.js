
// 11. 원시값과 객체의 비교
// <1.원시값>

// 11-01
// const 키워드를 사용해 선언한 변수는 재할당이 금지된다. 상수는 재할당이 금지된 변수일 뿐이다.
const o = {};

// const 키워드를 사용해 선언한 변수에 할당한 원시값(상수)은 변경할 수 없다.
// 하지만 const 키워드를 사용해 선언한 변수에 할당한 객체는 변경할 수 있다.
o.a = 1;
console.log(o); // {a: 1}

//11-02
// 문자열은 0개 이상의 문자들로 이뤄진 집합이다.
let str1 = '';      // 0개의 문자로 이뤄진 문자열(빈 문자열)
let str2 = 'Hello'; // 5개의 문자로 이뤄진 문자열

//11-03
// let 으로 선언된 값은 재할당 가능
let str = 'Hello';
str = 'world';

//11-04
let str = 'string';

// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다. 유사배열!
console.log(str[0]); // s

// 원시 값인 문자열이 객체처럼 동작한다.
console.log(str.length); // 6
console.log(str.toUpperCase()); // STRING

//11-05
let str = 'string';

// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다.
// 하지만 문자열은 원시값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.
str[0] = 'S';

console.log(str); // string

//11-06
let score = 80;
let copy = score;

console.log(score); // 80
console.log(copy);  // 80
// copy가 score와 같은 주소를 바라보기 때문에 같은 값이 나오게된다.

score = 100;

console.log(score); // 100
console.log(copy);  // ?  -> 정답은? : 80
// copy는 이전의 80이 담긴 주소를 바라보는데 score는 100이 다시 할당 되었으므로 copy는 그대로 80, score는 100이다.

//11-07
let score = 80;

// copy 변수에는 score 변수의 값 80이 복사되어 할당된다.
let copy = score;

console.log(score, copy); // 80  80
console.log(score === copy); // true
//11-08
let score = 80;

// copy 변수에는 score 변수의 값 80이 복사되어 할당된다.
let copy = score;

console.log(score, copy);    // 80  80
console.log(score === copy); // true

// score 변수와 copy 변수의 값은 다른 메모리 공간에 저장된 별개의 값이다.
// 따라서 score 변수의 값을 변경해도 copy 변수의 값에는 어떠한 영향도 주지 않는다.
score = 100;

console.log(score, copy);    // 100  80
console.log(score === copy); // false
//11-09
let x = 10;

// <2.객체>
// 객체(참조) 타입의 값, 즉 객체는 변경 가능한 값이다.

//11-12
// 할당이 이뤄지는 시점에 객체 리터럴이 해석되고, 그 결과 객체가 생성된다.
let person = {
  name: 'Lee'
};

// person 변수에 저장되어 있는 참조값으로 실제 객체에 접근해서 그 객체를 반환한다.
console.log(person); // {name: "Lee"}
//일반적으로 원시값을 할당한 변수의 경우는 '변수는 ㅇㅇ값을 갖는다'라고 표현한다.
//객체를 할당한 변수의 경우에는 '변수는 객체를 참조하고 있다' 또는 '변수는 객체를 가리키고 있다' 라고 표현한다.
// p.148에 11-7번 그림 참조. 원시값을 할당한 변수는 1단계를 거치지만,객체는 몇단계를 거치기 때문

//얕은 복사와 깊은 복사
//재귀적으로 해서 객체 안에 있는 모든 프로퍼티에 내부에 있는 모든 참조 가능한 모든 것들을 전부 다 복사해서 원시 값에
//다다를 때까지 전부다 복사하는 것이 깊은 복사 즉, 얕은복사(1단계만 복사) <-> 깊은복사(재귀적으로 원시값까지 전부 복사)

//11-14
const o = { x: { y: 1 } };

// 얕은 복사
const c1 = { ...o }; // 35장 "스프레드 문법" 참고
console.log(c1 === o); // false
console.log(c1.x === o.x); // true

// lodash의 cloneDeep을 사용한 깊은 복사
// "npm install lodash"로 lodash를 설치한 후, Node.js 환경에서 실행
const _ = require('lodash');

// 깊은 복사
const c2 = _.cloneDeep(o);
console.log(c2 === o); // false
console.log(c2.x === o.x); // false
//11-15
const v = 1;

// "깊은 복사"라고 부르기도 한다.
const c1 = v;
console.log(c1 === v); // true

const o = { x: 1 };

// "얕은 복사"라고 부르기도 한다.
const c2 = o;
console.log(c2 === o); // true
//11-16
let person = {
  name: 'Lee'
};

// 참조값을 복사(얕은 복사)
let copy = person;
//11-17
let person = {
  name: 'Lee'
};

// 참조값을 복사(얕은 복사). copy와 person은 동일한 참조값을 갖는다.
let copy = person;

// copy와 person은 동일한 객체를 참조한다.
console.log(copy === person); // true

// copy를 통해 객체를 변경한다.
copy.name = 'Kim';

// person을 통해 객체를 변경한다.
person.address = 'Seoul';

// copy와 person은 동일한 객체를 가리킨다.
// 따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받는다.
console.log(person); // {name: "Kim", address: "Seoul"}
console.log(copy);   // {name: "Kim", address: "Seoul"}
//11-18
let person1 = {
  name: 'Lee'
};

let person2 = {
  name: 'Lee'
};

console.log(person1 === person2); // ① 답: false / 1, 2가 가리키는 객체는 비록 내용은 같지만 다른 메모리에 저장된 별개의 객체다.
console.log(person1.name === person2.name); // ② 답: true / 둘다 값으로 평가될 수 있는 표현식이고 두 표현식의 원시 값이 모두 'Lee'로 평가된다.

