// 트랜지션 재사용
/*
    트랜지션은 Vue의 컴포넌트 시스템을 통해 재사용 할 수 있습니다. 
    재사용 할 수있는 트랜지션을 만드려면 루트에 <transition>또는 <transition-group> 
    컴포넌트를 놓은 다음 자식을 트랜지션 컴포넌트에 전달하면됩니다.    

    다음은 템플릿 컴포넌트를 사용하는 예입니다.
*/
Vue.component('my-special-transition', {
    template: `
      <transition
        name="very-special-transition"
        mode="out-in"
        v-on:before-enter="beforeEnter"
        v-on:after-enter="afterEnter"
      >
        <slot></slot>
      </transition>`,
    methods: {
      beforeEnter: function (el) {
        // ...
      },
      afterEnter: function (el) {
        // ...
      }
    }
});

// 함수형 컴포넌트는 특히 이 작업에 적합합니다.
Vue.component('my-special-transition', {
    functional: true,
    render: function (createElement, context) {
      var data = {
        props: {
          name: 'very-special-transition',
          mode: 'out-in'
        },
        on: {
          beforeEnter: function (el) {
            // ...
          },
          afterEnter: function (el) {
            // ...
          }
        }
      }
      return createElement('transition', data, context.children)
    }
});