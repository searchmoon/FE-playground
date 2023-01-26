
function print(person) {
  console.log(person.name);
}

const personList = {
  name: 'John'
};

print(personList);


//--------------------------------------------------------------

const dogArr = [
  { name: '라쿤', age: 2, 'have-mom': true,},
  { name: '몽글', age: 3, 'have-mom': true,},
  { name: '아톰',},
  { name: '두유', age: 7, 'have-mom': true,},
];

const meal = (강쥐) => {
  console.log(`${강쥐.name}은 ${강쥐.age * 100}그릇 먹자`);
  if(!강쥐.age){
    console.log('나이가 안나와서 계산이 불가능해');
  }
}

console.log(dogArr.map(dog => {
  meal(dog);
}))



/**
 * class ES6 부터 도입된 문법이며, 함수표현식, 선언문 다 가능합니다.
 * constructor는 이 class로 생성된 객체를 생성, 초기화하기 위한 특수한 메서드입니다.
 * 'constructor' 메서드는 클래스 안에 단 한개만 존재할 수 있습니다.
 * this는 인스턴스 객체를 의미합니다.(new 키워드를 통해 향후 만들어질 클래스의 인스턴스이다)
 *
 * class의 특징: hoisting 안됩니다.
 * class의 본문(body)은 strict mode에서 실행
 * 생성자 함수는 return값을 만들지 않는다.
 *
 * 클래스를 만드는것 만으로는 아무일도 일어나지 않는다. 생성자 함수를 이용하여 클래스 함수를 사용하여 그 클래스를 기반으로 한 인스턴스를 만든다.
 *
 */

class Car {
  constructor(brand, name, color) {
    this.brand = brand;
    this.name = name;
    this.color = color;
  }
  drive() {
    console.log(this.name + '가 운전을 시작한다.');
  }
  static stop() {
    console.log(' 멈춘다.');
  }
}
let mini = new Car('audi', 'mini', 'black');

console.log(mini);
console.log(mini.color);
console.log(mini.drive())
console.log(mini.brand)
console.log(Car.stop());


// 객체는 클래스의 인스턴스 이다.
// 인스턴스는 어떤 집합의 개별적인 요소를 인스턴스라고 부릅니다. 클래스는 붕어빵 틀, 인스턴스는 붕어빵 틀로 찍어놓은 붕어빵
// 하나의 클래스로 여러개의 인스턴스를 만들 수 있다.


