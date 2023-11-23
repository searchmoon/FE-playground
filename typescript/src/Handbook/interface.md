## 인터페이스

```typescript
interface personAge {
  age: number;
}

function logAge(obj: personAge) {
  console.log(obj.age);
}
let person = { name: "Capt", age: 28 };
logAge(person);
```

그리고 위 코드를 보고 다음과 같이 추론할 수 있습니다.
인터페이스를 인자로 받아 사용할 때 항상 인터페이스의 속성 갯수와 인자로 받는 객체의 속성 갯수를 일치시키지 않아도 됩니다.
다시 말해, 인터페이스에 정의된 속성, 타입의 조건만 만족한다면 객체의 속성 갯수가 더 많아도 상관 없다는 의미입니다.
또한, 인터페이스에 선언된 속성 순서를 지키지 않아도 됩니다.

```typescript
interface CraftBeer {
  name: string;
  hop?: number; //옵셔널(옵션 속성)
}

let myBeer = {
  name: "Saporo",
};
function brewBeer(beer: CraftBeer) {
  console.log(beer.name); // Saporo
  console.log(beer.brewery); // Error: Property 'brewery' does not exist on type 'Beer'
}
brewBeer(myBeer);
```

옵션 속성의 장점은 단순히 인터페이스를 사용할 때 속성을 선택적으로 적용할 수 있다는 것 뿐만 아니라
인터페이스에 정의되어 있지 않은 속성에 대해서 인지시켜줄 수 있다는 점입니다.
인터페이스에 brewery가 정의되어 있지 않기 때문에 에러발생
읽기 전용 속성에읽기 전용 속성은 인터페이스로 객체를 처음 생성할 때만 값을 할당하고 그 이후에는 변경할 수 없는 속성을 의미합니다. 문법은 다음과 같이 readonly 속성을 앞에 붙입니다.

```typescript
interface CraftBeer {
  readonly brand: string;
}
인터페이스로 객체를 선언하고 나서 수정하려고 하면 아래와 같이 오류가 납니다.

let myBeer: CraftBeer = {
  brand: "Belgian Monk",
};
myBeer.brand = "Korean Carpenter"; // error! (변경할 수 없다)

읽기 전용 배열

let arr: ReadonlyArray<number> = [1, 2, 3];
arr.splice(0, 1); // error
arr.push(4); // error
arr[0] = 100; // error

인터페이스에 정의하지 않은 속성들을 사용하고 싶다면, 이런식으로 쓰면 된다. 인덱스 시그니처를 사용

interface Person {
  name: string;
  age: number;
  email?: string;
  [key: string]: any; // 인덱스 시그니처. key 의 자리에 다른 propname이 들어가도된다.
}

const person4: Person = {
  name: "Alice",
  age: 28,
  email: "alice@example.com",
  address: "123 Main St", // 에러가 사라짐
  // 다른 속성들을 추가해도 에러가 발생하지 않음
  phone: "555-1234",
  hobby: ["reading", "traveling"],
};
```

함수 타입을 정의할 때의 인터페이스

```typescript
interface Login {
  (username: string, password: string): boolean;
}

let loginUser: Login;
loginUser = function (id: string, pw: string) {
  console.log("로그인 했습니다");
  return true;
};
```
