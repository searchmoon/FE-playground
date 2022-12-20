
class 달리는것{
    constructor(이름){
        this.이름 = 이름;
    }

    달리다(속도){
        console.log(this.이름 + `은 ${속도}의 속도 로 달리다`);
    }
}

const 자동차클래스 = new 달리는것('자동차');
const 킥보드클래스 = new 달리는것('킥보드')
console.log(자동차클래스);
console.log(킥보드클래스);

자동차클래스.달리다(100);
킥보드클래스.달리다(100);

// -------------------------------------

function 달리는것_생성하는_함수(이름){
    return function(속도){
        console.log(이름 + `은 ${속도}의 속도 로 달리다`);
    }
}

const 자동차 = 달리는것_생성하는_함수('자동차');
console.log('자동차 : ', 자동차);
자동차(100);
자동차(20);
자동차(30);
// 자동차('100km/h');
const 자전거 = 달리는것_생성하는_함수('자전거');
// 자전거('10km/h');

console.log(달리는것_생성하는_함수(자동차(150)));



// -------------------------------------

function 입벌리고있음(시간, 사람='루미'){
    return function 입다물기(다문시간){
        console.log(`${사람}는 ${시간}시에 입벌렸다가 ${다문시간}시에 다문다`);
    }
}

const 아홉시에벌린입 = 입벌리고있음(9);
const 열시에벌린입 = 입벌리고있음(10, '레오');
console.log('아홉시에벌린입 : ', 아홉시에벌린입);
console.log('아홉시에벌린입 : ', 열시에벌린입);
// -------------------------------------
아홉시에벌린입(10);
아홉시에벌린입(11);
열시에벌린입(10);
열시에벌린입(11);

입벌리고있음(10, '리미')(10);

// -------------------------------------

function riding(name){
    return function reach(speed){
        console.log(`${name}은 ${speed}의 속도로 달려 도착했다`);
    }
}
// 이 암수는 const riding = name => speed => console.log(`${name}은 ${speed}의 속도로 달려 도착했다`); 와 같다

const car = riding('rumi');
const subway = riding('jessy');

console.log('car : ', car);  //rumi은 200의 속도로 달려 도착했다
console.log('subway : ', subway);  //jessy은 300의 속도로 달려 도착했다

car(200);
// riding('rumi')(200); 와 같다.

subway(300);



