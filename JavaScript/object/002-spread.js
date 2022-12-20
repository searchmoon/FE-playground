
//spread 문법 (객체 혹은 배열을 펼쳐서 사용 가능)

//객체 예제
const slime = {
  name: '슬라임'
}

const cuteSlime = {
  name: '슬라임',
  attribute: 'cute'
}

const purpleCuteSlime = {
  name: '슬라임',
  attribute: 'cute',
  color: 'purple',
}
// 겹치는 프로퍼티가 많이 보인다.
// 이럴때 spread 문법을 사용하면 코드도 줄어들고 가독성도 좋아진다.
const cuteSlime2 = {
  ...slime,
  attribute: 'cute'
}
const purpleCuteSlime2 = {
  ...cuteSlime,
  color: 'purple',
}

// 배열 예제
// 012-연습장에 있는 객체를 가지고 있는 배열을 가져와봤다.
const dogArr = [
  { name: '라쿤', age: 2, 'have-mom': true,},
  { name: '몽글', age: 3, 'have-mom': true,},
  { name: '아톰',},
  { name: '두유', age: 7, 'have-mom': true,},
];

const dogName = dogArr.map(item => item.name);
console.log(dogName); // [ '라쿤', '몽글', '아톰', '두유' ]

const anotherDogs = [...dogName, '영글'];
console.log(dogName); // 기존의 배열은 변하지 않는다.
console.log(anotherDogs); // [ '라쿤', '몽글', '아톰', '두유', '영글' ]



