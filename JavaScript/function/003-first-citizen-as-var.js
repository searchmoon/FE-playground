const sum = (a, b) => a + b;
console.log(sum(1,2));
// -------------------------------------
const filter = (item => item % 2 === 0);
console.log('이 밑으로 짝수만');
const arr = [1,2,3,4,5,6,7,8,9,10];
arr.filter(filter).forEach(item => console.log(item));
arr.filter(filter) // [2,4,6,8,10]이 나오는데, 이걸 다시 forEach로 돌리면 2,4,6,8,10이 하나씩 출력된다.
// -------------------------------------
const arr2 = arr.filter(item => item % 2 === 1);
console.log(arr2);



