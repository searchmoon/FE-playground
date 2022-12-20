// Currying 은 함수와 함께 사용할 수 있는 고급 기술. 하나 이상의 매개변수(parameter)를 갖는 함수를 부분적으로 나누어 각각
// 단일 매개변수를 갖는 함수로 설정하는 기법


// 커링은 함수를 호출하지 않는다. 단지 변환할 뿐.
// 예제1
function curry(f) {
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  }
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); //3


// 예제2
// 같은 함수를 커링과 아닌 것으로 두번 호출해 비교해보자.

//non-curried
function plusFunc(a, b, c){
  console.log(a + b + c);
}
plusFunc(1, 2, 3); //6

//curried
function plusFuncCurried(a){
  return function(b){
    return function(c){
      console.log(a + b + c);
    }
  }
}

plusFuncCurried(1)(2)(3); //6
//위의 코드는
const plusFuncCurried = a => b => c => console.log(a + b + c) // 이렇게도 가능하다.

//non-curried: 함수 실행 시 파라미터가 모자라도 문제 없이 실행이 가능함
// // 함수 정의 : func(a, b, c)
// // 함수 실행 : func(a)
// // 실행 결과 : func(a, undefined, undefined)
//
// //curried: 함수가 인수를 전부 받을 때까지 실행을 보류함.
// // 함수 정의 : func(a, b, c)
// // 함수 실행 : func(a)
// // 실행 결과 : func(a)상태에서 b 함수 입력 대기


// 콜백함수와 커링의 차이:
// 콜백함수: 다른 함수의 전달인자로 전달되는 함수
// 커링: 함수를 리턴하는 함수. 함수를 호출하지 않는다. 단지 변환할 뿐.



