// class 함수
//010-curry.js 에서 든 예시를 가져와봤다.

class 달리는것{
  constructor(이름){
    this.이름 = 이름;
  }

  달리다(속도){
    console.log(this.이름 + `은 ${속도}의 속도 로 달리다`);
  }
}

const 자동차클래스 = new 달리는것('자동차');
const 킥보드클래스 = new 달리는것('킥보드')
console.log(자동차클래스);
console.log(킥보드클래스);

자동차클래스.달리다(100);
킥보드클래스.달리다(100);


// class 의 기본문법
class User {
  constructor(name) {
    this.name = name;
    this.hi = 'hi'
  }
  sayHi() {
    console.log(this.name, this.hi)
  }
}
//사용법

let user = new User('루미')
console.log(user.sayHi()); // 루미 hi
console.log(user); // User { name: '루미', hi: 'hi' }
// class 를 생성자 함수로 호출하면
// 1.새로운 객체가 생성된다.
// 2.넘겨받은 인수와 함께 constructor가 자동으로 실행된다. 이때 인수 '루미'가 this.name에 할당된다.
// constructor(생성자)를 이용하면 class 객체의 초기 값을 설정해 줄 수 있다.


// 그래서, class가 뭔데요?
// 1. 위에서 예를 든 class User {...} 는 User라는 이름을 가진 함수를 만든다. 함수 본문은 생성자 메서드 constructor에서 가져온다.
// 생성자 메서드가 없으면 본문이 비워진 채로 함수가 만들어진다.
// 2. sayHi 같은 클래스 내에서 정의한 메서드를 User.prototype에 저장한다.
// new User를 호출해 객체를 만든다.

// 기명 클래스 표현식.
let User2 = class MyClass {
  sayHi() {
    console.log(MyClass); //MyClass라는 이름은 오직 클래스 안에서만 사용할 수 있다.
  }
}
new User2().sayHi(); // MyClass { sayHi() { console.log(MyClass); } }
//console.log(MyClass); // ReferenceError: MyClass is not defined


// ----------

class Developer {
  //타입스크립트 인터페이스
  // name: string;
  // age: number;
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }
  eat(restaurant){
    console.log(`${this.name}은 ${restaurant}에서 밥을 먹는다`);
  }
}
const result = new Developer('루미', 20);
console.log(result.eat('맥도날드'));


// class 문법을 기본 function으로 바꾸기

function developer(name, age) {
  this.name = name;
  this.age = age;

  developer.prototype.eat = function(restaurant) {
    console.log(`${this.name}는 ${restaurant}에서 밥을 먹는다`);
  };
}
//호출하기
const result2 = new developer('루미', 20);
console.log(result2.eat('롯데리아'));

