# < UI 표현하기 > (React 공식문서 스터디)

- React 는 UI를 렌더링 하기 위한 자바스크립트 라이브러리.

### 첫 번째 컴포넌트

- 컴포넌트 정의하기
  - react 컴포넌트는 이름을 꼭 대문자로 시작해야한다.
  - return 구문에 html 마크업을 삽입할 수 있다. (마크업이 모두 return 키워드와 같은 라인에 있지 않은 경우에는, 괄호로 꼭 감싸줘야한다.)
- 컴포넌트 사용하기

  - 컴포넌트는 return 구문에 중첩하여 사용 가능
  - 그러나 정의를 중첩하여 사용은 안된다.

  ```jsx
  // 이렇게는 컴포넌트를 중첩해서 정의하는것은 안된다.
  export default function Gallery() {
    // Never define a component inside another component!
    function Profile() {
      // ...
    }
    // ...
  }

  // 에러는 안나고 경고도 안뜬다. 그래도 이렇게는 쓰지 말아라.
  //이 예제를 예로 들면
  // Gallery는 1회 렌더링 이후 라이프사이클에 따라 재랜더링이 이루어진다. Profile은 Gallery가 렌더링이 될때마다 계속 렌더링이된다. 그렇게 되면 메모리 사용량이 증가하고, 훅으로 사용할 경우 상태값을 잃어버릴 위험도 있다.
  // 해결방안: 컴포넌트 나누기(전역으로 설정). 값 전달이 필요할 경우 child에 props로 전달한다. 아래의 예제 참고
  export default function Gallery() {
    // ...
  }

  function Profile() {
    // ...
  }
  ```

### **컴포넌트 import 및 export 하기**

- 컴포넌트의 가장 큰 장점: 재사용성.
- 컴포넌트를 import 할때 import Gallery from './Gallery';
  이렇게 `'./Gallery.js'` 또는 `'./Gallery'` 식으로 둘다 사용 가능.
- export default 접두사는 다른 파일에서 이 컴포넌트를 가져올수 있게한다. 근데, 한 파일에서 export default는 한번만 가능. 나머지는 그냥 named export(export 만 써주는 방식)로 여러번 사용가능.
- export default 로 한 것은
  import Button from './Button.js';
  import ButtonComponent from './Button.js';
  와 같이 다른 이름으로 정의해서 가져올 수 있다.
- named export 로 한것은,
  import { Button } from './Button.js';
  반드시 이렇게 원래의 컴포넌트 이름으로 가지고와야하고, 중괄호로 감싸야 한다.
- 함수 선언문은 export default 를 바로 앞에 붙일 수 있다.

```javascript
export default function Button() {}
```

- 함수 표현식은 이런식으로 작성 해줘야한다.

```javascript
const Button = () => {};

export default Button;
// export default 와 함께 바 사용할 수  없는 이유는 js의 호이스팅과 관련이 있다.
```

### JSX로 마크업 작성하기

- JSX와 React는 서로 다른 별개의 개념.
  js 라이브러리인 react 에 JSX 문법을 쓸 수있다는것.
- 규칙:

1. 반환할때는 하나의 부모태그로 감싸주기.
   : fragment(<></>) 등으로 감싸기
2. 모든 태그는 닫아준다.
<img /> : 자체적으로 닫음
<div></div> : 래핑 형태
3. JSX 에서 작성되는 어트리뷰트(속성)은 대부분 camel case 로 작성된다.
   className 등.

- html → JSX 로 자동으로 변환해주는 변환기도 있다. [변환기(html-to-jsx)](https://transform.tools/html-to-jsx)

### \***\*중괄호가 있는 JSX 안에서 자바스크립트 사용하기\*\***

- 반환되는 JSX 구문 안에서 {} 중괄호를 사용하여 javascript를 사용할 수 있다.
- 아래의 예와 같이, 중괄호 안에 js 함수를 호출하여 사용 할 수도있다.

```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export default function TodoList() {
  return <h1>To Do List for {formatDate(today)}</h1>;
}
```

- 중괄호는

1. JSX 태그 안의 문자: <h1>{name}'s To Do List</h1>
2. 태그 안에 쓰이는 어트리뷰트 <img src={imgUrl}/>
이 두가지 방법으로 쓰일 수 있다.
<ul style={{
backgroundColor: 'black',
color: 'pink'
}}>
이렇게 객체를 전달할 수도 있음.
인라인 style 프로퍼티는 camel  case 로 작성한다.backgroundColor 이런식

### \***\*컴포넌트에 props 전달하기\*\***

- 모든 부모 컴포넌트는 몇몇의 정보를 자식 컴포넌트에게 전달할 수 있다.
- props를 전달하려면 HTML 어트리뷰트를 사용할 때와 마찬가지로 JSX에 props를 추가하면 된다.
- props 를 구조분해할당하여 {} 중괄호 안에 개별적으로 빼서 사용할 수 있다.

```jsx
function Avatar(props) {
  // ...
}
// 이렇게도 사용하지만

function Avatar({ person, size = 100 }) {
  // ...
}
//구조분해할당 하여 사용할수도 있다.
```

- 위의 예시와 같이 props를 구조분해 할당하였고, size에 기본값을 지정해주었다. <Avatar> 컴포넌트에 size prop 이 없이 렌더링 된다면 기본값으로 설정된다.
  size prop이 없거나 size={undefined} 로 전달될 때 기본값이 사용되고, size={null} 또는 size={0} 으로 전달된다면, 기본값은 사용되지 **않는다**.
- spread 문법으로 props 전달하기
      ```jsx
      function Profile({ person, size, isSepia, thickBorder }) {
        return (
          <div className="card">
            <Avatar
              person={person}
              size={size}
              isSepia={isSepia}
              thickBorder={thickBorder}
            />
          </div>
        );
      }
      //이렇게 props 가 너무 많아지면
      function Profile(props) {
        return (
          <div className="card">
            <Avatar {...props} />
          </div>
        );
      }
      // 이렇게 spread 문법(전개연산자)으로 넣어주는 방식도 있다. but 이렇게 쓰는 습관은 별로 좋지않다.
  // 가능하면 위의 방법이 더 좋다. {...props} 하지말자!!
  ```
- Props는 읽기 전용 스냅샷으로, 렌더링 할 때마다 새로운 버전의 props를 받는다.
- 자식 컴포넌트에서 받은 Props는 변경할 수 없다. 상호작용이 필요한 경우 state 설정.
- 리스트를 렌더링 해줄때, 예를들면 map 메서드를 사용하는 경우에 key 값을 사용해야하는데, key 값을 사용할때는 규칙이있다.

1. key는 형제간에 고유해야한다.
2. key는 변경되어서는 안된다. 이다.
   그리고, 주의할점은
3. 배열항목의 index를 key 로 사용하면 안된다.
4. key={Math.random()} 처럼 즉석에서 key 를 생성하면 안된다. 이렇게 하면 계속 새로운 키가 생성되고, 모든 컴포넌트와 DOM이 다시 생성될 수 있다. 그리고 컴포넌트는 key 를 prop으로 받지 않는다.

### 조건부 렌더링

- JSX에 조건부 렌더링을 포함시킬 수 있다.
  ```jsx
  function Item({ name, isPacked }) {
    return (
      <li className="item">
        {name} {isPacked && "✔"}
      </li>
    );
  }
  // 이런식으로 논리연산자(&&) 를 사용할 수 있고, 삼항연산자(조건 ? : )를 사용할수도있다.
  ```
- 삼항연산자: {cond ? <A /> : <B />}는 *“cond이면 <A />를 렌더링하고, 그렇지 않으면 <B />를 렌더링합니다.”* 를 의미
- 논리연산자(&&):{cond && <A />}는 *“cond이면, <A />를 렌더링하되, 그렇지 않으면 아무것도 렌더링하지 않습니다.”* 를 의미
- && 의 왼쪽에 숫자를 두면 안된다.
  messageCount && <p>New messages</p>
  의 경우에 메시지 카운트가 0일 때 아무것도 렌더링하지 않는다고 쉽게 추측할 수 있지만, 실제로는 0 자체를 렌더링하게된다. 이 문제를 해결하려면 messageCount > 0 && <p>New messages</p>
  처럼 왼쪽을 boolean으로 만들면 된다.
- 논리연산자, 삼항연산자, if문과 변수 사용하기 로 조건부 렌더링 해줄 수 있다.
