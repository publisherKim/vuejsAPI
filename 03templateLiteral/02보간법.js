// 문자열: 데이터 바인딩의 가장 기본 형태는 “Mustache” 구문(이중 중괄호)을 사용한 텍스트 보간
<span>메지지: {{msg}}</span>
// Mustache 태그는 해당 데이터 객체의 msg 속성 값으로 대체 and 데이터 객체의 msg 속성이 변경될 때 마다 갱신

// v-once 디렉티브를 사용하여 데이터 변경 시 업데이트 되지 않는 일회성 보간을 수행할 수 있지만, 같은 노드의 바인딩에도 영향을 미친다는 점을 유의
// <span v-once>다시는 변경하지 않습니다: {{ msg }}</span>

// 원시 HTML: 이중 중괄호(mustaches)는 HTML이 아닌 일반 텍스트로 데이터를 해석 실제 HTML을 출력하려면 v-html 디렉티브를 사용
// <div v-html="rawHtml"></div>
// . Vue는 문자열 기반 템플릿 엔진이 아니기 때문에 v-html을 사용하여 템플릿 부분을 작성할 수 없다.

// 속성: Mustaches는 HTML 속성으로 사용할 수 없으며 대신 v-bind 디렉티브를 사용
// <div v-bind:id="dynamicId"></div>
// Boolean 속성에 대해서도 작동
// <button v-bind:disabled="isButtonDisabled">Button</button>
// html 속성을 쓰고 싶다면 디렉티브를 사용해라.

// javscript 표현식 사용:  Vue.js는 모든 데이터 바인딩 내에서 JavaScript 표현식의 모든 기능을 지원
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
// <div v-bind:id="'list-' + id"></div>
// Vue 인스턴스 데이터 범위 내에서 JavaScript로 계산
// 한가지 제한사항은 각 바인딩에 하나의 단일 표현식 만 포함, 문은 동작하지 않는다.(삼항식을 써라)