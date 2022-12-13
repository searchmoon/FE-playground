

const obj = {
  name: 'Rumi',
  age: 3,
  home: 'Seoul',
}

const result = obj.hasOwnProperty('age');
console.log('result: ', result); // true

// hasOwnProperty는 프로퍼티의 존재 유무를 판단. 존재하지 않을 경우 false를 반환.



