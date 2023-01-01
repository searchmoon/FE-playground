
function showItems(arr){ // arr:number[]로 바꾸기
    arr.forEach((item) => {
        console.log(item);
    })
}

showItems([1, 2, 3]);
showItems(1, 2, 3); // parameter에 값은 하나인데 값이 3개여서 에러가 뜬다.


// 1.기본타입
let car = 'bmw';
// let car:string = 'bmw';라고 타입을 정해줘라.

car = 'd'; // 라고 하면 에러가 안난다.
car = 1; // 라고 하면 에러가 난다. car의 타입을 string으로 지정해 주지 않았어도 초기 값이
// string으로 들어갔기 때문에 타입을 string으로 인식한다.


// 2.타입 넣어주기
let age:number = 30;
let isAdult:boolean = true;
let a:number[] = [1,2,3];
let a2:Array<number> = [1, 2, 3];

let week1:string[] = ['mon', 'tue', 'wed'];
let week2:Array<string> = ['mon', 'tue', 'wed'];

week1.push('3');
console.log(week1); // ["mon", "tue", "wed", "3"]
// week1.push(3) 이라고 하면 타입에러발생.

// 3.튜플
let person:[string, number];
person = ['Kim', 30];
// person = [30, 'kim']; 이렇게 하면 에러가 난다.

person[0].toLowerCase(); // 'kim'
//person[1].toLowerCase(); // 이렇게 하면 에러가 난다. number타입이기 때문에 toLowerCase()를 사용할 수 없다.


// 4.void, never
// void는 주로 함수에서 아무것도 반환하지 않을 때 사용한다.
function sayHello():void{
    console.log('hello');
}
//이런 함수는 콘솔 로그만 찍을 뿐 아무것도 반환하지 않는다. 그래서 void를 사용한다.

//항상 에러를 반환하거나, 영원히 끝나지 않는 함수의타입을 정의할 때 never를 사용한다.
function showError():never{
    throw new Error();
}
function infLoop():never{
    while(true){
        //do something..
    }
}

// 5.enum
enum Os {
    Window,
    Ios,
    Android
}
// Os.Window = 0, Os.Ios = 1, Os.Android = 2 인데,
//enum Os {
//     Window = 3,
//     Ios = 10,
//     Android
// } 이렇게 하면 Os.Window = 3, Os.Ios = 10, Os.Android = 11 이 된다.

console.log(Os['Ios']) // 1
console.log(Os[1]) // 'Ios'

enum Os2 {
    Window = 'win',
    Ios = 'ios',
    Android = 'and'
}

let myOs:Os2;
myOs = Os2.Ios;
myOs = Os2.Motorola; // 에러가 난다. Os2에 Motorola이 없기 때문이다. enum에 있는 값만 할당할 수 있다.

// 6.null, undefined
let a:null = null;
let b:undefined = undefined;
