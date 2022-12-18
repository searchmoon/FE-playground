const arr = ["a", "b", "c"];

const result = arr.forEach((item) => console.log(item));

console.log("result :", result); //undefined
// forEach는 배열의 각 요소에 대해 callback 함수를 실행하고, undefined를 반환한다.

//문제: 개발자목록 배열을 가지고 빈 오브젝트에  { '루미' : false, '레오': false } 형태로 변환해보시오

//forEach 사용 예제 1
const 개발자목록 = ["루미", "레오", "루카스"];
let obj = {};

개발자목록.forEach((item, index) => {
  if (item.length <= 2) {
    obj[item] = false;
  }
});
console.log("obj", obj);

// forEach 사용 예제 2

const sampleData = {
  elementarySchool: [
    { name: "jessy", age: "33" },
    { name: "Rumi", age: "22" },
    { name: "Elly", age: "18" },
  ],
};

// forEach() : 주어진 함수를 배열 요소 각각에 대해 실행한다.
// forEach((callback함수), [thisArg])
const result2 = sampleData.elementarySchool.forEach((element) =>
  console.log(element.name)
);
console.log("result2", result2);
// jessy
// Rumi
// Elly

const result4 = sampleData.elementarySchool.forEach((element) =>
  console.log(element.name)
);
console.log("result4", result4);

// forEach()는 주어진 callback을 배열에 있는 각 요소에 대해 오름차순으로 한번씩 실행한다.
// 삭제했거나 초기화하지 않은 인덱스 속성에 대해서는 실행하지 않는다.(예: 희소배열)
// callback은 다음 세 인수와 함께 호출된다. -요소 값, -요소 인덱스, -순회 중인 배열

//thisArg 매개변수를 forEach()에 제공한 경우, callback을 호출할 때 전달해 this의 값으로 쓰인다.
// 전달하지 않으면 undefined를 사용하며, 최종 this 값은 함수의 this를 결정하는 평소 규칙을 따른다.

//forEach()는 각 배열 요소에 대해 한번씩 callback 함수를 실행한다. map 과 reduce 와는 달리 undefined를
// 반환하기 때문에 메서드 체인의 중간에 사용할 수 없다.

// forEach 사용 예제 3

const items = ["i1", "i2", "i3"];
const copy = [];

items.forEach((item) => copy.push(item));
console.log("copy", copy);
