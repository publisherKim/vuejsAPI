// 컴포넌트간 트랜지션
/*
    컴포넌트 사이의 트랜지션은 더욱 간단합니다. 우리는key 속성이 필요 없습니다. 대신, 우리는 동적 컴포넌트를 래핑합니다.
    <transition name="component-fade" mode="out-in">
        <component v-bind:is="view"></component>
    </transition>
*/
new Vue({
    el: '#transition-components-demo',
    data: {
      view: 'v-a'
    },
    components: {
      'v-a': {
        template: '<div>Component A</div>'
      },
      'v-b': {
        template: '<div>Component B</div>'
      }
    }
});
/*
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to{
        opacity: 0;
    }    
*/