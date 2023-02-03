
//06- 데이터타입

//06-01
// 이것들은 모두 숫자 타입이다.
let integer = 10;    // 정수
let double = 10.12;  // 실수
let negative = -20;  // 음의 정수

//06-02
let binary = 0b01000001; // 2진수
let octal = 0o101;       // 8진수
let hex = 0x41;          // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal);  // 65
console.log(hex);    // 65
console.log(binary === octal); // true
console.log(octal === hex);    // true

//06-03
//숫자타입은 모두 실수로 처리된다.
console.log(1 === 1.0) //true
console.log(0 === -0) //true
Object.is(0, -0) //콘솔창에는 false로 평가되는데 run 실행시키면 true넹...

//06-04
// 숫자 타입의 세 가지 특별한 값
console.log(10 / 0);       // Infinity
console.log(10 / -0);      // -Infinity
console.log(1 * 'String'); // NaN ( NaN도 Number 타입이다.)
console.log(typeof(1 * 'String')); // number타입으로 나옴
//typeof NaN ==='number' // true가 나온다.

//06-05
// 자바스크립트는 대소문자를 구별한다.
//let x = nan; // ReferenceError: nan is not defined // NaN 으로 하거나 'nan' 인 string값으로 넣거나

// BigInt
console.log(BigInt(1234567) === 1234567n) // true

//06-07
// 따옴표로 감싸지 않은 hello를 식별자로 인식한다.
//let string = hello; // ReferenceError: hello is not defined

//06-08
let abc = 123;
let template = `Template literal 
${abc}
입니다`;
console.log(template); // Template literal. 줄바꿈을 할 수 있고, 여기에 변수를 넣을 수 있다. (원래는 줄바꿈이 허용되지 않으나 백틱을 사용하면 허용됨)

// 'a'' 하면 에러남
// 'a\'' 하면 에러 안남. 문자열 안에서 작은따옴표, 큰따옴표 쓰는 방법은 앞에 역슬래시(\)붙여주면 됩니다.


//변수는 선언, 함수는 정의라 표현한다.

//06-19
//let element = document.querySelector('.myClass');

// HTML 문서에 myClass 클래스를 갖는 요소가 없다면 null을 반환한다.
//console.log(element); // null

//06-20
//Symbol
// Symbol은 변경 불가능한 원시타입이다. 다른값과 중복되지 않는 유일무이한 값이다.

Boolean(Symbol('abc') === Symbol('abc')) // false
// 심벌 값 생성
let key = Symbol('key');
console.log(typeof key); // symbol

// 객체 생성
let obj = {};

// 이름이 충돌할 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용한다.
obj[key] = 'value';
console.log(obj[key]); // value

//06-21
let a = 100;
let b = 100;

// 0x123: 100
// 0x111: 식별자 a, 값은 0x123
// 0x112: 식별자 b, 값은 0x123
// a, b가 저장된 메모리 공간은 따로 있는데 둘다 같은 주소를 바라보고 있는것이다.

//06-23
//자바스트립트의 변수는 선언이 아닌 할당에 의해 타입이 결정된다. 그리도 재할당에 의해 변수의 타입이 언제든지 동적으로 변할 수 있다.
// 이런특징을 다이나믹 타이핑이라고 하며, 동적 타입 언어라고 한다.
let foo;
console.log(typeof foo);  // undefined

foo = 3;
console.log(typeof foo);  // number

foo = 'Hello';
console.log(typeof foo);  // string

foo = true;
console.log(typeof foo);  // boolean

foo = null;
console.log(typeof foo);  // object //typeof null 이 object 라는것 알고있기.

foo = Symbol(); // 심벌
console.log(typeof foo);  // symbol

foo = {}; // 객체
console.log(typeof foo);  // object

foo = []; // 배열
console.log(typeof foo);  // object

foo = function () {}; // 함수
console.log(typeof foo);  // function
