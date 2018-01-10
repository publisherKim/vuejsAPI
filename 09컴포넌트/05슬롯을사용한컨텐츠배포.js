/*
    슬롯을 사용한 컨텐츠 배포
        컴포넌트를 사용할 때 다음과 같이 컴포넌트를 구성하는 것이 좋습니다.
        <app>
            <app-header></app-header>
            <app-footer></app-footer>
        </app>
    
     주목해야할 두가지 사항
        1. <app> 컴포넌트는 어떤 컨텐츠를 받을지 모릅니다. 그것은 <app>이 사용하는 컴포넌트에 의해 결정됩니다.
        2. <app> 컴포넌트에는 자체 템플릿이 있을 가능성이 큽니다.
    위 구성으로 작동하도록 하려면 부모 “content”와 컴포넌트의 자체 템플릿을 섞는 방법이 필요합니다. 
    이것은 콘텐츠 배포 (또는 Angular에 익숙한 경우 “transclusion”) 프로세스입니다. 
    Vue.js는 현재 웹 컴포넌트 사양 초안을 모델로 한 콘텐츠 배포 API를 구현하며 원본 콘텐츠의 배포판 역할을하기 위해 특수한 <slot> 엘리먼트를 사용합니다.
*/

/*
    범위 컴파일
        API를 파헤치기 전에 먼저 내용이 컴파일되는 범위를 명확히 해야합니다. 다음과 같은 템플릿이 있다고 상상해보겠습니다.
            <child-component>
                {{ message }}
            </child-component>
        message가 부모 데이터 또는 자식 데이터중 어디에 바인딩되어야 할까요? 대답은 부모입니다. 
        컴포넌트 범위에 대한 간단한 법칙은 다음과 같습니다.
            상위 템플릿의 모든 내용은 상위 범위로 컴파일됩니다. 하위 템플릿의 모든 내용은 하위 범위에서 컴파일됩니다.
        일반적인 실수는 부모 템플릿의 하위 속성/메소드에 디렉티브를 바인딩하려고하는 것입니다.
            <!-- 작동하지 않습니다 -->
            <child-component v-show="someChildProperty"></child-component>
            someChildProperty가 자식 컴포넌트의 속성이라고 가정하면, 위의 예제는 작동하지 않을 것입니다. 
            상위 템플릿은 하위 컴포넌트의 상태를 인식하지 못합니다.
        
        컴포넌트 루트 노드에서 하위 범위 디렉티브를 바인딩 해야하는 경우 하위 컴포넌트의 자체 템플릿에서 하위 범위 디렉티브를 바인딩해야합니다.
        Vue.component('child-component', {
            // 이제 작동합니다. 올바른 위치에 놓여 있습니다.
            template: '<div v-show="someChildProperty">Child</div>',
            data: function () {
                return {
                    someChildProperty: true
                }
            }
        });
        마찬가지로 분산된 콘텐츠는 상위 범위에서 컴파일됩니다.
*/

/*
    단일 슬롯
        하위 컴포넌트 템플릿에 최소한 하나의 <slot> 콘텐츠가 포함되어 있지 않으면 부모 콘텐츠가 삭제 됩니다. 
        속성이 없는 슬롯이 하나 뿐인 경우 전체 내용 조각이 DOM의 해당 위치에 삽입되어 슬롯 자체를 대체합니다.

        원래 <slot> 태그 안에 있는 내용은 대체 콘텐츠 로 간주됩니다. 
        대체 콘텐츠는 하위 범위에서 컴파일되며 호스팅 엘리먼트가 비어 있고 삽입할 콘텐츠가 없는 경우에만 표시됩니다.

        다음 템플릿으로 my-component라는 컴포넌트가 있다고 가정하십시오.
        <div>
            <h2>나는 자식 컴포넌트의 제목입니다</h2>
            <slot>
                제공된 컨텐츠가 없는 경우에만 보실 수 있습니다.
            </slot>
        </div>
        그리고 그 컴포넌트를 사용하는 부모는
        <div>
            <h1>나는 부모 컴포넌트의 제목입니다</h1>
            <my-component>
                <p>이것은 원본 컨텐츠 입니다.</p>
                <p>이것은 원본 중 추가 컨텐츠 입니다</p>
            </my-component>
        </div>       
        아래처럼 렌더링 됩니다.
        <div>
            <h1>나는 부모 컴포넌트의 제목입니다</h1>
            <div>
                <h2>나는 자식 컴포넌트의 제목 입니다</h2>
                <p>이것은 원본 컨텐츠 입니다.</p>
                <p>이것은 원본 중 추가 컨텐츠 입니다</p>
            </div>
        </div>
*/

/*
    이름을 가지는 슬롯
        <slot> 엘리먼트는 특별한 속성 인 name 을 가지고 있습니다. 
        이 속성은 어떻게 내용을 배포해야 하는지를 더 커스터마이징하는 데 사용할 수 있습니다. 
        이름이 다른 슬롯이 여러 개 있을 수 있습니다. 
        이름을 가진 슬롯은 내용 조각에 해당 slot 속성이 있는 모든 엘리먼트와 일치합니다.

        명명되지 않은 슬롯이 하나 있을 수 있습니다. 
        기본 슬롯 은 일치하지 않는 콘텐츠의 포괄적인 컨텐츠 역할을 합니다. 
        기본 슬롯이 없으면 일치하지 않는 콘텐츠가 삭제됩니다.

        예를 들어, 다음과 같은 템플릿을 가진app-layout 컴포넌트가 있다고 가정 해보십시오 :
        <div class="container">
            <header>
                <slot name="header"></slot>
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
        부모 마크업
        <app-layout>
            <h1 slot="header">여기에 페이지 제목이 위치합니다</h1>

            <p>메인 컨텐츠의 단락입니다.</p>
            <p>하나 더 있습니다.</p>

            <p slot="footer">여기에 연락처 정보입니다.</p>
        </app-layout>       
        아래와 같이 렌더링 됩니다.
        <div class="container">
            <header>
                <h1>여기에 페이지 제목이 위치합니다</h1>
            </header>
            <main>
                <p>메인 컨텐츠의 단락입니다.</p>
                <p>하나 더 있습니다.</p>
            </main>
            <footer>
                <p>여기에 연락처 정보입니다.</p>
            </footer>
        </div>
        콘텐츠 배포 API는 함께 구성할 컴포넌트를 디자인 할 때 매우 유용한 메커니즘입니다.       
*/

/*
    범위를 가지는 슬롯: 2.1.0+
        범위가 지정된 슬롯은 이미 렌더링 된 엘리먼트 대신 재사용 가능한 템플릿(데이터를 전달할 수 있음)으로 작동하는 특별한 유형의 슬롯입니다.
        prop을 컴포넌트에게 전달하는 것처럼, 하위 컴포넌트에서 단순히 데이터를 슬롯에 전달하면 됩니다.
        <div class="child">
            <slot text="hello from child"></slot>
        </div>
        부모에서, 특별한 속성 slot-scope를 가진 <template> 엘리먼트가 있어야 합니다. 
        이것은 범위를 가지는 슬롯을 위한 템플릿임을 나타냅니다. 
        slot-scope의 값은 자식으로부터 전달 된 props 객체를 담고있는 임시 변수의 이름입니다:
        <div class="parent">
            <child>
                <template slot-scope="props">
                    <span>hello from parent</span>
                    <span>{{ props.text }}</span>
                </template>
            </child>
        </div>
        위를 렌더링하면 출력은 다음과 같습니다.
        <div class="parent">
            <div class="child">
                <span>hello from parent</span>
                <span>hello from child</span>
            </div>
        </div>
    2.5.0+에서, slot-scope 는 더이상 <template> 뿐 아니라 컴포넌트나 엘리먼트에서도 사용할 수 있습니다.
    범위가 지정된 슬롯의 보다 일반적인 사용 사례는 컴포넌트 사용자가 리스트의 각 항목을 렌더링하는 방법을 사용자 정의할 수 있는 리스트 컴포넌트입니다.
    <my-awesome-list :items="items">
        <!-- scoped slot 역시 이름을 가질 수 있습니다 -->
        <li
            slot="item"
            slot-scope="props"
            class="my-fancy-item">
            {{ props.text }}
        </li>
    </my-awesome-list>
    그리고 리스트 컴포넌트의 템플릿 :
    <ul>
        <slot name="item"
            v-for="item in items"
            :text="item.text">
            <!-- 대체 컨텐츠는 여기입니다. -->
        </slot>
    </ul>   
*/

/*
    디스트럭처링
        slot-scope 값은 실제로 함수 서명의 인수 위치에 나타날 수 있는 유효한 JavaScript 표현식입니다. 
        이는 지원되는 환경 (싱글 파일 컴포넌트 또는 최신 브라우저)에서 ES2015 디스트럭처를 사용할 수 있다는 것을 의미합니다.
    <child>
        <span slot-scope="{ text }">{{ text }}</span>
    </child>
*/