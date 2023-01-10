
//iterable 객체(반복가능한 객체)  iterate의 뜻은: 반복하다
// 배열을 일반화한 객체.

//배열은 대표적인 iterable 객체이다. 배열이 아닌 객체가 있는데, 이 객체가 어떤 것들의 컬렉션(목록, 집합 등)을 나타내고 있는 경우,
// for..of 문법을 적용할 수만 있다면 컬렉션을 순회하는데 유용할 겁니다.

//Symbol.iterator 메서드를 구현하면, 객체는 iterable 객체가 됩니다.

let range = {
    from: 1,
    to: 5
};

//range를 이터러블로 만들려면(for...of가 동작하게 하려면) 객체에 Symbol.iterator 메서드를 추가해야 합니다.
// 1. for..of 최초 호출 시, Symbol.iterator가 호출됩니다.
range[Symbol.iterator] = function() {
  // Symbol.iterator는 이터레이터 객체를 반환합니다.
  // 2. 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 이때 다음 값도 정해집니다.
  return {
    current: this.from,
    last: this.to,
  // 3. for..of 반복문에 의해 반복마다 next()가 호출됩니다.
    next() {
      // 4. next()는 값을 객체 {done:.., value :...}형태로 반환해야 합니다.
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  }
}

for (let num of range) {
  console.log(num); // 1, then 2, 3, 4, 5
}

// 배열과 문자열은 가장 광범위하게 쓰이는 내장 이터러블이다.
for(let char of 'test') {
  console.log(char); // t, then e, s, t 가 차례대로 출력된다.
}

//이터러블과 유사배열
//이터러블(iterable) 은 위에서 설명한 바와 같이 메서드 Symbol.iterator가 구현된 객체입니다.
// 유사 배열(array-like) 은 인덱스와 length 프로퍼티가 있어서 배열처럼 보이는 객체입니다.

//유사배열 객체의 예시
let arrayLike = { //인덱스와 length 프로퍼티가 있는 객체가 유사배열 객체이다
  0: 'Hello',
  1: 'World',
  length: 2
};
// Symbol.iterator가 없기 때문에 for..of는 동작하지 않는다. 에러 발생
for(let item of arrayLike) {}

// 이터러블과 유사 배열은 대개 배열이 아니기 때문에 push, pop 등의 메서드를 지원하지 않습니다.
// 어떻게 하면 이터러블과 유사 배열에 배열 메서드를 적용할 수 있을까요?

//Array.from
//Array.from 메서드는 이터러블이나 유사 배열을 받아 ‘진짜’ 배열로 만들어 줍니다.
// arrayLike 객체를 진짜 배열로 만들어주었다.
let arr = Array.from(arrayLike); // (*)
console.log(arr.pop()); // World (배열 메서드가 동작합니다.)



// 참고: 모던 자바스크립트. 이터러블  https://ko.javascript.info/iterable
// 모던 자바스크립트 Deep Dive 챕터 33, 34, 35 참고
