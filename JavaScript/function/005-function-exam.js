

function 덧셈하다가말은(a){
  return function(b){
    return a+b;
  }
}

const sik = 1+1;
console.log('sik : ', sik);
const moon = 덧셈하다가말은(1);

console.log('moon : ', moon);
console.log('moon 은 7 인자 주면 대답합니까?', moon(6));

console.log(덧셈하다가말은(1)(2));

console.log('-----------------')


function sum(val1, val2, val3){
  return val1 + val2 + val3;
}

console.log(sum(1,2,3));

function sum2(val1){
  return function(val2){
    return function(val3){
      return val1 + val2 + val3;
    }
  }
}

console.log(sum2(1)(2)(3));
