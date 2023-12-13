12/9일. 

## 1.type annotation
변수, 함수 매개변수, 반환값 등의 타입을 지정할 때 사용한다. 
변수 또는 매개변수 이름 뒤에 콜론(:) 을 사용하여 타입을 명시하는 방법.
### 기본타입:

```typescript
let age: number = 25;
let name: string = "John";
let isStudent: boolean = true;
let person = (age: number, name: string) => {
  console.log(`${age}살 ${name}입니다`);
};
```

### 읽기 전용 속성
읽기 전용 속성을 가진 객체에 대한 타입 애너테이션은 readonly 키워드를 사용. 읽기 전용 속성은 해당 속성이 선언된 후에 값을 변경할 수 없도록 한다.
```typescript
interface Person {
  readonly age: number;
  name: string;
}

let person: Person = { age: 18, name: "Alice" };
person.name = 'Rumi'; // 는 가능
// person.age = 2; // Error: Cannot assign to 'age' because it is a read-only property.
```
### 선택적 속성
선택적 속성은 특정 속성이 있을 수도 있고 없을 수도 있는 경우 사용된다. 속성 이름 뒤에 ? 를 붙인다.
옵셔널 이라고 하기도 한다.
```typescript
interface Car {
  brand: string;
  model?: string; // 선택적 속성
}

let myCar: Car = { brand: "Toyota" };
// myCar.model = "Camry";
```

- type annotation과는 다르게 타입스크립트가 알아서 타입을 추론하는 것을 type inference 라고 한다.
- 자동으로 타입을 추론하지 못해서 type annotation을 꼭 해줘야하는 경우:
1. 함수에서 리턴값이 명확하지 않은 경우
  ```typescript
  function add(a: number, b: number) {
    return a + b;
  }
  ```
  이런 경우에는 return 값이 number라는 것을 추론할수는 있지만, 함수의 복잡성이 증가하게 되면 명시적인 타입을 지정하는것이 좋다.
2. 변수 선언을 먼저하고 나중에 초기화를 하는 경우
  ```typescript
let greeting;
greeting = 'hello';
  ```
  이런경우에는 추론하지 못하기 때문에 let greeting: string; 이런식으로 타입을 지정해주는것이 좋다.
3. 변수에 대입될 값이 일정치 못하는 경우(바뀌는 경우)
  ```typescript
let num = [1, 20];
let numAboveZero: boolean | number = false;
for(let i = 0; i < num.length; i++){
	if(num[i] > 0){
     	numAboveZero = num[i];
      console.log(numAboveZero);
    };
};
  ```


처음값은 boolean 이었지만, 요소의 조건에 따라 number로 바뀔 수 있으니 타입을 추가해준다.union 타입 사용.

## 2.type & interface(타입 별칭, 인터페이스)
타입 별칭과 인터페이스는 매우 유사하다.
### 차이점
```typescript
// type
type Person = {
  name: string;
  age: number;
}

// interface
interface Person {
  name: string;
  age: number;
}
```
확장
```typescript
// 인터페이스 확장 예시
interface Person {
  name: string;
  age: number;
}

interface ExtendedPerson extends Person {
  address: string;
}

const person: ExtendedPerson = {
  name: 'John',
  age: 30,
  address: '123 Main St'
};

// 타입 확장 예시
type Point = {
  x: number;
  y: number;
};

type ExtendedPoint = Point & {
  z: number;
};

const point: ExtendedPoint = {
  x: 1,
  y: 2,
  z: 3
};
```
interface는 extends, type은 |(union)이나, &(intersection)으로 확장 가능
기본적으로는 인터페이스를 사용하고, 구조를 확장해야 하는 경우에는 extends키워드를 사용한다. 유연성을 원하는 경우에는 타입을 사용할 수 있다.

### 호출 시그니처(call signature)
: 함수의 매개변수와 반환 타입을 명시하는데 쓰인다.
하나의 이름을 갖는 함수가 여러 호출 시그니처를 가지므로써 다형성의 특성이 구현된다.
```typescript
// 호출 시그니처 작성
// 함수의 매개변수, 반환타입이 명시되어있으면 호출 시그니처 
// type을 사용한 예시(화살표 표기법)
type MyFunction = (param1: Type1, param2: Type2, ...) => ReturnType;

//interface 를 사용한 예시
interface MyFunction {
  (param1: Type1, param2: Type2, ...): ReturnType;
}
```
```typescript
//호출 시그니처를 사용한 예시
interface StringConcatenator {
    (str1: string, str2: string): string; //이곳 (호출 시그니처 부분)
} //재사용을 위해서 이 interface는 따로 빼주었다.

interface Person {
    firstName: string;
    lastName: string;
    fullName: StringConcatenator;
}

const person: Person = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: function (first, last) {
        return `${first} ${last}`;
    }
};

const result: string = person.fullName('Alice', 'Smith');
console.log(result);  // 출력: "Alice Smith"
// '이곳' 을 주석처리 하면 person.fullName('Alice', 'Smith'); 에 호출시그니처가 없다는 에러가 뜬다.
```

### 인덱스 시그니처(index signature)
인덱스 시그니처는 객체또는 배열의 동적 속성을 정의하는 데 사용된다.
```typescript
// 객체 인덱스 시그니처 예시
interface Person {
  [key: string]: unknown; // 이부분이 인덱스 시그니처
  age: number;
  name: string;
}
const person1: Person = {
  age: 17,
  name: 'memi',
}

person1['area'] = 'seoul';
```
```typescript
// 배열 인덱스 시그니처 예시
interface Names {
	[item: number]: string; 
}

const userNames: Names = ['Rumi', 'Moon'];
console.log(userNames[0]); // 'Rumi'
// [type(인덱스)] : type(요소의 값);
//이기 때문에 배열의 인덱스는 항상 number 니까 []의 타입은 거의 고정. 
```
추가될 속성이 확실치 않을 때, 인덱스 시그니처의 value 에 unknown 으로 추가 해주면된다.
확실할때는 정확한 타입값 넣기.
저부분에 string 과 number만 들어오는 것이 확실하다면 [key: string]: string | number; 이렇게 사용하면 된다.

- 호출 시그니처와 인덱스 시그니처는 코드를 더 유연하게 작성하고 타입을 더 정확하게 제한하는데 사용됨.

### 중첩 인터페이스
중첩 인터페이스는 인터페이스 안에 다른 인터페이스를 선언하는 것을 의미한다.
코드의 가독성과 구조화를 향상시키고, 코드 구조가 명확해진다.

```typescript
interface Address {
  street: string;
  city: string;
}

interface Person {
  name: string;
  age: number;
  address: Address; // Address 인터페이스를 중첩으로 사용
}

const person: Person = {
  name: 'Rumi',
  age: 18,
  address: {
    street: '123 Main St',
    city: 'Anytown',
  }
};
```
### 다중 인터페이스 확장
: 한 인터페이스가 여러 인터페이스를 동시에 확장(상속) 할 수 있는 기능을 의미한다.
코드의 유연성을 높이고 중복을 피할 수 있다.
```typescript
interface Shape {
  color: string;
}

interface Dimensions {
  width: number;
  height: number;
}

interface RectangularShape extends Shape, Dimensions {
  area: number;
}

// 사용 예시
const rectangle: RectangularShape = {
  color: 'blue',
  width: 10,
  height: 5,
  area: 50
};

```
### 인터페이스 병합
타입스크립트는 같은 이름의 인터페이스가 선언되었을 때, 이를 병합한다.
같은 이름의 인터페이스 선언이 가능하고, 나중에 선언된 인터페이스의 멤버가 우선권을 가진다.
인터페이스는 중복선언 가능. 타입은 중복선언 불가능.(에러발생)
```typescript
interface Shape {
  color: number;
}

interface Shape {
  color: string; //이 color 타입이 더 우선권을 가짐
  width: number;
}

// Shape 인터페이스가 { color: string; width: number; }로 병합됨
const rectangle: Shape = {
  color: 'blue',
  width: 10
};
```
## 3.함수

### this와 화살표함수
```typescript
class MyClass {
  private value: number = 42;

  myMethod() {
    const myArrowFunction = () => {
      console.log(this.value); // 42 (this는 MyClass의 인스턴스를 참조)
    };

    myArrowFunction();
  }
}

const myObject = new MyClass();
myObject.myMethod();

```

### 나머지 매개변수(rest parameters)
함수가 몇개의 인자를 받을지 예측하기 어려울 때 쓴다.
아래의 예인 firstNumber는 무조건 들어오는 고정된 개수의 인자, 나머지는 가변 인자.
```typescript
function sum(firstNumber: number, ...restNumbers: number[]):number {
  return restNumbers.reduce((total, num) => total + num, firstNumber);
}

const result = sum(1, 2, 3, 4, 5);
console.log(result); // 출력: 15
```
### 콜백에서 this 매개변수
타입스크립트에서 콜백 함수에 대한 this에 대한 타입 제공은 주로 함수 시그니처에 this 파라미터를 추가하여 이루어진다. 아래의 예제에서는 TimerCallback 인터페이스를 통해 this의 타입을 명시적으로 지정한다.
```typescript
interface TimerCallback {
  (elapsedTime: number): void;
}

function startTimer(callback: TimerCallback) {
  let elapsedTime = 0;

  setInterval(function () {
    elapsedTime++;
    // 콜백 함수 호출 시 this를 undefined로 지정
    callback.call(undefined, elapsedTime);
  }, 1000);
}

function handleTimer(this: undefined, elapsedTime: number) {
  console.log(`Elapsed Time: ${elapsedTime} seconds`);
}

// startTimer 함수에 콜백 함수 전달
startTimer(handleTimer);
```
여기서 TimerCallback 인터페이스에서 this를 명시적으로 지정하지 않았다. 대신에 handleTimer 함수의 시그니처에서 this: undefined를 사용하여 this가 undefined임을 명시했고, callback.call(undefined, elapsedTime)로 콜백 함수를 호출할 때 this를 undefined로 지정했다.

만약 콜백 함수가 클래스의 메서드로 사용되는 경우, this 파라미터에 해당 클래스의 타입을 지정할 수 있다. 예제:
```typescript
class Timer {
  private elapsedTime = 0;

  start(callback: (this: Timer, elapsedTime: number) => void) {
    setInterval(() => {
      this.elapsedTime++;
      callback.call(this, this.elapsedTime);
    }, 1000);
  }
}

const timer = new Timer();

timer.start(function(this: Timer, elapsedTime: number) {
  console.log(`Elapsed Time: ${elapsedTime} seconds`);
});

```
이 예제에서는 Timer 클래스를 사용하고, start 메서드에서는 callback 파라미터의 this를 Timer로 지정하고 있다. 그리고 호출 시에는 function(this: Timer, elapsedTime: number)으로 this를 명시적으로 지정하고 있다.

### 함수 오버로드
기본 구조가 같지만 매개변수의 타입이 다를때 하나로 통일해서 사용해줄 수 있다.
```typescript
function add(a: string, b: string):string; //타입선언 1
function add(a: number, b: number):number; //타입선언 2
function add(a: any, b: any):any { //함수구현
    return a + b;
}

console.log(add('d', 'a')); // "da"
console.log(add(4, 2)); // 6
```

```typescript
function saySomething(word: string | string[]): string {
    if (typeof word === "string") {
        return word;
    } else if (Array.isArray(word)){
        return word.join(" ");
    }
    // 위의 두 경우가 모두 아닐경우:
    throw new Error("unable to say something");
}

saySomething("hello");
saySomething(["hello", "world"]);

//함수 오버로딩을 사용한 코드 (위 코드와 동일)
function saySomething(word: string): string;
function saySomething(words: string[]): string;
function saySomething(word: any): any {
    if (typeof word === "string") {
        return word;
    } else if (Array.isArray(word)){
        return word.join(" ");
    }
    // 위의 두 경우가 모두 아닐경우:
    throw new Error("unable to say something");
}

saySomething("hello");
saySomething(["hello", "world"]);
```


## 4. 유니언과 교차타입

### 유니언 타입과 교차 타입의 사용 사례

1. 유니언 타입

```tsx
// 1.함수의 매개변수에 타입 애너테이션으로 유니언 타입을 쓰는 경우
function printId(id: number | string): void {
	console.log(id);
}

printId(12); // 12
printId('id'); // "id"
printId(true); // Argument of type 'boolean' is not assignable to parameter of type 'string | number'.

// 2.변수 이름에 유니언 타입을 쓰는 경우
let code: (string | number);
code = 123;
code = false; //Type 'boolean' is not assignable to type 'string | number'.

// 3.interface나 type 을 합쳐줄 경우
// interface는 union을 사용하여 합쳐줄 경우에는 type으로 합쳐줘야한다.
// type은 type으로 합쳐주기, union은 type으로 합쳐주기
interface Fruits {
	name: string;
}
interface Stock {
	stock: number;
}
type FruitsStock = Fruits | Stock;

const fruitsStore: FruitsStock = {
	name: 'banana',
	stock: 23,
}
```

2.교차 타입

```tsx
//1.여러 type이나 interface를 결합하여 하나의 타입으로 만들때 사용. 
type User = {
    id: number;
    username: string;
};

type AdminUser = User & {
    isAdmin: boolean;
};

function printUserInfo(user: User): void {
    console.log(user.id, user.username);
}

const admin: AdminUser = {
    id: 1,
    username: 'admin',
    isAdmin: true,
};

printUserInfo(admin);
```

### 유니언 타입에서의 타입 가드

예제 1.

```tsx
//1번 예제
// 함수의 형태가 같으나, 매개변수에 들어가는 타입이 다를때,
// 타입을 미리 정의하고, union 을 사용해 할당한다.

type Rectangle = { width: number; height: number };
type Circle = { radius: number };

function calculateArea(shape: Rectangle | Circle): number {
    if ('width' in shape) {
		 //shape 에 width 속성이 있는지 확인하는 조건문. 
		 // 타입의 특정 속성이나 메서드의 존재 여부를 체크하는것. 타입 가드
		 // 조건문에 shape 만 넣어준다면, Rectangle인지 Circle인지 타입이 확실하지 않아서 에러발생
        return shape.width * shape.height;
    } else {
        return Math.PI * shape.radius ** 2;
    }
}

const rectangle: Rectangle = { width: 5, height: 10 };
const circle: Circle = { radius: 7 };

console.log(calculateArea(rectangle)); // 50
console.log(calculateArea(circle)); // 153.93804002589985

```

예제 2.

```tsx
// 유니언 타입을 가진 변수
let value: string | number;

// 문자열 또는 숫자를 받는 함수
function printValue(input: string | number): void {
    // typeof를 사용한 타입 가드
    if (typeof input === 'string') {
        console.log(input.toUpperCase());
    } else {
        console.log(input.toFixed(2));
    }
}

value = 'hello';
printValue(value); // "HELLO"

value = 123.456;
printValue(value); // "123.46"
```

### 교차 타입의 장점과 사용법

- 장점:
1. 교차타입을 사용하면, 여러 타입을 조합하여 새로운 타입을 생성할 수 있다.
이를 통해 타입을 확장하거나 필요에 따라 새로운 조합을 만들 수 있다.
2. 코드 재사용에 용이하다.
3. 코드의 명확성을 높일 수 있다.

```tsx
// 여러 타입을 조합하여 새로운 타입 생성 가능하다.
type Loggable = {
    log: () => void;
};

type Timestamped = {
    timestamp: number;
};

type LoggableTimestamped = Loggable & Timestamped;

const myObject: LoggableTimestamped = {
    log: () => console.log('Logging...'),
    timestamp: Date.now(),
};

myObject.log();
console.log(myObject.timestamp);
```

```tsx
// 교차타입을 사용한 새로운 타입은 이 color, width, height 를 모두
// 포함해야 한다. 명확성을 높여준다.
type Shape = {
    color: string;
};

type Dimensions = {
    width: number;
    height: number;
};

// 두 타입을 교차하여 새로운 타입 생성
type ColoredShape = Shape & Dimensions;

const coloredRectangle: ColoredShape = {
    color: 'blue',
    width: 100,
    height: 50,
};
```