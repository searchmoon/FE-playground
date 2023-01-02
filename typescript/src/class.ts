
// class
// 예제 1.

class Car {
    private name: string = 'car';
    color: string; // typesctipt 에서 클래스를 작성할 때에는 멤버변수는 늘 타입을 선언해 줘야한다.(위치는 constructor 위에)
    constructor(color: string) { // 매개변수 타입도 string으로 지정해 주었다.
        this.color = color;
    }
    start() {
        console.log('start');
    }
}

const bmw = new Car('red');

// 멤버 변수를 미리 선언하지 않는 방법도 있긴하다. 접근 제한자나 readonly 키워드를 이용하는 방법이다.
// 접근제한자는 public(자식클래스나 클래스 인스턴스에서 접근이 가능하다. 아무것도 표현하지 않고 작성하면 public 이다),
// private, protected 이 있다.

class Car2 {
    // color: string; 이 부분을 주석처리 하고, 파라미터앞에 public이나 readonly를 적어준다.
    constructor(public color: string) {
        this.color = color;
    }
    start() {
        console.log('start');
    }
}

const bmw2 = new Car2('red');
