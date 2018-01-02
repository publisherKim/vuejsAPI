// 값 바인딩하기: 라디오, 체크박스 및 셀렉트 옵션의 경우, v-model 바인딩 값은 보통 정적인 문자열(또는 체크 박스의 boolean) 입니다.
/*
    <!-- `picked` 는 선택시 문자열 "a" 입니다 -->
    <input type="radio" v-model="picked" value="a">

    <!-- `toggle` 는 true 또는 false 입니다 -->
    <input type="checkbox" v-model="toggle">

    <!-- `selected`는 "ABC" 선택시 "abc" 입니다 -->
    <select v-model="selected">
    <option value="abc">ABC</option>
    </select>

    그러나 때로 값을 Vue 인스턴스에 동적 속성에 바인딩 해야할 수 있습니다. 
    v-bind를 사용할 수 있습니다.
    v-bind를 사용하면 입력 값을 문자열이 아닌 값에 바인딩 할 수도 있습니다.
*/

// 체크박스
/*
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b"
>
*/
// 체크 하면:
vm.toggle === vm.a
// 체크하지 않으면:
vm.toggle === vm.b

// 라디오
/*
<input type="radio" v-model="pick" v-bind:value="a">
*/
// 체크 하면:
vm.pick === vm.a

// 셀렉트 옵션
/*
<select v-model="selected">
  <!-- inline object literal -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
*/
// 선택 하면:
typeof vm.selected // -> 'object'
vm.selected.number // -> 123