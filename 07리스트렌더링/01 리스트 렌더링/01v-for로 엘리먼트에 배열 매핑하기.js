// 리스트 렌더링
// v-for로 엘리먼트에 배열 매핑하기
/*
    v-for 디렉티브를 사용하여 배열을 기반으로 리스트를 렌더링 할 수 있습니다. 
    v-for 디렉티브는 item in items 형태로 특별한 문법이 필요합니다. 
    여기서 items는 원본 데이터 배열이고 item은 반복되는 배열 엘리먼트의 별칭 입니다.
*/

// 기본 사용방법
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
var example1 = new Vue({
    el: '#example-1',
    data: {
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    }
});
// rendering result
<ul id="example-1">
    <li>Foo</li>
    <li>Bar</li>
</ul>

// v-for 블록 안에는 부모 범위 속성에 대한 모든 권한이 있습니다. v-for는 또한 현재 항목의 인덱스에 대한 두 번째 전달인자 옵션을 제공합니다.
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
var example2 = new Vue({
    el: '#example-2',
    data: {
      parentMessage: 'Parent',
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    }
});
// redering result
<ul id="example-2">
    <li>Parent-0-Foo</li>
    <li>Parent-1-Bar</li>
</ul>

// in 대신에 of를 구분자로 사용할 수 있습니다. 그래서 JavaScript의 이터레이터에 대한 자바스크립트 구문과 유사합니다.
<div v-for="item of items"></div>
// 객체에서 순서가 있는 순환을 하고 싶다면 of를 쓰는것이좋다.

// v-for와 객체: v-for를 사용하여 객체의 속성을 반복할 수도 있음
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
new Vue({
    el: '#v-for-object',
    data: {
      object: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30
      }
    }
});
// 그냥 v-for 디렉티브 쓰면 될듯...
// 키의 두번째 전달 인자도 제공해줌
<div v-for="(value, key) in object">
  {{ key }}: {{ value }}
</div>
// 그리고 인데스또한 제공
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }} : {{ value }}
</div>
// 속성, 값, 객체의 순번까지 제공해줌.
// 유의사항 : 객체를 반복할 때 순서는 Object.keys()의 키 나열 순서에 따라 결정됩니다. 이 순서는 JavaScript 엔진 구현간에 일관적이지는 않습니다.

// key
/*
    Vue가 v-for에서 렌더링된 엘리먼트 목록을 갱신할 때 기본적으로 “in-place patch” 전략을 사용합니다. 
    데이터 항목의 순서가 변경된 경우 항목의 순서와 일치하도록 DOM 요소를 이동하는 대신 Vue는 각 요소를 적절한 위치에 패치하고 해당 인덱스에서 렌더링할 내용을 반영하는지 확인합니다. 
    이것은 Vue 1.x의 track-by=$index의 동작과 유사합니다.

    이 기본 모드는 효율적이지만 목록의 출력 결과가 하위 컴포넌트 상태 또는 임시 DOM 상태(예: 폼 input)에 의존하지 않는 경우에 적합합니다.

    Vue가 각 노드의 ID를 추적하고 기존 엘리먼트를 재사용하고 재정렬할 수 있도록 힌트를 제공하려면 각 항목에 고유한 key 속성을 제공해야 합니다. 
    key에 대한 이상적인 값은 각 항목의 고유한 ID입니다. 
    이 특별한 속성은 1.x 버전의 track-by와 거의 비슷하지만 속성처럼 작동하기 때문에 v-bind를 사용하여 동적 값에 바인딩 해야합니다. 
    (여기서는 약어를 이용합니다.)    
*/
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
// 반복되는 DOM 내용이 단순하지 않거나 의도적인 성능 향상을 위해 기본 동작에 의존하지 않는한 가능하면 언제나 v-for에 key를 추가하는 것이 좋습니다.
// key는 Vue가 노드를 식별하는 일반적인 메커니즘이기 때문에 v-for에 특별히 연관되지 않은 다른 용도로 사용합니다.
// key를 쓰면 성능 향상 및 의도치않은 순번에 도움이 된다. 필수적이라고 봐도 무방할듯.