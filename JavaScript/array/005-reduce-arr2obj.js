const 덧셈리듀서 = (acc, cur) => acc + cur;


// Object 와 응용
const 과일값 = {
    '사과': 1000,
    '배': 2000,
    '바나나': 3000,
}

const 과일가격 = Object.values(과일값)
const 과일가격합계 = 과일가격.reduce(덧셈리듀서, 0)
console.log('과일가격합계 : ', 과일가격합계)

const 과일목록 = {
    '사과': {
        '제철': '가을',
        '가격': 1000,
    },
    '배': {
        '제철': '여름',
        '가격': 2000,
    },
    '바나나': {
        '제철': '여름',
        '가격': 3000,
    }
}

// 제철이 여름인 과일들의 가격 합계를 구하라?

const 여름과일들 = Object.values(과일목록).filter(item => item.제철 === '여름');
console.log('여름 과일들 :', 여름과일들);

const 여름과일가격 = 여름과일들.map(item => item.가격);
console.log('여름과일가격 :', 여름과일가격);
const 여름과일가격합계 = 여름과일가격.reduce(덧셈리듀서, 0)
console.log('여름과일가격합계 :', 여름과일가격합계);



