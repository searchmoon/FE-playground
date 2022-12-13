


const obj = {
  name: 'Rumi',
  age: 3,
  home: 'Seoul',
}

console.log(Object.keys(obj)); // [ 'name', 'age', 'home' ]

console.log(Object.values(obj)); // [ 'Rumi', 3, 'Seoul' ]


//배열에서도 Object.keys, Object.values를 사용할 수 있다.

const arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)) // [ '0', '1', '2' ] 인덱스 값을 출력한다.


