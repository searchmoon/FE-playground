// ** 순서도 그리기(시각적으로 그리기) ** 가장 중요!
// 프로그래밍 사고력을 기르기 위해 꼭 미리 순서도를 그린다.
// 고정된 절차 만들기
// 1. 프로그램 절차의 개수는 정해져있어야 한다.
// 2. 각 절차는 항상 같은 내용이어야 한다.
// 3. 모든 가능성을 고려해야 한다.
// 4. 예시는 절차를 검증하는데 사용한다.(순서도 안에 넣지는 않는다)

// ** 순서도를 그릴때 규칙정하기(내맘대로)
// 두겹의 원: 시작, 끝
// 타원: 일반 절차
// 마름모: 판단 절차 (yes or no, keep or stop 등 분기가 일어난다)
// 두겹의 사각형: 특수한 상황(대기, 이벤트발생)
// 화살표: 다음 절차로 가는 흐름

//순서도를 그릴 때 사용자의 이벤트(버튼 클릭, 입력창 등)가 필요한 곳에서 순서도를 끊는것 잊지말기!
// flowchart 이미지 참고하기

// js basic.
// < 자료형 >

console.log("\\"); // \
console.log("줄바꿈\n했다");
console.log("문자열 " + "합치기");

//문자와 숫자의 연산
console.log(typeof ("1" + 0)); // 'string' //10

console.log(typeof ("1" - 2)); // 'number' //-1
// + 일때와 - 일때의 형변환이 다르다.
// 더하기 일때는 문자열로, 빼기일때는 숫자로 연산된다.

// 실수를 연산할때 주의할점:
console.log(0.3 - 0.1); // 0.19999999999999998 이런 숫자가 나온다.
// 실수를 계산할때는 실수를 정수로 만들고 다시 나눠주는 방식을 사용한다.
console.log(0.3 * 10 - 0.1 * 10) / 10; // 2 출력

// 문자의 번호 알아보기
console.log("a".charCodeAt()); //97
console.log("b".charCodeAt()); //98
console.log("a".charCodeAt() == "ab".charCodeAt()); //true

// boolean 비교
console.log(true > false); //true //1과 0이기 때문에
console.log(true * false); //0 //1과 0이기 때문에

// 논리연산자 사용하기
// && : 모두가 true 여야 true
console.log(10 > 5 && 6 < 8); //true
// || : 둘중 하나만 ture 여도 true
console.log(10 > 5 || 6 > 8); //true

!true; //false
!false; //true

// 다른 자료형 boolean 값으로 바꿔주기.
!!"a"; //true  // !! 을 두번 써줬기 때문에 false -> true
!!false; //false
!!""; //false (비어있는 값이기때문에 false)
!!0; //false
!!NaN; // false

console.log(!2 == 0); // true
console.log(!2 < 0); // false
