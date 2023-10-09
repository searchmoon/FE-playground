## 노드 객체의 프로퍼티

- parentNode: 기준 노드의 부모 노드를 참조 Document 객체일 경우 부모 노드가 없음으로 null이 됩니다.
- childNode: 기준 노드의 자식 노드의 참조가 저장된 유사 배열을 참조(유사 배열은 NodeList 형태입니다.)
- firstChild: 기준 노드의 첫 번째 자식 노드를 참조 자식이 없는 노드일 경우 null이 됩니다.
- lastChild: 기준 노드의 마지막 자식 노드를 참조 마찬가지로 자식이 없는 노드일 경우 null이 됩니다.
- nextSibling: 기준 노드와 같은 부모 노드를 가진 다음 형제 노드를 참조
- previousSibling: 기준 노드와 같은 부모 노드를 가진 이전 형제 노드를 참조
- nodeType: 노드 유형을 뜻하는 숫자를 참조(요소 노드:1, 텍스트 노드: 3, Document:9)
- nodeValue: 텍스트 노드일 경우 텍스트 콘텐츠를 리턴 요소 노드는 null를 반환

## HTML 요소의 트리

- childNodes: 기준 노드의 자식 요소 참조를 저장한 유사 배열 객체(NodeList)입니다.
- parentElement: 기준 노드의 부모 요소 객체를 참조(텍스트 노드는 제외)
- firstElementChild: 기준 노드의 첫 번째 자식 요소 객체를 참조(마찬가지로 텍스트 노드와 공백 노드 모두 제외)
- lastElementChild: 기준 노드의 마지막 자식 요소 객체를 참조
- nextElementSibling: 기준 노드와 같은 부모를 가진 다음 형제 노드 객체를 반환
- previousElementSibling:기준 노드와 같은 부모를 가진 이전 형제 노드 객체를 반환
- childElementCount: 기준 노드의 자식 요소 개수를 반환 (children.length와 같습니다.)

## DOM node 추가, 제거

1. appendChild(): 주어진 노드를 특정 부모 노드의 마지막 자식으로 추가
2. insertBefore(): 주어진 노드를 특정 부모 노드의 지정된 자식 노드 앞에 추가
3. append(), prepend(), before():

- append(): 주어진 요소나 문자열을 부모 요소의 마지막에 추가
- prepend(): 주어진 요소나 문자열을 부모 요소의 처음에 추가
- before(): 주어진 요소나 문자열을 현재 요소 앞에 추가

4. append() vs appendChild()

- append(): 여러 노드나 문자열을 추가할 수 있다.
- appendChild(): 오직 하나의 노드만 추가할 수 있다.

5. removeChild(): 주어진 노드를 부모 노드에서 제거
   부모노드.removeChild(주어진 노드);
6. remove(): 현재 노드를 부모 노드에서 제거
   현재노드.remove()
7. insertAdjacentHTML(): 주어진 위치에 HTML 문자열을 삽입

## 요소 검색하기

1. getElementById(): 주어진 ID 값을 가진 요소를 반환
2. querySelector(), querySelectorAll():

- querySelector(): 주어진 css 선택자와 일치하는 첫번째 요소 반환
  id를 선택한다면, #를, class를 선택한다면 . 을 추가해줘야 한다.
- querySelectorAll(): 주어진 css 선택자와 일치하는 모든 요소의 NodeList를 반환

3. getElementBy\*: 특정 조건에 따라 요소를 선택하는 메서드
   예: getElementsByClassName(), getElementsByTagName(), getElementsByName() 등

## DOM 이벤트

## 이벤트 종류

### UserInterface 이벤트 (UI Events)

(많이 쓰는것 \*\* 표시)

- \*\* load: 페이지나 이미지가 로드될 때 발생
- unload: 페이지나 이미지가 언로드될 때 발생
- abort: 페이지 로딩이 중단될 때 발생
- \*\* error: 로딩 중 오류가 발생할 때 발생
- select: 사용자가 입력 필드의 텍스트를 선택할 때 발생
- \*\* resize: 창 크기가 변경될 때 발생
- \*\* scroll: 요소나 창이 스크롤될 때 발생(infinite scroll 할때)

---

### 2. Focus 이벤트

- \*\* focus: 요소가 포커스를 받을 때 발생
- blur: 요소가 포커스를 잃을 때 발생
- focusin: 요소 내부나 자식 요소가 포커스를 받을 때 발생
- focusout: 요소 내부나 자식 요소가 포커스를 잃을 때 발생

---

### 3. 마우스 이벤트 (Mouse Events)

- \*\* click: 요소를 클릭할 때 발생
- \*\* dblclick: 요소를 더블 클릭할 때 발생
- \*\* mousedown: 마우스 버튼을 누를 때 발생
- mouseup: 마우스 버튼을 놓을 때 발생
- mousemove: 마우스가 움직일 때 발생
- mouseover: 마우스가 요소 위로 이동할 때 발생
- mouseout: 마우스가 요소 밖으로 이동할 때 발생
- mouseenter: 마우스가 요소 내부로 들어갈 때 발생합니다 (버블링 없음).
- mouseleave: 마우스가 요소 밖으로 나갈 때 발생합니다 (버블링 없음).
- contextmenu: 마우스 오른쪽 버튼을 클릭할 때 발생

### Input 이벤트

- input: <input>, <textarea>, <select>와 같은 입력 요소의 값이 변경될 때 발생
- change: 입력 요소의 값이 변경되고 포커스가 잃어질 때 발생합니다.
- submit: 폼이 제출될 때 발생
- reset: 폼이 재설정될 때 발생

### 5. 키보드 이벤트 (Keyboard Events)

- keydown: 키가 눌렸을 때 발생
- keyup: 키가 놓여질 때 발생
- keypress: 키가 눌렸을 때 발생 (특정 문자 키에 대한 이벤트)

### 이벤트 할당

1. html 요소에 onclick 할당하기
2. addEventListener 사용하기
   1번과 2번의 차이점:이벤트 덮어쓰기(1번) vs 이벤트 누적(2번)

- onclick은 여러개의 이벤트를 적용하는것이 불가능. 마지막 하나만 적용이된다.addEventListener 는 누적된 이벤트가 모두 실행된다.
- addEventListener는 세번째 파라미터에 버블링으로 작동하게 할지, 캡쳐링으로 작동하게 할지 지정할 수 있다.
  세번째 파라미터가 true일 경우 캡쳐링, false일 경우 버블링을 사용한다.(즉, 아무것도 쓰지 않았을때는 버블링 자동적용. true 를 넣었을때는 캡쳐링)
  clickEvent.addEventListener("click", 이벤트 리스너, 캡쳐링/버블링)

### 이벤트 전파
: 자바스크립트에서 이벤트를 효율적으로 관리하고 처리하기 위한 중요한 개념

1. 버블링(bubbling): 이벤트 버블링은 특정 요소에서 이벤트가 발생했을 때, 해당 이벤트가 상위의 요소로 전파되는 현상. addEventListener의 세번째파라미터에 아무것도 추가 되지않았을때 자동으로 버블링 적용
2. 캡처링(capturing):이벤트 캡처링은 버블링의 반대 방향으로 이벤트가 전파되는 것. 세번째 파라미터에 true 넣으면 캡처링 적용
3. 이벤트 위임(event delegation);
하나의 요소에 이벤트 리스너를 추가하여, 그 하위 여러요소들의 이벤트를 처리하는 기법


