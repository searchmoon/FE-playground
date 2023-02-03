

// 07-연산자

// < 1. 산술연산자 >

// 단항 산술연산자
// ++: 증가, --: 감소, +: 어떠한 효과도 없다., -: 양수를 음수로, 음수를 양수로 반전한 값을 반환한다.

//07-06 단항 연산자 (+)
let x  = '1';

// 문자열을 숫자로 타입 변환한다.
console.log(+x); // 1
// 부수 효과는 없다.
console.log(x);  // "1"

// 불리언 값을 숫자로 타입 변환한다.
x = true;
console.log(+x); // 1
// 부수 효과는 없다.
console.log(x);  // true

// 불리언 값을 숫자로 타입 변환한다.
x = false;
console.log(+x); // 0
// 부수 효과는 없다.
console.log(x);  // false

// 문자열을 숫자로 타입 변환할 수 없으므로 NaN을 반환한다.
x = 'Hello';
console.log(+x); // NaN
// 부수 효과는 없다.
console.log(x);  // "Hello"

//결론: +는 타입을 숫자타입으로 변환한다. 부수효과는 없다.

//07-07 단항연산자 (-)

// 부호를 반전한다.
console.log(-(-10)); // -> 10

// 문자열을 숫자로 타입 변환한다.
console.log(-'10'); // -> -10

// 불리언 값을 숫자로 타입 변환한다.
console.log(-true); // -> -1

// 문자열은 숫자로 타입 변환할 수 없으므로 NaN을 반환한다.
console.log(-'Hello'); // -> NaN

//07-08
// 문자열 연결 연산자
// '1' + 2; // -> '12'
// 1 + '2'; // -> '12'

//123+'' -> "123"( toString을 안하고 이렇게 쓰는 경우도 있다.)
let num = 123+''; // + ''
console.log(typeof num);
console.log(num);

let test = (12345).toString(); // .toString()
// let test = 12345.toString(); -> 이렇게는 에러뜸. 형변환을 위해 12345를 가로로 묶어줘야함.
console.log(typeof test);
let meme = String(123); // String()
console.log(typeof meme); //string

// 서버에서 데이터를 보내줄 때 숫자인걸 문자열로 보내줄 때도 있어서 이렇게 그냥 앞에 + 붙여서 number 타입으로 변환할때도 있다. 자주 쓰이나??
console.log(+'0123');
console.log(typeof +'0123'); //number


//< 2.할당연산자 >

//07-09
// 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당한다.
let a;

a = 10;
console.log(a); // 10

a += 5; // x = x + 5;
console.log(a); // 15

a -= 5; // x = x - 5;
console.log(a); // 10

a *= 5; // x = x * 5;
console.log(a); // 50

a /= 5; // x = x / 5;
console.log(a); // 10

a %= 5; // x = x % 5;
console.log(a); // 0

let str = 'My name is ';

// 문자열 연결 연산자
str += 'Lee'; // str = str + 'Lee';
console.log(str); // 'My name is Lee'

//07-10

let b;

// 할당문은 표현식인 문이다.
console.log(b = 10); // 10

// < 3. 비교연산자 >

//07-12
//동등비교 (==)
// 동등 비교
5 == 5; // -> true

// 타입은 다르지만 암묵적 타입 변환을 통해 타입을 일치시키면 동등하다.
5 == '5'; // -> true
1 == true; // -> true
// 동등비교는 결과를 예측하기 어렵다. 그러므로 동등비교보다는 일치비교 연산자를 쓰는게 좋다.

//07-14
// 일치비교(===)
1 === '1'; // -> false. 비교하기도 전에 타입자체가 달라버리니깐 바로 false 때려버린다.
// 즉, 값과 타입이 모두 같은 경우만 true를 반환한다.

//07-15
// NaN은 자신과 일치하지 않는 유일한 값이다.
NaN === NaN; // -> false

//07-16
console.log(Number.isNaN(NaN)); // true
//Number.isNaN() 메서드는 전달된 값이 숫자값 NaN인지 판별합니다. 기존부터 존재한 전역 isNaN() 함수의 더 엄격한 버전입니다.
console.log(Number.isNaN(123)); // false
Number.isNaN(NaN); // -> true
Number.isNaN(10);  // -> false
Number.isNaN(1 + undefined); // -> true
Number.isNaN(+'123fff'); // -> true
// isNaN() 으로 썼었던게 결과값이 정확하지 않다. ES6부터는 더 정확한 Number.isNaN() 를 쓴다.

//07-17
// 양의 0과 음의 0의 비교. 일치 비교/동등 비교 모두 결과는 true이다.
0 === -0; // -> true
0 == -0;  // -> true
//07-18
-0 === +0;         // -> true
Object.is(-0, +0); // -> false
NaN === NaN;         // -> false
Object.is(NaN, NaN); // -> true
//정확한 비교를 하려면 늘 Object.is 로 하면된다.

//07-21
let c = 2;
// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
let result = c % 2 ? '홀수' : '짝수';
console.log(result); // 짝수

//07-23
let d = 10;

// let result = if (d % 2) { result = '홀수'; } else { result = '짝수'; }; // 이렇게 사용 불가.
// SyntaxError: Unexpected token if
// 21번 예제인 삼항연산자는 값처럼 사용할 수 있다. result에 할당 가능, 23번 예제인 if문은 표현식이 아닌 문이기 대문에 값처럼 사용할 수 없다.
const isholsu = (x) => {
  if (x % 2) {
    return result = '홀수';
  } else {
    return result = '짝수';
  }
  ;
}
isholsu(4); // 짝수

// < 5. 논리연산자 >
//07-25
// 논리합(||) 연산자
// 이렇게 생각하면 될듯. A || B => A가 아니면 B.(A가 맞을경우 A이고, 그게 아니면 B)
true || true;   // -> true
true || false;  // -> true
false || true;  // -> true
false || false; // -> false

// 논리곱(&&) 연산자
// A가 true일 경우에 B값을 평가한다. A부터 false 이면 false를 반환.
true && true;   // -> true (이 true는 A,B 로 쳤을때 뒤에거인 B를 반환하는것이다.)
//단축 평가
//'Cat' && 'Dog'; // -> 'Dog';
true && false;  // -> false
false && true;  // -> false
false && false; // -> false

// 논리 부정(!) 연산자
!true;  // -> false
!false; // -> true

//07-28 드모르간의 법칙
!(x || y) === (!x && !y)
!(x && y) === (!x || !y)
//or는 and가 되고 and는 or가 된다. 수학공식 생각하면 됨.

// < 6. 쉼표연산자 >
//07-29
let x, y, z;
x = 1, y = 2, z = 3; // 3
// 쉼표 연산자는 왼쪽 피연산자부터 차례대로 피연산자를 평가하고 마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평가 결과를 반환한다.

// < 8. typeof 연산자 >
//07-31
typeof ''              // -> "string"
typeof 1               // -> "number"
typeof NaN             // -> "number" NaN 도 number!
typeof true            // -> "boolean"
typeof undefined       // -> "undefined"
typeof Symbol()        // -> "symbol"
typeof null            // -> "object" null이 object 타입이라는건 기억해야함
typeof []              // -> "object"
typeof {}              // -> "object"
typeof new Date()      // -> "object"
typeof /test/gi        // -> "object"
typeof function () {}  // -> "function"

//07-34 ( ** : 제곱 )
2 ** 2;   // 2의 2승(제곱) -> 4
2 ** 2.5; // -> 5.65685424949238
2 ** 0;   // -> 1
2 ** -2;  // -> 0.25

// 2 ** 2 는 Math.pow(2,2) 와 같다.

//07-39
// 지수 연산자는 이항연산자 중에서 우선순위가 가장 높다.
2 * 5 ** 2; // -> 50

// <10. 그 외의 연산자 > 중 optional chaining (옵셔널 체이닝) 연산자   ?.

// p. 122
// 옵셔널 체이닝 연산자는 좌항의 피연산자가 null또는 undefined인 경우 undefined 를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.


// < 11. 연산자의 부수 효과 >
//07-40
let x;

// 할당 연산자는 변수 값이 변하는 부수 효과가 있다.
// 이는 x 변수를 사용하는 다른 코드에 영향을 준다.
x = 1;
console.log(x); // 1

// 증가/감소 연산자(++/--)는 피연산자의 값을 변경하는 부수 효과가 있다.
// 피연산자 x의 값이 재할당되어 변경된다. 이는 x 변수를 사용하는 다른 코드에 영향을 준다.
x++;
console.log(x); // 2

let o = { a: 1 };

// delete 연산자는 객체의 프로퍼티를 삭제하는 부수 효과가 있다.
// 이는 o 객체를 사용하는 다른 코드에 영향을 준다.
delete o.a;
console.log(o); // {}

//07-41
10 * (2 + 3); // -> 50
// 연산자는 종류가 많아서 우선순위를 모두 기억하는 것보다, 그룹연산자(가로 ())를 사용하여 우선순위를 명시적으로 조절하는게 좋다.
