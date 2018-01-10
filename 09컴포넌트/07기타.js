/*
    재사용 가능한 컴포넌트 제작하기
        컴포넌트를 작성할 때 나중에 다른 곳에서 다시 사용할 것인지에 대한 여부를 명심하는 것이 좋습니다. 
        일회용 컴포넌트가 단단히 결합 되어도 상관 없지만 재사용 가능한 컴포넌트는 깨끗한 공용 인터페이스를 정의 해야하며 사용된 컨텍스트에 대한 가정을 하지 않아야합니다.

        Vue 컴포넌트의 API는 prop, 이벤트 및 슬롯의 세 부분으로 나뉩니다.
            Props 는 외부 환경이 데이터를 컴포넌트로 전달하도록 허용합니다.
            이벤트를 통해 컴포넌트가 외부 환경에서 사이드이펙트를 발생할 수 있도록 합니다.
            슬롯 을 사용하면 외부 환경에서 추가 컨텐츠가 포함 된 컴포넌트를 작성할 수 있습니다.

        v-bind 와 v-on 을 위한 전용 약어문을 사용하여 의도를 명확하고 간결하게 템플릿에 전달할 수 있습니다.
       <my-component
            :foo="baz"
            :bar="qux"
            @event-a="doThis"
            @event-b="doThat"
            >
            <img slot="icon" src="...">
            <p slot="main-text">Hello!</p>
        </my-component> 
*/
/*
    자식 컴포넌트 참조
        props나 이벤트가 있었음에도 불구하고 때때로 JavaScript로 하위 컴포넌트에 직접 액세스 해야 할 수도 있습니다. 
        이를 위해 ref 를 이용하여 참조 컴포넌트 ID를 자식 컴포넌트에 할당해야 합니다. 예:
        <div id="parent">
            <user-profile ref="profile"></user-profile>
        </div>
        var parent = new Vue({ el: '#parent' })
        // 자식 컴포넌트 인스턴스에 접근합니다.
        var child = parent.$refs.profile     
        ref가 v-for와 함께 사용될 때, 얻을 수 있는 ref는 데이터 소스를 미러링하는 자식 컴포넌트를 포함하는 배열이 될 것입니다.
        $refs 는 컴포넌트가 렌더링 된 후에만 채워지며 반응적이지 않습니다. 
        그것은 직접 자식 조작을 위한 escape 해치를 의미합니다 
        - 템플릿이나 계산 된 속성에서 $refs를 사용하지 말아야합니다. 
        돔이 생성되고 난뒤에 접근은 할수 있으나 이것의 활용 범위는 매우 제한적일 것이다. vue의 원래 의도를 헤친다.
*/

/*
    비동기 컴포넌트
        대규모 응용 프로그램에서는 응용 프로그램을 더 작은 덩어리로 나누고 실제로 필요할 때만 서버에서 컴포넌트를 로드해야 할 수도 있습니다. 
        Vue를 사용하면 컴포넌트 정의를 비동기식으로 해결하는 팩토리 함수로 컴포넌트를 정의 할 수 있습니다. 
        Vue는 컴포넌트가 실제로 렌더링되어야 할 때만 팩토리 기능을 트리거하고 이후의 리렌더링을 위해 결과를 캐시합니다. 예 :
        Vue.component('async-example', function (resolve, reject) {
            setTimeout(function () {
                // 컴포넌트 정의를 resolve 콜백에 전달합니다.
                resolve({
                    template: '<div>I am async!</div>'
                })
            }, 1000)
        });
        팩토리 함수는 resolve 콜백을 받습니다. 
        이 콜백은 서버에서 컴포넌트 정의를 가져 왔을 때 호출 되어야 합니다. 
        또한 reject (reason) 을 호출하여 로드가 실패 했음을 알릴 수 있습니다. 
        여기서 setTimeout 은 데모 용입니다. 
        컴포넌트를 검색하는 방법은 전적으로 귀하에게 달려 있습니다. 
        권장되는 접근법 중 하나는 Webpack의 코드 분할 기능과 함께 비동기 컴포넌트를 사용하는 것입니다.
*/
Vue.component('async-webpack-example', function (resolve) {
    // 이 특별한 require 구문은 Webpack이 Ajax 요청을 통해
    // 로드되는 번들로 작성된 코드를 자동으로 분리하도록 지시합니다.
    require(['./my-async-component'], resolve)
});
// factory 함수에서 Promise를 반환할 수도 있습니다. 그래서 Webpack 2 + ES2015 구문을 사용하면 다음을 할 수 있습니다 :
Vue.component(
    'async-webpack-example',
    // `import` 함수는 `Promise`를 반환합니다.
    () => import('./my-async-component')
);
// 지역 등록을 사용하는 경우, Promise를 반환하는 함수를 제공할 수 있습니다.
new Vue({
    // ...
    components: {
        'my-component': () => import('./my-async-component')
    }
});
/*
    비동기 컴포넌트를 사용하려는 Browserify 사용자인 경우, 작성자는 불행히도 비동기로드가 Browserify에서 지원하지 않는 것이라고 분명하게 주장합니다. 
    적어도 공식적으로. Browserify 커뮤니티는 기존 및 복잡한 응용 프로그램에 도움이 될 수있는 몇 가지 해결 방법을 발견했습니다. 
    다른 모든 시나리오의 경우 기본 제공되는 비동기식 지원을 위해 Webpack을 사용하는 것이 좋습니다.
*/

/*
    고급 비동기 컴포넌트 2.3.0+
        2.3 버전부터 비동기 컴포넌트 팩토리는 다음 형태의 객체를 반환할 수 있습니다.
*/
const AsyncComp = () => ({
    // 로드하는 컴포넌트입니다. 반드시 Promise이어야합니다.
    component: import('./MyComp.vue'),
    // 비동기 컴포넌트가 로드되는 동안 사용할 컴포넌트
    loading: LoadingComp,
    // 실패했을 경우 사용하는 컴포넌트
    error: ErrorComp,
    // 로딩 컴포넌트를 보여주기전 지연하는 정도. 기본값: 200ms.
    delay: 200,
    // 시간이 초과되면 에러용 컴포넌트가 표시됩니다
    // 기본값: Infinity.
    timeout: 3000
});
/*
    vue-router에서 라우트 컴포넌트로 사용하는 경우 라우트 네비게이션이 발생하기전에 비동기 컴포넌트가 먼저 작동하기때문에 이러한 특성은 무시됩니다. 
    라우트 컴포넌트에서 위의 문법을 사용하려면 vue-router 2.4.0 이상을 사용해야합니다.
*/

/*
    컴포넌트 이름 규약
        컴포넌트 (또는 prop)를 등록 할 때 kebab-case, camelCase 또는 PascalCase를 사용할 수 있습니다.
*/
// 컴포넌트 정의에서
components: {
    // kebab-case를 사용한 등록
    kebab-cased-component: { /* ... */ },
    // camelCase를 사용한 등록
    camelCasedComponent: { /* ... */ },
    // PascalCase를 사용한 등록
    PascalCasedComponent: { /* ... */ }
}
/*
    HTML 템플릿 내에서 kebab-case와 동등한 것을 사용해야합니다.
        <!-- HTML 템플릿에서 항상 kebab-case를 사용하세요 -->
        <kebab-cased-component></kebab-cased-component>
        <camel-cased-component></camel-cased-component>
        <pascal-cased-component></pascal-cased-component>

    그러나 문자열 템플릿을 사용할 때 HTML의 대소문자를 구분하지 않습니다. 
    즉, 템플릿에서도 CamelCase, PascalCase 또는 kebab-case를 사용하여 컴포넌트와 prop을 참조할 수 있습니다.        
        kebab-case
        camelCase를 사용하여 컴포넌트가 정의된 경우 camelCase 또는 kebab-case
        PascalCase를 사용하여 컴포넌트가 정의된 경우 kebab-case, camelCase or PascalCase
*/
components: {
    kebab-cased-component: { /* ... */ },
    camelCasedComponent: { /* ... */ },
    PascalCasedComponent: { /* ... */ }
}
/*
    <kebab-cased-component></kebab-cased-component>

    <camel-cased-component></camel-cased-component>
    <camelCasedComponent></camelCasedComponent>

    <pascal-cased-component></pascal-cased-component>
    <pascalCasedComponent></pascalCasedComponent>
    <PascalCasedComponent></PascalCasedComponent>

    이것은 PascalCase가 가장 보편적 인 선언적 컨벤션임을 의미하며 케밥 케이스는 가장 보편적으로 사용하는 컨벤션입니다.

    컴포넌트가 slot 엘리먼트를 통해 내용을 전달받지 못하면 이름 뒤에 /를 사용하여 자체적으로 닫을 수도 있습니다.
        <my-component/>
    다시 말하지만, 이것은 자기 닫는 사용자 정의 엘리먼트가 유효한 HTML이 아니므로 문자열 템플릿내에서만 작동하며 브라우저의 기본 파서는 이를 이해하지 못합니다.
*/

/*
    재귀 컴포넌트
        컴포넌트는 자신의 템플릿에서 재귀적으로 호출할 수 있습니다. 그러나, 그들은 name 옵션으로만 가능합니다.
        name: 'unique-name-of-my-component'
        Vue.component를 사용하여 컴포넌트를 전역적으로 등록하면, 글로벌 ID가 컴포넌트의 name 옵션으로 자동 설정됩니다.
        Vue.component('unique-name-of-my-component', {
            // ...
        })
        주의하지 않으면 재귀적 컴포넌트로 인해 무한 루프가 발생할 수도 있습니다.
        name: 'stack-overflow',
        template: '<div><stack-overflow></stack-overflow></div>'

        위와 같은 컴포넌트는 “최대 스택 크기 초과” 오류가 발생하므로 재귀 호출이 조건부 (즉, 마지막에 false가 될 v-if를 사용하세요)인지 확인하십시오.
*/

/*
    컴포넌트 사이의 순환 참조
        Finder나 파일 탐색기와 같이 파일 디렉토리 트리를 작성한다고 가정해 보겠습니다. 이 템플릿을 가지고 tree-folder 컴포넌트를 가질 수 있습니다.
            <p>
                <span>{{ folder.name }}</span>
                <tree-folder-contents :children="folder.children"/>
            </p>
        그런 다음이 템플릿이 있는 tree-folder-contents 컴포넌트 :
            <ul>
                <li v-for="child in children">
                    <tree-folder v-if="child.children" :folder="child"/>
                    <span v-else>{{ child.name }}</span>
                </li>
            </ul>  
            
        자세히 살펴보면이 컴포넌트가 실제로 렌더링 트리에서 서로의 자식 및 조상인 패러독스라는 것을 알 수 있습니다! 
        Vue.component를 이용해 전역으로 컴포넌트 등록할 때, 이 패러독스는 자동으로 해결됩니다. 
        그런 경우에 처해있으면 한번 읽어보세요.

        그러나 모듈 시스템 을 사용하여 컴포넌트를 필요로하거나 가져오는 경우. Webpack 또는 Browserify를 통해 오류가 발생합니다.

        컴포넌트를 마운트하지 못했습니다 : 템플릿 또는 렌더링 함수가 정의되지 않았습니다.
        
        무슨 일이 일어나고 있는지 설명하기 위해 모듈 A와 B를 호출 할 것입니다. 
        모듈 시스템은 A가 필요합니다 하지만 A는 B를 우선적으로 필요로 합니다 게다가 B는 A를 필요로 하는 것을 알 수 있습니다. 
        먼저 서로 다른 컴포넌트를 해결하지 않고 두 컴포넌트를 완전히 해결하는 방법을 알지 못합니다. 
        이를 해결하려면 모듈 시스템에 “A는 B를 필요로 하나 B를 먼저 해결할 필요가 없습니다.”라고 말할 수있는 지점을 제공해야합니다.

        여기에서는 tree-folder 컴포넌트로 삼을 것입니다. 
        패러독스를 만드는 자식은 tree-folder-contents 컴포넌트이므로, beforeCreate 라이프 사이클 훅이 등록 될 때까지 기다릴 것입니다.
        beforeCreate: function () {
            this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
        }
        문제가 해결되었습니다!       
*/

/*
    인라인 템플릿
        하위 컴포넌트에 inline-template 이라는 특수한 속성이 존재할 때, 
        컴포넌트는 그 내용을 분산 된 내용으로 취급하지 않고 템플릿으로 사용합니다. 
        따라서 보다 유연한 템플릿 작성이 가능합니다
        <my-component inline-template>
            <div>
                <p>이것은 컴포넌트의 자체 템플릿으로 컴파일됩니다.</p>
                <p>부모가 만들어낸 내용이 아닙니다.</p>
            </div>
        </my-component>
        그러나, inline-template 은 템플릿의 범위를 추론하기 더 어렵게 만듭니다. 
        가장 좋은 방법은 template 옵션을 사용하거나.
        vue 파일의template 엘리먼트를 사용하여 컴포넌트 내부에 템플릿을 정의하는 것입니다.
*/

/*
    X-Templates
        템플리트를 정의하는 또 다른 방법은 text/x-template 유형의 스크립트 엘리먼트 내부에 ID로 템플릿을 참조하는 것입니다. 예:
        <script type="text/x-template" id="hello-world-template">
            <p>Hello hello hello</p>
        </script>
        Vue.component('hello-world', {
            template: '#hello-world-template'
        })
        이 기능은 큰 템플릿이나 매우 작은 응용 프로그램의 데모에는 유용 할 수 있지만 템플릿을 나머지 컴포넌트 정의와 분리하기 때문에 피해야합니다.
*/

/*
    v-once를 이용한 비용이 적게드는 정적 컴포넌트
        일반 HTML 엘리먼트를 렌더링하는 것은 Vue에서 매우 빠르지만 가끔 정적 콘텐츠가 많이 포함 된 컴포넌트가 있을 수 있습니다.
        이런 경우,v-once 디렉티브를 루트 엘리먼트에 추가함으로써 캐시가 한번만 실행되도록 할 수 있습니다.
*/
Vue.component('terms-of-service', {
    template: '\
      <div v-once>\
        <h1>Terms of Service</h1>\
        ... a lot of static content ...\
      </div>\
    '
});
// data binding 같이 동적인 요소가 필요 없는 경우에는 v-once를 적극 활용하는것이 자원 면에서 좋을것 같다. 감시 대상에서제외된다. 자원절약 증가!