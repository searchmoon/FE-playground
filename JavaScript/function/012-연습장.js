
function print(person) {
  console.log(person.name);
}

const personList = {
  name: 'John'
};

print(personList);


//--------------------------------------------------------------

const dogArr = [
  { name: '라쿤', age: 2, 'have-mom': true,},
  { name: '몽글', age: 3, 'have-mom': true,},
  { name: '아톰',},
  { name: '두유', age: 7, 'have-mom': true,},
];

const meal = (강쥐) => {
  console.log(`${강쥐.name}은 ${강쥐.age * 100}그릇 먹자`);
  if(!강쥐.age){
    console.log('나이가 안나와서 계산이 불가능해');
  }
}

console.log(dogArr.map(dog => {
  meal(dog);
}))

