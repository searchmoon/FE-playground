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

# Effect로 동기화하기

**Effect**는 렌더링 자체에 의해 발생하는 부수 효과를 특정하는 것. 특정 이벤트가 아닌 렌더링에 의해 직접 발생한다. 

### Effect 적절한 곳에 쓰기

컴포넌트에 Effect 를 무작정 추가하면 안된다. 주로 react 코드를 벗어난 특정 외부시스템과 동기화 하기 위해 사용된다. 브라우저 API, 써드파티 위젯, 네트워크 등을 포함한다.  단순히 다른 상태에 기반하여 일부 상태를 조정하는 경우에는 Effect 가 필요하지 않을 수 있다.

### Effect 작성하는 법

```jsx
useEffect(() => {
	// 로직. 만약 이 코드가 count에 의존한다면 아래처럼 의존성(dependencies) 배열에 count 추가
	// 이곳의 코드는 모든 렌더링 후에 실행
}, [count])
```

- 기본적으로 Effect 는 모든 렌더링 후에 실행된다.
- 대부분의 Effect 는 모든 렌더링 후가 아닌 필요할때만 다시 실행되어야한다. 의존성을 지정하여 이걸 제어할 수 있다.
- 일부 Effect 는 수행중이던 작업을 중지, 취소등을 해야할수도 있다. cleanup 함수 를 반환하여서 그런 동작들이 가능하다.

컴포넌트가 렌더링 될 때마다 React는 화면을 업데이트한 이후에 useEffect 내부의 코드를 실행합니다. 다시 말해, useEffect는 화면에 렌더링이 반영될 때까지 코드 실행을 지연 시킨다.

Effect는 일반적으로 컴포넌트를 *외부* 시스템과 동기화하는 데 사용된다. 외부 시스템이 없고 다른 상태에 기반하여 상태를 조정하려는 경우에는 Effect가 필요하지 않을 수 있다는것을 기억해라.

### 1단계: Effect 선언하기

### **2단계: Effect의 의존성 지정하기**

```jsx
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('video.play() 호출');
      ref.current.play();
    } else {
      console.log('video.pause() 호출');
      ref.current.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '일시 정지' : '재생'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

위의 예시 코드에서 useEffect 가 감싸고 있는 내부의 코드를 살펴보면, 
ref.current.play(), ref.current.pause() 등을 사용하고 있고, useEffect 를 사용해주지 않으면, 렌더링중에 호출하려고 시도할 수 있다. 그래서 useEffect 로 감싸줘야 하고, isPlaying을 의존성 배열에 추가해야한다. 그렇지 않으면 lint 에러가 발생한다. 
저 예시에서 의존성 배열로 [isPlaying]을 지정하면 React에게 이전 렌더링 중에 isPlaying이 이전과 동일하다면 Effect를 다시 실행하지 않도록 해야 한다고 알려준다. 이 변경으로 입력란에 입력을 입력하면 Effect가 다시 실행되지 않고, 재생/일시 정지 버튼을 누르면 Effect가 실행된다.

```jsx
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
});
```

이런 코드는 무한루프를 만들어낸다. useEffect 실행, state 변경, useEffect 실행, state 변경….

### 왜 ref는 의존성 배열에서 생략해도 될까?

```jsx
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);
```

이 코드에서 보면 ref 는 의존성 배열에 들어가 있지않다.

이유는 ref 객체는 stable identity 를 가지기 때문. react는 동일한 useRef 호출에서 항상 같은 객체를 얻을 수 있음을 보장한다. 이 객체는 절대 변경되지 않기 때문에 자체적으로 Effect 를 다시 실행시키지않는다. useState로 반환되는 set 함수들도 의존성에서 생략되는 것을 볼 수 있다.

### 3단계: 필요하다면 클린업을 추가하기

```jsx
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []);
  return <h1>채팅에 오신걸 환영합니다!</h1>;
}

export function createConnection() {
  // 실제 구현은 정말로 채팅 서버에 연결하는 것이 되어야 합니다.
  return {
    connect() {
      console.log('연결 중...');
    },
    disconnect() {
      console.log('연결이 끊겼습니다.');
    }
  };
}
```

이렇게 밑줄그은 부분을 추가해주었다. 클린업 함수.

connect가 실행이 되고, 컴포넌트를 이동을 했을때 컴포넌트가 언마운트 되었을때에도 연결중…. 이후에 끊는 동작을 하지 않고, 다른 페이지를 왔다가 돌아온다면, 연결중…. 이 하나가 더 출력된다. 그런 문제가 발생하기 때문에 disconnect 로 클린업 함수를 추가해주는것이다.

### 개발 중에 Effect가 두번 실행되는 경우를 다루는 방법

: 클린업 함수를 구현하는것

클린업 함수는 Effect 가 수행하던 작업을 중단하거나 되돌리는 역할을 한다.

```jsx
// 1번 예제
useEffect(() => {
  console.log('useEffect executed');

  const timerId = setInterval(() => {
    setCount(prevCount => prevCount + 1);
  }, 1000);

  return () => {
    console.log('Cleanup function executed');
    clearInterval(timerId); // 타이머 제거
  };
}, []);
```

이런식으로 타이머를 제거하거나 이전에 설정한 이벤트 리스너등을 제거하는 등의 작업을 수행한다.

```jsx
// 2번 예제
useEffect(() => {
  console.log('API call initiated');

  const source = axios.CancelToken.source(); // 취소 토큰 생성

  axios.get('https://api.example.com/data', {
    cancelToken: source.token // 요청에 취소 토큰 추가
  })
  .then(response => {
    console.log('API call completed');
    setData(response.data);
  })
  .catch(error => {
    console.error('API call failed:', error.message);
  });

  // 클린업 함수: 컴포넌트가 언마운트되거나 업데이트될 때 실행됨
  return () => {
    console.log('Cleanup function executed');
    source.cancel('API call cancelled'); // API 요청 취소
  };
}, []); // 의존성 배열이 빈 배열이므로 컴포넌트가 마운트될 때 한 번만 실행됨
```

클린업 함수를 사용해서 메모리 누수를 방지하고 불필요한 리소스 사용을 최소화 할 수 있다.

### **Effect에서 데이터를 가져오는 좋은 대안**

useEffect 에서 fetch 호출을 작성하는것은 매우 수동적인 접근 방식이며 중요한 단점이 있다. 

- Effect 안에서 직접 가져오는것은 일반적으로 데이터를 미리 로드하거나 캐시하지 않음을 의미하므로 컴포넌트가 언마운트되고 다시 마운트가 되면 데이터를 다시 가져와야한다.
- 초기 서버 렌더링 시에 데이터가 없는 로딩 상태가 발생한다.
- 네트워크 폭포가 발생할 수 있어 성능이 저하될 수 있다.

대안:

- useEffect 안에서 데이터를 가져온 후에 useState를 사용하여 가져온 데이터를 저장하고, 저장된 데이터를 사용하여 컴포넌트를 렌더링하는 방식을 사용할 수 있다. 이 방식은 데이터를 캐시하여 컴포넌트가 다시 마운트될 때마다 데이터를 다시 가져오는 것을 방지할 수 있다.
- 상태관리 라이브러리로 데이터를 관리하는 방식 사용하기. 데이터의 상태를 전역적으로 관리할 수 있어 여러 컴포넌트에서 데이터 공유를 쉽게 할 수 있다.
- useQuery 를 사용하여 데이터 패칭을 효율적으로 하고, 데이터 캐싱, 로딩상태 관리(isLoading), 에러처리(isError, error), 마운트 이후에 데이터 가져오기 등을 통해 데이터 관리를 효율적으로 할 수 있다.

useQuery 나 useEffect 를 사용하지 않고도 데이터를 캐싱하는 방법:

- 커스텀 훅을 활용한 데이터 캐싱: 커스텀 훅을 사용하여 데이터를 가져올 수 있다.
- Context API 를 활용한 전역 상태관리
- 상태관리 라이브러리를 사용한 데이터관리
- 로컬스토리지, 세션 스토리지를 활용한 데이터 저장

### 요약

- 이벤트와 달리 Effect는 특정 상호작용이 아닌 렌더링 자체에 의해 발생
- Effect를 사용하면 컴포넌트를 외부 시스템(타사 API, 네트워크 등)과 동기화할 수 있다.
- 기본적으로 Effect는 모든 렌더링(초기 렌더링 포함) 후에 실행
- React는 모든 의존성이 마지막 렌더링과 동일한 값을 가지면 Effect를 건너뜁니다.
- 의존성을 “선택”하는것이 아님. 의존성은 Effect 내부의 코드에 의해 결정된다.(리액트가 기대하는 것과 일치하지 않으면 린트에러 발생)
- 빈 의존성 배열([])은 컴포넌트 “마운팅”(화면에 추가됨)을 의미한다. 마운트 될때만 실행(컴포넌트가 나타날 때)
- Strict Mode에서 React는 컴포넌트를 두 번 마운트한다.(개발 환경에서만!) 이는 Effect의 스트레스 테스트를 위한 것
- Effect가 다시 마운트로 인해 중단된 경우 클린업 함수를 구현해야 한다.
- React는 Effect가 다음에 실행되기 전에 정리 함수를 호출하며, 언마운트 중에도 호출한다.


# **Effect 의존성 제거하기**

state나 props가 useEffect 에서 사용된다면 의존성을 넣어줘야한다.

```jsx

function ChatRoom({ roomId }) { // This is a reactive value
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // This Effect reads that reactive value
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ So you must specify that reactive value as a dependency of your Effect
  // ...
}
```

이런 코드가 있다고 할때, 의존성을 제거하려면 해당 컴포넌트가 의존성이 될 필요가 없다는것을 린터에 증명해야한다.
roomId 의존성을 제거하려면 저 roomId를 컴포넌트 밖으로 이동시켜서 반응형 값이 아니고, 재렌더링 시에도 변경되지 않음을 증명할 수 있다.

의존성 목록은:  ‘effect 의 코드에서 사용하는 모든 반응형 값의 목록’ 이라고 할 수 있다.

 // eslint-ignore-next-line react-hooks/exhaustive-deps

이것은 린터를 제거(무시) 하는 코드인데, 이것은 쓰지 않는것이 좋다.

### 불필요한 의존성 제거하기

이 코드가 useEffect 가 필요한 코드인지 살펴보고, 이벤트 핸들러로 동작할 수 있는지 살펴봐야한다. 이런코드라면,

```jsx
function Form() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      // 🔴 Avoid: Event-specific logic inside an Effect
      post('/api/register');
      showNotification('Successfully registered!');
    }
  }, [submitted]);

  function handleSubmit() {
    setSubmitted(true);
  }

  // ...
}
```

이렇게 바꿔준다.
이것은 애초에 Effect 가 아니어야 했기 때문에. 특정 상호작용에 대한 응답으로 일부 코드를 실행하려면 해당 로직을 해당 이벤트 핸들러에 직접 넣어야한다.

```jsx
function Form() {
  const theme = useContext(ThemeContext);

  function handleSubmit() {
    // ✅ Good: Event-specific logic is called from event handlers
    post('/api/register');
    showNotification('Successfully registered!', theme);
  }  

  // ...
}
```

이렇게 바꿔주고 나면, 사용자가 폼을 제출할 때만 실행된다.

### Effect 가 관련없는 여러가지 작업을 한곳에서 수행하지 않게 하기.

이 코드 예시를 보면, country의 props에 따라 cities State를 네트워크와 동기화한다. city의 변경사항이 발생했을때 또 fetch 를 하니까 불필요하게 useEffect 가 다시 실행되어 fetch를 두번 하는 경우가 발생하기 때문에 이런 로직은 분리를 해주는 것이 좋다.

```jsx
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    // 🔴 Avoid: A single Effect synchronizes two independent processes
    if (city) {
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [country, city]); // ✅ All dependencies declared

  // ...
```

이런식으로 로직을 useEffect 두개로 나눠준다.

```jsx
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
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
  }, [country]); // ✅ All dependencies declared

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
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
  }, [city]); // ✅ All dependencies declared

  // ...
```

이렇게 나눠주면, 두 개의 개별 Effect에는 두 개의 개별 의존성 목록이 있으므로 의도치 않게 서로를 트리거하지 않는다.

### 다음 State를 계산하기 위해 어떤 State를 읽고 있나요?

이 예시는 새 메시지가 도착할 때마다 새로 생성된 배열로 messages State 변수를 업데이트한다.

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId, messages]); // ✅ All dependencies declared
  // ...
```

위와 같이 messages는 effect 에서 읽는 반응형 값이므로 의존성에 넣어줘야한다.

그렇게 하면 채팅의 메세지를 수신할때마다 messages 의 값이 바뀌는 것이기 때문에 재렌더링을 하도록 하기 때문에 useEffect 도 다시 동기화된다. 
이 문제를 해결하려면 messages 를 의존성으로 추가하지 않는것인데 그렇게 하려면,
 setMessages(msg ⇒ [...msg, receivedMessage]);
이런식으로 업데이터 함수를 전달하면 된다. 의존성에 있던 messages를 빼주면된다.

Effect에서 반응해서는 안되는 로직을 추출하려면 비반응 로직을 Effect 이벤트로 옮기면된다.

그 기능은 → useEffectEvent. 곧 나올거란다.

```jsx
const onMessage = useEffectEvent(receivedMessage => {
  onReceiveMessage(receivedMessage);
});
```

receivedMessage가 의존성이기 때문에 부모가 재랜더링될때마다 effect가 다시 동기화된다. 그것을 해결하려면 useEffectEvent 로 감싸고, Effect의 로직에서 바깥으로 꺼내준다.

### 일부 반응형 값이 의도치 않게 변경될때

Effect가 특정 값에 ‘반응’하기를 원하지만, 그 값이 원하는 것보다 더 자주 변경되어 사용자의 관점에서 실제 변경 사항을 반영하지 못할 수도 있다. 예를 들어 컴포넌트 본문에 options 라는 객체를 생성한 다음 Effect 내부에서 해당 객체를 읽는다고 가정해 본다.

```jsx
function ChatRoom({ roomId }) {
  // ...
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };
 useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ All dependencies declared
  // ...
```

이 객체는 컴포넌트 본문에서 선언되므로 [반응형 값](https://ko.react.dev/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values)이다. 이런 경우에는 options을 의존성으로 넣어주게된다.

이 아래 코드의에서의 동작을 보면, input의 message state 변수만 업데이트 해야한다. 그러나, message 를 업데이트 할때마다 컴포넌트가 재렌더링된다. 이런 의도치 않은 동작을 막기위해서는 저 options 객체를 컴포넌트의 바깥으로 빼주고, useEffect의 의존성에서 제거해주면된다. (1번을 2번 자리로 이동). 객체가 아닌 함수라도 똑같이 적용하면 된다.

```jsx

import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

//2번. options 여기로 이동
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // Temporarily disable the linter to demonstrate the problem
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  }; //1번. 여기서

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

### **Effect 내에서 동적 객체 및 함수 이동**

이 아래의 예시에서는, options라는 객체가 roomId props처럼 재렌더링의 결과로 변경될 수 있는 반응형 값에 의존하는 경우, 컴포넌트 외부로 끌어낼 수 없다. 하지만 Effect의 코드 *내부*로 이동시킬 수는 있다.

```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

options 객체가 effect 내부에서 선언되었으므로 더이상 effect의 의존성이 아니다. 대신 그 안의 roomId 는 의존성으로 넣어줘야한다. 외부에서 온 값이기때문에

이 아래의 예시는 useEffect 안에서 로직을 그룹화 하기 위해 함수를 작성해준것인데,이렇게 해주면 의존성에 넣어주지 않아도 된다. Effect의 내부에서 선언한것이기 때문에.

```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

### 객체에서 원시 값 읽기

```jsx
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ All dependencies declared
  // ...
```

```jsx
<ChatRoom
  roomId={roomId}
  options={{
    serverUrl: serverUrl,
    roomId: roomId
  }}
/>
```

이 예시는 가끔 props에서 객체를 받을 수도 있을때, 렌더링 중에 부모 컴포넌트가 객체를 생성한다는 점이 위험하다.
그래서 이 코드를 이렇게 바꿔주면 되는데, 

```jsx
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
  // ...
```

이렇게 객체에서 정보를 빼서, 의존성에 넣어주고 createConnection(options) 이렇게 객체 자체를 넣어주는것을 바꿔준다. 이렇게 하면 전 코드와 달리, 부모컴포넌트에 의해 의도치않게 객체가 다시 생성된 경우 채팅이 다시 연결되지 않는다.

### 함수에서 원시값 계산

함수에서도 위와 동일하게 해주면 된다.

```jsx
<ChatRoom
  roomId={roomId}
  getOptions={() => {
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }}
/>
```

이렇게 함수를 전달해주는 경우에도, 이 함수 자체를 useEffect에 넣어줘서 의존성에 포함시키지 않고,

```jsx
function ChatRoom({ getOptions }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = getOptions();
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
  // ...

```

이렇게 빼주면 된다.

함수가 이벤트 핸들러이지만 변경 사항으로 인해 Effect가 다시 동기화되는 것을 원하지 않는 경우, useEffectEvent 로 감싸기( 아직 안나옴. 개발중)

### 요약:

- 의존성은 항상 코드와 일치해야한다.
- 의존성이 마음에 들지 않다면 코드 수정하기.
- 린터 제거하지 말기. 버그 발생 위험.
- 의존성을 제거하려면 린터에게 증명해야함.
- 특정 상호작용에 대한 응답으로 일부 코드가 실행되어야 하는 경우에는: 해당코드 이벤트핸들러로 이동하기.
- 하나의 Effect는 관련없는 여러가지 작업을 수행하게 하지 말기.
- 이전 State를 기반으로 일부 State를 업데이트하려면 업데이터 함수를 전달하기.
- 객체와 함수 그자체의 의존성 피하기. 컴포넌트 외부나 Effect 내부로 이동하기.