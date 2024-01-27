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
- 논리연산자 && 에서 falsy 한 값이 && 왼쪽에 있다면, falsy 한 값을 리턴합니다. (왼쪽에 있는 값 그 자체를 리턴)
0 && ‘A’   라면 0을 리턴

### 리스트 렌더링

자바스크립트 배열 메서드인 filter() 나 map() 등을 사용해 데이터 배열을 필터링하고 렌더링 할 수 있다.

```tsx
const numbers = [
  'first',
	'second',
	'third'
];
```

- map() 사용하기

이런 데이터가 담긴 배열을 map() 을 사용하여 리스트 렌더링 해준다.

```tsx
const listItems = numbers.map(num => <li>{num}</li>);

return (
	<ul>{listItems}</ul>
);
```

리스트 렌더링을 해주고 나서 return 문에 넣어주면

```tsx
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

이런 내용이 있는 리스트가 된다.

그러나 이런 경우에 이런 경고창이 뜬다.

> Warning: Each child in a list should have a unique “key” prop.
> 

** map()을 호출 시 개별 아이템마다 고유한 key값을 지정해줘야 한다.(문자열 또는 숫자)

```tsx
const listItems = numbers.map((num, idx) => <li key={idx}>{num}</li>);
```

이런식으로 개별요소의 index 값으로 key 값을 지정해주는것은 좋지않다. 배열이 삭제되고, 추가되는 등의 과정이 일어날때, index 값이 변하는 등의 일이 일어난다.

key를 잘 선택하면 React가 정확히 무슨 일이 일어났는지 추론하고 DOM 트리에 올바르게 업데이트 하는데 도움이 된다.

그래서, index값을 줄 요소가 없다면, 배열 안에 객체에 num와, index 를 추가하여 리스트 렌더링을 해주는 방법도 있다.

위의 예를 변경하면,

```tsx
const list = [
	{
		order: 'first',
		id: 1,
	},
	{
		order: 'second',
		id: 2,
	},
	{
		order: 'third',
		id: 3,
	},
];
```

이런 방식으로 배열을 만들어주고,

```tsx
const listItems = list.map(item => <li key={item.id}>{item.order}</li>);

return (
	<ul>{listItems}</ul>
);
```

이렇게 배열의 항목들을 렌더링 해주면 된다.

- filter() 사용하기

이 위의 예에서 order 가 third 가 아닌것만 filtering 해주고 싶다고 하면, 

```tsx
const listItems = list.filter(item => item.order !== 'third');
```

이렇게 해주면, list 배열에서 third 를 제외한 first, second 가 있는 목록만 뽑아 새로운 배열을 생성한다. 그것을 또 map 으로 렌더링 해주면 된다.

** 주의할점!

화살표 함수는 암시적으로 ⇒ 바로 뒤에 식을 반환하기 때문에 return 문이 필요하지 않다.  map, filter를 사용할때 화살표 함수 뒤에 오는 값들을 보면 그렇다.

그러나, ⇒ 뒤에 중괄호{} 가 오는 경우에는 return 을 넣어줘야한다. 

- key 를 가져오는곳:

데이터베이스의 데이터에서 고유한 key 를 가져오거나, 없다면,

crypto.randomUUID(), uuid 같은 패키지를 사용하여 key 생성할 수 있다.

** key 는 같은 형제간에 고유해야 한다. 다른 배열이면 상관없다. 

** key 는 변경되어서는 안된다. 렌더링중에 key를 생성하는 것은 하면 안된다. 

예: key= {crypto.randomUUID()} 이런식으로 하는것은 안된다. 컴포넌트에 key 속성이 있어도 이건 힌트로만 사용되고, prop으로 받는 것은 아니니 주의한다.

### 컴포넌트 순수하게 유지하기

컴포넌트를 순수함수로 작성하면 코드베이스가 커지더라도 예상밖의 동작이나 버그를 피할 수 있다. 

- 순수함수의 특징:
- **자신의 일에 집중합니다.** 함수가 호출되기 전에 존재했던 어떤 객체나 변수는 변경하지 않습니다.
- **같은 입력, 같은 출력** 같은 입력이 주어졌다면 순수함수는 같은 결과를 반환해야 합니다. (수학공식 처럼)

```tsx
function double(number) {
  return 2 * number;
}
// 같은 값을 넣었을때는 항상 같은 값을 반환한다. 
```

리액트는 모든 컴포넌트가 순수함수일것이라 가정한다.

컴포넌트 내에서 컴포넌트 바깥에 선언된 변수를  읽고 수정하는 일을 한다면, 순수함수가 아니게된다.

같은입력이면, 같은출력. 항상 유지하기

props, state, context 입력 요소는 항상 읽기전용으로 취급해야한다.

입력에 따라 무언가를 변경하는 경우, 변수를 직접 수정하지 않고 set State 를 활용해야한다. 

react에서 콘솔에 어떤 값을 출력했을때 두번 출력되는 경우가 있다. use strict 모드를 사용하기 때문인데, 함수를 두번 호출하므로써 순수함수인지 아닌지를 알게해준다. 두번 출력이 되도 같은 값이 나와야한다. strict mode 는 <React.StrictMode>로 최상위에서 감싸주면 사용가능하다.

- 사이드 이펙트:

리액트는 순수성에 크게 의존하지만, 어느 순간에는 무언가가 변경되어야 하는 부분이 있다. 사이드이펙트는 렌더링 도중이 아닌 사이드에서 발생한다. 사이드 이펙트는 주로 이벤트핸들러에 의해 발생한다. 렌더링 중에 일어나는 과정이 아니기 때문에 순수할 필요는 없다. 사이드 이펙트는 주로 이벤트 핸들러! onClick 등

사이드 이펙트에 적합한 이벤트 핸들러를 찾을 수 없는 경우에는 useEffect 를 사용할 수 있다. 그러나 이 방식은 최후의 수단이 되어야한다. (많이 사용하는것은 좋지않다.)

- 지역 변이(local mutation)

컴포넌트가 렌더링 되는 동안 기존의 변수를 변경하는 것을 말한다. 일반적으로 순수 함수는 함수 외부에서 생성된 변수나 객체를 변경하지 않기 때문에, 로컬 뮤테이션은 순수 함수의 원칙에 위배되는것이나, 이 예시에서는 컴포넌트 내부에서 cups 라는 빈 배열을 생성하고, for문을 통해 12개의 컵을 배열에 추가한다. 이렇게 생성된 변수와 객체를 변경하는 것은 문제가 되지 않는다. 왜냐하면 이 변경은 컴포넌트 내부에서만 일어나고, 외부에서는 알 수 없기 때문이다.

```tsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

### UI를 트리로 이해하기

트리는 요소와 UI 사이의 관계 모델. UI는 컴포넌트로 구성된 렌더 트리 구조를 사용하여 표현된다.

- 렌더트리: 
렌더링된 컴포넌트로 구성된 UI 트리
UI트리는 DOM 을 렌더링 하는데 사용된다.
컴포넌트의 중첩이 부모, 자식 컴포넌트의 렌더트리를 표현한다.
트리는 노드로 구성되어있으며, 각 노드는 컴포넌트를 나타낸다.
    - 컴포넌트 자체를 조건부 렌더링을 해줄수도있다.(다른 prop 값으로 다른 자식 컴포넌트를 렌더링 할 수 있다)
    - 루트컴포넌트: 최상의 컴포넌트. 가장복잡성이 높다. 그 아래의 모든 컴포넌트의 렌더링 성능에 영향을 미친다. 
    리프 컴포넌트: 트리의 맨 아래에 있고, 자주 다시 렌더링된다.

- 모듈 의존성 트리:
의존성 트리는 React 앱의 모듈 의존성을 나타낸다.
컴포넌트를 분리하고 로직을 별도의 파일로 분리하면 컴포넌트, 함수 또는 상수를 내보내는 JS 모듈을 만들 수 있다.
모듈 의존성 트리의 각 노드는 모듈이다.
의존성 트리는 앱을 배포하기 위해 필요한 코드를 번들로 묶는 데 빌드 도구에서 사용된다.
모듈 의존성 트리를 파악하면 앱의 번들 크기 문제가 일어났을 때, 디버깅하는데 도움이 될 수 있다.(최적화에 도움)
import 하는것까지 모두 포함. 
렌더링 지연 됐을때, 디버깅 할때 도움을 준다.
의존성 트리는 빌드를 할떄 모듈을 만드는것. 예를 들어 import 한것들을 다 모아서 ?
렌더링이 느릴때! 도움을 준다. 빌드를 할때마다 사용이 되는데, 너무 느릴때, 번들 파일을 분석해서
트리 쉐이킹(쓰는것만 빌드에 포함시키는것)