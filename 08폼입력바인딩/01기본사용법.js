// 기본 사용법
/*
    v-model 디렉티브를 사용하여 폼 input과 textarea 엘리먼트에 양방향 데이터 바인딩을 생성할 수 있습니다.
    입력 유형에 따라 엘리먼트를 업데이트 하는 올바른 방법을 자동으로 선택합니다.
    약간 이상하지만 v-model은 기본적으로 사용자 입력 이벤트에 대한 데이터를 업데이트하는 “syntax sugar”이며 일부 경우에 특별한 주의를 해야합니다.

    v-model은 모든 form 엘리먼트의 초기 value와 checked 그리고 selected 속성을 무시합니다.
    항상 Vue 인스턴스 데이터를 원본 소스로 취급합니다. 
    컴포넌트의 data 옵션 안에 있는 JavaScript에서 초기값을 선언해야합니다.

    IME (중국어, 일본어, 한국어 등)가 필요한 언어의 경우 IME 중 v-model이 업데이트 되지 않습니다. 
    이러한 업데이트를 처리하려면 input 이벤트를 대신 사용하십시오.
*/

// 문자열
/*
    <input v-model="message" placeholder="여기를 수정해보세요">
    <p>메시지: {{ message }}</p>
*/

// 여러줄을 가진 문장
/*
    <span>여러 줄을 가지는 메시지:</span>
    <p style="white-space: pre-line">{{ message }}</p>
    <br>
    <textarea v-model="message" placeholder="여러줄을 입력해보세요"></textarea>
    
    텍스트 영역의 보간 (<textarea>{{ text }}</textarea>)은 작동하지 않습니다. 대신 v-model를 사용
*/

// 체크박스: 하나의 체크박스는 단일 boolean 값을 가집니다.
/*
    <input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
*/
// 여러개의 체크박스는 같은 배열을 바인딩 할 수 있습니다.
/*
    <div id='example-3'>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>체크한 이름: {{ checkedNames }}</span>
    </div>
*/
new Vue({
    el: '#example-3',
    data: {
      checkedNames: []
    }
});

// 라디오
/*
    <input type="radio" id="one" value="One" v-model="picked">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value="Two" v-model="picked">
    <label for="two">Two</label>
    <br>
    <span>선택: {{ picked }}</span>
*/

// 셀렉트: 하나의 셀렉트
/*
    <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
    </select>
    <span>선택함: {{ selected }}</span>
*/
new Vue({
    el: '...',
    data: {
      selected: ''
    }
});
/*
    v-model 표현식의 초기 값이 어떤 옵션에도 없으면, <select> 엘리먼트는 “선택없음” 상태로 렌더링됩니다. 
    iOS에서는 이 경우 변경 이벤트가 발생하지 않아 사용자가 첫 번째 항목을 선택할 수 없게됩니다. 
    따라서 위 예제처럼 사용하지 않는 옵션에 빈 값을 넣는 것이 좋습니다.
*/

// 다중 셀렉트 (배열을 바인딩 합니다):
/*
    <select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
    </select>
    <br>
    <span>Selected: {{ selected }}</span>
*/

// v-for를 이용한 동적 옵션 렌더링
/*
    <select v-model="selected">
    <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
    </option>
    </select>
    <span>Selected: {{ selected }}</span>
*/
new Vue({
    el: '...',
    data: {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
});