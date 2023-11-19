### 이차원배열 만들기

각각 1이들어있고, 5줄(행:row), 4칸(열:column) 의 이중배열 만든다 하면

```javascript
const arr = []; //감싸줄 배열 생성

for (let i = 0; i < 5; i++) {
  //5줄짜리면, 첫 반복문이 5번 돌게
  const cells = [];
  for (let j = 0; j < 4; j++) {
    // 4칸 짜리니까 4번 반복문
    cells.push(1);
  }
  arr.push(cells)fr; // 두번째 반복문 바깥에 넣기
}

//(5) [Array(4), Array(4), Array(4), Array(4), Array(4)]
// [
// (4) [1, 1, 1, 1]
// (4) [1, 1, 1, 1]
// (4) [1, 1, 1, 1]
// (4) [1, 1, 1, 1]
// (4) [1, 1, 1, 1]
// ]
// arr 를 출력했을때 이렇게 생긴 이중배열 출력
```

### 이벤트 버블링, 캡처링

이벤트 버블링과 캡처링이 될때, 불편한 상황들이 생길 수 있다.
예를 들면, table 안에 tr 안에 td가 있는데,
table에 이벤트를 걸어놨는데,
td 태그에도 이벤트가 실행이 되는 경우가 있다. 버블링 현상인데,
그럴때 정확하게 table에만 이벤트가 실행되게 해주려면,
event.target.동작
이렇게 하지말고, event.currentTarget 하면 해결됨.
아니면 event.stopPropagation() 사용

table > tr > td 순으로 태그가 있을때,
table의 이벤트가 td 로 위임이 되는것이
이벤트 캡처링일줄 알았는데, 그것이 버블링
버블링이 기본동작이므로 잘 알아두기.

이벤트 캡처링은 잘 안쓰긴 한다고 함.
캡처링을 쓰는 예는
모달창의 바깥을 클릭하면 모달이 닫히는 경우. 그런것들에 씀
모달창의 부모가 바깥쪽이기 때문에
모달창의 부모를 클릭했을때 모달이 닫히는 현상을 만들어주기 위해
캡처링 쓰기도함

### Array.from

: 배열 혹은 유사배열 객체를 새로운 배열로 변환하는것. 편리하다.

- 배열은 개발자도구에서
  (3) [tr, tr, tr] 이런식으로 나오는데
  유사배열 객체는
  HTMLCollection(3) [tr, tr, tr]
  이런식으로 나온다.

```javascript
// 예제 1.
const str = "hello";
const arr = Array.from(str);

console.log(arr); // ['h', 'e', 'l', 'l', 'o']

//예제 2.
const iterable = [1, 2, 3, 4, 5];

const result = Array.from(iterable, (x) => x * x);

console.log(result); // [1, 4, 9, 16, 25]
```

### 이차원 배열을 일차원 배열로 만들기

rows 라는 이차원 배열을
[
[td, td, td]
[td, td, td]
[td, td, td]
]

rows.flat()
을 해주면
[td,td,td,td,td,td,td,td,td] 이 된다.

### every / some 메서드

이렇게 이용가능.
rows.flat().every((td) => td.textContent)
td의 textContent 가 모두다 존재해야 true 가 된다.
이차원 배열을 이중 반복문으로 사용하여
모든 원소를 반복할때, 이 방법으로 하면 효율이 증가한다.

some 은 every 랑 반대.
every는 모든게 참이어야 true, some 은 하나라도 참이면 true
