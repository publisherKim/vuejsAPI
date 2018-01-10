
// Props
// Props로 데이터 전달하기
/*
    모든 컴포넌트 인스턴스에는 자체 격리 된 범위 가 있습니다. 
    즉, 하위 컴포넌트의 템플릿에서 상위 데이터를 직접 참조 할 수 없으며 그렇게 해서는 안됩니다. 
    데이터는 props 옵션 을 사용하여 하위 컴포넌트로 전달 될 수 있습니다.

    prop는 상위 컴포넌트의 정보를 전달하기위한 사용자 지정 특성입니다. 
    하위 컴포넌트는props 옵션을 사용하여 수신 할 것으로 기대되는 props를 명시적으로 선언해야합니다

    Vue.component('child', {
        // props 정의
        props: ['message'],
        // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며
        // vm의 this.message로 사용할 수 있습니다.
        template: '<span>{{ message }}</span>'
    })
    <child message="안녕하세요!"></child>
*/

// camelCase vs. kebab-case: HTML 속성은 대소 문자를 구분하지 않으므로 문자열이 아닌 템플릿을 사용할 때 camelCased prop 이름에 해당하는 kebab-case(하이픈 구분)를 사용해야 합니다.
/*
Vue.component('child', {
  // JavaScript는 camelCase
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
<!-- HTML는 kebab-case -->
<child my-message="안녕하세요!"></child>
문자열 템플릿을 사용하는 경우에도 이 제한이 적용되지 않습니다.
*/

// 동적 Props
/*
    정규 속성을 표현식에 바인딩하는 것과 비슷하게, v-bind를 사용하여 부모의 데이터에 props를 동적으로 바인딩 할 수 있습니다. 
    데이터가 상위에서 업데이트 될 때마다 하위 데이터로도 전달됩니다.
    <div>
        <input v-model="parentMsg">
        <br>
        <child v-bind:my-message="parentMsg"></child>
    </div>    
        v-bind에 대한 단축 구문을 사용하는 것이 더 간단합니다
        <child :my-message="parentMsg"></child>
    
    객체의 모든 속성을 props로 전달하려면, 인자없이 v-bind를 쓸 수 있습니다. (v-bind:prop-name 대신 v-bind). 예를 들어 todo 객체가 있다면,
    todo: {
        text: 'Learn Vue',
        isComplete: false
    }
    <todo-item v-bind="todo"></todo-item>
    이것은 다음과 같은 동작을합니다.:
    <todo-item
        v-bind:text="todo.text"
        v-bind:is-complete="todo.isComplete"
    ></todo-item>
*/

/*
    리터럴 vs. 동적
    초보자가 흔히 범하는 실수는 리터럴 구문을 사용하여 숫자를 전달하려고 시도하는 것입니다.
    <!-- 이것은 일반 문자열 "1"을 전달합니다. -->
    <comp some-prop="1"></comp>
    그러나 이것은 리터럴 prop이기 때문에 그 값은 실제 숫자가 아닌 일반 문자열 "1" 로 전달됩니다. 
    실제 JavaScript 숫자를 전달하려면 값이 JavaScript 표현식으로 평가되도록 v-bind를 사용해야합니다.
    <!-- 이것은 실제 숫자로 전달합니다. -->
    <comp v-bind:some-prop="1"></comp>
    주의: 숫자와 문자구분 숫자형의 경우 표현식으로 평가되도록 v-bind를 이용!!
*/

/*
    단방향 데이터 흐름
        모든 props는 하위 속성과 상위 속성 사이의 단방향 바인딩을 형성합니다. 
        상위 속성이 업데이트되면 하위로 흐르게 되지만 그 반대는 안됩니다. 
        이렇게하면 하위 컴포넌트가 실수로 부모의 상태를 변경하여 앱의 데이터 흐름을 추론하기 더 어렵게 만드는 것을 방지할 수 있습니다.

        일반적으로 prop을 변경시키고 싶은 유혹을 불러 일으킬 수있는 두 가지 경우가 있습니다.
            1. 이 prop는 초기 값을 전달 하는데만 사용되며 하위 컴포넌트는 이후에 이를 로컬 데이터 속성으로 사용하기만 합니다.
            2. prop는 변경되어야 할 원시 값으로 전달됩니다.
        이러한 사용 사례에 대한 적절한 대답은 다음과 같습니다.
            1. prop의 초기 값을 초기 값으로 사용하는 로컬 데이터 속성을 정의 하십시오.
                props: ['initialCounter'],
                data: function () {
                    return { counter: this.initialCounter }
                }
            2. prop 값으로 부터 계산된 속성을 정의 합니다.
            props: ['size'],
            computed: {
                normalizedSize: function () {
                    return this.size.trim().toLowerCase()
                }
            }
        
        자바 스크립트의 객체와 배열은 참조로 전달되므로 prop가 배열이나 객체인 경우 하위 객체 또는 배열 자체를 부모 상태로 변경하면 부모 상태에 영향을 줍니다.

        주의: 부모의 원본을 건드리는 일을 주의해야한다. 상태 관리가 어려워 진다.
*/

/*
    Prop 검증
        컴포넌트가 받는 중인 prop에 대한 요구사항을 지정할 수 있습니다. 
        요구사항이 충족 되지 않으면 Vue에서 경고를 내보냅니다. 
        이 기능은 다른 사용자가 사용할 컴포넌트를 제작할 때 특히 유용합니다.

        props를 문자열 배열로 정의하는 대신 유효성 검사 요구사항이 있는 객체를 사용할 수 있습니다.
*/
Vue.component('example', {
    props: {
      // 기본 타입 확인 (`null` 은 어떤 타입이든 가능하다는 뜻입니다)
      propA: Number,
      // 여러개의 가능한 타입
      propB: [String, Number],
      // 문자열이며 꼭 필요합니다
      propC: {
        type: String,
        required: true
      },
      // 숫자이며 기본 값을 가집니다
      propD: {
        type: Number,
        default: 100
      },
      // 객체/배열의 기본값은 팩토리 함수에서 반환 되어야 합니다.
      propE: {
        type: Object,
        default: function () {
          return { message: 'hello' }
        }
      },
      // 사용자 정의 유효성 검사 가능
      propF: {
        validator: function (value) {
          return value > 10
        }
      }
    }
});
// 데이터의 속성의 검증을 해주는것이 좋다. 꼭 경고가 아니더라도 표기해주는것이 유지보수를 위해서도 좋다.

/*
    type은 다음 네이티브 생성자 중 하나를 사용할 수 있습니다.

        String
        Number
        Boolean
        Function
        Object
        Array
        Symbol
    
    또한, type 은 커스텀 생성자 함수가 될 수 있고, assertion은 instanceof 체크로 만들어 질 것입니다.

    props 검증이 실패하면 Vue는 콘솔에서 경고를 출력합니다(개발 빌드를 사용하는 경우). 
    props는 컴포넌트 인스턴스가 생성되기 전에 검증되기 때문에 
    default 또는 validator 함수 내에서 data, computed 또는 methods와 같은 인스턴스 속성을 사용할 수 없습니다.
*/