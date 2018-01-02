// 필터링 / 정렬 된 결과 표시하기
/*
    때로 원본 데이터를 실제로 변경하거나 재설정하지 않고 배열의 필터링 된 버전이나 정렬된 버전을 표시해야 할 필요가 있습니다. 
    이 경우 필터링 된 배열이나 정렬된 배열을 반환하는 계산된 속성을 만들 수 있습니다.
*/
<li v-for="n in evenNumbers">{{ n }}</li>
data: {
    numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
    evenNumbers: function () {
        return this.numbers.filter(function (number) {
        return number % 2 === 0
        })
    }
}
// 렌더링된 결과
<li>2</li>
<li>4</li>

// 계산된 속성을 실행할 수 없는 상황(예: 중첩 된 v-for 루프 내부)에서는 다음 방법을 사용할 수 있습니다.
<li v-for="n in even(numbers)">{{ n }}</li>
data: {
    numbers: [ 1, 2, 3, 4, 5 ]
},
  methods: {
    even: function (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
}
// 함수안에 인자로서 전달이 가능 즉 even([1,2,3,4,5]) 형태 즉 반환 값은 2, 4 결과는 위와 상동

// Range v-for: v-for 는 숫자를 사용할 수 있습니다. 이 경우 템플릿을 여러번 반복합니다.
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
// result <span>1 2 3 4 5 6 7 8 9 10</span>

// v-for 템플릿: 템플릿 v-if와 마찬가지로, <template>태그를 사용해 여러 엘리먼트의 블럭을 렌더링 
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
// result rendering 아래와같이 두 덩어리가 반복된다는 것을 뜻함.
<li>value(item.msg의 값)</li>
<li class="divider"></li>

// v-for 와 v-if
/*
    동일한 노드에 두가지 모두 있다면, v-for가 v-if보다 높은 우선순위를 갖습니다. 
    즉, v-if는 루프가 반복될 때마다 실행됩니다. 
    이는 일부 항목만 렌더링 하려는 경우 유용합니다.
*/
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
// 데이터의 값중에서 분류하고 필터링기능을 사용하고 싶을때 사용하면 좋음
// 위의 경우 완료되지 않은 할일만 렌더링합니다.
// 위 방법 대신 실행을 조건부로 하는 것이 목적이라면 래퍼 엘리먼트(또는 <template>)을 사용하세요.
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
// 배열이 존재하면 반복문 아니라면 p 조건에 따라 다른 결과를 도출하고 싶을때 사용

// v-for 와 컴포넌트: 2.2.0+ v-for는 key 가 필수, v-for를 사용자 정의 컴포넌트에 직접 사용할 수 있습니다.
<my-component v-for="item in items" :key="item.id"></my-component>
// 그러나 컴포넌트에는 자체 범위가 분리되어있기 때문에 컴포넌트에 데이터를 자동으로 전달하지는 않습니다. 반복할 데이터를 컴포넌트로 전달하려면 props도 사용해야합니다.
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
/*
    컴포넌트에 item을 자동으로 주입하지 않는 이유는 컴포넌트가 v-for의 작동 방식과 밀접하게 결합되기 때문입니다. 
    데이터의 출처를 명확히 하면 다른 상황에서 컴포넌트를 재사용할 수 있습니다.
*/
// 결합도를 떨어뜨리기 위해 사용한듯 컴포넌트의 유연성때문에 상속을 권유하는듯.

// simple sample code
/*
    <div id="todo-list-example">
    <input
        v-model="newTodoText"
        v-on:keyup.enter="addNewTodo"
        placeholder="Add a todo"
    >
    <ul>
        <li
        is="todo-item"
        v-for="(todo, index) in todos"
        v-bind:key="todo.id"
        v-bind:title="todo.title"
        v-on:remove="todos.splice(index, 1)"
        ></li>
    </ul>
    </div>
    is="todo-item" 속성을 보면 <li> 엘리먼트는 <ul> 안에서만 유효합니다. 
    <todo-item>과 같은 일을 하지만 잠재적인 브라우저의 구문 분석 오류를 해결 합니다. 
    자세한 내용은 DOM 템플릿 파싱 주의사항을 참조하세요. https://kr.vuejs.org/v2/guide/components.html#X-Templates
*/
Vue.component('todo-item', {
    template: '\
      <li>\
        {{ title }}\
        <button v-on:click="$emit(\'remove\')">X</button>\
      </li>\
    ',
    props: ['title']
});
  
new Vue({
    el: '#todo-list-example',
    data: {
      newTodoText: '',
      todos: [
        {
          id: 1,
          title: 'Do the dishes',
        },
        {
          id: 2,
          title: 'Take out the trash',
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTodoId: 4
    },
    methods: {
      addNewTodo: function () {
        this.todos.push({
          id: this.nextTodoId++,
          title: this.newTodoText
        })
        this.newTodoText = ''
      }
    }
})
