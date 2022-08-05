const sampleData = {
    rnpRate: [
        { coin: 'RNP', rate: 1 },
        { coin: 'ETH', rate: 0.000061 },
        { coin: 'BNB', rate: 0.000317 }
    ],
};

console.log('---- 01. 전통적인 for 문 ------')
for(let i = 0; i < sampleData.rnpRate.length; i++) {
    const obj = sampleData.rnpRate[i];

    if(sampleData.rnpRate[i].coin === 'BNB'){
        console.log('bnb', obj);
        console.log('rate : ', obj.rate);
    }
}
console.log('--- 02. 배열 filter로 검색 ---- 필터에서는 배열 리턴하는데 값이 없으면 빈 배열')
const result = sampleData.rnpRate.filter(item => item.coin === 'BNB');
console.log('result : ', result);
console.log('?hello world');

// 01. sampleData.rnpRate 배열 아이템을 각자 순회하면서 콘솔 로그 출력

// 02. 아이템들 각자 순회하면서 -> 콘솔로그도 하면서 coin 이 BNB 인 것 if 문으로 찾기


