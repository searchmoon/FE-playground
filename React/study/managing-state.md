# State 관리하기

### ****State를 사용해 Input 다루기****

- 선언적인 방식으로 UI 조작: 어떻게(how) 할것인지의 과정을 보여주는게 아니라 무엇(what)을 할것인지의 간단한 방식(state 변경)으로 UI를 조작합니다.

1. 먼저 사용자가 볼 수 있는 UI의 모든 “state”를 시각화해야 합니다.
2. 두종류의 인풋유형으로 state 변경을 트리거 할 수 있는데, 사용자의 행위에 따른 휴먼 인풋, 컴퓨터에서 응답을 주는 컴퓨터인풋. 어떻게 트리거 하는지 알아내야 합니다.
3. useState를 사용하여 컴포넌트의 시각적 state를 표현하기. 단순함이 핵심.
개수는 적을수록 좋고, 반드시 필요한 state만 생성할것.
4. 불필요한 state 변수를 제거합니다. 예를들어, 'typing', 'submitting', 'success'을 하나의 status로 합칠 수 있음.  다른 state 변수에 이미 같은 정보가 담겨있거나, 다른 변수를 뒤집었을 때 같은 정보를 얻을 수 있거나 하면 제거하고 필요한 변수만 남기는게 좋습니다.
5. 이벤트 핸들러를 연결합니다.

- 장점: 모든 인터랙션을 state로 표현하게 되면 이후에 새로운 시각적 state가 추가되더라도 기존의 로직이 손상되는 것을 막을 수 있습니다. 선언적인 UI 프로그래밍은 코드를 간결하고 유연하게 유지할 수 있는 장점이 있습니다.

### ****State 구조 선택하기****

state 구조화 할때 팁.

1. **연관된 state 그룹화하기:** 두 개 이상의 state 변수가 항상 동시에 업데이트된다면, 단일 state 변수로 병합하는 것이 고려되어야 합니다.

```tsx
const [x, setX] = useState(0);
const [y, setY] = useState(0);
// 이것을
const [position, setPosition] = useState({ x: 0, y: 0 });
// 이렇게 그룹화
```

1. **State의 모순 피하기:** 서로 모순되고 불일치할 수 있는 방식으로 state를 구성하는 것은 오류 발생 가능성을 높입니다. 일관성 있는 상태를 유지하는 것이 중요합니다.

```tsx
const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);
// 이런 상태를 잘못 호출하면 둘다 true인 상황에 처할 수 있다.
const [status, setStatus] = useState('sending');
// 이런식으로 sending, sent, typing 중 하나의 상태를 가질 수 있게 대체하는 것이 좋다.
```

1. **불필요한 state 피하기:** 렌더링 중에 컴포넌트의 props나 기존 state에서 계산할 수 있는 정보는 컴포넌트의 state에 넣지 않아야 합니다.

```tsx
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');
// first, last 를 합치면 fullName 이 나온다.

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

const fullName = firstName + ' ' + lastName;
// 이렇게 상태를 줄여준다.
```

1. **State의 중복 피하기:** 여러 상태 변수 간 또는 중첩된 객체 내에서 동일한 데이터가 중복될 경우 동기화 유지가 어려워집니다. 중복을 최소화하도록 노력해야 합니다.

```tsx
const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

const [items, setItems] = useState(initialItems);
const [selectedItem, setSelectedItem] = useState(
  items[0]
);
// 이것을 (item의 중복이 있음)
const [items, setItems] = useState(initialItems);
const [selectedId, setSelectedId] = useState(0);
// 이렇게 바꿔준다. (item, id)
```

1. **깊게 중첩된 state 피하기:** 깊게 중첩된 state는 업데이트가 어렵습니다. 가능하면 state를 평탄하게 구성하는 것이 좋습니다.

### 컴포넌트 간 State 공유하기

- State 끌어올리기.
예를 들어 하나의 부모, 두개의 자식 컴포넌트가 있을 때를 예로 들면,
    1. 자식 컴포넌트에서 state 제거하기
    2. 하드 코딩된 데이터를 부모 컴포넌트로 전달하기(두 자식 컴포넌트의 가장 가까운 부모한테)
    3. 공통의 부모에 state를 추가하고 이벤트 핸들러와 함께 전달하기

### Context를 사용해 데이터를 깊게 전달하기

- 부모 자식간에 props를 통해 정보를 전달하는데, 너무 많은 prop drilling 이 발생하면 좋지 않다. 트리를 따라 props를 전달하는 것이 depth 가 깊어지면 번거로워질 수 있다. 그 대안으로 Context를 사용한다.
1. Context 생성하기.(createContext 로 생성하고 내보내준다.)
2. Provider로 감싸 자식 컴포넌트에 값 제공해주기.
3. Context 사용하기(useContext로 사용할 수 있다.)

### UI 표현하기

에서 조건부 렌더링: && 의 왼쪽에 숫자를 두면 안된다.

messageCount && <p>New messages</p> 

의 경우에 메시지 카운트가 0일 때 아무것도 렌더링하지 않는다고 쉽게 추측할 수 있지만, 실제로는 0 자체를 렌더링하게된다.

이 문제를 해결하려면

messageCount > 0 && <p>New messages</p> 처럼 왼쪽을 boolean으로 만들면 된다.