## 타입스크립트를 통한 객체지향 프로그래밍

1. 클래스/인터페이스
2. 캡슐화
3. 다형성
4. 제어의 역전
5. 의존성 주입

객체지향 프로그래밍이란? 
프로그램을 객체들의 모임으로 바라보고, 객체간의 상호작용을 중점으로 두는 프로그래밍 패러다임
- 캡슐화, 상속, 다형성 등의 특징이 있다.

### 1. 클래스/인터페이스

```javascript
class Fruits {
    constructor(name) {
        this.name: name;
    }
}
```

타입스크립트에서는 생성자 메서드(constructor)와 함께 클래스 바디에 인스턴스 변수를 정의해 주어야 한다.

```typescript
class Fruits {
  name: string; //인스턴스 변수 선언
  constructor(name: string) {
    this.name = name;
  }
}
```

위의 코드를 인터페이스로 타입을 지정해주면,

```typescript
interface FruitsProp {
  name: string;
}
class Fruits implements FruitsProp {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

축약하기

```typescript
interface FruitsProp {
  name: string;
}

class Fruits implements FruitsProp {
  constructor(public name: string) {}
}
```

constructor 매개변수에서 public name: string로 직접 속성을 선언하는것이 가능하다. 이렇게 하면 클래스 내부에서 this.name = name;를 따로 작성하지 않아도 된다.

### 2. 캡슐화

캡슐화는 객체 지향 프로그래밍에서 중요한 개념 중 하나로, 클래스의 내부 상태와 동작을 외부에서 접근하지 못하도록 제한하는 것
타입스크립트에서는 접근 제한자(access modifier)를 사용하여 클래스 멤버의 가시성을 조절할 수 있다.
public, private, protected 등이 있다.

- public

```typescript
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();
```

- protected

```typescript
class Greeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}

class SpecialGreeter extends Greeter {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName(); //Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses. 에러뜬다.
// getName 은 하위 클래스인 SpecialGreeter에서 사용할 수 있다.
```

-private

```typescript
class Greeter {
  private secretMessage: string;

  constructor() {
    this.secretMessage = "This is a secret.";
  }

  public greet() {
    console.log("Hello!");
  }

  public revealSecret() {
    console.log(this.secretMessage);
  }
}

const g = new Greeter();
g.greet(); // OK
g.revealSecret(); // OK

// private 멤버에는 클래스 외부에서 직접 접근할 수 없음
console.log(g.secretMessage); // Error: Property 'secretMessage' is private and only accessible within class 'Greeter'.
```

### 3. 다형성

타입스크립트에서의 다형성은 다양한 타입을 가진 객체들을 동일한 인터페이스나 기반 클래스로 처리하는 능력을 의미한다. 다형성은 코드의 유연성을 높이고 재사용성을 증가시키는 데에 기여한다.

```typescript
// 다형성을 위해 공통된 인터페이스를 정의
interface Shape {
  getArea(): number;
}

// Rectangle과 Circle은 모두 Shape 인터페이스를 구현하고 있음
class Rectangle implements Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Circle implements Shape {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// 함수가 Shape 타입을 파라미터로 받음
function printArea(shape: Shape): void {
  console.log(`Area: ${shape.getArea()}`);
}

// Rectangle과 Circle 인스턴스를 생성하고 printArea 함수에 전달
const rectangle = new Rectangle(5, 10);
const circle = new Circle(7);

printArea(rectangle); // 출력: Area: 50
printArea(circle); // 출력: Area: 153.93804002589985
```

이 예시에서 Shape라는 인터페이스를 정의하여 getArea 메서드를 가져야 하는 규약을 만들었다. 그리고 Rectangle과 Circle 클래스는 이 Shape 인터페이스를 구현하도록 했다. 이렇게 함으로써 printArea 함수는 Shape 타입을 파라미터로 받아 다양한 모양(객체)을 받을 수 있다. 이것이 다형성의 핵심 아이디어 중 하나이다.

다형성을 사용하면 코드의 유연성이 증가하며, 새로운 클래스를 추가하거나 기존 클래스를 변경해도 기존 코드에 영향을 덜 주면서 확장할 수 있다.

### 4. 제어의 역전(Inversion of Control)
제어의 역전(Inversion of Control, IoC)은 소프트웨어 디자인 패턴 중 하나로, 프로그램의 제어 흐름을 개발자가 정하지 않고 외부에서 결정되도록 만드는 개념.(흐름을 개발자가 아닌 라이브러리/프레임워크가 관리하는 개념) 이는 코드의 결합도를 낮추고 유연성을 높이는데 도움이 된다.

음악 재생 애플리케이션 예시.

```typescript
// 재생 엔진 인터페이스
interface MusicPlayer {
  play(): void;
}

// 실제 재생 엔진 구현
class SpotifyPlayer implements MusicPlayer {
  play(): void {
    console.log("Playing music on Spotify");
  }
}

// 애플리케이션 클래스
class MusicApp {
  private musicPlayer: MusicPlayer;

  // IoC: 외부에서 MusicPlayer 인스턴스를 주입받음
  constructor(player: MusicPlayer) {
    this.musicPlayer = player;
  }

  // 어떤 음악을 재생할지는 외부에서 결정됨
  playMusic(): void {
    this.musicPlayer.play();
  }
}

// IoC를 통한 사용 예시
const spotifyPlayer = new SpotifyPlayer();
const musicApp = new MusicApp(spotifyPlayer);

// 음악 재생
musicApp.playMusic();

```


### 5. 의존성 주입 (DI:Dependency Injection)

의존성 주입은 강한 결합을 느슨한 결합으로 전환시키는 방법이며, 제어의 역전(Inversion of Control)의 기술 중 하나이다.

```typescript
class Printer {
  print(message: string): void {
    console.log(message);
  }
}

class ProductManager {
  private printer: Printer;

  constructor(printer: Printer) {
    this.printer = printer;
  }

  showProductDetails(): void {
    this.printer.print("Fetching product details");
    // ...
  }
}

const printer = new Printer();
const productManager = new ProductManager(printer);
productManager.showProductDetails();
```
이 코드에서 Printer 클래스는 메시지를 출력하는 역할을 하는데, ProductManager 클래스는 Printer 클래스에 의존한다. 그러면서 Printer 클래스를 ProductManager의 생성자를 통해 주입받아 사용하고 있습니다. 이런식으로 클래스 간의 의존성이 외부에서 주입되고, ProductManager는 특정한 출력 기능에 직접 의존하지 않습니다.

이렇게 하면 코드의 유연성이 향상되고, ProductManager가 사용하는 출력 기능을 변경하고자 할 때 Printer를 상속하는 새로운 클래스를 만들어서 주입하거나 다른 출력 기능을 가진 클래스를 주입할 수 있습니다. 이것이 의존성 주입이 제공하는 장점 중 하나입니다.