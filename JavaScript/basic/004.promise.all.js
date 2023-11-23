// promise.all, race 예제

function timer(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

console.time("Promise.all");
Promise.all([timer(1000), timer(2000), timer(3000)]).then(function (result) {
  console.log("result", result);
  console.timeEnd("Promise.all");
});

// result [ 1000, 2000, 3000 ]
// Promise.all: 3.008s
// Promise.all은 모든 함수가 실행되고난 후에 resolve 를 반환한다.

console.time("Promise.race");
Promise.race([timer(1000), timer(2000), timer(3000)]).then(function (result) {
  console.log("result", result);
  console.timeEnd("Promise.race");
});

// result 1000
// Promise.race: 1.003s
// Promise.race는 저 중에서 가장 빨리 끝나는 함수가 실행되고난 후에 resolve 를 반환한다.

//요즘엔 promise.all 말고
//allSettled 쓴다
//promise.all은 하나라도 실패하면 catch 로 간다. 근데
// allSettled는 실패한것만 추려낼 수 있다. 
// Promise.all()이 반환한 프로미스는 서로 연관된 작업을 수행하거나, 하나라도 거부 당했을 때 즉시 거부하고 싶을 때 적합
