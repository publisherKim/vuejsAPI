// 계산된 속성: 템플릿 내에서 사용하는 표현식은 매우 편리하지만 단순한 연산에만 사용
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
/*
    이 시점에서, 템플릿은 더이상 간단하지 않고 장황합니다. 
    message를 역순으로 표시한다는 것을 알기 전에 잠깐 다시 보아야 합니다. 
    템플릿에 뒤집힌 메시지를 두번 이상 포함하려는 경우 문제가 더욱 악화됩니다.

    이 때문에 복잡한 로직의 경우, 반드시 계산된 속성 을 사용해야합니다.
*/

// basic sample
<div id="example">
  <p>원본 메시지: "{{ message }}"</p>
  <p>뒤집히도록 계산된 메시지: "{{ reversedMessage }}"</p>
</div>

var vm = new Vue({
    el: '#example',
    data: {
      message: '안녕하세요'
    },
    computed: {
      // 계산된 getter
      reversedMessage: function () {
        // `this` 는 vm 인스턴스를 가리킵니다.
        return this.message.split('').reverse().join('')
      }
    }
});
/*
    result 
        original message : '안녕하세요'
        reverse message: '요세하녕안'
    
    자연스럽게 원본도 보존하면서, 코드도 깔끔해짐을 알수 있다.
    여기서 우리는 계산된 속성인 reversedMessage를 선언,
    우리가 제공하는 함수는 vm.reversedMessage속성에 대한 getter 함수로 사용
*/
console.log(vm.reversedMessage) // => '요세하녕안'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
/*
    vm.reversedMessage의 값은 항상 vm.message의 값에 의존
    일반 속성처럼 템플릿의 계산된 속성에 데이터 바인딩 할수 있음
    Vue는 vm.reversedMessage가 vm.message에 의존하는 것을 알고 있기 때문에 vm.message가 바뀔 때 vm.reversedMessage에 의존하는 바인딩을 모두 업데이트할 것
    가장 중요한 것은 우리가 선언적으로 의존 관계를 만들었다는 것
    계산된 getter 함수는 사이드 이펙트가 없어 테스트와 추론하기에 쉬움
*/

// 계산된 캐싱 vs 메소드: 표현식에서 메소드를 호출하여 같은 결과를 얻을 수 있다는 사실을 알고 있을 
<p>뒤집힌 메시지: "{{ reversedMessage() }}"</p>
// 컴포넌트 내부
methods: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
}
/*
    계산된 속성 대신 메소드와 같은 함수를 정의할 수 있습니다. 
    최종 결과에 대해 두가지 접근 방식은 서로 동일합니다. 
    하지만 차이점은 계산된 속성은 종속성에 따라 캐시된다는 것 입니다. 
    계산된 속성은 종속성 중 일부가 변경된 경우에만 다시 계산 됩니다. 
    이것은 message가 변경되지 않는 한, 계산된 속성인 reversedMessage에 대한 다중 접근은 함수를 다시 수행할 필요 없이 이전에 계산된 결과를 즉시 반환한다는 것을 의미합니다
*/
// 이것은 또한 Date.now()가 반응형 의존성을 가지지 않기 때문에 다음 계산된 속성이 절대로 업데이트 되지 않는 것을 의미합니다.
computed: {
    now: function () {
      return Date.now()
    }
}
// 비교해보면, 메소드 호출은 재 렌더링 할 때마다 항상 메소드를 호출
/*
    캐싱이 왜 필요할까요? 
    우리가 시간이 많이 소요되는 A 속성을 가지고 있다고 가정하면 거대한 배열을 반복하고 많은 계산을 해야합니다. 
    그런 다음 우리는 A 에 의존하는 다른 계산된 속성을 가질 수 있습니다. 
    캐싱하지 않으면 A 의 getter를 필요한 것보다 더 많이 실행하게 됩니다! 
    캐싱을 원하지 않는 경우 메소드를 사용
*/