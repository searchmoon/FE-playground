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
  const handleClick = () => { //1
    alert('You clicked me!'); //2
  }

  return ( 
    <button onClick={handleClick}> //3
      Click me
    </button>
  );
}
```

- 이벤트 핸들러 함수의 특징:
    - 주로 컴포넌트 내부에서 정의된다.
    - handle 로 시작하고 그 위에 이벤트명을 붙인 함수명.(주로)

- 이렇게 함수를 인라인으로 정의할수도있다. (그치만 가독성을 위해 위의 방식을 사용하는 것이 더 좋음)

```tsx
<button onClick={() => {
	alert('You clicked me!');
}}> 
  Click me
</button>
```

** 주의할점:

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
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
      <AlertButton message="Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}
```

해당 컴포넌트의 prop에 접근할 수 있다. 이렇게 해줘도 되고, 이벤트 핸들러 함수이름을 정해주고 그 안에 alert 를 넣어서 prop을 사용해도된다.

### 이벤트 핸들러 Prop 명명하기

```tsx
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onSmash={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

이 예제에서 보면 <button> 빌트인 컴포넌트는 브라우저 이벤트 이름만을 지원한다. (onClick , onSubmit 등.)

근데 사용자 정의 컴포넌트로는 이벤트 핸들러의 이름을 바꿀 수 있다. 전달해주는 방식이기 때문에

** 이벤트 핸들러에 적절한 HTML 태그 사용하는게 좋다! 클릭을 하는 요소라면  div 말고 button 

### 이벤트 전파(event propagation)

```tsx
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
```

button 을 클릭하면, button의 alert 창이 먼저 뜨고, 그 부모태그인 div의 alert 창이 뜬다.(이벤트 버블링. 이벤트 버블링은 기본 설정. 이벤트 캡쳐링은 따로 설정해주면 사용가능하다.)

** onScroll 을 제외한 리액트의 모든 이벤트는 전파된다. 

### 전파 멈추기

e.stopPropagation() 을 호출해서 전파를 멈출 수 있다. 

```tsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

<button onClick={e => {
   e.stopPropagation();
   onClick();
}}>

<button onClick={onClick}>이었던 코드에,  e.stopPropagation(); 을 넣어주면서 onClick() 이렇게 괄호를 추가해야한다.

<Button onClick={() => alert('Playing!')}>
   Play Movie
</Button>

여기서 () => alert('Playing!') **이 부분에** e.stopPropagation(); 을 추가해줄 수도 있지만, 모든 Button 컴포넌트에 이 이벤트 전파를 멈추기 위해 컴포넌트 자체에 공통 속성으로 넣어주었다. 

- 이벤트 캡처:
전파가 중단된 상황일지라도 부모요소에서 자식요소로 이벤트가 전파되는 캡처링을 하고싶을때는 onClickCapture 처럼 이벤트명에 Capture 를 붙이면 된다.

```tsx
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

### 전파의 대안으로 핸들러를 전달하기

무슨 말인지 조금 이해가 안감. 

- playcode 에서 index.jsx 에 넣어서 실행해보기
    
    이 핸들러 내에서 부모의 onClick 이벤트 핸들러를 호출하는 부분 앞에 코드를 더 추가할 수도 있습니다. 이러한 패턴은 전파의 대안을 제공합니다. 부모 컴포넌트가 일부 추가적인 동작에 특화되도록 하면서 자식 컴포넌트가 이벤트를 핸들링할 수 있도록 합니다. 전파와는 다르게 자동으로 동작하지 않습니다. 이 패턴의 장점은 일부 이벤트의 결과로 실행되는 전체 코드 체인을 명확히 좇을 수 있게 해줍니다.
    
    전파를 활용하고 있지만 어떤 핸들러가 왜 실행되는 지 추적하는데 어려움을 겪고 있다면 이러한 접근법을 시도해 보시기 바랍니다.
    
    ```tsx
    import React from 'react';
    
    function Button({ onClick, children }) {
      return (
        <button onClick={e => {
          e.stopPropagation();
          onClick();
        }}>
          {children}
        </button>
      );
    }
    
    export function Toolbar() {
      return (
        <div className="Toolbar" style={{padding: '20px', backgroundColor: 'red'}} onClick={() => {
          alert('You clicked on the toolbar!');
        }}>
          <Button onClick={() => alert('Playing!')}>
            Play Movie
          </Button>
          <Button onClick={() => alert('Uploading!')}>
            Upload Image
          </Button>
        </div>
      );
    }
    
    export function App(props) {
      return (
        <div className='App'>
          <Toolbar />
        </div>
      );
    }
    
    // Log to console
    console.log('Hello console')
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
import { useState } from 'react';
const [index, setIndex] = useState(0);
```

이렇게 import를 해주고 사용할 수 있다. 

[index, setIndex] 은 배열 구조분해 된 문법.

### 첫번째 훅 만나기

React 에서 use로 시작하는 모든 함수를 hook 이라고 한다. 

hook은 리액트가 오직 렌더링 중일때만 사용할 수 있는 특별한 함수.

** hook 은 컴포넌트의 최상위 수준 또는 커스텀 훅에서만 호출 할 수 있다. 조건문, 반복문 또는 기타 중첩 함수 내부에서는 훅을 호출할 수 없다.

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
import Gallery from './Gallery.js';

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

재귀적 단계: 업데이트된 컴포넌트가 다른 컴포넌트를 return 하면 React는 다음으로 *해당*  컴포넌트를 렌더링하고 해당 컴포넌트도 컴포넌트를 return 하면 return *된*  컴포넌트를 다음에 렌더링하는 방식입니다. 중첩된 컴포넌트가 더 이상 없고 React가 화면에 표시되어야 하는 내용을 정확히 알 때까지 이 단계는 계속됩니다.

** 주의할점:

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
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
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
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
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