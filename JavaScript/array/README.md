1.배열: 객체의 특별한 형태

순서가 있는 데이터의 집합 배열안의 값은 원소라고 한다. 배열의 위치를 가리키는 인덱스로 각 원소에 접근한다. 인덱스는 0부터 시작하는 정수. 배열값은 어떠한 타입의 데이터든 사용할 수 있다. 배열은 객체이지만, 정수타입인 인덱스를 프로퍼티로 갖는 특별한 데이터이다.

2.배열의 생성: 배열은 Array() 생성자 함수나 리터럴 ([])을 사용해 생성합니다. 객체와 마찬가지로 배열도 자바스크립트에 내장된 생성자함수 Array()가 있으며, 이를 사용해 새로운 배열을 생성할 수 있다.

-생성자 함수를 이용하는 방법 
const arr = new Array(1, ‘2’, true);

console.log(arr); // [1, ‘2’, true]

Array() 생성자 함수는 새로운 배열을 생성하고, 인자로 받은 값들을 배열원소로 채워넣어 초기화 합니다. 
-배열 리터럴을 이용하는 방법 const arr = [1, ‘2’, true];

배열리터럴이 훨씬 간단하게 배열을 생성하고 초기화 한다. 위의 배열은 원소타입으로 숫자, 문자열, 불리언 을 볼 수 있다. 이런 배열을 비균질적 배열이라고 하는데, 일관성있게 처리하기가 힘든 배열 형태이다. 그래서 가급적 통일된 데이터를 사용하는것이 좋다.

3.원소의 접근과 동적인 원소 생성 배열의 원소는 대괄호([]) 안에 인덱스 값을 넣어 접근한다. 만약 배열길이보다 큰 인덱스값을 넣어 접근한다면 값이 할당되지않음을 표현하는 undefined 값을 반환한다.

const arr = [];

arr[0] = 1; 
arr[2] = 2; 
console.log(arr); // [1, empty, 3]
console.log(arr.length)l; // 3

4.length 프로퍼티 length 프로퍼티는 배열 데이터를 순회하거나 조작할 떄 매우 중요하다. 예를 들면= 
const arr = [1, 2, 3, 4] 인데 
arr.length = 2;

라고 해주면 console.log(arr) // [1, 2] 의 값이 나온다.

5.배열 조작

Array.prototype의 메서드를 상속받아 사용한다.

shift() : 배열의 첫번째 원소를 삭제하고, 결괏값으로 원소를 반환한다.

unshift() : 배열의 첫번째 인덱스에 원소를 추가하고, 결괏값으로 배열의 새로운 길이를 반환한다.
const arr = [1, 2]; 
console.log(arr.unshift(-1, 0)); // 4
console.log(arr) // [-1, 0, 1, 2]

push() : 배열의 마지막 인덱스에 하나 이상의 원소를 추가하고, 결괏값으로 배열의 새로운 길이를 반환한다. 
const arr = [1]; 
console.log(arr.push(2, 3)) // 3
console.log(arr); // [1, 2, 3]

pop(): 배열에서 마지막 인덱스에 해당하는 원소를 삭제하고 그 값을 결괏값으로 반환한다. 
const arr = [1, 2]; 
console.log(arr.pop()); // 2 
console.log(arr) // [1]

splice(): 배열의 원소를 추가하거나 교체 또는 삭제해 배열 데이터를 변경한다. 결괏값으로 삭제된 원소의 배열을 반환한다.
const arr = [1,2,3]; 
console.log(arr.splice(1, 2)); // [2, 3]
console.log(arr) // [1]

sort(): 배열의 원소를 인자로 넘긴 비교 함수를 사용해 정렬한다.비교 함수를 생략할 때 각 문자의 유니코드 포인트 값에 따라 정렬된다. 단, 숫자도 문자로 변환하여 정렬한다는 것을 유의해야 한다. 문자 정렬 방식이 아닌 별도의 비교방식을 정의하고 싶다면, 함수를 정의해 전달하여 사용한다. 
const arr = [3, 2, 4, 21, 55]; 
arr.sort(); 
console.loga(arr); // [2, 21, 3, 4, 55];

새로운 배열 생성 메서드원본 배열의 데이터와 length 프로퍼티에 영향을 미치지 않고 새로운 배열을 생성한다.
concat() : 
const arr = [1, 2];
const arr2 = [3, 4];
const arr3 = arr.concat(arr2); console.log(arr3); // [1, 2, 3, 4]
console.log(arr); // [1, 2] 
-slice(): 배열에서 특정 범위의 원소를 복사해 새로운 배열을 생성해 반환한다. 단, 얕은 복사를 수행하기 때문에 배열의 원소가 객체이면 참조가 유지되니 주의해야 한다. 
const obj = {} 
const arr = [1, obj, 3]; 
const newArr = arr.slice(1, 2);
console.log(newArr[0] === obj); // true
배열을 복사하는 또다른 방법은 펼침 연산자(spread operator)를 사용하는 것이다. 
slice() 메서드와 마찬가지로 얕은 복사를 수행한다. 
const arr = [1, 2, 3]; 
const newArr = […arr]; 
console.log(newArr); // [1, 2, 3] 
const popNewArr = newArr.pop();
console.log(popNewArr) // [1, 2] 
-map() : 배열의 모든 원소를 인자로 받은 함수를 실행해 순환하며 특정한 형식으로 변경한다. 변경한 원소들로 새로운 배열을 생성해 반환한다. 
const arr = [1, 2, 3]; 
const newArr = arr.map(x => x + 1) ;
console.log(newArr); // [2, 3, 4] 
-forEach() : 인자로 받은 함수를 배열의 모든 원소를 대상으로 실행한다. 
const arr = [1, 2, 3]; 
const newArr = arr.forEach( x =>
console.log(x+1)); 
콘솔창에
// 2
// 3
// 4를 반환한다.
-filter(): 인자로 받은 함수의 테스트를 통과하는 원소들로 새로운 배열을 생성해 반환한다. 
const arr = [1, 2, 3]; 
const newArr = arr.filter(x => x % 2 === 1);
console.log(newArr); // [1, 3];

유사 배열 객체자바스크립트에서는 일반 객체를 배열처럼 사용할 수 있다. 이러한 객체를 유사배열 객체라고 하며, 유사 배열 객체는 length 프로퍼티로 양의 정수값을 가진 객체여야만 한다.유사 배열 객체의 대표적인 예는 자바스크립트 함수의 arguments 객체이다.arguments 객체는 함수에 전달한 인자를 유사 배열 객체로 만든 데이터이다. 
const arr = { 0: ‘hi’; 1: ‘my’; }; 
function foo(a, b, c) {
	console.log(arguments[0], arguments[1], arguments[2]) // ‘a’, ‘b’, ‘c’
console.log(arguments.length); // 3
} 
foo(‘a’, ‘b’, ‘c’); 
arguments 객체는 마치 배열처럼 인덱스로 프로퍼티에 접근할 수 있으며, length 프로퍼티를 가진다. 하지만 배열이 아닌 유사 배열객체이기 때문에 배열의 내장 메서드를 사용할 수 없다.유사 배열 객체는 DOM을 다루다 보면 자주 만날 수 있는 형태의 데이터이니 프런트엔드 개발을 하기 위해서는 제대로 이해하고 사용할 수 있어야 한다.
