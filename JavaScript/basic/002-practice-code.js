const arr = [1, 2, 3];

//ES5
arr.map(function (item) {
  console.log(item);
});

arr.map(function (item) {
  return console.log(item);
});

arr.map(function (item) {
  return console.log(item);
});

//ES6
arr.map((item) => console.log(item));

arr.map((item) => {
  return console.log(item);
});
