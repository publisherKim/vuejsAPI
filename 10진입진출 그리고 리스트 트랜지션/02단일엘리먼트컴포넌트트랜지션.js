// 단일 엘리먼트 / 컴포넌트 트랜지션
/*
    Vue는 트랜지션 래퍼 컴포넌트를 제공하므로 다음과 같은 상황에서 모든 엘리먼트 또는 컴포넌트에 대한 진입 / 진출 트랜지션을 추가 할 수 있습니다.
        조건부 렌더링 (v-if 사용)
        조건부 출력 (v-show 사용)
        동적 컴포넌트
        컴포넌트 루트 노드
*/
// 다음 매우 간단한 예제를 보겠습니다.
/*
    <div id="demo">
        <button v-on:click="show = !show">
            Toggle
        </button>
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
    </div>
*/
new Vue({
    el: '#demo',
    data: {
      show: true
    }
});
/*
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
*/
/*
    transition 컴포넌트로 싸여진 엘리먼트가 삽입되거나 제거 될 때 일어납니다:
        1. Vue는 대상 엘리먼트에 CSS 트랜지션 또는 애니메이션이 적용되었는지 여부를 자동으로 감지합니다. 
           그렇다면 CSS 트랜지션 클래스가 적절한 타이밍에 추가 / 제거됩니다.

        2. 트랜지션 컴포넌트가 JavaScript 훅를 제공하면 이러한 훅은 적절한 타이밍에 호출됩니다.

        3. CSS 트랜지션 / 애니메이션이 감지되지 않고 JavaScript 훅이 제공 되지 않으면 삽입 또는 제거를 위한 DOM 작업이 다음 프레임에서 즉시 실행됩니다 
           (참고: 이는 Vue의 nextTick 개념과는 다른 브라우저 애니메이션 프레임입니다).   
*/

/*
    트랜지션 클래스
        진입 / 진출 트랜지션에는 네가지 클래스가 적용됩니다.
            1. v-enter: enter의 시작 상태. 엘리먼트가 삽입되기 전에 적용되고 한 프레임 후에 제거됩니다.
            2. v-enter-active: enter에 대한 활성 및 종료 상태. 엘리먼트가 삽입되기 전에 적용됩니다. 트랜지션 / 애니메이션이 완료되면 제거됩니다.
            3. v-enter-to: 2.1.8 이상 버전에서 지원합니다. 
               진입 상태의 끝에서 실행됩니다. 
               엘리먼트가 삽입된 후 (동시에 v-leave가 제거됨), 트랜지션/애니메이션이 끝나면 제거되는 하나의 프레임을 추가했습니다.  
            4. v-leave: leave를 위한 시작 상태. 진출 트랜지션이 트리거 될 때 적용되고 한 프레임 후에 제거됩니다.
            5. v-leave-active: leave에 대한 활성 및 종료 상태. 진출 트랜지션이 트리거되면 적용되고 트랜지션 / 애니메이션이 완료되면 제거됩니다.
            6. v-leave-to: 2.1.8 이상 버전에서 지원합니다. 
               진출 상태의 끝에서 실행됩니다. 
               진출 트랜지션이 트리거되고 (동시에 v-leave가 제거됨), 트랜지션/애니메이션이 끝나면 제거되는 하나의 프레임을 추가했습니다.

                            enter                                       leave               
            opacity: 0              opacity: 1       opacity: 1                         opacity:0
            v-enter                 v-enter-to       v-leave                            v-leave-to
                    v-enter-active                                  v-leave-active

        각 클래스에는 트랜지션 이름이 접두어로 붙습니다. 
        여기서v-접두어는 이름없이 <transition> 엘리먼트를 사용할 때의 기본값입니다. 
        예를 들어<transition name = "my-transition">을 사용하면v-enter 클래스는 my-transition-enter 가 됩니다.

        v-enter-active 와v-leave-active 는 입/출력 트랜지션을 위한 다른 easing curve를 지정할 수있는 기능을 제공합니다. 다음 섹션에서 그 예를 보실 수 있습니다.
*/

// CSS 트랜지션
/*
    가장 일반적인 트랜지션 유형 중 하나는 CSS 트랜지션을 사용합니다. 다음은 간단한 예입니다.
        <div id="example-1">
            <button @click="show = !show">
                Toggle render
            </button>
            <transition name="slide-fade">
                <p v-if="show">hello</p>
            </transition>
        </div>    
*/
new Vue({
    el: '#example-1',
    data: {
      show: true
    }
});
/*
.slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
*/

// CSS 애니메이션
/*
  CSS 애니메이션은 CSS 트랜지션과 같은 방식으로 적용됩니다. 차이점은 요소가 삽입 된 직후에v-enter가 제거되지 않지만 animationend 이벤트에 있습니다.

  다음은 간결함을 위해 접두사가 붙은 CSS 규칙을 생략 한 예입니다.
    <div id="example-2">
        <button @click="show = !show">Toggle show</button>
        <transition name="bounce">
            <p v-if="show">Look at me!</p>
        </transition>
    </div>  
*/
new Vue({
    el: '#example-2',
    data: {
      show: true
    }
});
/*
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
*/

// 사용자 지정 트랜지션 클래스
/*
    다음 속성을 제공하여 사용자 정의 트랜지션 클래스를 지정할 수도 있습니다.
        enter-class
        enter-active-class
        enter-to-class (2.1.8+)
        leave-class
        leave-active-class
        leave-to-class (2.1.8+)    

    이것들은 원본 클래스 명을 오버라이드 합니다. 이는 Vue의 트랜지션 시스템을 Animate.css와 같은 기존 CSS 애니메이션 라이브러리와 결합하려는 경우 특히 유용합니다.
    
    예제 입니다.

    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

    <div id="example-3">
        <button @click="show = !show">
            Toggle render
        </button>
        <transition
            name="custom-classes-transition"
            enter-active-class="animated tada"
            leave-active-class="animated bounceOutRight"
        >
            <p v-if="show">hello</p>
        </transition>
    </div>    
*/
new Vue({
    el: '#example-3',
    data: {
      show: true
    }
});

// 트랜지션과 애니메이션을 함께 사용하기
/*
    Vue는 트랜지션이 종료 된 시점을 알기 위해 이벤트 리스너를 연결해야합니다. 
    적용된 CSS 규칙의 유형에 따라 transitionend 또는 animationend 가 될 수 있습니다. 
    둘 중 하나만 사용하는 경우 Vue는 올바른 유형을 자동으로 감지 할 수 있습니다.

    그러나 어떤 경우에는 같은 엘리먼트 (예: Vue에 의해 트리거 된 CSS 애니메이션)와 함께 호버에 대한 CSS 트랜지션 효과를 둘 다 가질 수도 있습니다. 
    이러한 경우,type 속성에서 Vue가 지켜 볼 타입을 명시적으로 선언해야 합니다. 값은 animation 또는 transition 입니다.
*/

// 명시적 트랜지션 지속 시간: 2.2.0+
/*
    대부분의 경우 Vue는 트랜지션이 완료를 자동으로 감지할 수 있습니다. 
    기본적으로 Vue는 루트 트랜지션 엘리먼트에서 첫 번째 transitionend 또는 animationend 이벤트를 기다립니다. 
    그러나 이것은 항상 이상적인 것은 아닙니다. 
    예를 들어, 중첩 된 내부 엘리먼트가 루트 트랜지션 엘리먼트보다 지연된 트랜지션 또는 더 긴 트랜지션 기간을 갖는 다른 엘리먼트와 함께 진행하는 트랜지션 시퀀스를 가질 수 있습니다.

    이 경우, <transition> 컴포넌트에 duration 속성을 사용하여 명시적인 트랜지션 지속 시간(밀리 초)을 지정할 수 있습니다.
    <transition :duration="1000">...</transition>
    진입과 진출 기간에도 명시적인 값을 지정할 수 있습니다.
    <transition :duration="{ enter: 500, leave: 800 }">...</transition>
*/

// JavaScript 훅
/*
    속성에서 JavaScript 훅을 정의할 수 있습니다.
    <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"

        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
        >
        <!-- ... -->
    </transition>    
*/
// ...
methods: {
    // --------
    // 진입
    // --------
  
    beforeEnter: function (el) {
      // ...
    },
    // done 콜백은 CSS와 함께 사용할 때 선택 사항입니다.
    enter: function (el, done) {
      // ...
      done()
    },
    afterEnter: function (el) {
      // ...
    },
    enterCancelled: function (el) {
      // ...
    },
  
    // --------
    // 진출
    // --------
  
    beforeLeave: function (el) {
      // ...
    },
    // done 콜백은 CSS와 함께 사용할 때 선택 사항입니다.
    leave: function (el, done) {
      // ...
      done()
    },
    afterLeave: function (el) {
      // ...
    },
    // leaveCancelled은 v-show와 함께 사용됩니다.
    leaveCancelled: function (el) {
      // ...
    }
}
// 이러한 훅은 CSS 트랜지션 / 애니메이션 또는 자체적으로 사용할 수 있습니다.
/*
    JavaScript 전용 트랜지션을 하는 경우 enter 및 leave 훅에서 done 콜백이 필요합니다. 그렇지 않으면 동기적으로 호출되고 트랜지션 즉시 완료됩니다.

    Vue가 CSS 탐지를 건너 뛸 수 있도록 JavaScript 전용 트랜지션에 v-bind:css="false"를 명시적으로 추가하는 것도 좋은 생각입니다. 
    이것은 CSS 규칙이 실수로 트랜지션을 방해하는 것을 방지합니다.
*/

// 이제 예를 들어 보겠습니다. 다음은 Velocity.js를 사용한 간단한 JavaScript 트랜지션입니다.
/*
<!-- Velocity는 jQuery.animate와 매우 비슷하게 동작하며 -->
<!-- JavaScript 애니메이션의 훌륭한 옵션입니다. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

<div id="example-4">
  <button @click="show = !show">
    Toggle
  </button>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>
*/
new Vue({
    el: '#example-4',
    data: {
      show: false
    },
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0
      },
      enter: function (el, done) {
        Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
        Velocity(el, { fontSize: '1em' }, { complete: done })
      },
      leave: function (el, done) {
        Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
        Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
        Velocity(el, {
          rotateZ: '45deg',
          translateY: '30px',
          translateX: '30px',
          opacity: 0
        }, { complete: done })
      }
    }
});

