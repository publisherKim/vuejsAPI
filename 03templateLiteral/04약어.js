// 약어: ue.js가 모든 템플릿을 관리하는 SPA를 만들 때 v- 접두어의 필요성이 떨어짐, 가장 자주 사용되는 두개의 디렉티브인 v-bind와 v-on에 대해 특별한 약어를 제공

// 전체 문법
// <a v-bind:href="url"> ... </a>
// 약어
// <a :href="url"> ... </a>

// 전체 문법
// <a v-on:click="doSomething"> ... </a>

// 약어
// <a @click="doSomething"> ... </a>

// :와 @는 속성 이름에 유효한 문자이며 Vue.js를 지원하는 모든 브라우저는 올바르게 구문 분석을 함, 약어는 완전히 선택사항이지만 나중에 익숙해지면 편함