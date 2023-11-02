### react의 불변성 지키기.

- 원본 데이터를 변경하는 방식은 예상치 못한 오류를 발생시킨다. 불변성 유지 중요
- 참조타입에서 불변성을 유지하기 위해 새로운 배열을 반환하는 메서드 사용
  - spread operator, map, filter, slice, reduce 등 사용한다
  - 원본 데이터를 변경하는 메서드: splice, push 가 있다.

```javascript
//원본 데이터를 변경하는 방식
const array = [1, 2, 3, 4];
const copyArray = array;
copyArray.push(5);

console.log(array === copyArray); //true

//원본 데이터의 불변성을 지킴
const differentArray = [...array, 5];
console.log(array === differentArray); //false
```

### react의 성능 최적화:

- useMemo와 React.memo 의 차이점:
  React.memo는 컴포넌트 자체를 메모이제이션하고 useMemo는 값 또는 계산을 메모이제이션한다.

- React.memo를 사용하면 컴포넌트의 렌더링 결과를 이전 결과와 비교하여 동일한 프롭스(props)가 전달되었을 때 렌더링을 스킵할 수 있다. 불필요한 렌더링의 중복을 방지하고 애플리케이션의 성능을 향상시키는데 도움된다.

