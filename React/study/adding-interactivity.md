# 상호작용성 더하기

Adding Interactivity

## < 이벤트에 응답하기 >

### 이벤트 핸들러 추가하기

이벤트 추가 3단계:

1. 컴포넌트 내부에 함수선언.
2. 함수 내부 로직 구현
3. 요소에 이벤트 핸들러 넣어주기.
   onClick={함수이름} 이런식으로 prop 형태로 전달

```tsx
export default function Button() {
  const handleClick = () => {
    //1
    alert("You clicked me!"); //2
  };

  return <button onClick={handleClick}> //3 Click me</button>;
}
```

- 이벤트 핸들러 함수의 특징:

  - 주로 컴포넌트 내부에서 정의된다.
  - handle 로 시작하고 그 위에 이벤트명을 붙인 함수명.(주로)

- 이렇게 함수를 인라인으로 정의할수도있다. (그치만 가독성을 위해 위의 방식을 사용하는 것이 더 좋음)

```tsx
<button
  onClick={() => {
    alert("You clicked me!");
  }}
>
  Click me
</button>
```

\*\* 주의할점:

<button onClick={handleClick}> 와

<button onClick={handleClick()}> 의 차이

handleClick() 이렇게 넣어주면 즉시 실행이 되어버린다. () 는 빼야한다.

근데, onClick={() ⇒ handleClick()}

이렇게 함수를 전달하는것은 가능하다.
<button onClick={alert('...')}> 이런식으로 작성한다면 컴포넌트가 렌더링 될 때마다 실행된다.

• 요약: 이벤트 핸들러는 **호출이 아니라** 전달만 가능합니다! onClick={handleClick()}이 아니라 onClick={handleClick}입니다.

### 이벤트 핸들러 내에서 Prop 읽기

```tsx
function AlertButton({ message, children }) {
  return <button onClick={() => alert(message)}>{children}</button>;
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">Play Movie</AlertButton>
      <AlertButton message="Uploading!">Upload Image</AlertButton>
    </div>
  );
}
```

해당 컴포넌트의 prop에 접근할 수 있다. 이렇게 해줘도 되고, 이벤트 핸들러 함수이름을 정해주고 그 안에 alert 를 넣어서 prop을 사용해도된다.

### 이벤트 핸들러 Prop 명명하기

```tsx
function Button({ onSmash, children }) {
  return <button onClick={onSmash}>{children}</button>;
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert("Playing!")}>Play Movie</Button>
      <Button onSmash={() => alert("Uploading!")}>Upload Image</Button>
    </div>
  );
}
```

이 예제에서 보면 <button> 빌트인 컴포넌트는 브라우저 이벤트 이름만을 지원한다. (onClick , onSubmit 등.)

근데 사용자 정의 컴포넌트로는 이벤트 핸들러의 이름을 바꿀 수 있다. 전달해주는 방식이기 때문에

\*\* 이벤트 핸들러에 적절한 HTML 태그 사용하는게 좋다! 클릭을 하는 요소라면 div 말고 button

### 이벤트 전파(event propagation)

```tsx
export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("You clicked on the toolbar!");
      }}
    >
      <button onClick={() => alert("Playing!")}>Play Movie</button>
      <button onClick={() => alert("Uploading!")}>Upload Image</button>
    </div>
  );
}
```

button 을 클릭하면, button의 alert 창이 먼저 뜨고, 그 부모태그인 div의 alert 창이 뜬다.(이벤트 버블링. 이벤트 버블링은 기본 설정. 이벤트 캡쳐링은 따로 설정해주면 사용가능하다.)

\*\* onScroll 을 제외한 리액트의 모든 이벤트는 전파된다.

### 전파 멈추기

e.stopPropagation() 을 호출해서 전파를 멈출 수 있다.

```tsx
function Button({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("You clicked on the toolbar!");
      }}
    >
      <Button onClick={() => alert("Playing!")}>Play Movie</Button>
      <Button onClick={() => alert("Uploading!")}>Upload Image</Button>
    </div>
  );
}
```

<button onClick={e => {
e.stopPropagation();
onClick();
}}>

<button onClick={onClick}>이었던 코드에, e.stopPropagation(); 을 넣어주면서 onClick() 이렇게 괄호를 추가해야한다.

<Button onClick={() => alert('Playing!')}>
Play Movie
</Button>

여기서 () => alert('Playing!') **이 부분에** e.stopPropagation(); 을 추가해줄 수도 있지만, 모든 Button 컴포넌트에 이 이벤트 전파를 멈추기 위해 컴포넌트 자체에 공통 속성으로 넣어주었다.

- 이벤트 캡처:
  전파가 중단된 상황일지라도 부모요소에서 자식요소로 이벤트가 전파되는 캡처링을 하고싶을때는 onClickCapture 처럼 이벤트명에 Capture 를 붙이면 된다.

```tsx
<div
  onClickCapture={() => {
    /* this runs first */
  }}
>
  <button onClick={(e) => e.stopPropagation()} />
  <button onClick={(e) => e.stopPropagation()} />
</div>
```

### 전파의 대안으로 핸들러를 전달하기

무슨 말인지 조금 이해가 안감.

- playcode 에서 index.jsx 에 넣어서 실행해보기
  이 핸들러 내에서 부모의 onClick 이벤트 핸들러를 호출하는 부분 앞에 코드를 더 추가할 수도 있습니다. 이러한 패턴은 전파의 대안을 제공합니다. 부모 컴포넌트가 일부 추가적인 동작에 특화되도록 하면서 자식 컴포넌트가 이벤트를 핸들링할 수 있도록 합니다. 전파와는 다르게 자동으로 동작하지 않습니다. 이 패턴의 장점은 일부 이벤트의 결과로 실행되는 전체 코드 체인을 명확히 좇을 수 있게 해줍니다.
  전파를 활용하고 있지만 어떤 핸들러가 왜 실행되는 지 추적하는데 어려움을 겪고 있다면 이러한 접근법을 시도해 보시기 바랍니다.
  ```tsx
  import React from "react";

  function Button({ onClick, children }) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {children}
      </button>
    );
  }

  export function Toolbar() {
    return (
      <div
        className="Toolbar"
        style={{ padding: "20px", backgroundColor: "red" }}
        onClick={() => {
          alert("You clicked on the toolbar!");
        }}
      >
        <Button onClick={() => alert("Playing!")}>Play Movie</Button>
        <Button onClick={() => alert("Uploading!")}>Upload Image</Button>
      </div>
    );
  }

  export function App(props) {
    return (
      <div className="App">
        <Toolbar />
      </div>
    );
  }

  // Log to console
  console.log("Hello console");
  ```

### 기본 동작 방지하기

form 의 제출 이벤트는 그 내부의 button 을 클릭 시, 페이지 전테를 리로드 하는것이 기본동작이다. 그래서 e.preventDefault(); 로 그 기본 동작을 방지할 수 있다.

<form onSubmit={() => alert('Submitting!')}> 이런코드였다면,

<form onSubmit={e => {
   e.preventDefault();
   alert('Submitting!');
}}>

이렇게 추가해준다.

## < State: 컴포넌트의 기억 저장소 >

화면의 내용을 변경해야하는 경우: state 를 사용해서 변경해준다.

### 일반 변수로 충분하지 않은 경우

지역변수로 화면상의 변화를 업데이트 할 수 없다.

컴포넌트를 새로운 데이터로 업데이트 하기 위해서는 이 두가지가 필요하다.

1. 렌더링 사이에 데이터를 유지합니다.
2. React가 새로운 데이터로 컴포넌트를 렌더링 하도록 유발합니다.

useState 훅은 이 두 가지를 제공합니다.

1. 렌더링 간에 데이터를 유지하기 위한 **state 변수**.
2. 변수를 업데이트하고 React가 컴포넌트를 다시 렌더링하도록 유발하는 **state setter 함수**

```tsx
import { useState } from "react";
const [index, setIndex] = useState(0);
```

이렇게 import를 해주고 사용할 수 있다.

[index, setIndex] 은 배열 구조분해 된 문법.

### 첫번째 훅 만나기

React 에서 use로 시작하는 모든 함수를 hook 이라고 한다.

hook은 리액트가 오직 렌더링 중일때만 사용할 수 있는 특별한 함수.

\*\* hook 은 컴포넌트의 최상위 수준 또는 커스텀 훅에서만 호출 할 수 있다. 조건문, 반복문 또는 기타 중첩 함수 내부에서는 훅을 호출할 수 없다.

- 실제 작동방식: 위의 코드를 예로든다면,

1. **컴포넌트가 처음 렌더링 됩니다.** index의 초깃값으로 useState를 사용해 0을 전달했으므로 [0, setIndex]를 반환합니다. React는 0을 최신 state 값으로 기억합니다.
2. **state를 업데이트합니다.** 사용자가 버튼을 클릭하면 setIndex(index + 1)를 호출합니다. index는 0이므로 setIndex(1)입니다. 이는 React에 index는 1임을 기억하게 하고 또 다른 렌더링을 유발합니다.
3. **컴포넌트가 두 번째로 렌더링 됩니다.** React는 여전히 useState(0)를 보지만, index를 1로 설정한 것을 기억하고 있기 때문에, 이번에는 [1, setIndex]를 반환합니다.
4. 이런 식으로 계속됩니다!

### 컴포넌트에 여러 state 변수 지정하기

```tsx
export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
```

이런식으로 하나의 컴포넌트에 여러 state 변수를 지정할 수 있는데, showMore, index 처럼 서로 연관이 없는 경우 이렇게 여러개의 state 변수를 가지는게 좋다.

### **State는 격리되고 비공개로 유지됩니다**

State는 화면에서 컴포넌트 인스턴스에 지역적입니다. 다시 말해, **동일한 컴포넌트를 두 번 렌더링한다면 각 복사본은 완전히 격리된 state를 가집니다!** 그중 하나를 변경해도 다른 하나에는 영향을 미치지 않습니다.

```tsx
import Gallery from "./Gallery.js";

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}
```

이런경우에 Gallery 컴포넌트를 두번 렌더링 했기때문에 그들의 state는 별도로 저장된다.

Props와 달리, **state는 선언한 컴포넌트에 완전히 비공개입니다.** 부모 컴포넌트는 이를 변경할 수 없습니다. 이로써 다른 컴포넌트에 영향을 미치지 않고 어떤 컴포넌트에든 state를 추가하거나 제거할 수 있게 됩니다.

만약 두 개의 갤러리가 state를 동기화하길 원한다면, React에서 올바른 방법은 자식 컴포넌트에서 state를 *제거*하고 가장 가까운 공유 부모 컴포넌트에 추가하는 것입니다.

## <렌더링 그리고 커밋>

- 렌더링 3단계:
  트리거 → 렌더 → 커밋

### 1단계: 렌더링 트리거

컴포넌트가 렌더링이 일어날때:

1. 컴포넌트의 초기 렌더링인경우
2. 컴포넌트의 state 가 업데이트 된 경우

### **2단계: React 컴포넌트 렌더링**

렌더링을 트리거한 후 React는 컴포넌트를 호출하여 화면에 표시할 내용을 파악합니다. **“렌더링”은 React에서 컴포넌트를 호출하는 것입니다.**

- **초기 렌더링에서** React는 루트 컴포넌트를 호출합니다.
- **후속 렌더링에서** React는 state 업데이트가 일어나 렌더링을 트리거한 컴포넌트를 호출합니다.

재귀적 단계: 업데이트된 컴포넌트가 다른 컴포넌트를 return 하면 React는 다음으로 _해당_ 컴포넌트를 렌더링하고 해당 컴포넌트도 컴포넌트를 return 하면 return _된_ 컴포넌트를 다음에 렌더링하는 방식입니다. 중첩된 컴포넌트가 더 이상 없고 React가 화면에 표시되어야 하는 내용을 정확히 알 때까지 이 단계는 계속됩니다.

\*\* 주의할점:

렌더링은 항상 순수한 계산이어야한다.

- 동일한 입력에는 동일한 출력.
- 이전의 state를 변경해서는 안된다.

strict mode에서 개발할때 리액트는 각 컴포넌트의 함수를 두번 호출하여 순수하지 않은 함수로 인한 실수를 표면화 하는데 도움을 받을 수 있다.

### 3단계: React가 DOM에 변경사항을 커밋

컴포넌트를 렌더링(호출)한 후 React는 DOM을 수정합니다.

- 초기 렌더링의 경우 React는 [appendChild()](https://developer.mozilla.org/docs/Web/API/Node/appendChild) DOM API를 사용하여 생성한 모든 DOM 노드를 화면에 표시합니다.
- 리렌더링의 경우 React는 필요한 최소한의 작업(렌더링하는 동안 계산된 것!)을 적용하여 DOM이 최신 렌더링 출력과 일치하도록 합니다.

React는 렌더링 간에 차이가 있는 경우에만 DOM 노드를 변경합니다. Virtual DOM 을 사용해 변경된 부분만 실제 DOM에 적용.

```tsx
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

이것을 예로 들면

h1 태그 안의 time 만 업데이트 되기 때문에 나머지 input 또는 input의 value 는 건드리지 않는다.

렌더링이 완료되고 React가 DOM을 업데이트한 후 브라우저는 화면을 다시 그립니다. 이 단계를 “브라우저 렌더링”이라고 하지만 이 문서의 나머지 부분에서 혼동을 피하고자 “페인팅”이라고 부를 것입니다.

## < 스냅샷으로서의 State >

State 변수는 읽고 쓸 수 있는 일반 자바스크립트 변수처럼 보일 수 있습니다. 하지만 state는 스냅샷처럼 동작합니다. state 변수를 설정하여도 이미 가지고 있는 state 변수는 변경되지 않고, 대신 리렌더링이 발동됩니다.

### **렌더링은 그 시점의 스냅샷을 찍습니다.**

- 스냅샷: 특정 시점에서의 상태를 나타내는 값을 의미.
  상태를 변경하면 React는 컴포넌트를 다시 렌더링하고, 해당 스냅샷을 기반으로 변경사항이 있을 경우에만 UI를 업데이트합니다. 이것이 React에서 상태 관리가 어떻게 이루어지는지를 설명하는 중요한 개념 중 하나입니다.

prop, 이벤트 핸들러, 로컬 변수는 모두 **렌더링 당시의 state를 사용해** 계산됩니다.

React가 컴포넌트를 리렌더링할 때의 과정:

1. React가 함수를 다시 호출합니다.
2. 함수가 새로운 JSX 스냅샷을 반환합니다.
3. 그러면 React가 함수가 반환한 스냅샷과 일치하도록 화면을 업데이트합니다.

```tsx
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

이 예제에서 +3 버튼을 누르면,

h1 태그 안의 내용이, 1, 2, 3 순으로 된다.

setNumber(number + 1); 이게 3번이 실행이 되어서 3으로 될것 같지만 실제동작은

number 가 0인상태에서

0 + 1

0 + 1

0 + 1

이렇게 실행되기 때문에 결국 출력되는 값은 1이다.

### 시간 경과에 따른 State

```tsx
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          alert(number);
        }}
      >
        +5
      </button>
    </>
  );
}
```

number의 초기값이 0인 상태에서

+5 버튼을 눌렀을때의 동작은,

먼저 0 이 뜨는 alert 창이 뜨고, 기존에 0이었던 number 값이 5로 변한다.

alert(number); 이부분을

```tsx
setTimeout(() => {
  alert(0);
}, 3000);
```

이렇게 변경해주어도 똑같은 alert 결과값이 나온다.

**state 변수의 값은** 이벤트 핸들러의 코드가 비동기적이더라도 **렌더링 내에서 절대 변경되지 않기때문.**

이 값은 컴포넌트를 호출해 React가 UI의 “스냅샷을 찍을” 때 “고정”된 값.

비동기함수가 실행되는 방식. 이벤트 루프 확인하기

### < State 업데이트 큐 >

```jsx
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

- React는 state 업데이트를 하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다린다. 즉, setNumber() 호출이 모두 완료된 이후에만 일어난다.
- 이벤트 핸들러와 그 안에 있는 코드가 완료될 때까지 UI가 업데이트되지 않는다는 의미. render 비용을 줄이기 위해서 여러개의 API 호출을 한번에 처리한다. 이렇게 합치는 과정을 batch 라고한다.
- 여러 번의 **setState** 호출이 한 번에 처리되는 것을 "batching(배치 처리)"이라고 한다. 이 때문에 한 번의 렌더링 주기(render cycle) 동안 여러 번의 **setState** 호출이 있더라도 실제로 화면이 다시 그려지는 횟수는 최소화된다.
- setNumber(n + 1) 와 setNumber(n => n + 1) 의 차이 알기.

setNumber(n => n + 1)는 이전 큐의 state 를 기반으로 다음 state를 계산하는 함수를 전달할 수 있다.

여기서 n => n + 1 은 **업데이터 함수**(updater function)라고 부른다. 이를 state 설정자 함수에 전달 할 때,

1. React는 이벤트 핸들러의 다른 코드가 모두 실행된 후에 이 함수가 처리되도록 큐에 넣는다.
2. 다음 렌더링 중에 React는 큐를 순회하여 최종 업데이트된 state를 제공한다.

```jsx
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          setNumber((n) => n + 1);
        }}
      >
        Increase the number
      </button>
    </>
  );
}
```

위의 코드에서는 6씩 증가한다.

업데이터 함수(n => n + 1)은 큐에 추가된다.(다른 코드가 모두 실행된 후에 이 함수가 처리되도록)

setNumber(n => n + 1);

setNumber(number + 5);

이렇게 두개의 순서를 바꾸면 5씩 증가한다.

업데이터 함수는 순수해야 하며 결과만 반환해야한다.(복잡한 로직을 넣지마라)

하나의 이벤트에서 일부 state를 여러 번 업데이트하려면 setNumber(n => n + 1) 업데이터 함수를 사용하면 된다.

```jsx
async function handleClick() {
  setPending((p) => p + 1);
  await delay(3000);
  setPending((p) => p - 1);
  setCompleted((c) => c + 1);
}
```

### < 객체 State 업데이트하기 >

객체를 변경하는 대신 교체하기. state가 가진 객체를 직접 변경해서는 안된다.(아래의 예처럼)

```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
position.x = 5; //이렇게 하면 안됨.
```

참조하던것을 수정하는것은 문제가 된다. 참조하지않는 객체를 변경하는것은 가능하다. 지역변경(local mutation) 이라고 하고, 렌더링하는동안 지역변경을 할 수도있으며, 이는 아주 편리하다.

### **State를 읽기 전용인 것처럼 다루기**

**state에 저장한 자바스크립트 객체는 어떤 것이라도 읽기 전용인 것처럼** 다루어야 한다.

```jsx
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
	    onPointerMove={e => {
	      position.x = e.clientX;
	      position.y = e.clientY;
    }}>
	)
}
```

```jsx
//1번
<div
  onPointerMove={e => {
    position.x = e.clientX;
    position.y = e.clientY;
}}>
//이것을
//2번
<div
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}>
// 이렇게 set함수로 전달해야한다.
// 1번의 예처럼 state 설정함수가 없으면 객체가 변경했는지를 인지를 못함(렌더링이 안됨)
```

### **spread 문법으로 객체 복사하기**

객체형태의 state를 업데이트 해주기 위해 setState 함수를 사용할때, …(스프레드 문법)을 사용하는것은 얕은 복사기 때문에, 한레벨 깊이의 내용만 복사한다. 중첩된 프로퍼티를 업데이트 하려면 한번 이상 사용해야한다는 뜻.

```jsx
function handleChange(e) {
  setPerson({
    ...person,
    [e.target.name]: e.target.value,
  });
}
```

[ ] 대괄호를 사용하여 동적이름을 가진 프로퍼티를 명시할 수 있다.

- 중첩된 객체 갱신하기

```jsx
**const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});**
```

이런 객체가 state 값일때,

person.artwork.title 을 업데이트 하고싶다면,

```jsx
function handleTitleChange(e) {
  setPerson({
    ...person,
    artwork: {
      ...person.artwork,
      title: e.target.value,
    },
  });
}
```

이렇게 스프레드 문법을 이중으로 사용하여 변경된 title 부분만 업데이트 해줄 수 있다.

- 객체는 실제로 중첩되지 않았다.

```jsx
let obj = {
  name: "Niki de Saint Phalle",
  artwork: {
    title: "Blue Nana",
    city: "Hamburg",
    image: "https://i.imgur.com/Sd1AgUOm.jpg",
  },
};
```

이런예제에서 객체 두개가 중첩되었다고 하는데, 실제로는 중첩된 객체는 없다.

그것들은 프로퍼티를 통해 서로를 “가리키는” 각각의 객체들이다.

### **Immer로 간결한 갱신 로직 작성하기**

```jsx
updatePerson((draft) => {
  draft.artwork.city = "Lagos";
});
```

- immer가 제공하는 draft는 Proxy라고 하는 아주 특별한 객체 타입으로, 당신이 하는 일을 기록한다.
- Immer는 내부적으로 draft의 어느 부분이 변경되었는지 알아내어, 변경사항을 포함한 완전히 새로운 객체를 생성한다.

사용법:
use-immer 를 설치한다.

import { useState } from 'react'를 import { useImmer } from 'use-immer'로 교체한다.

Immer는 업데이트 핸들러를 간결하게 관리할 수 있는 좋은 방법이며, 특히 state가 중첩되어 있고 객체를 복사하면 중복되는 코드를 만들 때 쓰면 좋다.

immer 보다는 immutable.js 가 더 사용하기 편하대.

### **< 배열 State 업데이트하기 >**

배열도 객체에서와 마찬가지로 새 배열을 생성(혹은 기존 배열의 복사본)해서 이 새 배열을 state로 두어 업데이트 해야한다.

React state에서 배열은 읽기 전용으로 처리해야한다. arr[0] = 'bird'처럼 배열 내부의 항목을 재할당해서는 안 되며, push()나 pop()같은 함수로 배열을 변경해서는 안된다.

state의 원본 배열을 변경시키지 않는 filter()와 map() 같은 함수를 사용하여 원본 배열로부터 새 배열을 만들 수 있다.

|      | 비선호 (배열을 변경)      | 선호 (새 배열을 반환)                                                                                          |
| ---- | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 추가 | push, unshift             | concat, [...arr] 전개 연산자 (https://ko.react.dev/learn/updating-arrays-in-state#adding-to-an-array)          |
| 제거 | pop, shift, splice        | filter, slice (https://ko.react.dev/learn/updating-arrays-in-state#removing-from-an-array)                     |
| 교체 | splice, arr[i] = ... 할당 | map (https://ko.react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array)                          |
| 정렬 | reverse, sort             | 배열을 복사한 이후 처리 (https://ko.react.dev/learn/updating-arrays-in-state#making-other-changes-to-an-array) |

slice, splice 구분하기.

- 항목 추가: 스프레드문법 사용(항목 복사) (이런경우에 push() 사용하지 않기)

```jsx
setArtists([
  ...artists, // 기존 배열의 모든 항목에,
  { id: nextId++, name: name }, // 마지막에 새 항목을 추가합니다.
  //반대의 경우도 가능
]);
```

**toSpliced(), toReversed(), toSorted() 등은 원본배열을 변경하지않고 변경된다. 근데! 너무 최신버전이라 지원안되는것이 많아서 조심.**

- 항목 제거: filter 사용

```jsx
import { useState } from "react";

let initialArtists = [
  { id: 0, name: "Marta Colvin Andrade" },
  { id: 1, name: "Lamidi Olonade Fakeye" },
  { id: 2, name: "Louise Nevelson" },
];

export default function List() {
  const [artists, setArtists] = useState(initialArtists);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}{" "}
            <button
              onClick={() => {
                setArtists(artists.filter((a) => a.id !== artist.id));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

이 예에서는 id 값이 서로 일치하는 것을 제외하고 필터링을 해주었다.

filter 메서드는 원본 배열을 수정하지 않는다는것을 기억하기.

- 배열 변환: map을 사용해 새로운 배열을 만들 수 있다.
- 배열 내 항목 교체: 이럴때도 map 을 사용.

```jsx
let initialCounters = [0, 0, 0];

const [counters, setCounters] = useState(initialCounters);

function handleIncrementClick(index) {
  const nextCounters = counters.map((c, i) => {
    if (i === index) {
      // 클릭된 counter를 증가시킵니다.
      return c + 1;
    } else {
      // 변경되지 않은 나머지를 반환합니다.
      return c;
    }
  });
  setCounters(nextCounters);
}
```

- 배열에 항목 삽입:
  중간 부분에 항목을 삽입하고 싶을땐,

```jsx
const nextArtists = [
  // 삽입 지점 이전 항목
  ...artists.slice(0, insertAt),
  // 새 항목
  { id: nextId++, name: name },
  // 삽입 지점 이후 항목
  ...artists.slice(insertAt),
];
setArtists(nextArtists);
```

이런식으로 slice 를 사용하여 두번째 인자에 number 값을 지정하고, 중간에 삽입할 수 있다.

- 배열에 기타 변경 적용:
  spread 연산자를 사용해 원본 배열의 복사본을 만들어, .reverse() 또는 .sort() 등을 할 수 있다.

** 그러나, **배열을 복사하더라도 배열 _내부_ 에 기존 항목을 직접 변경해서는 안된다!\*\*

얕은 복사이기 때문에 복사한 새 배열은 이전 배열을 참조한다.

따라서 복사된 배열 내부의 객체를 수정하면 기존 state가 변경된다. 예시:

```jsx
const nextList = [...list];
nextList[0].seen = true; // list[0]을 변경시킵니다.
setList(nextList);
```

- **배열 내부의 객체 업데이트**
  - 좋지않은 방식.(이렇게 하지말자!)
  artwork 목록 두개는 초기 state가 서로 같은데, 이렇게 사용하면 각각의 체크박스를 선택해도 다른 목록에 영향을 미친다. 아래의 예는 _원본_ artwork 항목이 변경된다.
        ```jsx
        import { useState } from 'react';

        let nextId = 3;
        const initialList = [
          { id: 0, title: 'Big Bellies', seen: false },
          { id: 1, title: 'Lunar Landscape', seen: false },
          { id: 2, title: 'Terracotta Army', seen: true },
        ];

        export default function BucketList() {
          const [myList, setMyList] = useState(initialList);
          const [yourList, setYourList] = useState(
            initialList
          );

          function handleToggleMyList(artworkId, nextSeen) {
            const myNextList = [...myList];
            const artwork = myNextList.find(
              a => a.id === artworkId
            );
            artwork.seen = nextSeen;
            setMyList(myNextList);
          }

          function handleToggleYourList(artworkId, nextSeen) {
            const yourNextList = [...yourList];
            const artwork = yourNextList.find(
              a => a.id === artworkId
            );
            artwork.seen = nextSeen;
            setYourList(yourNextList);
          }

          return (
            <>
              <h1>Art Bucket List</h1>
              <h2>My list of art to see:</h2>
              <ItemList
                artworks={myList}
                onToggle={handleToggleMyList} />
              <h2>Your list of art to see:</h2>
              <ItemList
                artworks={yourList}
                onToggle={handleToggleYourList} />
            </>
          );
        }

        function ItemList({ artworks, onToggle }) {
          return (
            <ul>
              {artworks.map(artwork => (
                <li key={artwork.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={artwork.seen}
                      onChange={e => {
                        onToggle(
                          artwork.id,
                          e.target.checked
                        );
                      }}
                    />
                    {artwork.title}
                  </label>
                </li>
              ))}
            </ul>
          );
        }
        ```

  ```jsx
  const myNextList = [...myList];
  const artwork = myNextList.find((a) => a.id === artworkId);
  artwork.seen = nextSeen; // 문제: 기존 항목을 변경시킵니다.
  setMyList(myNextList);
  ```
  - 배열 내부의 객체 업데이트는 이렇게 사용하자.
  ```jsx
  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(
      myList.map((artwork) => {
        if (artwork.id === artworkId) {
          // 변경된 *새* 객체를 만들어 반환합니다.
          return { ...artwork, seen: nextSeen };
        } else {
          // 변경시키지 않고 반환합니다.
          return artwork;
        }
      })
    );
  }
  ```
  ### **Immer로 간결한 업데이트 로직 작성하기**
  immer 를 사용한다면
  ```jsx
  function handleToggleMyList(id, nextSeen) {
    updateMyList((draft) => {
      const artwork = draft.find((a) => a.id === id);
      artwork.seen = nextSeen;
    });
  }
  ```
  이렇게 해주어도 원본 배열이 변경되지 않는다.
  _원본_ state를 변경하는 것이 아니라, Immer에서 제공하는 특수 draft 객체를 변경하기 때문
  immer 로 코드 간결성을 유지할 수 있다.
