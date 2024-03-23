# State 관리하기

### \***\*State를 사용해 Input 다루기\*\***

- 선언적인 방식으로 UI 조작: 어떻게(how) 할것인지의 과정을 보여주는게 아니라 무엇(what)을 할것인지의 간단한 방식(state 변경)으로 UI를 조작합니다.

1. 먼저 사용자가 볼 수 있는 UI의 모든 “state”를 시각화해야 합니다.
2. 두종류의 인풋유형으로 state 변경을 트리거 할 수 있는데, 사용자의 행위에 따른 휴먼 인풋, 컴퓨터에서 응답을 주는 컴퓨터인풋. 어떻게 트리거 하는지 알아내야 합니다.
3. useState를 사용하여 컴포넌트의 시각적 state를 표현하기. 단순함이 핵심.
   개수는 적을수록 좋고, 반드시 필요한 state만 생성할것.
4. 불필요한 state 변수를 제거합니다. 예를들어, 'typing', 'submitting', 'success'을 하나의 status로 합칠 수 있음. 다른 state 변수에 이미 같은 정보가 담겨있거나, 다른 변수를 뒤집었을 때 같은 정보를 얻을 수 있거나 하면 제거하고 필요한 변수만 남기는게 좋습니다.
5. 이벤트 핸들러를 연결합니다.

- 장점: 모든 인터랙션을 state로 표현하게 되면 이후에 새로운 시각적 state가 추가되더라도 기존의 로직이 손상되는 것을 막을 수 있습니다. 선언적인 UI 프로그래밍은 코드를 간결하고 유연하게 유지할 수 있는 장점이 있습니다.

- 두가지의 인풋유형으로 state 변경을 트리거할수있다. 두가지의 경우 모두 UI를 업데이트 하기 위해서는 state변수를 설정해야한다.
  - 버튼을 누르거나, 필드를 입력하거나, 링크를 이동하는 것 등의 **휴먼 인풋**
  - 네트워크 응답이 오거나, 타임아웃이 되거나, 이미지를 로딩하거나 하는 등의 **컴퓨터 인풋**

컴포넌트를 개발할때는,

1. 모든 시각적 state 확인.
2. human이나 computer가 어떻게 state 변화를 트리거 하는지 확인.
3. useState로 state 모델링
4. 불필요한 state 제거
5. 이벤트 핸들러 연결하기

### \***\*State 구조 선택하기\*\***

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
const [status, setStatus] = useState("sending");
// 이런식으로 sending, sent, typing 중 하나의 상태를 가질 수 있게 대체하는 것이 좋다.
```

1. **불필요한 state 피하기:** 렌더링 중에 컴포넌트의 props나 기존 state에서 계산할 수 있는 정보는 컴포넌트의 state에 넣지 않아야 합니다.

```tsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState("");
// first, last 를 합치면 fullName 이 나온다.

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

const fullName = firstName + " " + lastName;
// 이렇게 상태를 줄여준다.
```

1. **State의 중복 피하기:** 여러 상태 변수 간 또는 중첩된 객체 내에서 동일한 데이터가 중복될 경우 동기화 유지가 어려워집니다. 중복을 최소화하도록 노력해야 합니다.

```tsx
const initialItems = [
  { title: "pretzels", id: 0 },
  { title: "crispy seaweed", id: 1 },
  { title: "granola bar", id: 2 },
];

const [items, setItems] = useState(initialItems);
const [selectedItem, setSelectedItem] = useState(items[0]);
// 이것을 (item의 중복이 있음)
const [items, setItems] = useState(initialItems);
const [selectedId, setSelectedId] = useState(0);
// 이렇게 바꿔준다. (item, id)
```

1. **깊게 중첩된 state 피하기:** 깊게 중첩된 state는 업데이트가 어렵습니다. 가능하면 state를 평탄하게 구성하는 것이 좋습니다. flat 화 하기!

### 컴포넌트 간 State 공유하기

- State 끌어올리기.
  때때로 두 컴포넌트의 state가 항상 함께 변경되기를 원할 때, 예를 들어 하나의 부모, 두개의 자식 컴포넌트가 있을 때를 예로 들면, 이렇게 하면된다. 1. 자식 컴포넌트에서 state 제거하기 2. 하드 코딩된 데이터를 부모 컴포넌트로 전달하기(두 자식 컴포넌트의 가장 가까운 부모한테) 3. 공통의 부모에 state를 추가하고 이벤트 핸들러와 함께 전달하기

```jsx
import { useState } from "react";

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest
        city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for
        "apple" and is often translated as "full of apples". In fact, the region
        surrounding Almaty is thought to be the ancestral home of the apple, and
        the wild <i lang="la">Malus sieversii</i> is considered a likely
        candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  );
}
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/766a6154-3e6a-4525-b7a7-a23fa9e9aade/Untitled.png)

위의 이 예시에서는, 공통 부모 컴포넌트로 state를 옮기고, 두 패널을 각각 조정할 수 있게 하였다. 한쪽의 isActive가 true가 되면, 나머지 한쪽은 false가 되기 때문에, a가 열리면 b가 닫히고, a가 닫히면 b가 열리는 형태이다.

- 제어 vs 비제어 컴포넌트

  - **제어 컴포넌트**: 부모 컴포넌트에서 props를 통해 상태와 동작을 제어할 수 있는 컴포넌트. 제어 컴포넌트는 상태를 직접 관리하며, 부모 컴포넌트는 이 상태에 접근하거나 변경할 수 없다. 대신, 부모 컴포넌트는 제어 컴포넌트에 props를 전달하여 상태와 동작을 제어한다.

    - 컴포넌트의 상태는 부모 컴포넌트에서 props로 전달
    - 부모 컴포넌트가 컴포넌트의 상태를 완전히 제어하며, 컴포넌트는 외부에서 제공된 상태를 바탕으로 동작
    - 위의 코드를 예를 들면, isActive와 같은 상태가 부모 컴포넌트에서 props로 전달되고, 이에 따라 컴포넌트가 활성화되거나 비활성화된다.
    - 제어 컴포넌트 예시

      ```jsx
      // 부모 컴포넌트
      const ParentComponent = () => {
        const [value, setValue] = useState("");

        const handleChange = (e) => {
          setValue(e.target.value);
        };

        return (
          <div>
            <Input value={value} onChange={handleChange} />
          </div>
        );
      };

      // 자식 컴포넌트
      const Input = ({ value, onChange }) => {
        return <input type="text" value={value} onChange={onChange} />;
      };
      ```

  - **비제어 컴포넌트**: 자체적으로 상태를 관리하며, 부모 컴포넌트에서 상태에 접근하거나 변경할 수 없는 컴포넌트. 비제어 컴포넌트는 독립적으로 동작하며, 부모 컴포넌트는 이 컴포넌트의 상태나 동작에 직접적으로 영향을 미칠 수 없다.

    - 자체적으로 상태를 관리하고, 부모 컴포넌트는 해당 상태에 직접적으로 영향을 미치지 않는다.
    - 위의 코드를 예를 들면, 컴포넌트 내부에서 isActive와 같은 상태를 관리하고, 부모 컴포넌트는 이에 직접적인 영향을 주지 않는다.
    - 비제어 컴포넌트 예시

      ```jsx
      // 자식 컴포넌트
      const Button = () => {
        const [count, setCount] = useState(0);

        const handleClick = () => {
          setCount(count + 1);
        };

        return <button onClick={handleClick}>Count: {count}</button>;
      };
      ```

### State 를 보존하고 초기화하기

```jsx
import { useState } from "react";

export default function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = "counter";
  if (hover) {
    className += " hover";
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}
```

아래의 그림처럼, 각각의 컴포넌트는 완전 분리된 state 를 가진다. (서로 영향을 끼치지 않는다.)

이 둘은 각각 트리에서 자기 고유의 위치에 렌더링되어 있으므로 분리되어있는 카운터이다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/2cce8052-707e-464c-8d4d-213da91427d2/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/03eed29c-18cd-4d21-81cd-08d367eeaa19/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/015167c3-cef2-4e06-ac14-c489dd8e7328/Untitled.png)

- **같은 자리의 같은 컴포넌트는 state를 보존합니다!!!**

```jsx
export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}
```

위의 코드에서
{isFancy ? (
<Counter isFancy={true} />
) : (
<Counter isFancy={false} />
)}

이부분을 보면, 각각 다른 컴포넌트임에도 불구하고, 같은자리에서 같은 Counter라는 컴포넌트가 상태값에 따라 교차 되는것인데, 같은 자리에서의 같은 컴포넌트는 state 값을 보존한다. 그래서 add one을 클릭해서 count를 올렸을때, 나머지 하나의 Counter 컴포넌트로 전환을 해도 값이 유지가 된다. 이것 참 신기하다.

```jsx
{
  isFancy ? (
    <Counter isFancy={true} />
  ) : (
    <>
      <Counter isFancy={false} />
      <Counter isFancy={true} />
    </>
  );
}
```

이렇게 Counter 하나를 더 추가해보았다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/05f80bff-e500-431d-bfdf-8dba04f56977/Untitled.png)

이 상태에서 체크를 클릭하면, 이렇게

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/9c51fa49-114d-4799-85e7-6e3dbb94677d/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/f9561cda-4ca3-46df-a148-80a6122d805f/Untitled.png)

두개 모두의 상태가 초기화가 되는것을 볼수 있다. 같은 자리에 꼭 같은 갯수의 컴포넌트가 있어야 상태가 유지되는것 같다. 근데,

```jsx
{
  isFancy ? (
    <>
      <Counter isFancy={true} /> // 이것과
    </>
  ) : (
    <>
      <Counter isFancy={false} /> // 이것이 첫번째 요소이므로 true false
      상관없이 같은 상태로 반영
      <Counter isFancy={true} />
    </>
  );
}
```

이렇게 fragment 로 감싸주어 같은 자리의 형태를 만들어주니까 상태가 초기화 되지않고 유지된다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/8f69edf1-0b7b-4048-9582-c1c940921cd4/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/e528b86c-ac6a-4e66-81b8-1c332e0af262/Untitled.png)

**React는 JSX 마크업에서가 아닌 UI 트리에서의 위치에 관심이 있다는 것을** 기억하기!

- **같은 위치의 다른 컴포넌트는 state를 초기화한다.
  위의 예시와 같은 예시에서 체크를 클릭하면 다른 각각의 컴포넌트가 전환이 되면서, 그 자리를 대체하고, state는 초기화를 한다.**

```jsx
{
  isFancy ? (
    <div>
      <Counter isFancy={true} />
    </div>
  ) : (
    <section>
      <Counter isFancy={false} />
    </section>
  );
}
```

이렇게 감싸져있는 태그가 다를때 다른 컴포넌트를 렌더링하는것인데, 이때, 이 전체 서브트리의 state를 초기화한다. div, section 안의 컴포넌트의 state 도 초기화 한다는뜻.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/bd4b01c6-5c67-414a-b98e-8ba462b928a8/Untitled.png)

**리렌더링할 때 state를 유지하고 싶다면, 트리 구조가 “같아야” 한다.**
만약 구조가 다르다면 React가 트리에서 컴포넌트를 지울 때 state를 지우기 때문에 state가 유지되지 않는다.

\*\* **항상 컴포넌트를 중첩해서 정의하지 않고 최상위 범위에서 정의하기!!(원치 않게 state가 초기화될 수 있다.)**

- **같은 위치에서 state를 초기화하기
  기본적으로 React는 컴포넌트가 같은 위치를 유지하면 state를 유지하지만, state를 유지하고 싶지않다면?
  삼항연산자를 사용해서 토글하는 방식으로 한다면, 같은 위치로 인식한다.
  그래서**

```jsx
{
  isPlayerA && <Counter person="Taylor" />;
}
{
  !isPlayerA && <Counter person="Sarah" />;
}
```

이렇게 해주면, 같은 위치로 인식하지 않는다. 각각의 state 값을 가진다. isPlayerA 의 상태값이 바뀔때마다 상태는 초기화된다.

- **key를 이용해 state를 초기화하기**

```jsx
{
  isPlayerA ? (
    <Counter key="Taylor" person="Taylor" />
  ) : (
    <Counter key="Sarah" person="Sarah" />
  );
}
```

이렇게 다른 key 를 넣어주면 같은 위치여도 다르게 인식한다. state를 공유하지않는다. key 자체를 위치의 일부로 사용하기 때문. (key는 전역적으로 유일한 값이 아니라는것 기억하기. 부모안에서만 유일한값)
컴포넌트에 key값을 넣어주면, 그 트리에 있는 모든 state를 포함한 모든것들은 처음부터 다시 생성되는것을 보장한다. 대부분 채팅 앱에서는 이런 동작을 원한다.

- **제거된 컴포넌트의 state를 보존하기.
  실제 채팅앱에서는 이전의 수신자를 선택했을때 입력값이 복구되는것을 원할것이다. (그림에서와 같이 alice 탭에서 “앨리스” 라고 친 후에 Taylor 를 클릭했을때, state가 초기화 되지 않게 하길 원할것이다.)
  보통 쓰는 방법은: 1.** state를 상위로 올리고 각 수신자의 임시 메시지를 부모 컴포넌트에 가지고 있을 수 있습니다. 이 방법에서 부모가 중요한 정보를 가지고 있기 때문에 자식 컴포넌트가 제거되어도 상관이 없다.

2. React state 이외의 다른 저장소를 이용하기.  로컬스토리지에 메시지를 저장하고 이를 이용해 Chat 컴포넌트를 초기화할 수 있다.

### State 로직을 reducer로 작성하기

- useState를 useReducer 로 리팩토링하는 경우: state 업데이트가 여러 이벤트 핸들러로 분산되는 경우가 있다. 그러면 컴포넌트를 관리하기가 어려워진다. 그럴때, state 를 업데이트하는 모든 로직을 reducer를 사용해 컴포넌트 외부로 단일 함수로 통합해 관리할 수 있다.

1.  **state를 설정하는 것에서 action을 dispatch 함수로 전달하는 것으로 바꾸기**

```jsx
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}
// 이 코드에서
function handleAddTask(text) {
  dispatch({
    type: "added",
    id: nextId++,
    text: text,
  });
}
// 이런식으로 바꾸기
```

1.  **reducer 함수 작성하기**

- reducer 함수 안에서는 if/else 가 아닌, swich 문을 사용하는 게 규칙이다.(if/else 를 사용해도 되긴 하지만 대체로 reduce에서는 swich 를 써주는것이 좋다.)
- 한 state에 3개의 이벤트 핸들러 함수가 있다면, 그 3개의 함수를 swich 문으로 조건을 주어 하나의 reducer 함수로 작성해준다.

1.  **컴포넌트에서 reducer 사용하기**

```jsx
import { useReducer } from "react";
// const [tasks, setTesks] = useState(initialTasks); //이부분을 지우고 useReducer를 추가
const [tasks, setTesks] = useReducer(taskReducer, initialTasks);
// 인자는 (reducer함수, 초기 state값)
```

useReducer의 반환값 첫번째는: state를 담을 수 있는 값,
두번째는: dispatch 함수 (사용자의 action을 reducer 함수에게 “전달하게 될”)

- 최종 코드: useState → useReducer
  여기서 tasksReducer 코드를 별도의 파일로 분리를 해주기도한다.
  둘 중 어떤것이 더 좋은 코드인지는 판단하기 어렵고, 그때의 상황에 따라 잘 골라서 쓰기.
- 코드 길이: useState가 조금 더 짧은 편이다. 컴포넌트나 함수단위로 봤을때는 useReducer가 더 짧아진다.
- 가독성: useReducer 가
- 디버깅: useReducer를 사용했을때, 콘솔로그를 reducer에 추가하여 더 쉽게 에러를 발견할 수 있다.
- 테스팅: reducer 함수는 컴포넌트에 의존하지 않는 순수함수이기 때문에 테스트가 조금 더 용이하다.
- 만약 일부 컴포넌트에서 state를 업데이트하는 것으로 인한 버그가 자주 발생하면 reducer 사용을 조금더 권장한다.

```jsx
import { useState } from "react";
import AddTask from "./AddTask.js";
import TaskList from "./TaskList.js";

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];
```

```jsx
import { useReducer } from "react";
import AddTask from "./AddTask.js";
import TaskList from "./TaskList.js";

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];
```

reducer 를 잘 작성하기:

- reducer 함수는 반드시 순수해야한다.
- 각 action 은 데이터안에서 여러 변경들이 있더라도 하나의 사용자 상호작용을 설명해야한다.

Immer 라이브러리로 더 간결하게 reducer를 작성할 수 있다.

### Context를 사용해 데이터를 깊게 전달하기

- 보통의 경우, 부모 자식간에 props를 통해 정보를 전달하는데, 너무 많은 prop drilling 이 발생하면 좋지 않다. 트리를 따라 props를 전달할때 depth 가 깊어지면 번거로워질 수 있다. 그 대안으로 Context를 사용한다. Context를 사용하면 명시적으로 props를 전달해주지 않아도 부모 컴포넌트가 어떤 자식 컴포넌트에서나 정보를 사용할 수 있다.

1. Context 생성하기.(createContext 로 생성하고 내보내준다.)
   context 의 유일한 인자는 기본값이다.

```jsx
import { createContext } from "react";

export const LevelContext = createContext(1);
```

1. Context 사용하기(useContext로 사용할 수 있다.)
   useContext Hook과 생성한 Context를 가져온다.

```jsx
import { useContext } from "react";
import { LevelContext } from "./LevelContext.js";
```

prop을 내려받아서 쓰는 곳에서 그 prop을 제거하고, 이 context 인 LevelContext에서 값을 읽도록 한다. 이런식으로

```jsx
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```

1. Context 제공하기( context provider 로 감싸준다.)

```jsx
return (
  <section className="section">
    <LevelContext.Provider value={level}>
      {" "}
      //이부분 추가
      {children}
    </LevelContext.Provider>{" "}
    //이부분 추가
  </section>
);
```

useContext(LevelContext)를 사용하는 코드에서는 가장 근처의 LevelContext(임의로 정해준 이름)의 값을 요청한다.

- context provider 사용 전 / 후 코드( 이런식으로 모든 자식요소에 prop을 할당하지 않아도 값을 사용할 수 있어 편리하다.)

```jsx
import Heading from "./Heading.js";
import Section from "./Section.js";

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```jsx
import Heading from "./Heading.js";
import Section from "./Section.js";

export default function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

같은 컴포넌트에서 context를 사용하며 제공하기

```jsx
import { useContext } from "react";
import { LevelContext } from "./LevelContext.js";

export default function Section({ children }) {
  const level = useContext(LevelContext); // 이부분 추가
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {" "}
        // 이부분 수정
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

이렇게 하면 section 과 heading 모두에 level 을 전달할 필요가 없다. 이렇게 사용가능

**Context 사용이 필요할때**

- 다크모드 지원시 :앱 최상단에 context provider 를 두고 테마를 사용할 수 있다.
- 로그인 여부 확인시: 일부 애플리케이션에서는 동시에 여러 계정을 운영할 수도 있다(인스타처럼 다른 사용자로 댓글을 남기는 경우). 이런 경우에는 UI의 일부를 서로 다른 현재 계정 값을 가진 provider로 감싸 주는 것이 편리
- **라우팅:** 대부분의 라우팅 솔루션은 현재 경로를 유지하기 위해 내부적으로 context를 사용한다.
- **상태 관리가 필요한 경우**

### **Reducer와 Context로 앱 확장하기**

Reducer와 context 결합 방법:

1. Context를 **생성한다**.
   useReducer 가 반환하는것은 두가지. 예를 들면,

```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

```jsx
import { createContext } from "react";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

현재 tasks 리스트를 제공하는 TasksContext, 컴포넌트에서 action을 dispatch 하는 함수를 제공하는TasksDispatchContext 의 context 를 생성해서 내보낸다.(기본값은 null)

1. State과 dispatch 함수를 context에 **넣는다**.

이 값을 사용할 컴포넌트의 최상단에서

```jsx
export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        ...
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

이런식으로 useReducer에서 반환된 tasks 와 dispatch 를 가져와 아래의 트리 전체에 제공한다.

1. 트리 안에서 context를 **사용한다**.

prop으로 전달 하고 있던것들을 제거하고,

- tasks 의 경우:

```jsx
export default function TaskList() {
  const tasks = useContext(TasksContext);
  // ...
```

이런식으로 useContext를 사용하여 해당 컨텍스트를 가져와 값을 꺼내 사용할 수 있다.

- dispatch 의 경우:

```jsx
export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  // ...
  return (
    // ...
    <button onClick={() => {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }}>Add</button>
    // ...
```

이런식으로 dispatch 함수를 가지고와 사용할 수 있다.

- 하나의 파일로 합치기

이렇게 provider가 중첩이 되어있을때,

하나의 컴포넌트로 빼서 합쳐줄수도 있다.

```jsx
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

이렇게 합쳐주고나서,

```jsx
<TasksProvider>
  <h1>Day off in Kyoto</h1>
  <AddTask />
  <TaskList />
</TasksProvider>
```

이렇게 하나의 Provider 로 해주면 깔끔해진다.

# **커스텀 Hook으로 로직 재사용하기**

중복 코드가 있을때, 커스텀 hook 으로 로직을 재사용할 수 있다.

```jsx
import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <h1>{isOnline ? '✅ 온라인' : '❌ 연결 안 됨'}</h1>;
}

```

```jsx
import { useState, useEffect } from 'react';

export default function SaveButton() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  function handleSaveClick() {
    console.log('✅ 진행사항 저장됨');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? '진행사항 저장' : '재연결 중...'}
    </button>
  );
}

```

이런경우에 중복 코드를 커스텀훅으로 만들어 중복을 제거할 수 있다. return 값으로 isOnline을 반환해준다.

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}

```

```jsx
function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ 온라인' : '❌ 연결 안 됨'}</h1>;
}
```

이런식으로 코드가 간소화된다.

### **Hook의 이름은 항상 use 로 시작해야 한다.**

작명규칙:

1. react 컴포넌트의 이름은 항상 대문자로 시작. 또한 무언가를 반환해야한다.(주로 jsx를 반환하는 것이 일반적)
2. hook 의 이름은 use를 붙여주고 그 뒤에는 대문자로. (카멜케이스) hook들은 어떤 값이든 반환할 수 있다. 

린터가 React에 맞춰있다면, 작명 규칙을 지켜야한다. 만약 useOnlineStatus를 getOnlineStatus로 바꿔보면, linter가 내부에서 useState나 useEffect를 사용하는 것을 더 이상 허용하지 않을것이다. 오로지 Hook과 컴포넌트만 다른 Hook을 사용할 수 있다.

어떤 다른 hook 을 사용할때만 use 가 앞에 붙은 hook 을 만들어준다. 함수 내부에 다른 hook 이 사용되지 않는다면, 커스텀훅으로 만들 필요가 없고, 일반 함수로 만들면된다. 예를들면 useSorted 라는 이름은 getSorted 라는 일반함수로 만들기.

적어도 하나의 hook 을 내부에서 사용한다면, 반드시 함수 앞에 use를 붙여줘야함. 이 자체로 hook이된다.

### 커스텀 hook 은 state 그 자체를 공유하는게 아닌 state 저장 로직을 공유하는것이다.
(독립적으로 작동이된다.)

클래스로 인스턴스를 만든다고 생각하면 된다.
const firstNameProps = useFormInput('Mary');
const lastNameProps = useFormInput('Poppins');

이런 로직을 커스텀훅으로 만들어 주어 사용할 수 있다. form 입력에 반복되는 로직이 있기 때문에. 

```jsx
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('Mary');
  const [lastName, setLastName] = useState('Poppins');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <label>
        First name:
        <input value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last name:
        <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p><b>Good morning, {firstName} {lastName}.</b></p>
    </>
  );
}

```

이렇게 useFormInput 을 생성해준다.

```jsx
// App.js
import { useFormInput } from './useFormInput.js';

export default function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p><b>Good morning, {firstNameProps.value} {lastNameProps.value}.</b></p>
    </>
  );
}
```

```jsx
//useFormInput.js
import { useState } from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}
```

여기서 value라고 불리는 state 변수가 *한 번만* 정의된다는 것을 기억하기.

이와 달리, Form 컴포넌트는 useFormInput을 **두 번** 호출한다.

### **Hook 사이에 상호작용하는 값 전달하기**

커스텀 Hook 안의 코드는 컴포넌트가 재렌더링될 때마다 다시 돌아갈 것이다. 이게 바로 커스컴 Hook이 순수해야하는 이유다.

### 언제 custom hook을 사용해야 하는지

모든 자잘한 중복되는 코드들까지 커스텀훅으로 분리할 필요는 없다.

하지만 Effect를 사용하든 사용하지 않든, 커스텀 Hook 안에 그것을 감싸는 게 좋은지 아닌지 고려하기. Effect를 자주 쓸 필요가 없을지도 모른다. 

아래의 코드는 두가지 목록을 보여주는  ShippingForm 컴포넌트이다.

```jsx
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  // 이 Effect는 나라별 도시를 불러옵니다.
  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]);

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  // 이 Effect 선택된 도시의 구역을 불러옵니다.
  useEffect(() => {
    if (city) {
      let ignore = false;
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [city]);

  // ...
```

이 코드들이 반복됨에도 불구하고, Effect 들을 따로 분리하는것이 옳다. 도시, 구역인 다른 두가지를 동기화하기 때문에.
대신 ShippingForm 컴포넌트를 useData라는 커스텀 Hook을 통해 공통된 로직을 추출할 수 있다.

```jsx
function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setData(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}
```

### 커스텀 훅의 이름 짓기

- 이상적인 커스텀 훅의 이름 짓기의 좋은 예:
명확한 네이밍
    - useData(url)
    - useImpressionLog(eventName, extraData)
    - useChatRoom(options)
    
    외부시스템과 동기화할때는, 해당 시스템을 특정하는 용어 사용하기
    
    - useMediaQuery(query)
    - useSocket(url)
    - useIntersectionObserver(ref, options)
- 안좋은 예:
useEffect API 그 자체를 위한 대책이나 편리하게 감싸는 용도로 동작하는 커스텀 “생명 주기” Hook을 생성하거나 사용하는 것을 피하기.
    - useMount(fn)
    - useEffectOnce(fn)
    - useUpdateEffect(fn)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/b9272a73-609d-4dda-914c-e5bbb5369d64/Untitled.png)

위의 코드와 같이 컴포넌트에서 props 를 받아올때, options 라는 객체를 그 컴포넌트내에서 구조분해할당해주면, 이 컴포넌트가 리랜더링 될때마다 이 구조분해할당 부분이 실행된다. 근데, prop 자체를 function ChatRoom({options:{roomId, severIrl}})

이런식으로 작성한다면 이부분은한번만 실행된다. 그리고 이렇게 해놓으면roomId, serverUrl 을 이 컴포넌트 내에서 사용할 수 있는데, options 객체 자체를 사용하려면 

```jsx
function ChatRoom({options, options:{roomId, severIrl}})
```

이런식으로 작성하면 된다.