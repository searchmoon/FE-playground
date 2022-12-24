// < this >
// (화살표 함수는 this 바인딩을 제공하지 않는다.)

const test = {
    prop: 42,
    func: function () {
      return this.prop;
    },
  };
  console.log(test.func()); // 42
  
  // 전역 문맥
  // 전역 실행 맥락에서 thi는 엄격모드 여부에 관계 없이 전역 객체를 참조한다.
  
  // 웹 브라우저에서는 window 객체가 전역 객체.
  console.log(this === window); // true
  
  a = 37;
  console.log(window.a); //37
  
  this.b = "MDN";
  console.log(window.b); // "MDN"
  console.log(b); // "MDN"
  
  // 엄격 모드 , 비엄격 모드
  // 비엄격 모드의 예
  function f1() {
    return this;
  }
  
  //브라우저
  f1() === window; // true
  
  // Node .js
  f1() === global; //true
  
  // 엄격 모드의 예
  function f2() {
    "use strict";
    return this;
  }
  
  f2() === undefined; // true
  
  // 화살표 함수에서의 this.
  let globalObject = this;
  let foo = () => this;
  console.log(foo() === globalObject); // true
  
  // 자바스크립트의 경우 함수 호출 방식에 의해 this에 바인딩 할 어떤 객체가 동적으로 결정된다.
  // 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩 할 객체가 동적으로 결정된다.
  