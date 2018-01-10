// 동적 트랜지션
/*
    예, Vue의 트랜지션도 데이터 기반입니다! 동적 변환의 가장 기본적인 예제는 name 속성을 동적 속성에 바인딩합니다.
        <transition v-bind:name="transitionName">
            <!-- ... -->
        </transition> 
    이는 Vue의 트랜지션 클래스 규칙을 사용하여 CSS 트랜지션 / 애니메이션을 정의하고 단순히 트랜지션하려는 경우에 유용 할 수 있습니다.
    
    실제로 모든 트랜지션 속성은 동적으로 바인딩 될 수 있습니다. 
    그리고 그것은 단지 속성이 아닙니다. 
    이벤트 훅은 단지 메소드이기 때문에 컨텍스트의 모든 데이터에 액세스 할 수 있습니다. 
    즉, 컴포넌트의 상태에 따라 JavaScript 트랜지션이 다르게 동작 할 수 있습니다.

    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

    <div id="dynamic-fade-demo" class="demo">
        Fade In: <input type="range" v-model="fadeInDuration" min="0" v-bind:max="maxFadeDuration">
        Fade Out: <input type="range" v-model="fadeOutDuration" min="0" v-bind:max="maxFadeDuration">
        <transition
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
        >
            <p v-if="show">hello</p>
        </transition>
        <button
            v-if="stop"
            v-on:click="stop = false; show = false"
        >Start animating</button>
        <button
            v-else
            v-on:click="stop = true"
        >Stop it!</button>
    </div>    
*/
new Vue({
    el: '#dynamic-fade-demo',
    data: {
      show: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      stop: true
    },
    mounted: function () {
      this.show = false
    },
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0
      },
      enter: function (el, done) {
        var vm = this
        Velocity(el,
          { opacity: 1 },
          {
            duration: this.fadeInDuration,
            complete: function () {
              done()
              if (!vm.stop) vm.show = false
            }
          }
        )
      },
      leave: function (el, done) {
        var vm = this
        Velocity(el,
          { opacity: 0 },
          {
            duration: this.fadeOutDuration,
            complete: function () {
              done()
              vm.show = true
            }
          }
        )
      }
    }
});

/*
    마지막으로, 동적 트랜지션을 만드는 궁극적인 방법은 사용되는 트랜지션의 특성을 변경하기 위해 props을 받는 컴포넌트를 사용하는 것입니다. 
    별로인 것 처럼 들리지만, 유일한 한계는 실제로 당신의 상상력에 있습니다.
*/