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


## 6. 연산자

### 1. keyof, typeof 연산자

- keyof : 객체 형태의 타입을, 따로 속성들만 뽑아 모아 유니온 타입으로 만들어주는 연산자

```tsx
type Person = {
   firstName: string;
   age: number;
   isMarried: boolean;
}

type PersonKey = keyof Person;
// type PersonKey = "firstName" | "age" | "isMarried"

const key1: PersonKey = 'firstName';
const key2: PersonKey = 'age';
const key3: PersonKey = 'isMarried';
```

- typeof: 객체 데이터를 객체 타입으로 변환해주는 연산자

```tsx
const personInfo = {
   firstName: 'John',
   age: 30,
   isMarried: true,
};

type PersonInfoType = typeof personInfo;
/*
type PersonInfoType = {
    firstName: string;
    age: number;
    isMarried: boolean;
}
*/

let myInfo: PersonInfoType = {
   firstName: 'Alice',
   age: 25,
   isMarried: false,
};
```

### 2. indexed access type(인덱스 접근 유형)

인덱스 접근 유형을 사용하면 객체의 키를 사용하여 해당 키에 대한 값의 타입을 동적으로 가져올 수 있다.

객체의 일부분에 대한 타입을 키를 사용하여 동적으로 가져와야 할 때 유용하게 사용된다.

```tsx
type Person = {
  name: string;
  age: number;
  address: string;
};
type PersonValueType = Person['name']; // string

type PersonKey = keyof Person; // "name" | "age" | "address"

type PersonValues = Person[PersonKey]; // string | number | string
```

PersonValues 의 예처럼 유니온 타입을 사용하여 여러 속성에 대한 값의 타입을 한 번에 가져올 수 있다.

### 3. 조건부 타입(Conditional Types)와 infer

조건부 타입은 입력 타입에 따라 다른 타입을 반환할 수 있도록 하는 기능.

> T extends U ? X : Y
> 

U 를 상속받은 T 의 타입의 true, false 값에 따라 타입이 결정된다.

‘infer’ 키워드는 조건부 타입내에서 타입 추론을 허용한다.

```tsx
// 조건부 타입의 예
// T가 객체이고 'name' 속성이 있다면 string, 그렇지 않으면 never
type GetName<T> = T extends { name: string } ? string : number;

const name1: GetName<{ name: string; age: number }> = 'John';
const name2: GetName<{ age: number }> = 33;
```

이 두번째 예제에서는

(infer U) 가 조건부 타입에서 사용되는 타입 추론을 위한 키워드이다. 

따라서 T extends (infer U)[]는 "만약 T가 배열이라면, 그 배열의 원소 타입은 U로 추론한다"는 의미.

```tsx
type ElementType<T> = T extends (infer U)[] ? U : never;

const numberArray: ElementType<number[]> = 42; // 타입은 number
const stringArray: ElementType<string[]> = 'hello'; // 타입은 string
```

그렇다면 이 예제에서 never가 나오는 경우는 어떤 경우가 있을까?( 모름. 질문)

### 4. Mapped 타입

맵드 타입이란 기존에 정의되어 있는 타입을 새로운 타입으로 변환해 주는 문법을 의미한다. 자바스크립트 메서드인 map() 을 타입에 적용한 것과 같은 효과를 가진다.

```tsx
type Subset<T> = {
  [K in keyof T]?: T[K];
}
```

- [K in keyof T] 는 T 타입의 각 키 (K) 에 대해 순회한다.
- T[K] : 각 키에 해당하는 속성을 옵셔널로 만든다. ( [K in keyof T]? 이 옵셔널이 붙어 있기 때문)

```tsx
interface Person {
  age: number;
  name: string;
}

const ageOnly: Subset<Person> = { age: 23 };
const nameOnly: Subset<Person> = { name: 'Tony' };
const ironman: Subset<Person> = { age: 23, name: 'Tony' };
const empty: Subset<Person> = {};
```

이코드에서

Person interface를 map 해준 Subset<Person>은 
type Subset = {
	age?: number;
	name?: string;
} 

라는 타입을 만들기 때문에 위의 예처럼 속성들을 옵셔널로 사용할수 있다.

코드에서 필요한 정보만을 사용하거나 전달할 때 특히 유용하다.

(의문인점: interface를 그대로 갖다 쓰면 되는데 왜 이렇게 할까? 내 예시가 잘못됐기 때문이겠지?)

### 5. 템플릿 리터럴

: 타입스크립트의 string literal type을 기반으로 새로운 타입을 만드는 도구

```tsx
// 첫번째 예제
type GreetingTemplate = `Hello, ${string}! You are ${number} years old.`;

let greeting: GreetingTemplate;
greeting = `Hello, John! You are 30 years old.`; // 타입스크립트는 정의된 구조를 따라야 함
```

greeting = `Hello, John! You are 삼십 years old.`;

이렇게 {number}가 들어가야 할 부분에 string 타입을 넣으면 에러가 뜬다.

```tsx
type FirstName = "John";
type LastName = "Doe" | 'Kim';

type FullName = `${FirstName} ${LastName}`;

let fullName: FullName;
fullName = "John Doe";
fullName = "John Kim"; // 타입스크립트는 정의된 구조를 따라야 함
```

### 6. **Non-null 단언 연산자 (!)**

Non-null 단언 연산자는 변수가 null 이나 undefined 가 아님을 단언하는 용도로 사용된다. 변수 뒤에 ‘ ! ’ 기호를 붙여서 표현.

```tsx
const toUpperCase = (givenStr: string | null) => {
    return givenStr!.toUpperCase()
}
```

givenStr 에 ! 를 붙여 non-null 단언 연산자를 만들어주었는데, givenStr이 정말 string만 들어온다는 확신을 할 수 없다면 이렇게 사용하면 안된다. 그렇지 않으면 런타임 에러가 발생할 수 있다.

대안으로는

```tsx
const toUpperCase = (givenStr: string | null) => {
  if (givenStr === null) return null;
  return givenStr.toUpperCase();
};
```

이렇게 null 일 경우에 대비한 코드를 추가해주면 type 에러가 나지 않는다.


## 7. 타입호환

### 타입 호환성

여기서 다루는 타입 호환성은 어떤 것이 다른 것에 할당될 수 있는지 판단하는 것을 말한다.

```tsx
// 타입의 호환성
interface A {
  x: number;
}

class B {
  x: number;
  y: number;
}

let a: A;
a = new B();
```

### 구조적 타이핑, 덕 타이핑

- 구조적 타이핑:
구조적 타이핑은 변수의 구조(속성 및 메서드)가 타입을 결정한다는 개념. 두 객체가 같은 속성과 메서드를 가지면 그 객체들은 같은 타입으로 간주된다.

```tsx
// 구조적 타이핑
interface Avengers {
  name: string;
}

let hero: Avengers;
// 타입스크립트가 추론한 타입은 { name: string; location: string; } 
let capt = { name: "Captain", location: "Pangyo" };
hero = capt;
```

- 덕 타이핑:
덕 타이핑에서는 객체가 어떤 타입에 속하는지가 아니라, 해당 객체가 필요한 메서드나 속성을 가지고 있는지에 따라 타입이 결정된다.

```tsx
// 덕 타이핑
class Dog {
  bark() {
    console.log('Woof!');
  }
}

class Duck {
  quack() {
    console.log('Quack!');
  }
}

function introduce(animal: Dog | Duck) {
  // animal이 Dog 타입이든 Duck 타입이든 상관없이 동작
  if ('bark' in animal) {
    animal.bark(); // Dog의 bark 메서드 호출
  } else if ('quack' in animal) {
    animal.quack(); // Duck의 quack 메서드 호출
  }
}

introduce(new Dog()); // 출력: Woof!
introduce(new Duck()); // 출력: Quack!
```

## 8. ts-pattern 활용

### 선언적 프로그래밍 vs 명령형 프로그래밍

명령형 프로그래밍은 어떻게(HOW) 할 것인가에 가깝다. 알고리즘을 명시하지만, 목표는 명시하지 않는다. 컴퓨터가 수행할 명령들을 순서대로 나열

```tsx
//명령형
function double (arr) {
    let result = [];
    for (let i=0; i<arr.length; i++) {
        result.push(arr[i] * 2)
    }
    return (result);
}
```

선언적 프로그래밍은 무엇을(WHAT) 할 것인가와 가깝다. 제어 흐름을 설명하지 않고 계산 논리에 집중하는 프로그래밍 패러다임이다. 결과만 기술할뿐 어떻게는 기술하지 않는 프로그래밍 방법. (의도에 집중)

```tsx
//선언형
function double (arr) {
    return (arr.map(x => x * 2));
}
```

### 라이브러리 도입전 검토(용량, 사용에 미치는 영향)

- 용량이 그리 크지는 않지만, 프로젝트에 이미 많은 의존성이 있다면 번들 사이즈가 커질 수 있다.
- if문과 switch문은 자바스크립트 기본 문법이기에 어느 환경에서나 돌아갈 수 있으나, ts-pattern은 ts-pattern이 없는 환경에서는 돌아갈 수 없다. 외부 종속성이 내 코드와 결합될 가능성이 높아짐. 또한 if문과 같은 분기처리 코드는 정말 많이 모든 곳에서 사용되기 때문에 이런 분기처리 코드들에 대한 처리를 외부 종속성에 위임한다는 것이 부담될 수 있다.

### ts-pattern 장단점

- 장점
    - 더 간결하고 읽기 쉬운 코드를 작성할 수 있다.
    - 타입 안정성을 제공하여 패턴 매칭의 누락된 경우를 컴파일 타임에 감지할 수 있다.
    - 복잡한 패턴 매칭을 처리하기에 유용하다.
- 단점
    - 추가적인 라이브러리로 의존성을 추가해야 한다.
    - 프로젝트에 이미 많은 의존성이 있다면 번들 사이즈가 커질 수 있다.
    - 조건문에 비해 러닝커브가 좀 더 높을 수 있다.

간단한 패턴을 처리한다면 switch, if문 사용. 복잡한 패턴을 다루거나 타입 안정성을 높이고자 한다면 ts-pattern.

### ts-pattern 의 패턴매칭

- 패턴매칭: 특정 패턴에 맞는 데이터를 찾거나 추출하는 기능. 함수형 프로그래밍의 핵심 개념 중 하나로, 코드의 가독성과 유지보수성을 향상시키는 데 도움을 줌. ****패턴 매칭과 조건문은 목적과 사용 방식에서 차이가 있지만, 두 가지 모두 프로그램의 제어 흐름을 분기시키는 데 사용되는 기능

```tsx
import { match, _ } from 'ts-pattern';

// 간단한 유저 타입
type User = { id: number; name: string; role: 'admin' | 'user' };

// 패턴 매칭을 사용한 함수
function getUserInfo(user: User) {
  return match(user)
    .with({ role: 'admin' }, () => 'Admin user')
    .with({ role: 'user', name: 'John' }, () => 'Regular user named John')
    .with({ role: 'user' }, () => 'Regular user')
    .exhaustive(); // 패턴이 모두 다뤄졌는지 확인
}

// 사용 예시
const adminUser: User = { id: 1, name: 'Admin', role: 'admin' };
const regularUser: User = { id: 2, name: 'John', role: 'user' };

console.log(getUserInfo(adminUser));    // 출력: 'Admin user'
console.log(getUserInfo(regularUser));  // 출력: 'Regular user named John'
```

이 예제에서 match 함수를 사용하여 user 객체를 여러 패턴과 비교하고, 해당하는 패턴에 따라 다른 결과를 반환한다. with 메서드는 패턴을 정의하고, _는 와일드카드 패턴으로 모든 값과 일치한다. exhaustive()는 모든 패턴이 다뤄졌는지 확인한다.

이러한 패턴 매칭은 코드를 더 읽기 쉽게 만들고, 다양한 경우에 대한 처리 로직을 명확하게 표현할 수 있게 도와준다.