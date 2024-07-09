// 정리정돈
// 8 3 // 첫째줄 8:배열의 크기인 n, 3:k가 일한 횟수인 m
// 1 7 6 8 1 6 4 5 // 배열에 포함된 정수 순서대로 입력
// // 3개(m)개의 줄에 걸쳐 k씨가 고른 범위인 정수 i, j와 정수 k
// // i,j,k 순
// 1 5 3
// 2 6 2
// 4 8 3

// js 풀이
function solution(n, m, arr, queries) {
  const results = [];

  for (let q = 0; q < m; q++) {
    const [i, j, k] = queries[q];
    const subArray = arr.slice(i - 1, j);

    subArray.sort((a, b) => a - b);
    results.push(subArray[k - 1]);
  }

  return results;
}

// 테스트 실행
const n = 8;
const m = 3;
const arr = [1, 7, 6, 8, 1, 6, 4, 5];
const queries = [
  [1, 5, 3],
  [2, 6, 2],
  [4, 8, 3],
];

const results = solution(n, m, arr, queries);
results.forEach((result) => console.log(result));

// 파이썬 풀이
// def solution():

//     n, m = map(int, input().split())
//     arr = list(map(int, input().split()))

//     for _ in range(m):
//         i, j, k = map(int, input().split())
//         sub_array = arr[i-1:j]
//         sub_array.sort()
//         print(sub_array[k-1])

// if __name__ == "__main__":
//     solution()
