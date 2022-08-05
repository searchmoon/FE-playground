console.log('배열을 순회하는 여러가지 방법 ')
console.log('---- forEach 이용 ---- ')
const arr = ['1', '2', '3', '4'];

arr.forEach(console.log);

console.log('---- for of 이용 ---- ')
for(const item of arr){
    console.log(`arr item : ${item}`)
}

console.log('---- 전통적인 for 문 ----')
for(let i=0;i<arr.length;i++){
    console.log('arr item in for state : ', arr[i]);
}
