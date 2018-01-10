// 최초 렌더링 시 트랜지션
/*
    노드의 초기 렌더에 트랜지션을 적용하고 싶다면 appear 속성을 추가 할 수 있습니다 :
    <transition appear>
        <!-- ... -->
    </transition>
    기본적으로 진입 및 진출에 지정된 트랜지션을 사용합니다. 그러나 원하는 경우 사용자 정의 CSS 클래스를 지정할 수도 있습니다.
    <transition
        appear
        appear-class="custom-appear-class"
        appear-to-class="custom-appear-to-class" (2.1.8+)
        appear-active-class="custom-appear-active-class"
    >
    <!-- ... -->
    </transition>
    그리고 사용자 정의 JavaScript 훅 입니다.
    <transition
        appear
        v-on:before-appear="customBeforeAppearHook"
        v-on:appear="customAppearHook"
        v-on:after-appear="customAfterAppearHook"
        v-on:appear-cancelled="customAppearCancelledHook"
    >
    <!-- ... -->
    </transition>
*/