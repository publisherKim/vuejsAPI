// 클래스와 스타일 바인딩
/*
    데이터 바인딩은 엘리먼트의 클래스 목록과 인라인 스타일을 조작하기 위해 일반적으로 사용됩니다. 
    이 두 속성은 v-bind를 사용하여 처리
    우리는 표현식으로 최종 문자열을 계산하면 됨
    문자열 연결에 간섭하는 것은 짜증나는 일이며 오류가 발생하기 쉬움
    Vue는 class와 style에 v-bind를 사용할 때 특별히 향상된 기능을 제공
    표현식은 문자열 이외에 객체 또는 배열을 이용
*/

// HTML 클래스 바인딩하기
// 객체구문: 클래스를 동적으로 토글하기 위해 v-bind:class에 객체를 전달
<div v-bind:class="{ active: isActive }"></div>
// 위 구문은 active 클래스의 존재 여부가 데이터 속성 isActive 의 참 속성에 의해 결정

// v-bind:class 디렉티브는 일반 class 속성과 공존
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
data: {
    isActive: true,
    hasError: false
}
// rendering result
<div class="static active"></div>
// isActive 또는 hasError 가 변경되면 클래스 목록도 그에 따라 업데이트
// hasError 가 true 가 되면 클래스 목록은 "static active text-danger"

// 바인딩 된 객체는 인라인 일 필요는 없습니다.
<div v-bind:class="classObject"></div>
data: {
    classObject: {
      active: true,
      'text-danger': false
    }
}
// 같은 결과로 렌더링 됩니다. 또한 객체를 반환하는 계산된 속성에도 바인딩 할 수 있습니다. 이것은 일반적이며 강력한 패턴
<div v-bind:class="classObject"></div>
data: {
    isActive: true,
    error: null
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
}
// 나열 하지 않고 오브젝트 형태 혹은 계선된 속성에서도 사용 가능하다.

// 배열구문: 우리는 배열을 v-bind:class 에 전달하여 클래스 목록을 지정 가능
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
    activeClass: 'active',
    errorClass: 'text-danger'
}
// result rendering
<div class="active text-danger"></div>

// 목록에 있는 클래스를 조건부 토글하려면 삼항 연산자를 이용가능
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
// 이것은 항상 errorClass를 적용하지만 isActive가 true일 때 activeClass만 적용됩니다.

// 그러나 여러 조건부 클래스가 있는 경우 장황해질 수 있습니다. 그래서 배열 구문 내에서 객체 구문을 사용할 수 있습니다.
<div v-bind:class="[{ active: isActive }, errorClass]"></div>


// 컴포넌트와 함께 사용하는 방법 : 사용자 정의 컴포넌트로 class 속성을 사용하면, 클래스가 컴포넌트의 루트 엘리먼트에 추가 됨, 덮어쓰기 x
Vue.component('my-component', {
    template: '<p class="foo bar">Hi</p>'
});
<my-component class="baz boo"></my-component>
// result rendering
<p class="foo bar baz boo">Hi</p>

// 클래스 바인딩도 동일
<my-component v-bind:class="{ active: isActive }"></my-component>
// isActive가 참일 때 렌더링 된 HTML은
<p class="foo bar active">Hi</p>