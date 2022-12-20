
// rest (spread와 비슷한데, 역할이 매우 다르다.)
// rest는 객체, 배열, 그리고 함수의 파라미터에서 사용이 가능하다.

// 객체에서의 rest 예제
// spread의 예제를 가져와봤다.

const purpleCuteSlime = {
  name: '슬라임',
  attribute: 'cute',
  color: 'purple',
}

const {color, ...rest} = purpleCuteSlime; // 비구조화 할당. ...rest로 해주었는데 꼭 이름이 rest 일 필요는 없다.
console.log(color); // purple
console.log(rest); // { name: '슬라임', attribute: 'cute' } // color를 제외한 값이 들어있다.
// 어떤 특정한 프로퍼티를 제외한 객체를 만들고 싶을 때 사용할 수 있다.

// 배열에서의 rest 예제

const numbers = [0, 1, 2, 3, 4, 5, 6];

const [one, ...restArr] = numbers;

console.log(one); // 0
console.log(restArr); // [ 1, 2, 3, 4, 5, 6 ]

// const [...restArr2, last ] = numbers; // 이렇게 하면 에러가 난다. rest는 항상 마지막에 와야한다.


function sum(...rest) {
  return rest.reduce((acc, current) => acc + current, 0);
}

const result = sum(1, 2, 3, 4, 5, 6);
console.log(result); // 21
