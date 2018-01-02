// 객체 변경 감지에 관한 주의사항: 모던 JavaScript의 한계로 Vue는 속성 추가 및 삭제를 감지하지 못합니다.
var vm = new Vue({
    data: {
      a: 1
    }
})
// `vm.a` 는 반응형입니다.

vm.b = 2
// `v
/*
    Vue는 이미 만들어진 인스턴스에 새로운 루트레벨의 반응형 속성을 동적으로 추가하는 것을 허용하지 않습니다. 
    그러나 Vue.set(object, key, value) 메소드를 사용하여 중첩된 객체에 반응형 속성을 추가할 수 있습니다.
*/
var vm = new Vue({
    data: {
      userProfile: {
        name: 'Anika'
      }
    }
});
Vue.set(vm.userProfile, 'age', 27);
// 아마도 object defineProprty를 이용한것과 비슷한것 같다. 
// 인스턴스 메소드인 vm.$set를 사용할 수도 있습니다. 이는 전역 Vue.set의 별칭입니다.
this.$set(this.userProfile, 'age', 27);
// Object.assign()이나 _.extend()를 사용해 기존의 객체에 새 속성을 할당할 수 있습니다. 이 경우 두 객체의 속성을 사용해 새 객체를 만들어야 합니다.
Object.assign(this.userProfile, {
    age: 27,
    favoriteColor: 'Vue Green'
});
// 새로운 반응형 속성을 다음과 같이 추가합니다.
this.userProfile = Object.assign({}, this.userProfile, {
    age: 27,
    favoriteColor: 'Vue Green'
});
// 참고 https://kr.vuejs.org/v2/guide/reactivity.html