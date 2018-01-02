// 계산된 속성 vs 감시된 속성: 다른 데이터 기반으로 변경할 필요가 있는 데이터가 있는 경우, watch 콜백보다 계산된 속성을 사용하는 것이 더 좋음
<div id="demo">{{ fullName }}</div>
var vm = new Vue({
    el: '#demo',
    data: {
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    },
    watch: {
      firstName: function (val) {
        this.fullName = val + ' ' + this.lastName
      },
      lastName: function (val) {
        this.fullName = this.firstName + ' ' + val
      }
    }
});
// 감시된 속성은 반복이 필수적

var vm = new Vue({
    el: '#demo',
    data: {
      firstName: 'Foo',
      lastName: 'Bar'
    },
    computed: {
      fullName: function () {
        return this.firstName + ' ' + this.lastName
      }
    }
});
// 계산된 속성 is better? 

// 계산된 setter: 계산된 속성은 기본적으로 getter만 가지고 있지만, 필요한 경우 setter를 제공
computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
}
// 이제 vm.fullName = 'John Doe'를 실행하면 설정자가 호출되고 vm.firstName과 vm.lastName이 그에 따라 업데이트 됩니다. 

// 감시자: 대부분의 경우 계산된 속성이 더 적합하지만 사용자 정의 감시자가 필요한 경우, Vue는 watch 옵션을 통해 데이터 변경에 반응하는 보다 일반적인 방법을 제공
// 감시자 예제 index.html 참고