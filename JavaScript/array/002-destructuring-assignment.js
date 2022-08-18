console.log('구조 분해 할당 예시')
console.log('첫번째 예시')

let a, b, c;
[a, b] = [1, 2];

console.log(a); // 1

console.log(b); // 2

[a, b, ...c] = [1, 2, 3, 4, 5];

console.log(c); // [3, 4, 5]

console.log('두번째 예시')
