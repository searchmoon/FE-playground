
//interface

type Score = 'A' | 'B' | 'C' | 'F';

interface User {
    readonly name: string;
    age: number;
    gender?: string;
    // [grade:number]: string; // number를 key로 하고, value를 string으로 받는 프로퍼티를 여러개 받을 수 있다는 의미.
    // 근데 위의 string의 범위가 너무 넓다. 아무값이나 들어갈 수 있기 때문에 제한을 주자.
    [grade:number]: Score; // 타입을 정의해준 저 네개의 값만 들어갈 수 있게 해주었다.

}
//interface 를 정의 할때는 ,(콤마)가 아니라 ;를 사용한다.
//property를 정의해서 객체를 사용하고자 할때는 interface를 사용한다.

let user : User = {
    name: 'xx',
    age: 30,
    1: 'A',
    2: 'B',
}
// interface User에 gender를 넣어주었더니, 에러가 발생했다.
// user 객체에 gender가 없기 때문에 에러가 발생함. gender가 없어도 에러가 뜨지 않게 하려면
// gender앞에 ?를 붙여주어 옵셔널 처리를 해주면 값이 없어도 에러가 발생하지 않는다.
user.age = 10;
user.gender = 'male';
//  user.name = 'rumi'; 로 하면 에러가 난다. readonly라는 읽기전용 속성을 추가했기 때문에 수정이 불가능.

console.log(user.name);
console.log(user); // gender까지 추가 되어 로그로 찍힌다.

// 함수의 interface 정의
interface Add{
    (num1:number, num2:number): number;
}
const add: Add = function(x, y){
    return x + y;
}
add(10, 20);


interface IsAdult {
    (age:number): boolean;
}

const a:IsAdult = (age) => {
    return age > 19;
}
console.log(a(33)); // true


// implements (interface로 class 정의하기.)

interface Car {
    color: string;
    wheels: number;
    start(): void;
}

class Bmw implements Car {
    color;
    wheels = 4;
    constructor(c:string){
        this.color = c;
    }
    start(){
        console.log('go..');
    }
}
const b = new Bmw('red');



interface Car {
    color: string;
    wheels: number;
    start(): void;
}

class Bmw implements Car {
    color;
    wheels = 4;
    constructor(c:string){
        this.color = c;
    }
    start(){
        console.log('go..');
    }
}
const b = new Bmw('red');
console.log(b);
// Bmw: {
//  "wheels": 4,
//  "color": "red"
// }
b.start(); // "go.."

//interface 확장하기
//위에 있는 Car interface 와 합쳐주겠다.

interface Benz extends Car {
    door: number;
    stop(): void;
}

const benz = {
    door: 5,
    stop(){
        console.log('stop');
    },
    // Car interface 안에 있는 property들을 모두 정의해줘야 한다. 안그러면 에러남.
    color: 'black',
    wheels: 4,
    strat(){},
}

//이렇게 확장해줄수도 있다.
interface Toy {
    name: string;
}
interface ToyCar extends Car, Toy {
    price: number;
}






