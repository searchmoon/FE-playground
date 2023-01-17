
// 예제 1번. officers
const officers = [
  { id: 20, name: 'Captain Piett' },
  { id: 24, name: 'General Veers' },
  { id: 56, name: 'Admiral Ozzel' },
  { id: 88, name: 'Commander Jerjerrod' }
];

// 1-1. name의 길이가 13보다 큰 officer를 찾아서 반환(filter)

const officerfilter1 = officers.filter(officer => officer.name.length > 13);
console.log(officerfilter1); // [ { id: 88, name: 'Commander Jerjerrod' } ]
console.log(officerfilter1[0].name); // Commander Jerjerrod

// 1-2. name에서 first name만 반환( name 의 앞부분 )(map)

const officerfilter2 = officers.map(item => item.name.split(' ')[0]);
console.log(officerfilter2); // [ 'Captain', 'General', 'Admiral', 'Commander' ]

// 1-3. officers id의 누산값 구하기(reduce)

const officersfilter3 = officers.reduce((acc, cur) =>  acc + cur.id);
console.log(officersfilter3);   // ????? [object Object]5688  왜 이르케 나오지? ㅎ



// 예제 2. from 부터 to 까지의 년을 배열로 반환
const getYear = () => {
  const from = 2010;
  const to = 2020;
  const yearList = [];
  for (let i = from; i <= to; i++) {
    yearList.push(i.toString());
  }
  console.log('yearList', yearList);
}
getYear(); //[
// '2010', '2011',
//   '2012', '2013',
//   '2014', '2015',
//   '2016', '2017',
//   '2018', '2019',
//   '2020'
// ] 이 배열이 나온다. 숫자 형태로 나오게 하려면 i.toString()에서 toString()만 빼면 된다.


