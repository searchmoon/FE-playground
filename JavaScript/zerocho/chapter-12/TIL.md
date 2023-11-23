### 클릭이벤트 (click, contextmenu)
- 좌클릭: click 이벤트
- 우클릭: contextmenu 이벤트 (기본적으로 브라우저 메뉴를 띄우므로 기본동작을 막기위해 event.preventDefault())

### 옵셔널 체이닝
?. 옵셔널 체이닝 문법
?.의 앞에있는것이 truthy 하면, 뒤의 코드를 실행하고, falsy한 값이면 코드를 통째로 undefined로 만들어버린다.

### ||(논리연산자) vs ??(Nullish coalescing), &&

a || b
: a가 falsy한 값이면 b
a가 truthy 한 값이면 a

a ?? b
: a가 undefined나 null 이면 b (|| 보다 범위가 더 좁혀진 것)

a && b
: a가 truthy한 값이면, b가 실행되고 그 결과를 반환
a가 falsy한 값이면, a를 반환하고 b는 실행되지 않는다.

```javascript
// && 예제
const result1 = false && 'Hello';
console.log(result1); // false (b가 실행되지 않음)

const result2 = true && 'Hello';
console.log(result2); // Hello (b가 실행됨)

const result3 = 0 && 'Hello';
console.log(result3); // 0 (b가 실행되지 않음)

const result4 = 'World' && 'Hello';
console.log(result4); // Hello (b가 실행됨)

```

### 재귀함수(recursive function) 
: 함수의 내부에서 자기 자신을 다시 호출하는 함수를 재귀함수라고 한다.

콘솔에 maximum call stack size exceeded 오류가 발생하면, setTimeout 과 같은 비동기 함수를 사용해 해결할 수 있다. 