// async - await 예제
// async 가 붙은 함수는 반드시 프라미스를 반환한다.

async function func() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000);
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림. 기다렸다가 그 다음거가 실행된다.

  console.log(result); // "완료!" // 가 1초 뒤에 출력이 된다.
}

func();

// await 는 promise.then 보다 조금 더 간단하게 프라미스의 result 값을 얻게 해준다.