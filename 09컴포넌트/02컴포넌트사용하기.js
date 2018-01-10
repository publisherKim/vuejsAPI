// 컴포넌트 사용하기
// 전역등록: 이전 섹션에서 다음을 사용하여 새 Vue 인스턴스를 만들 수 있음을 알게되었습니다.
new Vue({
    el: '#some-element',
    // 옵션
});
// 전역 컴포넌트를 등록하려면, Vue.component(tagName, options)를 사용
Vue.component('my-component', {
    // 옵션
});
/*
    Vue는 사용자 지정 태그 이름에 대해 W3C 규칙을 적용하지 않습니다 
    (모두 소문자이어야 하고 하이픈을 포함해야합니다).
    그러나 이 규칙을 따르는 것이 좋습니다.
    
    일단 등록되면, 컴포넌트는 인스턴스의 템플릿에서 커스텀 엘리먼트,<my-component></my-component>로 사용 가능
    루트 Vue 인스턴스를 인스턴스화하기 전에 컴포넌트가 등록되어 있는지 확인
    <div id="example">
        <my-component></my-component>
    </div>
*/
// 전역등록
Vue.component('my-component', {
    template: '<div>사용자 정의 컴포넌트 입니다!</div>'
});
  
// 루트 인스턴스 생성
new Vue({
    el: '#example'
});

/*
    result rendering
    <div id="example">
        <div>사용자 정의 컴포넌트 입니다!</div>
    </div>
*/

// 지역 등록
/*
    모든 컴포넌트를 전역으로 등록 할 필요는 없습니다. 
    컴포넌트를 components 인스턴스 옵션으로 등록함으로써 
    다른 인스턴스/컴포넌트의 범위에서만 사용할 수있는 컴포넌트를 만들 수 있습니다:
*/
var Child = {
    template: '<div>사용자 정의 컴포넌트 입니다!</div>'
}
  
new Vue({
    // ...
    components: {
        // <my-component> 는 상위 템플릿에서만 사용할 수 있습니다.
        'my-component': Child
    }
});
// 동일한 캡슐화는 디렉티브와 같은 다른 등록 가능한 Vue 기능에도 적용됩니다.

// DOM 템플릿 구문 분석 경고
/*
    DOM을 템플릿으로 사용할 때 (예 : el 옵션을 사용하여 기존 콘텐츠가 있는 엘리먼트를 마운트하는 경우), 
    Vue는 템플릿 콘텐츠만 가져올 수 있기 때문에 HTML이 작동하는 방식에 고유한 몇 가지 제한 사항이 적용됩니다. 
    이는 브라우저가 구문 분석과 정규화한 후에 작동합니다. 
    가장 중요한 것은<ul>,<ol>,<table>과<select>와 같은 일부 엘리먼트는 그 안에 어떤 엘리먼트가 나타날 수 있는지에 대한 제한을 가지고 있으며,
    <option>과 같이 특정 다른 엘리먼트 안에만 나타날 수 있습니다.

    이러한 제한이 있는 엘리먼트가 있는 사용자 지정 컴포넌트를 사용하면 다음과 같은 문제가 발생할 수 있습니다.
*/
<table>
  <my-row>...</my-row>
</table>
// 사용자 지정 컴포넌트 <my-row> 는 잘못 된 컨텐츠가 되어, 결과적으로 렌더링시 에러를 발생시킵니다. 해결 방법은 is 특수 속성을 사용
<table>
  <tr is="my-row"></tr>
</table>
/*
    다음 소스 중 하나에 포함되면 문자열 템플릿을 사용하는 경우에는 이러한 제한 사항이 적용되지 않습니다.:
        <script type="text/x-template">
        JavaScript 인라인 템플릿 문자열
        .vue 컴포넌트

    따라서 가능한 경우 항상 문자열 템플릿을 사용하는 것이 좋습니다.
*/

// data 는 반드시 함수여야합니다.
Vue.component('my-component', {
    template: '<span>{{ message }}</span>',
    data: {
      message: 'hello'
    }
});
/*
    그런 다음 Vue는 중단하고 콘솔에서 경고를 합니다. 
    data는 컴포넌트 인스턴스의 함수여야합니다. 
    규칙이 존재하는 이유를 이해하는 것이 좋습니다. 
    따라서 다음과 같이 사용하십시오.
*/
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
var data = { counter: 0 }

Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
  // 각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환합니다.
  data: function () {
    return data
  }
});

new Vue({
  el: '#example-2'
});
/*
    이런! 세 개의 컴포넌트 인스턴스가 모두 같은 data 객체를 공유하므로 하나의 카운터를 증가 시키면 모두 증가합니다!
    대신 새로운 데이터 객체를 반환하여 이 문제를 해결
*/
data: function () {
    return {
      counter: 0
    }
}
// 이제 모든 카운터에는 각각 고유한 내부 상태가 있습니다.

// 컴포넌트 작성
/*
    컴포넌트는 부모-자식 관계에서 가장 일반적으로 함께 사용하기 위한 것입니다. 
    컴포넌트 A는 자체 템플릿에서 컴포넌트 B를 사용할 수 있습니다. 
    그들은 필연적으로 서로 의사 소통이 필요합니다. 
    부모는 자식에게 데이터를 전달해야 할 수도 있으며, 자식은 자신에게 일어난 일을 부모에게 알릴 필요가 있습니다. 
    그러나 부모와 자식이 명확하게 정의된 인터페이스를 통해 가능한한 분리된 상태로 유지하는 것도 매우 중요합니다. 
    이렇게하면 각 컴포넌트의 코드를 상대적으로 격리 할 수 있도록 작성하고 추론할 수 있으므로 유지 관리가 쉽고 잠재적으로 쉽게 재사용 할 수 있습니다.

    Vue.js에서 부모-자식 컴포넌트 관계는 props는 아래로, events 위로 라고 요약 할 수 있습니다. 
    부모는 props를 통해 자식에게 데이터를 전달하고 자식은 events를 통해 부모에게 메시지를 보냅니다. 
    어떻게 작동하는지 보겠습니다.

                                        Parent
    Emit Events(child to parent)                        Pass Props(parent to child)
                                        Child 
*/