//배열 - split, join, push, concat, 재할당
//함수 - 커링

//1. split() 예제. 문자열을 배열로 변환

const sentence = "I love you and me";
const words = sentence.split(" "); //공백 한자리를 구분으로 배열로 변환.
console.log("words", words); // [ 'I', 'love', 'you', 'and', 'me' ]

//2. join() 예제. 배열을 문자열로 변환

const arr = ['바나나', '딸기', '키위'];
const str = arr.join('');
console.log('str', str);  // 바나나딸기키위
const str2 = arr.join('와 ');
console.log('str2', str2); // 바나나와 딸기와 키위

//3. push() 예제. 배열에 요소를 추가한다.

const arr2 = ['마라탕'];
let newArr = arr2.push('양념게장', '2인분 먹을래요');
console.log('newArr', newArr); // 5
// 반환하는 값은 배열의 length이다.

console.log('arr2', arr2); // [ '마라탕', '양념게장', '2인분 먹을래요' ]
// 원본 배열이 변경이 되었음을 알 수 있다.

//4. concat() 예제. 배열을 합치는 method
// 위의 arr, arr2 배열을 사용하겠당.
let newww = arr.concat(arr2);
let newww2 = arr.concat(['맛있다', '또먹을래']);
console.log('newww', newww); // [ '바나나', '딸기', '키위', '마라탕', '양념게장', '2인분 먹을래요' ]
console.log('newww2', newww2); // [ '바나나', '딸기', '키위', '맛있다', '또먹을래' ]


//5. 재할당 예제. 배열을 재할당하는 방법
let arr3 = [1, 2, 3];
arr3 = [4, 5, 6];
console.log('arr3', arr3); // [ 4, 5, 6 ]
