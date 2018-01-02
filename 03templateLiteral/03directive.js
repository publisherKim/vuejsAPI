// 디렉티브: 디렉티브는 v- 접두사가 있는 특수 속성, 디렉티브 속성 값은 단일 JavaScript 표현식 (v-for는 예외)
// <p v-if="seen">이제 나를 볼 수 있어요</p>
// v-if 디렉티브는 seen 표현의 진실성에 기반하여 <p> 엘리먼트를 제거 또는 삽입

// 전달인자: 일부 디렉티브는 콜론으로 표시되는 “전달인자”를 사용, 
// 예를 들어, v-bind 디렉티브는 반응적으로 HTML 속성을 갱신하는데 사용
// <a v-bind:href="url"> ... </a>
// href는 전달인자로, 엘리먼트의 href 속성을 표현식 url의 값에 바인드하는 v-bind 디렉티브에게 알려줌
// DOM 이벤트를 수신하는 v-on 디렉티브
// <a v-on:click="doSomething"> ... </a>
// 전달인자는 이벤트를 받을 이름

// 수식어: 수식어는 점으로 표시되는 특수 접미사로, 디렉티브를 특별한 방법으로 바인딩 해야 함
// 예를 들어, .prevent 수식어는 트리거된 이벤트에서 event.preventDefault()를 호출하도록 v-on 디렉티브에게 알려줌
// <form v-on:submit.prevent="onSubmit"> ... </form>