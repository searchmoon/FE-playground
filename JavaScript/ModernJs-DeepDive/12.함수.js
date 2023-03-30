// 12. 함수
// <1. 함수란?>

// 함수는 코드의 재사용 이라는 측면에서 매우 유용하다.
// 함수가 객체라는 사실은 다른 프로그래밍 언어와 구별되는 자바스크립트의 중요한 특징이다.
// 변수는 '선언(declaraion)'한다고 했지만, 함수는 '정의(definition)'한다고 표현한다.

// 12-06
// 함수 선언문은 함수 이름을 생략할 수 없다.
function (x, y) {
  return x + y;
}
// SyntaxError: Function statements require a function name 가 뜬다
function add (x, y) {
  return x + y;
}
// undefined. 함수 선언문에서는 함수 이름을 선언해줘야 에러가 안난다.


// 함수 선언문은 표현식이 아닌 문이다. 크롬 개발자도구의 콘솔에서 함수 선언문을 실행하면 완료 값 undefined가 출력된다.
function add(x, y) {
  return x + y;
}
// undefined 를 출력한다.
// 함수 선언문이 만약 표현식인 문이라면 완료 값 undefined 대신 표현식이 평가되어 생성된 함수가 출력되어야 한다.

//12-07
// 함수 선언문은 표현식이 아닌 문이므로 변수에 할당할 수 없다.
// 하지만 함수 선언문이 변수에 할당되는 것처럼 보인다.
let addfunc = function add(x, y) {
  return x + y;
};

// 함수 호출
console.log(addfunc(2, 5)); // 7
// 저 예로 보았을 때, 함수는 함수이름으로 호출하는 것이 아니라 함수 객체를 가리키는 식별자로 호출을 한다.
// add(2, 5) 를 하면 에러가 발생한다.

// <4. 함수 정의>
// <4-2 함수 표현식>
// 자바스크립트 함수는 값처럼 변수에 할당할 수도 있고 프로펕티 값이 될수도 있으며, 배열의 요소가 될수도 있다.
// 이처럼 값의 성질을 갖는 객체를 일급객체라 한다.
// 함수는 일급 객체이므로 함수 리터럴로 생성한 함수 객체를 변수에 할당할 수 있다.
// 이러한 함수 정의 방식을 함수 표현식 이라고 한다.

//12-10
// 함수 표현식
let add = function (x, y) {
  return x + y;
};

console.log(add(2, 5)); // 7
// 이처럼 한수 표현식의 함수 리터럴은 함수 이름을 생략하는 것이 일반적이다.
// 함수를 호출할 때는 함수 이름이 아니라 함수 객체를 가리키는 식별자를 사용해야한다.
// 함수 이름은 함수 몸체 내부에서만 유효한 식별자 이므로 함수 이름으로 함수를 호출할 수 없다.

//12-12 호이스팅
// 함수 참조
console.dir(add); // ƒ add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
let sub = function (x, y) {
  return x - y;
};

//12-13 생성자 함수
let add = new Function('x', 'y', 'return x + y');

console.log(add(2, 5)); // 7
// 생성자 함수로 함수를 선언할 일은 거의없다. 잘 쓰지않는다.
// 생성자 함수로 생성한 함수는 클로저를 생성하지 않는 등, 함수 선언문이나 함수 표현식으로 생성한 함수와 다르게 동작한다.

// 12-15 화살표 함수 (arrow function)
// 화살표함수는 생성자 함수로 사용할 수 없다. 같은 함수를 화살표 함수로 선언한것과, 함수선언문으로 한것과 console.dir을 출력해서 비교해보면
// 화살표함수는 prototype 프로퍼티가 없으며, arguments 객체를 생성하지 않는다. 기존 함수와 this 바인딩 방식이 다르다.
// 외부 컨텍스트에 잇는 this를 가져다 쓸 수 있다.
const add = (x, y) => x + y;
console.log(add(2, 5)); // 7

// 12-18
function add(x, y) {
  return x + y;
}

console.log(add(2)); // NaN
// 함수는 매개변수의 개수와 인수의 개수가 일치하는지 체크하지 않는다.
// x인 2와 undefined(인수가 부족해서 인수가 할당회지 않은 매개변수의 값인)가 더해져서 NaN 이 반환된다.

// 12-19
function add(x, y) {
  return x + y;
}

console.log(add(2, 5, 10)); // 7
// 매개변수가 2개인데 인수를 3개를 넣었다. 그러면 초과된 인수는 무시된다.
// 초과된 인수가 그냥 버려지는 것은 아니다. 모든 인수는 암묵적으로 arguments 객체의 프로퍼티로 보관된다.

//12-22
function add(x, y) {
  return x + y;
}

console.log(add(2));        // NaN
console.log(add('a', 'b')); // 'ab'

// 자바스크립트 엔진은 아무런 이의 제기 없이 위 코드를 실행할 것이다. 이러한 상황이 발생한 이유는 다음과 같다.
// 1. 자바스크립트 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
// 2. 자바스크립트는 동적 타입 언어이다. 따라서 자바스크립트 함수는 매개변수의 타입을 사전에 지정할 수 없다.

//12-27
function multiply(x, y) {
  return x * y; // 반환문
}

// 함수 호출은 반환값으로 평가된다.
let result = multiply(3, 5);
console.log(result); // 15

//12-28
function multiply(x, y) {
  return x * y; // 반환문
  // 반환문 이후에 다른 문이 존재하면 그 문은 실행되지 않고 무시된다.
  console.log('실행되지 않는다.');
}

console.log(multiply(3, 5)); // 15

//12-29
function foo () {
  return;
}

console.log(foo()); // undefined

//12-30
function foo () {
  // 반환문을 생략하면 암묵적으로 undefined가 반환된다.
}

console.log(foo()); // undefined

12-31
function multiply(x, y) {
  // return 키워드와 반환값 사이에 줄바꿈이 있으면
  return // 세미콜론 자동 삽입 기능(ASI)에 의해 세미콜론이 추가된다.
  x * y; // 무시된다.
}

console.log(multiply(3, 5)); // undefined
// return 반환문은 함수 몸체 내부에서만 사용할 수 있다.


//12-33
// 매개변수 primitive는 원시 값을 전달받고, 매개변수 obj는 객체를 전달받는다.
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = 'Kim';
}

// 외부 상태
let num = 100;
let person = { name: 'Lee' };

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시 값은 값 자체가 복사되어 전달되고 객체는 참조 값이 복사되어 전달된다.
changeVal(num, person);

// 원시 값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "Kim"}


// 즉시 실행 함수 34-42번
//12-34 익명 즉시 실행 함수
  (function () {
    let a = 3;
    let b = 5;
    return a * b;
  }());

  //12-35 기명 즉시 실행 함수
  (function foo() {
    let a = 3;
    let b = 5;
    return a * b;
  }());
// 기명 즉시실행 함수는 기명으로 할 필요성은 없다. 어차피 한번 실행되고 말것
foo(); // ReferenceError: foo is not defined


// 12-36 함수를 ()로 감싸지 않아서 에러가 발생한다.
function () { // SyntaxError: Function statements require a function name
              // ...
}();

// 12-37
function foo() {
  // ...
}(); // SyntaxError: Unexpected token ')'
// 12-38
function foo() {}(); // => function foo() {};();
// 암묵적으로 수행하는ㄴ 세미콜론 자동삽입 기능에 의해 함수 선언문이 끝나는 위치, 즉, 함수 코드 블록의 닫는 중괄호 뒤에 ';'이 암묵적으로 추가되기 때문


//12-40
console.log(typeof (function f(){})); // function
console.log(typeof (function (){}));  // function

//12-41 즉시 실행 함수 실행 예
(function () {
  // ...
}());

(function () {
  // ...
})();

!function () {
  // ...
}();

+function () {
  // ...
}();


//12-42
// 즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있다.
let res = (function () {
  let a = 3;
  let b = 5;
  return a * b;
}());

console.log(res); // 15

// 즉시 실행 함수에도 일반 함수처럼 인수를 전달할 수 있다.
res = (function (a, b) {
  return a * b;
}(3, 5));

console.log(res); // 15

// 12-43 재귀함수
// 함수가 자기 자신을 호출하는 것을 재귀함수라고 한다.
function countdown(n) {
  for (let i = n; i >= 0; i--) console.log(i);
}

countdown(10);
// 재귀함수는 반복되는 처리를 위해 사용한다.

//12-44
function countdown(n) {
  if (n < 0) return;
  console.log(n);
  countdown(n - 1); // 재귀 호출
}

countdown(10);

//12-45
// 팩토리얼(계승)은 1부터 자신까지의 모든 양의 정수의 곱이다.
// n! = 1 * 2 * ... * (n-1) * n
function factorial(n) {
  // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
  if (n <= 1) return 1;
  // 재귀 호출
  return n * factorial(n - 1);
}

console.log(factorial(0)); // 0! = 1
console.log(factorial(1)); // 1! = 1
console.log(factorial(2)); // 2! = 2 * 1 = 2
console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6
console.log(factorial(4)); // 4! = 4 * 3 * 2 * 1 = 24
console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120
//12-46
// 함수 표현식
let factorial = function foo(n) {
  // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
  if (n <= 1) return 1;
  // 함수를 가리키는 식별자로 자기 자신을 재귀 호출
  return n * factorial(n - 1);

  // 함수 이름으로 자기 자신을 재귀 호출할 수도 있다.
  // console.log(factorial === foo); // true
  // return n * foo(n - 1);
};

console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120
//12-47
function factorial(n) {
  if (n <= 1) return 1;

  let res = n;
  while (--n) res *= n;
  return res;
}

console.log(factorial(0)); // 0! = 1
console.log(factorial(1)); // 1! = 1
console.log(factorial(2)); // 2! = 2 * 1 = 2
console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6
console.log(factorial(4)); // 4! = 4 * 3 * 2 * 1 = 24
console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120

//12-48
//<7.중첩함수>
function outer() {
  let x = 1;

  // 중첩 함수 (함수안에 함수가 있으면 그걸 중첩함수라 한다)
  function inner() {
    let y = 2;
    // 외부 함수의 변수를 참조할 수 있다.
    console.log(x + y); // 3
  }

  inner();
}

outer();
12-49
// n만큼 어떤 일을 반복한다.
function repeat(n) {
  // i를 출력한다.
  for (let i = 0; i < n; i++) console.log(i);
}

repeat(5); // 0 1 2 3 4
12-50
// n만큼 어떤 일을 반복한다.
function repeat1(n) {
  // i를 출력한다.
  for (let i = 0; i < n; i++) console.log(i);
}

repeat1(5); // 0 1 2 3 4

// n만큼 어떤 일을 반복한다.
function repeat2(n) {
  for (let i = 0; i < n; i++) {
    // i가 홀수일 때만 출력한다.
    if (i % 2) console.log(i);
  }
}

repeat2(5); // 1 3

//<7-4. 콜백함수>
//12-51
// 외부에서 전달받은 f를 n만큼 반복 호출한다.
function repeat(n, f) {
  for (let i = 0; i < n; i++) {
    f(i); // i를 전달하면서 f를 호출
  }
}

let logAll = function (i) {
  console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logAll); // 0 1 2 3 4

let logOdds = function (i) {
  if (i % 2) console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logOdds); // 1 3

// 12-51 예제처럼 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백함수라 한다.
// 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 고차 함수 라고한다.
// 고차함수는 매개변수를 통해 전달받은 콜백 함수의 호출 시점을 결정해서 호출한다.
// 다시말해, 콜백함수는 고차함수에 의해 호출되며 이때 고차함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.
// event handler( onClick 등) 함수들은 콜백함수이다.

//12-52
// 익명 함수 리터럴을 콜백 함수로 고차 함수에 전달한다.
// 익명 함수 리터럴은 repeat 함수를 호출할 때마다 평가되어 함수 객체를 생성한다.
repeat(5, function (i) {
  if (i % 2) console.log(i);
}); // 1 3

//12-53
// logOdds 함수는 단 한 번만 생성된다.
let logOdds = function (i) {
  if (i % 2) console.log(i);
};

// 고차 함수에 함수 참조를 전달한다.
repeat(5, logOdds); // 1 3

//12-54
// 콜백 함수를 사용한 이벤트 처리
// myButton 버튼을 클릭하면 콜백 함수를 실행한다.
document.getElementById('myButton').addEventListener('click', function () {
  console.log('button clicked!');
});

// 콜백 함수를 사용한 비동기 처리
// 1초 후에 메시지를 출력한다.
setTimeout(function () {
  console.log('1초 경과');
}, 1000);

//12-55 이 예제의 메서드 안에 있는 함수들은 다 콜백함수이다.
// 콜백 함수를 사용하는 고차 함수 map
let res = [1, 2, 3].map(function (item) {
  return item * 2;
});

console.log(res); // [2, 4, 6]

// 콜백 함수를 사용하는 고차 함수 filter
res = [1, 2, 3].filter(function (item) {
  return item % 2;
});

console.log(res); // [1, 3]

// 콜백 함수를 사용하는 고차 함수 reduce
res = [1, 2, 3].reduce(function (acc, cur) {
  return acc + cur;
}, 0);

console.log(res); // 6

//12-56 순수함수
let count = 0; // 현재 카운트를 나타내는 상태

// 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
function increase(n) {
  return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
count = increase(count);
console.log(count); // 1

count = increase(count);
console.log(count); // 2

//12-57 비순수함수
let count = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.

// 비순수 함수 ( 외부 상태에 따라 반환값이 달라지는 함수)
function increase() {
  return ++count; // 외부 상태에 의존하며 외부 상태를 변경한다.
}

// 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기 어려워진다.
increase();
console.log(count); // 1

increase();
console.log(count); // 2
.



