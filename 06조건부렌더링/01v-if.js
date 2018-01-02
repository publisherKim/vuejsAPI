// 조건부 렌더링
// v-if: Handlebars와 같은 문자열 템플릿에서 다음과 같은 조건부 블록을 작성
// Handlebars 템플릿
{{#if ok}}
  <h1>Yes</h1>
{{/if}}

// Vue에서는 v-if 디렉티브를 사용하여 같은 결과를 얻을 수 있음
<h1 v-if="ok">Yes</h1>
// v-else와 함께 “else 블록”을 추가하는 것도 가능
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>

// <template>에 v-if을 갖는 조건부 그룹 만들기
/*
    v-if는 디렉티브기 때문에 하나의 엘리먼트에 추가해야합니다.
    하지만 하나 이상의 엘리먼트를 트랜지션하려면 어떻게 해야할까요?
    이 경우 우리는 보이지 않는 래퍼 역할을 하는 <template> 엘리먼트에 v-if를 사용할 수 있습니다.
    최종 렌더링 결과에는 <template> 엘리먼트가 포함되지 않습니다.
*/
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

// v-else: v-else 디렉티브를 사용하여 v-if에 대한 “else 블록”을 표현 가능
<div v-if="Math.random() > 0.5">
  이제 나를 볼 수 있어요
</div>
<div v-else>
  이제는 안보입니다
</div>
// v-else 엘리먼트는 v-if 엘리먼트 또는 v-else-if 엘리먼트 바로 뒤에 있어야 합니다. 그렇지 않으면 인식할 수 없습니다.

// v-else-if: 2.1.0+, v-else-if는 이름에서 알 수 있듯, v-if에 대한 “else if 블록” 역할을 합니다. 또한 여러 개를 사용할 수 있습니다.
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
// v-else와 마찬가지로, v-else-if 엘리먼트는 v-if 또는 v-else-if 엘리먼트 바로 뒤에 와야 함, 개인적으로 이런한 타입의 ui를 지향해야 한다고 생각함
 
// key를 이용한 재사용 가능한 엘리먼트 제어
/*
  Vue는 가능한 한 효율적으로 엘리먼트를 렌더링하려고 시도하며 종종 처음부터 렌더링을 하지않고 다시 사용합니다. 
  Vue를 매우 빠르게 만드는데 도움이 되는 것 이외에 몇가지 유용한 이점이 있습니다. 
  예를 들어 사용자가 여러 로그인 유형을 트랜지션할 수 있도록 허용하는 경우입니다.  
*/
/*
  <template v-if="loginType === 'username'">
    <label>사용자 이름</label>
    <input placeholder="사용자 이름을 입력하세요">
  </template>
  <template v-else>
    <label>이메일</label>
    <input placeholder="이메일 주소를 입력하세요">
  </template>
  loginType을 바꾸어도 사용자가 이미 입력한 내용은 지워지지 않습니다. 두 템플릿 모두 같은 요소를 사용하므로 <input>은 대체되지 않고 단지 placeholder만 변경됩니다.

  이것은 항상 바람직하지는 않습니다. 때문에 “이 두 엘리먼트는 완전히 별개이므로 다시 사용하지 마십시오.”라고 알리는 방법을 제공합니다. 
  유일한 값으로 key 속성을 추가하십시오.
*/
/*
  <template v-if="loginType === 'username'">
    <label>사용자 이름</label>
    <input placeholder="사용자 이름을 입력하세요" key="username-input">
  </template>
  <template v-else>
    <label>이메일</label>
    <input placeholder="이메일 주소를 입력하세요" key="email-input">
  </template>
  키를 통해 식별하수 있음!!!
  효율적으로 재사용이 가능해짐
*/