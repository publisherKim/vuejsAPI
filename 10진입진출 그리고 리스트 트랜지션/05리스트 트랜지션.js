// 리스트 트랜지션
/*
    지금까지 다음과 같은 트랜지션을 다루었습니다.
        개별 노드들
        한번에 하나만 렌더링 되는 여러 노드
    그렇다면v-for를 사용하여 동시에 렌더링 하고자 하는 항목의 전체 목록이 있는 경우는 어떨까요? 
    이 경우 우리는<transition-group> 컴포넌트를 사용합니다. 
    예를 들어보기 전에 이 컴포넌트에 대해 알아야 할 몇 가지 중요한 사항이 있습니다.    

    <transition> 과 달리, 실제 요소인 <span>을 렌더링합니다. tag 속성으로 렌더링 된 요소를 변경할 수 있습니다.
    엘리먼트의 내부 구현은 항상 필요합니다 고유한 key 속성을 갖습니다
*/

// 리스트의 진입 / 진출 트랜지션
/*
    이제 이전에 사용한 것과 같은 CSS 클래스를 사용하여 들어가고 떠나는 간단한 예제를 살펴 보겠습니다.
    <div id="list-demo">
        <button v-on:click="add">Add</button>
        <button v-on:click="remove">Remove</button>
        <transition-group name="list" tag="p">
            <span v-for="item in items" v-bind:key="item" class="list-item">
            {{ item }}
            </span>
        </transition-group>
    </div>    
*/
new Vue({
    el: '#list-demo',
    data: {
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10
    },
    methods: {
      randomIndex: function () {
        return Math.floor(Math.random() * this.items.length)
      },
      add: function () {
        this.items.splice(this.randomIndex(), 0, this.nextNum++)
      },
      remove: function () {
        this.items.splice(this.randomIndex(), 1)
      },
    }
});
/*
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
이 예제에는 한 가지 문제점이 있습니다. 항목을 추가하거나 제거 할 때 항목이 순조롭게 트랜지션되는 대신 새 위치에 즉시 변화합니다. 나중에 해결할 것입니다.
*/

// 리스트 이동 트랜지션
/*
    <transition-group> 컴포넌트는 또 다른 속임수를 가지고 있습니다. 
    그것은 진입과 진출 것뿐만 아니라 위치의 변화도 생생하게 표현할 수 있습니다. 
    이 기능을 사용하기 위해 알아야 할 유일한 새로운 개념은 아이템이 위치를 바꿀 때 추가되는 v-move 클래스를 추가하는 것입니다. 
    다른 클래스와 마찬가지로 접두어는 제공된 name 속성 값과 일치하며 move-class 속성을 사용하여 클래스를 수동으로 지정할 수도 있습니다.

    이 클래스는 다음과 같이 트랜지션 타이밍과 easing curve을 지정하는 데 주로 유용합니다.

    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>

    <div id="flip-list-demo" class="demo">
        <button v-on:click="shuffle">Shuffle</button>
        <transition-group name="flip-list" tag="ul">
            <li v-for="item in items" v-bind:key="item">
            {{ item }}
            </li>
        </transition-group>
    </div>
*/
new Vue({
    el: '#flip-list-demo',
    data: {
      items: [1,2,3,4,5,6,7,8,9]
    },
    methods: {
      shuffle: function () {
        this.items = _.shuffle(this.items)
      }
    }
});
/*
.flip-list-move {
  transition: transform 1s;
}
이것은 마술처럼 보일지 모르겠지만 Vue는 FLIP이라는 간단한 애니메이션 기법을 사용하여 변형을 사용하여 이전 위치에서 새로운 위치로 요소를 부드럽게 트랜지션합니다.
*/

// 이 기술을 이전 구현과 결합하여 가능한 모든 변경 사항을 목록에 적용 할 수 있습니다!
/* 
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>

<div id="list-complete-demo" class="demo">
  <button v-on:click="shuffle">Shuffle</button>
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list-complete" tag="p">
    <span
      v-for="item in items"
      v-bind:key="item"
      class="list-complete-item"
    >
      {{ item }}
    </span>
  </transition-group>
</div>
*/
new Vue({
    el: '#list-complete-demo',
    data: {
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10
    },
    methods: {
      randomIndex: function () {
        return Math.floor(Math.random() * this.items.length)
      },
      add: function () {
        this.items.splice(this.randomIndex(), 0, this.nextNum++)
      },
      remove: function () {
        this.items.splice(this.randomIndex(), 1)
      },
      shuffle: function () {
        this.items = _.shuffle(this.items)
      }
    }
});
/*
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.list-complete-leave-active {
    position: absolute;
}
한 가지 중요한 사실은 이러한 FLIP 트랜지션은 display:inline 으로 설정된 요소로는 작동하지 않는다는 것입니다. 
또는 display:inline-block 을 사용하거나 flex 컨텍스트에 요소를 배치 할 수 있습니다.
이러한 FLIP 애니메이션은 단일 축으로 제한되지 않습니다. 다차원 그리드의 항목을 매우 쉽게 트랜지션 할 수 있습니다.
*/

// 비틀거리는 목록 트랜지션
/*
    데이터 속성을 통해 JavaScript 트랜지션과 통신함으로써 목록에서 트랜지션을 비틀 수 있습니다.
    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

    <div id="staggered-list-demo">
    <input v-model="query">
    <transition-group
        name="staggered-fade"
        tag="ul"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
    >
        <li
        v-for="(item, index) in computedList"
        v-bind:key="item.msg"
        v-bind:data-index="index"
        >{{ item.msg }}</li>
    </transition-group>
    </div>
*/
new Vue({
    el: '#staggered-list-demo',
    data: {
      query: '',
      list: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ]
    },
    computed: {
      computedList: function () {
        var vm = this
        return this.list.filter(function (item) {
          return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        })
      }
    },
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0
        el.style.height = 0
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 1, height: '1.6em' },
            { complete: done }
          )
        }, delay)
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 0, height: 0 },
            { complete: done }
          )
        }, delay)
      }
    }
});