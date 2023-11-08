//디바운스(debounce)와 쓰로틀(throttle)은 연속적인 이벤트 발생을 제어하는 기술

// 디바운스(debounce): 이벤트 핸들링이 발생될때마다 실행되는것이 아니라,
// 마지막에 한번만 실행되는것. 호출할때마다 타이머를 재설정하고(할때마다 다시 0으로 돌아감), 일정시간동안 아무 동작도 수행하지 않다가 마지막 호출 이후에 실행된다.
// 예를 들면, search 창에 글자를 입력할때마다 함수가 실행되는것이 아닌,
// delay 시간을 정해놓으면 그 delay 시간동안 기다렸다가 한번만 이벤트 실행

let timer;

function debounce(func, delay) {
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

const hello = (a, b) => {
  console.log("hello!!3");
  console.log(a + b);
};

const debounceFunc = debounce(hello, 3000);
debounceFunc(5, 3);
// 위의 debounce 함수에서 func.apply(this, arguments);
// 이부분의 arguments는 hello 함수에 전달된 arguments 를 뜻하는 것이기 때문에 이렇게 호출하면 된다.
