// 객체구문: v-bind:style 객체 구문은 매우 직설적, 속성 이름에 camelCase와 kebab-case (따옴표를 함께 사용해야 합니다)를 사용할 수 있음
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
    activeColor: 'red',
    fontSize: 30
}

// 스타일 객체에 직접 바인딩 하여 템플릿이 더 간결하도록 만드는 것이 좋다.
<div v-bind:style="styleObject"></div>
data: {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
}
// 객체 구문은 종종 객체를 반환하는 계산된 속성과 함께 사용

// 배열구문: v-bind:style에 대한 배열 구문은 같은 스타일의 엘리먼트에 여러 개의 스타일 객체를 사용
<div v-bind:style="[baseStyles, overridingStyles]"></div>

// 자동 접두사: v-bind:style 에 브라우저 벤더 접두어가 필요한 CSS 속성 (예: transform)을 사용하면 Vue는 자동으로 해당 접두어를 감지하여 스타일을 적용

// 다중 값 제공: 2.3.0+,  스타일 속성에 접두사가 있는 여러 값을 배열로 전달
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
// 브라우저가 지원하는 배열의 마지막 값만 렌더링, flexbox의 접두어가 붙지않은 버전을 지원하는 브라우저에 대해 display : flex를 렌더링