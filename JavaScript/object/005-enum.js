
// Enum(열거형)의 사용
// 사용이유 1. 하드코딩의 실수를 줄이기 위해서, 2.자동완성까지 되므로 편리하고, 가독성이 좋아지기 때문에 사용한다.
// 분야별로 종류를 정의하여 명확하게 사용할 수 있다.
// 성능상의 이유로 타입스크립트에서 enum으로 enum을 정의하지 않고, const를 사용하여 객체를 정의하는 방법이 많이 쓰인다.

const SeasonEnum = {
  WINTER: 'winter',
  SPRING: 'spring',
  SUMMER: 'summer',
  AUTUMN: 'autumn',
};

console.log(SeasonEnum.WINTER);

Object.freeze(SeasonEnum);
//Object.freeze() 메서드는 한번 선언된 객체를 동결시켜버린다.

SeasonEnum.WINTER = 'winter2'; // WINTER의 값은 변경되지 않았다.
console.log(SeasonEnum.WINTER);

// 구조분해 할당

const { WINTER, SPRING, SUMMER, AUTUMN } = SeasonEnum;
console.log('겨울:', WINTER);
console.log('봄:', SPRING);
//이런식으로 구조분해 할당하여 사용할 수 있다.


// Enum(열거형)의 사용 참고할 블로그: https://velog.io/@johnwi/enum-to-literal
// class 기반의 enum : https://dev.to/tjfroll/class-based-enums-in-typescript-are-they-worth-the-trouble-3616
