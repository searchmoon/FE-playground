### 깊은 복사, 얕은 복사, 참조

```javascript
monsterList = [
  { name: "슬라임", hp: 25, att: 10, xp: 10 },
  { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
  { name: "마왕", hp: 150, att: 35, xp: 50 },
];

// monster1 : 깊은복사. 전부다 참조관계가 끊긴다. 원본에 영향을 미치지 않는다.
const monster1 = JSON.parse(JSON.stringify(monsterList[0]));
// Lodash 라이브러리의 _.cloneDeep 함수를 사용하여 깊은복사를 할 수도 있다.
// const monster1 = _.cloneDeep(monsterList[0]); 이런식으로
// monster2 : 참조. 값을 바꾸면 원본에 영향을 미친다.
const monster2 = monsterList[0]; //참조
// monster3: 얕은복사. 겉껍데기만 복사되늗것. 원본, 복사본 모두에 영향을 미친다.
// 내부는 참조관계. 겉껍데기만 참조관계가 끊긴다.
// 얕은복사는 객체, 배열 리터럴을 사용하거나 slice 이용
const monster3 = { ...monster[0] };
```

### class
- 서로간에 상호작용할때는 class문법을 쓰는것이 좋다.

