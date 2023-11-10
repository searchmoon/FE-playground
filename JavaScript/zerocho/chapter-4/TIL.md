# 고차함수

```javascript
const onClickNumber = (num) => {
  if (operator) {
    numTwo += num;
  } else {
    numOne += num;
  }
  $result.value += num;
};

document.querySelector("#num-0").addEventListener("click", onClickNumber("0"));
```

중복 코드를 줄여주기 위해 num 이라는 파라미터에 인자를 받는 함수를 만들어주었다.
근데 이상태면, onClickNumber 함수가 리턴하는 값이 없기 때문에, 이 함수는 마지막에 undefined를 리턴한다.
(함수는 리턴값이 따로 없다면, 항상 undefined를 리턴한다)

```javascript
document.querySelector("#num-0").addEventListener("click", undefined);
```

이렇게 함수의 자리에 undefined 를 전달하는 격이된다.
이벤트 리스너에 전달되는 콜백 함수에는 반드시!! 리턴값이 있어야 한다. 꼭 기억하기

```javascript
const onClickNumber = (num) => {
  if (operator) {
    numTwo += num;
  } else {
    numOne += num;
  }
  $result.value += num;
  return () => {};
};

document.querySelector("#num-0").addEventListener("click", onClickNumber("0"));
```

이렇게 return 에 함수를 넣어준다.
근데 이 이벤트가 실행이 되면, 결국 함수를 실행하지만 함수에는 값이 없다.그래서

```javascript
const onClickNumber = (num) => {
  return () => {
    if (operator) {
      numTwo += num;
    } else {
      numOne += num;
    }
    $result.value += num;
  };
};

document.querySelector("#num-0").addEventListener("click", onClickNumber("0"));
```

이렇게 return 안의 함수에 실제 동작을 넣어줘야한다.
이 로직은 이렇게 생략 가능하다.

```javascript
const onClickNumber = (num) => () => {
  if (operator) {
    numTwo += num;
  } else {
    numOne += num;
  }
  $result.value += num;
};

document.querySelector("#num-0").addEventListener("click", onClickNumber("0"));
```

줄을 합쳐주어 return 을 생략해 주었다.(화살표함수에서 중괄호와 return 이 있다면 생략가능)
함수가 함수를 리턴하는 상태인 고차함수(high order function)이다.
함수간의 중복을 제거하기 위해 고차함수를 쓴다.

p.216 참고

### 고차함수의 예시

```javascript
const func = (msg) => {
  return () => {
    console.log(msg);
  };
};
//return 을 생략한것
const func = (msg) => () => {
  console.log(msg);
};

const msgFunc = func("hello");
msgFunc(); // hello
```

# 중첩되는 if문 제거하는 법

1. 공통된 절차를 각 분기점 내부에 넣는다.(if문 다음에 나오는것만... if문 전에 나오는 것은 넣을 필요없다.)
2. 분기점에서 짧은 절차부터 실행하게 if문을 작성한다.
3. 짧은 절차가 끝나면 return(함수 내부의 경우)이나 break(for문 내부의 경우)로 중단한다.
4. else 를 제거한다(이때 중첩 하나가 제거된다).

```javascript
const onClickNumber = (e) => {
  const num = Number(e.target.textContent);
  if (operator) {
    if (!numTwo) {
      $result.value = "";
    }
    numTwo += num;
  } else {
    numOne += num;
  }
  $result.value += num; // 1. 공통된 절차
};
```

1번 방법 실행

```javascript
const onClickNumber = (e) => {
  const num = Number(e.target.textContent);
  if (operator) {
    //비어있다.
    if (!numTwo) {
      $result.value = "";
    }
    numTwo += num;
    $result.value += num; // 1. 공통된 절차
  } else {
    //비어있지 않다.
    numOne += num;
    $result.value += num; // 1. 공통된 절차
  }
};
```

2번 방법 실행

둘중에 else 문에 들어있는게 더 짧다. 위치 바꿔준다.
위치를 바꿔줄때는 if문의 조건을 반대로. operator => !operator

```javascript
const onClickNumber = (e) => {
  const num = Number(e.target.textContent);
  if (!operator) {
    //비어있지 않다.
    numOne += num;
    $result.value += num;
  } else {
    //비어있다.
    if (!numTwo) {
      $result.value = "";
    }
    numTwo += num;
    $result.value += num;
  }
};
```

3번 방법 실행
짧은 절차가 끝나면 return 넣기.

```javascript
const onClickNumber = (e) => {
  const num = Number(e.target.textContent);
  if (!operator) {
    //비어있지 않다.
    numOne += num;
    $result.value += num;
    return;
  }
  if (!numTwo) {
    $result.value = "";
  }
  numTwo += num;
  $result.value += num;
};
```

상위의 짧은 절차가 끝날때 return 을 넣어주고, 그 다음의 else를 지워주었다.(4번까지 완료)

연습

```javascript
function test() {
  let result = "";
  if (a) {
    if (!b) {
      result = "c";
    }
  } else {
    result = "a";
  }
  retult += "b";
  return result;
}
```

1,2,3,4 순차적으로 실행해보기.

1번. 공통된 부분 분기점 내에 넣기

```javascript
function test() {
  let result = "";
  if (a) {
    if (!b) {
      result = "c";
    }
    retult += "b";
    return result;
  } else {
    result = "a";
    retult += "b";
    return result;
  }
}
```

2번. 짧은 코드를 위로, 3번 짧은 코드가 실행되고 나면 return, 4번. else 제거

```javascript
function test() {
  let result = "";

  if (!a) {
    result = "a";
    retult += "b";
    return result;
  }
  if (!b) {
    result = "c";
  }
  retult += "b";
  return result;
}
```

여기서 조금 더 깔끔하게 하려면,
retult += "b";
return result;
이부분이 중복이 되는게 신경쓰이니까

```javascript
function test() {
  let result = "";

  if (!a) {
    result = "a";
  } else if (!b) {
    result = "c";
  }
  retult += "b";
  return result;
}
```

이렇게 바꿔주면 더 좋다.
