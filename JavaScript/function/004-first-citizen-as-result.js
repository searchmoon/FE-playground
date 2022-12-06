
function plusGenerator(value){
  return function(value2){
    return value + value2;
  }
}

const plusOne = plusGenerator(1);
console.log('plusOne : ', plusOne);
// plusOne은
// 이런식의 함수로 나온다.
// function(value2){
// return 1 + value2;
// }

const plusOne2 = function(value2){
  return 1 + value2;
}

console.log(plusOne(2)); // 3

// -------------------

export const sayHello = () => {
  alert('hello');
}

// export const handleFormValue = function(successFunc){
//   return function(values){
//     console.log('submit values 던집니드아ㅏㅏㅏ', values);
//     successFunc(values);
//   }
// }
// 이거랑 같아요.
export const handleFormValue = (successFunc) => (values) => {
  console.log('submit values 던집니드아ㅏㅏㅏ', values);
  successFunc(values);
}

// handleFormValue(sayHello)({name: 'moon', age: 30});


