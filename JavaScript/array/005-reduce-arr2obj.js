// 배열의 요소를 객체로 매핑하기
const names = ["Alice", "Bob", "Charlie"];
const nameMap = names.reduce((acc, name) => {
  acc[name] = name.length;
  return acc;
}, {});
console.log(nameMap); // { "Alice": 5, "Bob": 3, "Charlie": 7 }

//배열의 요소를 다른 형태로 변환하여 객체에 매핑:
const numbers = [1, 2, 3, 4, 5];
const numberInfo = numbers.reduce((obj, num) => {
    obj[`number_${num}`] = num * 2;
    return obj;
}, {})
console.log(numberInfo);
// 출력: { number_1: 2, number_2: 4, number_3: 6, number_4: 8, number_5: 10 }


//배열의 문자열을 길이를 기반으로 객체로 매핑:
const words = ["apple", "banana", "cherry", "date"];
const wordLengths = words.reduce((acc, current) => {
    acc[current] = current.length;
    return acc;
}, {});
console.log(wordLengths);
// 출력: { apple: 5, banana: 6, cherry: 6, date: 4 }


//배열의 요소를 그룹화하여 객체로 매핑:
const fruits = ["apple", "banana", "cherry", "melon"];
const groupedFruits = fruits.reduce((acc, current) => {
  const firstLetter = current[0];
  if (!acc[firstLetter]) {
    acc[firstLetter] = [];
  }
  acc[firstLetter].push(current);
  return acc;
}, {});
console.log(groupedFruits);
// 출력: { a: [ 'apple'], b: [ 'banana'], c: [ 'cherry' ], d: [ 'melon' ] }


//객체의 값을 누산하여 새로운 객체로 매핑:
const transactions = [
  { category: "food", amount: 50 },
  { category: "clothing", amount: 100 },
  { category: "food", amount: 30 },
  { category: "electronics", amount: 200 },
];

const categoryTotals = transactions.reduce((acc, current) => {
  const { category, amount } = current;
  if (!acc[category]) {
    acc[category] = 0;
  }
  acc[category] += amount;
  return acc;
}, {});
console.log(categoryTotals);
// 출력: { food: 80, clothing: 100, electronics: 200 }
