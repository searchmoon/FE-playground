console.log('생성자 함수 예시')

function User(name) {
    this.name = name;
    this.isMale = false;
}

let user = new User("정은");

console.log(user.name); // 정은
console.log(user.isMale); // false

// 객체 리터럴 문법으로 일일이 객체를 만드는 방법보다 훨씬 간단하게 객체를 만들 수 있다.//
// 생성자 함수의 의의는 재사용 가능한 객체 생성코드를 구현하는 것.
// 생성자 함수는 반드시 new 연산자와 함께 호출해야 한다. 호출 시 내부에서 this가 암시적으로 만들어지고, 마지막엔 this가 반환된다.

