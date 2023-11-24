- css기능중에
  user-select: none; 하면, 드래그 하는거 막아짐.

### fragment 사용법

이 document.createDocumentFragment() 의 기능은,
아래의 함수가 forEach를 이중으로 돌고있어서 tr, td가 반복문이 돌때마다 화면에 렌더링을 해준다.
그래서 성능상 매우 느리다. 그래서 그걸 방지하기 위해 한번에 묶어준 다음에 마지막에 $fragment.appendChild($tr); 이렇게 해주어 한번만 화면을 그려주는 기능.
createDocumentFragment 이것은 메모리에는 저장을 하지만, 화면에 반영이 되지않기 때문에 화면을 빈번하게 조작하는 상황에 쓰면 아주 좋다.

```javascript
function startGame() {
  const $fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    data.push(rowData);
    const $tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0);
      const $td = document.createElement("td");
      $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
  });
  $table.appendChild($fragment);
  put2ToRandomCell();
  draw();
}
```

### 마우스 이벤트

마우스 이벤트를 추가할때는 개별태그에는 추가를 거의 안한다.
window.addEventListener("keydown", 함수)
이런식으로 window 또는 document 에다가 추가한다.
keydown, keyup 등의 이벤트를 할때, 어떤 키를 눌렀는지도 확인가능.

```javascript
window.addEventListener("keydown", (event) => {
  console.log(event); //이렇게 event 확인가능
});
```

event.key 로 어떤 키 눌렀는지 확인가능
```javascript
window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    moveCells("up");
  } else if (event.key === "ArrowDown") {
    moveCells("down");
  } else if (event.key === "ArrowLeft") {
    moveCells("left");
  } else if (event.key === "ArrowRight") {
    moveCells("right");
  }
});
```

### 키보드 이벤트
키보드 관련 이벤트는 간단하지만 마우스 관련 이벤트는 조금 복잡하다.
마우스의 이동방향이 오른쪽 왼쪽, 이렇게 간단하게 표현하기가 어려움.
그래서 기준좌표를 정하고 예를들면 x축으로 +45도, -45도 이면 오른쪽으로 가는 이벤트.

- x좌표로는 clientX, offsetX, pageX, screenX, movementX 등이 있다.(제일 많이 씀)
- clientX,Y: 현재 브라우저 페이지 내에서의 x, y 좌표를 가리킨다.
- pageX,Y: clientX와 같이 브라우저 페이지 내에서의 좌표를 가리키지만, 스크롤이 있다면 스크롤이 있는 픽셀값까지 포함한다는 점이 다르다.
- offsetX,Y: 이벤트를 연결한 대상을 기준으로 마우스의 x,y 좌표를 가져온다.
window에 이벤트를 걸면 clientX,Y 와 동일하지만, 페이지 내의 다른 태그에 마우스 이벤트를 걸면 해당 태그의 왼쪽 모서리 좌표가 0이된다.
- screenX,Y: 모니터를 기준으로 잡아서 모니터의 왼쪽 모서리가 0이된다.
- movementX,Y: mousemove 이벤트와 비교해 얼마나 마우스를 움직였는지 표시한다.
마우스 방향을 판단할때는 mousedown, mouseup 이벤트가 필요하다.
 


