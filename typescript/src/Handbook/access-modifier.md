## 접근제어자: public, protected, private

```typescript
class Animal {
  // public이 기본값임. public이 안적혀 있다면 public인것
  public name: string;
  protected title: string;
  constructor(name: string, title: string) {
    this.name = name;
    this.title = title;
  }

  makeSound(): void {
    //이 메서드도 앞에 뭐가 없으면 public
    console.log(`${this.name} is making a ${this.title}.`);
  }
}

// Animal 클래스의 인스턴스 생성
const myPet = new Animal("Buddy", "sounds");

// public 프로퍼티에 접근
console.log(myPet.name); // 허용
console.log(myPet.title); // protected기 때문에 에러발생

//protected 에 접근할때는
class Animal2 extends Animal {
  getPost() {
    return this.title;
  }
}
// 이렇게 상속받은 자식 클래스에서 접근가능

// public 메서드 호출
myPet.makeSound();
```

### class 의 접근제어자 축약하기

```typescript
 public name: string;
   constructor(name: string) {
     this.name = name;
   }
```

저 클래스 함수에서 이 코드는

```typescript
constructor( public name: string){}

```

이렇게 간단하게 축약할 수 있다.
