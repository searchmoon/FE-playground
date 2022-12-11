
const example = (x) => {
  const sum2 = sumSquare();
  return Math.sqrt(sum2); // Math.sqrt(x) -> x의 제곱근

  const sumSquare = () => {
    sum = 0;
    for(let i = 0; i < x.length; i++) {
      sum += x[i] * x[i];
    }
    return sum;
  }
}

const a = [2, 1, 3, 5, 7];

const n = example(a);
//example 이라는 함수에 a라는 인자를 넣었고, 변수 n에 할당했어.
//그러면, x라는 매개변수에 [2, 1, 3, 5, 7] 이 들어가는거야.

// 2 * 2
// 1 * 1
// 3 * 3
// 5 * 5
// 7 * 7
// 하고 다 더해준다음에 제곱근이 나오는겨. 이 sum이 리턴이 되자나?
// 이 sum이 sum2에 할당이 되고, Math.sqrt(sum) 이렇게 대입이 돼서 제곱근이 나오는거야
// 4 + 1 + 9 + 25 + 49 = 88 의 제곱근이 9.3정도가 나오는거야

console.log(n) // -> 9.38083151964686
