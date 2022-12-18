const sampleData = {
  elementarySchool: [
    { name: "jessy", age: "33" },
    { name: "Rumi", age: "22" },
    { name: "Elly", age: "18" },
  ],
};

// filter()
const result = sampleData.elementarySchool.filter((person) => person.age <= 20);
console.log("result : ", result); // [ { name: 'Elly', age: '18' } ]

// find()
const result2 = sampleData.elementarySchool.find((person) => person.age <= 40);
console.log("result2 : ", result2); // { name: 'jessy', age: '33' }
// 배열에서 특정 값을 찾는 조건을 만족하는 첫번째 요소의 값을 반환한다.

// map()
const result3 = sampleData.elementarySchool.map((person) => person.name);
console.log("result3 : ", result3); // [ 'jessy', 'Rumi', 'Elly' ]
