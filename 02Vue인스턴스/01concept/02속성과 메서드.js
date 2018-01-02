// 속성과 메서드: 각 Vue 인스턴스는 data 객체에 있는 모든 속성을 프록시 처리
// 데이터 객체
var data = { a: 1 }

// Vue인스턴스에 데이터 객체를 추가합니다.
var vm = new Vue({
  data: data
})

// 같은 객체를 참조합니다!
vm.a === data.a // => true

// 속성 설정은 원본 데이터에도 영향을 미칩니다.
vm.a = 2
data.a // => 2

// ... 당연하게도
data.a = 3
vm.a // => 3

// javascript 참조를 이해했으면 위의 말은 당연하다. 새로인스터스를 창조해서 vm 에 할당했어도 vm.a 와 data.a는 같은 메모리 주소의 값을 가져온다.
// 뷰의 특징상 데이터가 갱신되면 화면은 다시 렌덩링된다. 관찰자가 바라보고 데이터의 변경시 다시 그린다.
vm.b = 'hi';
// 새로운 속성이 추가되어도 dom에 binding 되어있지않다면 리렌더가 일어나지 않는다. 관찰자야 관측을 하겠지만, 화면에 그려줄게 없는데 다시 안그리는게 당연하다.
// 반응형 속성이 필요하면 데이터의 아래와값이 기본값을 정의해주고 쓰면된다.
// data: {
//     newTodoText: '',
//     visitCount: 0,
//     hideCompletedTodos: false,
//     todos: [],
//     error: null
// };

// Vue 인스턴스는 데이터 이외에도 많은 인스턴스 속성 및 메소드를 제공
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
});

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 는 인스턴스 메소드 입니다.
vm.$watch('a', function (newVal, oldVal) {
  // `vm.a`가 변경되면 호출 됩니다.
});
// $ 접두어로 사용자 정의 속성과 구별 추후 공부하면 이해가 된다.