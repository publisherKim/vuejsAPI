/*
    Props가 아닌 속성
        Props가 아닌 속성은 컴포넌트로 전달되지만 해당 props는 정의되지 않은 속성입니다.

        명시적으로 정의된 props는 하위 컴포넌트에 정보를 전달하는데 적절하지만 컴포넌트 라이브러리를 만드는 경우 컴포넌트가 사용될 수있는 상황을 항상 예측할 수는 없습니다. 
        이것이 컴포넌트가 컴포넌트의 루트 요소에 추가되는 임의의 속성을 허용해야하는 이유입니다.

        예를 들어, 우리가 input에 data-3d-date-picker 속성을 요구하는 부트스트랩 플러그인으로 써드 파티 bs-date-input 컴포넌트를 사용하고 있다고 상상해보세요. 
        이 속성을 컴포넌트 인스턴스에 추가 할 수 있습니다.

        <bs-date-input data-3d-date-picker="true"></bs-date-input>
        그리고 data-3d-date-picker="true"속성은 bs-date-input의 루트 엘리먼트에 자동으로 추가 될 것입니다.

        외부라이브러리의 컴포넌트를 쓸경우 정의되지 않은 속성도 추가할 필요가 있다.
*/

/*
    존재하는 속성 교체/병합
        이 파일이 bs-date-input의 템플릿이라고 가정합니다:
            <input type="date" class="form-control">
            데이트피커 플러그인의 테마를 추가하려면 다음과 같이 특정 클래스를 추가해야 할 수도 있습니다.
            <bs-date-input
                data-3d-date-picker="true"
                class="date-picker-theme-dark"
            ></bs-date-input>

        이 경우 class에 대한 두 개의 서로 다른 값이 정의됩니다.
            템플릿의 컴포넌트에 의해 설정된 form-control
            date-picker-theme-dark는 부모에 의해 컴포넌트로 전달됩니다.
        
        대부분의 속성의 경우 컴포넌트에 제공된 값은 컴포넌트에서 설정된 값을 대체합니다. 
        예를 들어, type="large"가 전달되면 type="date"를 대체할 것이고 아마도 망가뜨릴 것입니다! 
        다행스럽게도 class와 style 속성은 똑똑하기 때문에 두 값이 합쳐져서 최종 값인 form-control date-picker-theme-dark를 만듭니다.

        우리는 부모가 prop을 사용하여 자식에게 데이터를 전달할 수 있다는 것을 알았지만, 
        문제가 발생했을 때 어떻게 부모에게 다시 알릴까요? 
        바로 Vue의 사용자 정의 이벤트 시스템이 들어오는 곳입니다.

        클래스의 경우에는 추가 병합이 가능하나 일반 적인 html 속성같은경우엔 교체해서 들어간다. 이 원리는 좀더 파악해볼 필요가 있다.
*/

/*
    v-on을 이용한 사용자 지정 이벤트

        모든 Vue 인스턴스는 다음과 같은 이벤트 인터페이스를 구현합니다.
            $on(eventName)을 사용하여 이벤트를 감지 하십시오.
            $emit(eventName)을 사용하여 이벤트를 트리거 하십시오.
        
        Vue의 이벤트 시스템은 브라우저의 EventTarget API와 별개입니다. 
        비슷하게 작동하지만 $on 과 $emit 는 addEventListener 와 dispatchEvent의 별칭이 아닙니다.

        또한, 부모 컴포넌트는 자식 컴포넌트가 사용되는 템플릿에서 직접 v-on 을 사용하여 자식 컴포넌트에서 보내진 이벤트를 청취할 수 있습니다.

        $on은 자식에서 호출한 이벤트는 감지하지 않습니다. v-on을 템플릿에 반드시 지정해야 합니다. 아래의 예제를 보십시오.

        <div id="counter-event-example">
            <p>{{ total }}</p>
            <button-counter v-on:increment="incrementTotal"></button-counter>
            <button-counter v-on:increment="incrementTotal"></button-counter>
        </div>
*/
Vue.component('button-counter', {
    template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
    data: function () {
      return {
        counter: 0
      }
    },
    methods: {
      incrementCounter: function () {
        this.counter += 1
        this.$emit('increment')
      }
    },
  })
  
  new Vue({
    el: '#counter-event-example',
    data: {
      total: 0
    },
    methods: {
      incrementTotal: function () {
        this.total += 1
      }
    }
});
// 위 컴포넌트가 외부에서 발생 하는 것과 완전히 분리 된다는 점에 유의
// 부모 컴포넌트가 신경 쓸 수 있는 경우를 대비하여 자체 활동에 대한 정보를 보고 하는 것뿐

/*
    컴포넌트에 네이티브 이벤트 바인딩
        컴포넌트의 루트 엘리먼트에서 네이티브 이벤트를 수신하려는 경우가 있을 수 있습니다. 이러한 경우 v-on 에 .native 수식자를 사용할 수 있습니다. 예 :
        <my-component v-on:click.native="doTheThing"></my-component>
    
    native 속성을 이용하여 네이티브 이벤트 수신도 가능하다.
*/

/*
    .sync 수식어: 2.3.0+
        일부 경우에 속성에 “양방향 바인딩”이 필요할 수 있습니다. 
        Vue 1버전에 있던 .sync 수식어와 동일합니다. 
        자식 컴포넌트가 .sync를 가지는 속성을 변경하면 값의 변경이 부모에 반영됩니다. 
        편리하지만 단방향 데이터 흐름이 아니기 때문에 장기적으로 유지보수에 문제가 생깁니다. 
        자식 속성을 변경하는 코드는 부모의 상태에 영향을 미칩니다.

        이 때문에 .sync는 2.0버전에서 삭제되었습니다. 
        그러나 재사용 가능한 컴포넌트를 만들 때 유용할 수 있다는 점을 알게 되었습니다. 
        부모 상태에 영향을 미치는 코드를 더욱 일관적이고 명백하게 만들어야합니다.

        2.3 버전에서 속성을 위한 .sync 수식어를 다시 만들었습니다. 자동으로 v-on로 확장되는 신택스 슈가입니다. 

        <comp :foo.sync="bar"></comp>
        하위 컴포넌트가 foo를 갱신하려면 속성을 변경하는 대신 명시적으로 이벤트를 보내야합니다.
        this.$emit('update:foo', newValue)
        자식에서 부모로 전달할때 명확하게 바꿀대상과 새로운 값을 명시적으로 전달해 주어야 한다.
*/

/*
    사용자 정의 이벤트를 사용하여 폼 입력 컴포넌트 만들기
        사용자 정의 이벤트는 v-model 에서 작동하는 사용자 정의 입력을 만드는데에도 사용할 수 있습니다. 기억하세요.
        <input v-model="something">
        위 문장은 아래와 같습니다.
            <input
                v-bind:value="something"
                v-on:input="something = $event.target.value">
        컴포넌트와 함께 사용하면 다음과 같이 간단해집니다.
            <custom-input
                :value="something"
                @input="value => { something = value }">
            </custom-input>

        따라서 v-model을 사용하는 컴포넌트는 (2.2.0버전 이상에서 설정을 조작할 수 있습니다.)
            value prop를 가집니다.       
            새로운 값으로 input 이벤트를 내보냅니다.
        매우 간단한 통화 입력을 사용하는 모습을 보겠습니다.
            <currency-input v-model="price"></currency-input>
*/
Vue.component('currency-input', {
    template: '\
      <span>\
        $\
        <input\
          ref="input"\
          v-bind:value="value"\
          v-on:input="updateValue($event.target.value)">\
      </span>\
    ',
    props: ['value'],
    methods: {
      // 값을 직접 업데이트하는 대신 이 메소드를 사용하여
      // 입력 값에 대한 서식을 지정하고 배치 할 수 있습니다
      updateValue: function (value) {
        var formattedValue = value
          // 공백을 제거합니다.
          .trim()
          // 소수 자릿수 2자리로 줄입니다
          .slice(
            0,
            value.indexOf('.') === -1
              ? value.length
              : value.indexOf('.') + 3
          )
        // 값이 아직 정규화 되지 않은 경우
        // 이를 수동으로 재정의하여 조건을 충족시킵니다.
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue
        }
        // 입력 이벤트를 통해 숫자 값을 내보냅니다.
        this.$emit('input', Number(formattedValue))
      }
    }
});
// 위의 구현은 꽤 단순합니다. 예를 들어, 사용자는 때때로 여러 마침표와 글자를 입력 할 수 있습니다. 그렇기 때문에 보다 강력한 통화 필터를 사용할 수 있습니다.

/*
    컴포넌트의 v-model 사용자 정의: 2.2.0 버전에서 추가됨

    기본적으로 컴포넌트의 v-model은 value를 보조 변수로 사용하고 
    input을 이벤트로 사용하지만 체크 박스와 라디오 버튼과 같은 일부 입력 타입은 다른 목적으로 value 속성을 사용할 수 있습니다. 
    model 옵션을 사용하면 다음 경우에 충돌을 피할 수 있습니다:
    Vue.component('my-checkbox', {
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            // 다른 목적을 위해 `value` prop를 사용할 수 있습니다.
            checked: Boolean,
            value: String
        },
        // ...
    })
    <my-checkbox v-model="foo" value="some value"></my-checkbox>    
*/

/*
    비 부모-자식간 통신
        때로는 두 컴포넌트가 서로 통신 할 필요가 있지만 서로 부모/자식이 아닐 수도 있습니다. 
        간단한 시나리오에서는 비어있는 Vue 인스턴스를 중앙 이벤트 버스로 사용할 수 있습니다.
*/
var bus = new Vue();
// 컴포넌트 A의 메소드
bus.$emit('id-selected', 1);
// 컴포넌트 B의 created 훅
bus.$on('id-selected', function (id) {
    // ...
});
// 보다 복잡한 경우에는 전용 상태 관리 패턴을 고려해야합니다. 간단하게 뷰객체 하나를 생성해서 전달하고 이벤트를 리스터를 동해 전달 할수 있다.

