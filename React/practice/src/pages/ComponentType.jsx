// 원래 하나의 컴포넌트에서는 export default 로 export 를 해주지만,
// 여기서는 여러개가 있으므로 default 를 제거해주겠다.

//클래스 컴포넌트 기본형 (자동완성:rce)
import { Component } from "react";

export class ClassCompo extends Component {
  render() {
    return <div>class component</div>;
  }
}

// 함수 컴포넌트 기본형(자동완성: rafce)
// import React from 'react'

export const FuncCompo = () => {
  return <div>function component</div>;
};

////////////////////////////////////////////////////////////////

//클래스 컴포넌트와 함수형 컴포넌트의 차이 알기
// 1. import { Component } from "react"; 이거 import 해야하고,
// 2. 컴포넌트 안에서 변수 선언할때, 변수이름에 const나, let 붙여주지 않기.
// 3. return 을 render() {} 로 감싸주기
// 4. 자식컴포넌트로 props를 보낼때, this.props 이렇게 this.를 앞에 붙여야한다.

//클래스 컴포넌트에서 props 전달할 때 어떤 차이점이 있는지
// import { Component } from "react";

//부모
export class Parent extends Component {
  parentData = [
    {
      age: 28,
      name: "John",
    },
    {
      age: 28,
      name: "John",
    },
  ];
  render() {
    return (
      <div>
        <Children parentData={this.parentData} />
      </div>
    );
  }
}

//자식
export class Children extends Component {
  render() {
    //render 와 return 사이에서 props 받아오기
    console.log(this.props.parentData);
    return <div></div>;
  }
}

