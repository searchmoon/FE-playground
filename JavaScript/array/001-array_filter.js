const data = {
    exchangeRate: [
        { cash: 'USD', rate: 1 },
        { cash: 'KRW', rate: 1304 },
        { cash: 'JPY', rate: 966.03 }
    ],
};

console.log('---- 01. 전통적인 for 문 ------')
for(let i = 0; i < data.exchangeRate.length; i++) {
    const obj = data.exchangeRate[i];

    if(data.exchangeRate[i].cash === 'KRW'){
        console.log('KRW', obj);
        console.log('rate : ', obj.rate);
    }
}
console.log('--- 02. 배열 filter로 검색 ---- 필터에서는 배열 리턴하는데 값이 없으면 빈 배열')
const result = data.exchangeRate.filter(item => item.cash === 'KRW');
console.log('result : ', result);



