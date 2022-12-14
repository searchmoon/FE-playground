// Generic.  (<T>)

// generic을 이용하면 클래스나 함수 인터페이스를 다양한 타입으로 사용할 수 있다.
// 선언할 때는 그냥 타입 파라미터만 적어주고 생성하는 시점에 사용하는 타입을 결정하는 것이다.

// 예제 1.
function getSize<T>(arr: T[]): number{
    return arr.length;
}
//getSize 라는 함수는 arr을 받아서 number타입인 arr의 length를 받는다.

const arr1 = [1, 2, 3];
// getSize(arr1); //3
// 파라미터로 숫자타입의 array를 넣어줬기 때문에
// function getSize(arr)의 파라미터를 (arr:Array<number>)로 고쳐주거나,
// function getSize(arr:number[])로 고쳐주면 에러가 뜨지 않는다.

const arr2 = ['a', 'b', 'c'];
const arr3 = [false, true];
// 파라미터의 타입이 숫자로 된 배열로 정의 되었는데, 문자열로 된 배열이 들어가서 타입에러가 났다.
// 그러면 파라미터의 타입을 (arr: number[] | string[]) 으로 해주면 되지만,
// 이게 더 많은 타입이 생긴다면 그때는 어떻게 할 것인가? 그때 사용할 수 있는 것이 generic이다.
// 파라미터의 타입을 정의한것을 지우고, 함수이름과 파라미터 사이에 <T>라고 정의해주는데(이것을 타입파라미터 라고 한다), T는 변경될 수 있다.
// 보통 T를 사용하긴 한다. 이 T는 어떤 타입을 전달받아서 이 함수에서 사용할 수 있도록 해준다.
// 함수를 호출할 때 사용하는 부분에서 타입을 정의해주면 된다. 위의 arr1, arr2를 예를들면
getSize<number | string>(arr1); //3
getSize<string>(arr2); //3
getSize<boolean>(arr3); //2

// 예제 2.

interface Mobile<T> {
    name: string;
    price: number;
    option: T;
}

const m1: Mobile<{ color: string; coupon: boolean }> = {
    name: 'iphone',
    price: 1000,
    option: {
        color: 'black',
        coupon: false,
    },
};

const m2: Mobile<string> = {
    name: 'galaxy',
    price: 900,
    option: 'good',
}


// 예제 3.

interface User {
    name: string;
    age: number;
}

interface Car {
    name: boolean;
    color: string;
}

interface Book {
    price: number;
}

const user: User = { name : 'a', age: 10 };
const car: Car = { name: true, color: 'red'};
const book: Book = { price: 3000 };

function showName<T extends { name: string }>(data:T): string {
    return data.name;
}
//<T extends { name: string }>(data:T) 이부분은 어떤 타입이 올건데 이 타입은 nam이 string객체를 확장한 형태이다. 라고 알려주는 거다.

showName(user);
// showName(car);  여기서는 타입에러가 나는데, name은 boolean 타입으로 지정해줬기 때문이다.
// showName(book); 여기서는 타입에러가 나는데, name은 string 타입으로 지정해줬기 때문이다.



