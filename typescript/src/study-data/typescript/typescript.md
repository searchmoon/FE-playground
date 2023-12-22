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

## 5. 제너릭(Generic)

### 제너릭을 사용하는 이유(any와 비교):

타입이 여러가지 들어가고, 매개변수에 인자가 들어올때마다 타입을 추가해야하는 경우, 제너릭을 써준다. 함수나 클래스를 작성할때, 특정 타입을 미리 지정하지 않고, 사용할때 동적으로 타입을 결정할 수 있으므로, 유연성을 높이며, 재사용성, 확장성을 높여준다.

제너릭이 any와 다른점: any는 모든 타입을 허용하므로 타입 안정성이 보장되지 않는다. 

제너릭은 컴파일러가 코드를 더 안전하게 분석할 수 있다. any 는 어떤 타입이든 받을 수 있다는 점에서 제너릭과 비슷하지만, 실제로 함수가 반환할때 어떤 타입인지에 대한 정보는 잃게된다.

### 기본 제너릭 타입 정의(function, interface, type, class)

1. function

```tsx
function identity<T>(arg: T): T {
  return arg;
}

let result: number = identity<number>(42);
console.log(result); // 출력: 42

let text: string = identity<string>("Hello, World!");
console.log(text); // 출력: Hello, World!

//let text = identity("Hello, World!"); // 이렇게 타입을 명시를 안해도 타입 추론이 가능합니다.
// 코드를 간결하고 가독성 있게 하는데 있어 유용하지만, 명시적으로 타입을 전달하는것이 더 복잡한 예제에서는 더 좋습니다.
```

1. interface

```tsx
interface Box<T> {
  value: T;
}

let box: Box<string> = { value: "Hello" };
```

1. type

```tsx
type Pair<T, U> = {
  first: T;
  second: U;
};

let pair: Pair<number, string> = { first: 42, second: "Hello" };
```

1. class

```tsx
class Wrapper<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

let numberWrapper = new Wrapper<number>(42);
let stringValue = numberWrapper.getValue(); // stringValue의 타입은 number
```

### 제너릭 제약조건, 타입매개변수 사용

- 제약조건: 특정한 타입으로 제한하고 싶을때 제너릭 제약조건을 사용한다.

```tsx
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);// Error: Property 'length' does not exist on type 'T'.
  return arg;
}
```

 T(arg)의 타입이 정의되지 않았기 때문에, arg.length 에서 에러발생. length에 타입을준다.

```tsx
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity(3); //에러 발생: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
loggingIdentity({ length: 10, value: 3 });
//제약조건에 의해 제한되어 있기 때문에 모든 타입에 대해서는 동작하지 않는다.
```

- 제너릭 제약조건에서 타입 매개변수 사용: 이 예에서는 실수로 obj 에 존재하지 않는 프로퍼티를 가져오지 않도록 하기 위해 두가지 타입에 제약조건을 두었다.

```tsx
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m"); //obj에 존재하지 않는 프로퍼티를 가져와서 에러가 뜬다.
```

이 코드는 제약조건이 명시되지 않았으므로, T, U 는 어떤 타입이든 올 수 있다.

### 제너릭 유틸리티 타입

1. **Partial<T>**

**`Partial<T>`**는 타입 **`T`**의 모든 속성을 선택적으로 만들어주는 타입입니다.(Required의 반대)

```tsx
interface User {
  name: string;
  age: number;
}

const partialUser: Partial<User> = {
  name: "John",
};

// partialUser는 { name?: string; age?: number; } 타입
```

1. **Readonly<T>**

**`Readonly<T>`**는 타입 **`T`**의 모든 속성을 읽기 전용으로 만들어주는 타입입니다.

```tsx
interface User {
  name: string;
  age: number;
}

const readonlyUser: Readonly<User> = {
  name: "John",
  age: 25,
};

readonlyUser.name = "rumi"; //Cannot assign to 'name' because it is a read-only property. 이라는 에러발생. 프로퍼티가 재할당 될 수 없다.
// readonlyUser는 { readonly name: string; readonly age: number; } 타입
```

1. **Record<K, T>**

**`Record<K, T>`**는 키 **`K`**와 값 **`T`**를 가진 객체의 타입을 나타냅니다.

```tsx
const record: Record<string, number> = {
  age: 25,
  score: 100,
};

// record는 { [key: string]: number; } 타입
```

**4. Pick<T, K>**

**`Pick<T, K>`**는 타입 **`T`**에서 일부 속성만 선택하여 새로운 타입을 만듭니다.

```tsx
typescriptCopy code
interface User {
  name: string;
  age: number;
  address: string;
}

const pickedUser: Pick<User, "name" | "age"> = {
  name: "John",
  age: 25,
};

// pickedUser는 { name: string; age: number; } 타입
```

**5. Omit<T, K> (omit: 생략하다)**

**`Omit<T, K>`**는 타입 **`T`**에서 일부 속성을 제외한 새로운 타입을 만듭니다.

```tsx
typescriptCopy code
interface User {
  name: string;
  age: number;
  address: string;
}

const omittedUser: Omit<User, "address"> = {
  name: "John",
  age: 25,
};

// omittedUser는 { name: string; age: number; } 타입

```

**6. Exclude<T, U>**

**`Exclude<T, U>`**는 타입 **`T`**에서 **`U`**에 할당 가능한 타입을 제외한 새로운 타입을 만듭니다.

```tsx
// U를 제외한 T
type T0 = Exclude<"a" | "b" | "c", "a">;
//type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
//type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;     
//type T2 = string | number
```

**7. Extract<T, U>**

**`Extract<T, U>`**는 타입 **`T`**에서 **`U`**에 할당 가능한 타입만을 추출하여 새로운 타입을 만듭니다.

```tsx
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
//type T0 = "a" // "a", "f" 를 선택했지만, T에 있는 유니온 멤버만 가능하기 떄문에 "a"만 남는다

**type T1 = Extract<string | number | (() => void), Function>;     
//type T1 = () => void
```

**8. NonNullable<T>**

**`NonNullable<T>`**는 **`T`**에서 **`null`**과 **`undefined`**를 제외한 새로운 타입을 만듭니다.

```tsx
type T0 = NonNullable<string | number | undefined>;     
//type T0 = string | number

type T1 = NonNullable<string[] | null | undefined>;
//type T1 = string[]
```

**9. Parameters<T>**

**`Parameters<T>`**는 함수 타입 **`T`**의 매개변수 타입들을 튜플로 만듭니다.

```tsx
type MyFunction = (a: number, b: string) => void;
type MyFunctionParams = Parameters<MyFunction>; // 결과: [number, string]

const myFunc: (...args: MyFunctionParams) => void = (a, b) => {
  console.log(`a: ${a}, b: ${b}`);
  // 함수 내용
};

// 함수 호출
const params: MyFunctionParams = [42, 'Hello'];
myFunc(...params);
```

**10. ConstructorParameters<T>**

**`ConstructorParameters<T>`**는 클래스 생성자 함수 타입 **`T`**의 매개변수 타입들을 튜플로 만듭니다.

```tsx
class MyClass {
  constructor(public x: number, public y: string) {}
}

type MyClassConstructorParams = ConstructorParameters<typeof MyClass>; // 결과: [number, string]
```

**11. ReturnType<T>**

**`ReturnType<T>`**는 함수 타입 **`T`**의 반환 타입을 추출합니다.

```tsx
type MyFunction = () => number;
type MyFunctionReturnType = ReturnType<MyFunction>; // 결과: number
```

**12. InstanceType<T>**

**`InstanceType<T>`**는 클래스 타입 **`T`**의 인스턴스 타입을 추출합니다.

```tsx
class MyClass {
  constructor(public x: number, public y: string) {}
}

type MyClassInstance = InstanceType<typeof MyClass>; // 결과: MyClass
```

**13. Required<T>**

**`Required<T>`**는 타입 **`T`**의 모든 속성을 필수로 만듭니다.

```tsx
interface Options {
  a?: number;
  b?: string;
}

type RequiredOptions = Required<Options>; // 결과: { a: number, b: string }
```

**14. ThisParameterType**

**`ThisParameterType`**은 함수 타입에서 **`this`** 매개변수의 타입을 추출합니다.

```tsx
type MyFunction = (this: { x: number }) => void;
type ThisParamType = ThisParameterType<MyFunction>; // 결과: { x: number }
```

**15. OmitThisParameter**

**`OmitThisParameter`**는 함수 타입에서 **`this`** 매개변수를 제외한 새로운 함수 타입을 만듭니다.

```tsx
type MyFunction = (this: { x: number }) => void;
type NewFunctionType = OmitThisParameter<MyFunction>; // 결과: () => void
```

**16. ThisType<T>**

**`ThisType<T>`**은 **`this`**의 타입을 **`T`**로 지정하여 해당 타입을 가지는 객체를 반환합니다.

```tsx
type MyObject = {
  x: number;
} & ThisType<{ y: string }>;

const myObj: MyObject = {
  x: 10,
  y: 'Hello',
};
```