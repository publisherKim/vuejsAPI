// 수식어
// .lazy:
/* 
    기본적으로, v-model은 각 입력 이벤트 후 입력과 데이터를 동기화 합니다. 
    (단 앞에서 설명한 IME 구성은 제외됩니다.) 
    .lazy 수식어를 추가하여 change 이벤트 이후에 동기화 할 수 있습니다.

    <!-- "input" 대신 "change" 이후에 동기화 됩니다. -->
    <input v-model.lazy="msg" >
*/

// .number: 사용자 입력이 자동으로 숫자로 형변환 되기를 원하면, v-model이 관리하는 input에 number 수식어를 추가하면 됩니다.
/*
    <input v-model.number="age" type="number">
    type="number"를 사용하는 경우에도 HTML 입력 엘리먼트의 값은 항상 문자열을 반환하기 때문에 이것은 종종 유용하게 사용
*/

// .trim: v-model이 관리하는 input을 자동으로 trim 하기 원하면, trim 수정자를 추가하면 됨
/*
    <input v-model.trim="msg">
*/

// v-model 과 컴포넌트
/*
    HTML의 기본 제공 input 유형이 항상 사용자의 요구를 만족시킬 수는 없습니다.
    다행히 Vue 컴포넌트를 사용하면 완전히 사용자 정의 된 동작으로 재사용 가능한 input을 만들 수 있습니다.
    이 input은 v-model에도 작동합니다! 자세한 컴포넌트 가이드의 사용자 정의 입력을 참조하십시오.
*/