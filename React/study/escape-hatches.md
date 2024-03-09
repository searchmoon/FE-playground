# 탈출구(escape hatches)

# **Ref로 값 참조하기**

컴포넌트가 일부 정보를 “기억”하고 싶지만, 해당 정보가 렌더링을 유발하지 않도록 하려면 ref 를 사용하면 된다.

```jsx
import { useRef } from 'react';

const ref = useRef(0); // 넣어준 값인 0은 초기값.
```

useRef는 이런 객체를 반환한다.

```jsx
{ current: 0 } //useRef에 전달한 값이 current 의 값으로 들어간다. 
```

ref.current 로 값에 접근할 수 있다. 이 값은 의도적으로 변경할수 있으므로 읽고, 쓸 수 있다.

state처럼 사용이 가능하다.(비슷하게) 그리고, ref의 값을 읽고 수정할 수 있다.

```jsx
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
      {ref.current} {/*  이부분추가  */}
    </button>
  );
}
```

이런코드에서 state 처럼 모든 클릭의 경우마다 리랜더링 되지 않는다.  이부분추가 라고 한 부분에서 보면, alert 에서는 값이 1씩 증가하는데, 이부분추가 부분은 계속 화면에 0으로 머물러있다.

### 예시: 스톱워치 작성하기

```jsx
// startTime, now 는 렌더링이 다시일어나서 화면의 변경에 필요하기 때문에 useState 에 담아줌
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);
// 
const intervalRef = useRef(null);
```

stop 을 클릭했을때, now를 중지하기 위해 기존 interval 을 취소해야한다. 이를 위해 clearInterval 를 호출한다. 

사용자가 시작을 눌렀을 때 setInterval 호출로 반환된 interval ID를 어딘가에 보관해야 한다. **interval ID는 렌더링에 사용되지 않으므로 ref에 저장할 수 있다.**

intervalRef.current = setInterval(() => {
   setNow(Date.now());
}, 10);

이부분

```jsx
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}
```

event handler에게만 필요한 정보이고 변경이 일어날 때 리렌더가 필요하지 않다면, useState 보다 uerRef를 사용하는 것이 더 효율적일 수 있다. 

### ref와 state의 차이:

| ref | state |
| --- | --- |
| useRef(initialValue) 는 { current: initialValue } 을 반환합니다. | useState(initialValue) 은 state 변수의 현재 값과 setter 함수 [value, setValue] 를 반환합니다. |
| state를 바꿔도 리렌더 되지 않습니다. | state를 바꾸면 리렌더 됩니다. |
| Mutable-렌더링 프로세스 외부에서 current 값을 수정 및 업데이트할 수 있습니다. | ”Immutable”—state 를 수정하기 위해서는 state 설정 함수를 반드시 사용하여 리렌더 대기열에 넣어야 합니다. |
| 렌더링 중에는 current 값을 읽거나 쓰면 안 됩니다. | 언제든지 state를 읽을 수 있습니다. 그러나 각 렌더마다 변경되지 않는 자체적인 state의 https://ko.react.dev/learn/state-as-a-snapshot이 있습니다. |

### ref 를 사용할 시기

1. timeouID 를 저장할 때: 
setTimeout은 timeoutID를 반환하는데, 양의 정수로서 setTimeout() 이 생성한 타이머를 식별할 때 사용한다. 이 값을 clearTimeout()에 전달하면 타이머를 취소할 수 있다.
const timeoutID = setTimeout(function[, delay, arg1, arg2, ...]);
2.  DOM 엘리먼트 저장 및 조작할 때
3. JSX를 계산하는 데 필요하지 않은 다른 객체를 저장할 때

### ref의 좋은 예시 (사용할때 권장사항)

- 렌더링중에 ref.current 읽거나, 쓰지 말기. ref.current 가 언제 변하는지 React는 모르기 때문에 렌더링할 때 읽어도 컴포넌트의 동작을 예측하기 어렵다.
- ref 는 외부 시스템이나 브라우저 API로 작업할 때 유용하다.

### Refs와 DOM

ref의 가장 일반적인 사용 사례는 DOM 엘리먼트에 access 하는것이다.

예를들어 <div ref={myRef}> 같이 ref 를 전달하면, react 는 해당 DOM 엘리먼트를 myRef.current 에 넣는다. 만약 엘리먼트가 DOM 에서 사라지면, React 는 `myRef.current` 값을 `null` 로 업데이트 한다.

### Ref 요약

- 자주 필요하지는 않다.
- ref는 current 라는 프로퍼티를 호출할 수 있는 자바스크립트 순수객체
- useRef hook으로 ref 를 사용할 수 있다.
- state와 마찬가지로 ref는 컴포넌트의 렌더링 간에 정보를 유지한다.
- state와 달리 ref의 current 값을 설정하면 리렌더가 트리거되지 않는다.
- 렌더링 중에 ref.current를 읽거나 쓰지 말자. 컴포넌트를 예측하기 어렵게 만든다.

# Ref로 DOM 조작하기

DOM 을 직접 조작하는 일은 자주 있는 일이 아니다.  하지만 가끔 특정 노드에 포커스를 옮기거나, 스크롤 위치를 옮기거나, 위치와 크기를 측정하기 위해서 React가 관리하는 DOM 요소에 접근해야 할 때가 있다. 이럴때, DOM 노드에 접근하기 위해 ref 가 필요하다.

### ref로 노드 가져오기

```jsx
// 1
import { useRef } from 'react';
const myRef = useRef(null);
// 2
<div ref={myRef}>
```

위처럼 해당 노드에 ref={myRef} 를 넣어주고, 

myRef.current.scrollIntoView(); 이렇게 노드에 정의된 내장 브라우저 API를 사용할 수 있다.

### 예시 1. 텍스트 입력에 포커스 이동하기

```jsx
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null); // 1.inputRef 선언

  function handleClick() {
    inputRef.current.focus(); //3. inputRef.current에서 
    // input의 DOM 노드를 읽고 inputRef.current.focus()로 focus()호출
  }

  return (
    <>
      <input ref={inputRef} /> // 2. ref에 inputRef 전달
      <button onClick={handleClick}> // 4. 핸들러 넣기
        Focus the input
      </button>
    </>
  );
}
```

이렇게 내장 브라우저 API인 focus를 사용하여 포커스를 이동시켜줄 수 있다. 작성 순서 확인

### 예시 2. 한 요소로 스크롤을 이동하기

이미지 3개가 있는 캐러셀 예시. 각 버튼은 브라우저 scrollIntoView() 메서드를 해당 DOM 노드로 호출하여 이미지를 중앙에 배치한다. ref는 각각의 img에 전달한다.

- 코드 참고
    
    ```jsx
    import { useRef } from 'react';
    
    export default function CatFriends() {
      const firstCatRef = useRef(null);
      const secondCatRef = useRef(null);
      const thirdCatRef = useRef(null);
    
      function handleScrollToFirstCat() {
        firstCatRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    
      function handleScrollToSecondCat() {
        secondCatRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    
      function handleScrollToThirdCat() {
        thirdCatRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    
      return (
        <>
          <nav>
            <button onClick={handleScrollToFirstCat}>
              Tom
            </button>
            <button onClick={handleScrollToSecondCat}>
              Maru
            </button>
            <button onClick={handleScrollToThirdCat}>
              Jellylorum
            </button>
          </nav>
          <div>
            <ul>
              <li>
                <img
                  src="https://placekitten.com/g/200/200"
                  alt="Tom"
                  ref={firstCatRef}
                />
              </li>
              <li>
                <img
                  src="https://placekitten.com/g/300/200"
                  alt="Maru"
                  ref={secondCatRef}
                />
              </li>
              <li>
                <img
                  src="https://placekitten.com/g/250/200"
                  alt="Jellylorum"
                  ref={thirdCatRef}
                />
              </li>
            </ul>
          </div>
        </>
      );
    }
    
    ```
    

### **다른 컴포넌트의 DOM 노드 접근하기**

예를 들면, <input /> 요소에 ref를 주입할때는 
<input ref={inputRef} />
이런식으로 해서 inputRef.current 에 접근할 수 있다.

그런데, 만약 이렇게 생긴 컴포넌트에 input 요소에 ref 프로퍼티를 전달을 해도, current 에 접근할 수 없다. 

```jsx
function MyInput(props) {
  return <input {...props} />;
}
```

그러나 이런방법으로 하면 ref 를 전달하도록 지정할 수있다. props 로 전달하는 것이 아닌 ref 로 전달 (두번째 인자를 통해 전달)

```jsx
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
```

이 패턴은 디자인 시스템에서 버튼, 입력 요소 등의 저수준 컴포넌트에서 DOM 노드를 전달하기 위해 매우 흔하게 사용됨.

위 예시에서 MyInput컴포넌트는 DOM 입력 요소를 그대로 노출한다. 그리고 부모 컴포넌트에서 DOM 노드의 focus() 를 호출할 수 있게 됐다. 근데 부모컴포넌트에서 dom 노드의 css 스타일을 직접 변경하는 등의 예상치 못한 작업을 할 수 있다. 그래서 몇몇 상황에서 이렇게 노출된 기능을 제한하고 싶을떄, useImperativeHandle 을 사용한다.

- 코드 예시 참고
    
    ```jsx
    import {
      forwardRef,
      useRef,
      useImperativeHandle
    } from 'react';
    
    const MyInput = forwardRef((props, ref) => {
      const realInputRef = useRef(null);
      useImperativeHandle(ref, () => ({
        // 오직 focus만 노출합니다.
        focus() {
          realInputRef.current.focus();
        },
      }));
      return <input {...props} ref={realInputRef} />;
    });
    
    export default function Form() {
      const inputRef = useRef(null);
    
      function handleClick() {
        inputRef.current.focus();
      }
    
      return (
        <>
          <MyInput ref={inputRef} />
          <button onClick={handleClick}>
            Focus the input
          </button>
        </>
      );
    }
    
    ```
    

이 코드에서 realInputRef는 실제 input dom 노드를 가지고 있다. 근데 unImprerativeHandle 을 사용해서 React가 ref를 참조하는 부모 컴포넌트에 직접 구성한 객체를 전달하도록 지시한다. 그래서 Form 컴포넌트 안쪽의 inputRef.current는 foucs 메서드만 가지고 있다. 이 경우 ref는 DOM 노드가 아니라 useImperativeHandle 호출에서 직접 구성한 객체가 된다.

### **flushSync로 state 변경을 동적으로 플러시하기**

클릭을 했을 시에 할일 목록의 마지막으로 스크롤을 내리는 동작의 코드이다.

- 코드 예시 참고
    
    ```jsx
    import { useState, useRef } from 'react';
    
    export default function TodoList() {
      const listRef = useRef(null);
      const [text, setText] = useState('');
      const [todos, setTodos] = useState(
        initialTodos
      );
    
      function handleAdd() {
        const newTodo = { id: nextId++, text: text };
        setText('');
        setTodos([ ...todos, newTodo]);
        listRef.current.lastChild.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    
      return (
        <>
          <button onClick={handleAdd}>
            Add
          </button>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <ul ref={listRef}>
            {todos.map(todo => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
        </>
      );
    }
    
    let nextId = 0;
    let initialTodos = [];
    for (let i = 0; i < 20; i++) {
      initialTodos.push({
        id: nextId++,
        text: 'Todo #' + (i + 1)
      });
    }
    
    ```
    

근데, 마지막으로 추가된 할일의 바로 이전까지의 목록으로 스크롤이 내려간다. (한칸 더 밑으로 내려가야하는데…!) 이유는

setTodos([ ...todos, newTodo]);

listRef.current.lastChild.scrollIntoView();

이 코드에 있는데, state의 갱신은 큐에 쌓여서 비동기적으로 처리되기 때문이다. setTodo가 DOM 을 바로 업데이트 하지 않기 때문에 이런일이 생기는것이다. 마지막 추가한 할일이 아직 추가되지않은 상태. 그래서 react가 DOM 변경을 동기적으로 수행하게 할 수 있는데, react-dom 에서 flushSync 를 import 해오고, 아까 그 코드에 이렇게 추가 해주면 그 문제가 해결된다.

```jsx
flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
```

### **ref로 DOM을 조작하는 모범 사례**

ref는, focus 또는 스크롤 위치를 관리하거나, react 가 노출하지 않는 브라우저 API를 호출하는 등의 작업을 할때 사용된다.
DOM 노드를 직접 바꾸려고 하면 충돌로 이어지기 때문에 직접 바꾸려하면 안된다.

### **요약**

- Ref는 대부분 DOM 요소를 참조하기 위해 사용한다.
- <div ref={myRef}>로 React가 myRef.current에 DOM Node를 대입하도록 지시할 수 있다.
- 많은 경우 ref는 포커싱, 스크롤링, DOM 요소 크기 혹은 위치 측정할때 사용할 수 있다.
- 컴포넌트는 기본적으로 DOM 노드를 노출하지 않는다. forwardRef와 두 번째 ref 인자를 특정 노드에 전달하는 것으로 선택적으로 노출할  수 있다.  예시 참고
- React가 관리하는 DOM 노드를 직접 바꾸려 하지 말기. 수정하려 한다면, React가 변경할 이유가 없는 부분만 수정하자.