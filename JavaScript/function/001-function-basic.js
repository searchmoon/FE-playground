// * 함수 기본

//함수 선언
function doSomething(add) {
  console.log(add);
  const result = add(2,3);
  console.log(result);
  add();
}

function add(a, b) {
  const sum = a + b;
  return sum;
}

//함수 호출
doSomething(add);
// -> 예제코드: 드림코딩 참고


// 함수를 인수로 넘기기
function isEven (x) {
  return x % 2 === 0;
}
[1,2,3,4,5].filter(isEven); // [2,4]

// 익명함수 사용
[1, 2, 3, 4, 5].filter(function (x) {
  return x % 2 === 0;
}); // [2,4]



// 화살표 함수(arrow function)
const add = (x, y) => x + y;
// x + y 는 바로 반환된다.
// 바로 반환시키지 않고 function 키워드를 통한 함수 정의 처럼 여러 구문을 사용하려면 중괄호를 사용해야 한다.
// => 다음부분을 중괄호로 둘러싸면, 명시적으로 'return' 하지 않는 한 아무것도 반환되지 않는다.
const add = (x, y) => {
  const result = x + y;
  return result;
}


// 함수 표현식과 함수 선언문
// 함수 선언문 예시
function hello() {
  return 'hello';
}
hello(); // 'hello'

// 함수 표현식 예시
const hello = function () {
  return 'hello';
}
hello(); // 'hello'


