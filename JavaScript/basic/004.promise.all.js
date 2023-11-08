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



