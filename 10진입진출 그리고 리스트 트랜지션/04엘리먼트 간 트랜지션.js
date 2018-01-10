/*
    엘리먼트 간 트랜지션
        컴포넌트 사이의 트랜지션에 대해서는 나중에 설명하지만 v-if /v-else를 사용하여 원본 엘리먼트 사이를 트랜지션 할 수도 있습니다. 
        가장 일반적인 두 엘리먼트 트랜지션 중 하나는 목록 컨테이너와 빈 목록을 설명하는 메시지 사이에 사용됩니다.
        <transition>
            <table v-if="items.length > 0">
                <!-- ... -->
            </table>
            <p v-else>Sorry, no items found.</p>
        </transition>
        이것은 잘 작동하지만 주의해야할 한 가지 주의 사항이 있습니다.

        같은 태그 이름 을 가진 엘리먼트 사이를 트랜지션할 때, Vue에 고유 한 key 속성을 부여함으로써 별개의 엘리먼트임을 말해야합니다. 
        그렇지 않으면 Vue의 컴파일러는 효율성을 위해 엘리먼트의 내용만 바꿉니다. 
        기술적으로 불필요한 경우 라하더라도 여러 항목을 항상 <transition> 컴포넌트에 키핑하는 것이 좋습니다.

        예제:
        <transition>
            <button v-if="isEditing" key="save">
                Save
            </button>
            <button v-else key="edit">
                Edit
            </button>
        </transition>

        이러한 경우,key 속성을 사용하여 같은 엘리먼트의 여러 상태 사이를 트랜지션 할 수 있습니다. 
        v-if 와 v-else 대신에 위의 예제를 다음과 같이 재 작성할 수 있습니다:       
        <transition>
            <button v-bind:key="isEditing">
                {{ isEditing ? 'Save' : 'Edit' }}
            </button>
        </transition>     

        실제로 여러 개의 v-if를 사용하거나 하나의 엘리먼트를 동적 속성에 바인딩하여 여러 엘리먼트 사이를 트랜지션 할 수 있습니다. 예:   
        <transition>
            <button v-if="docState === 'saved'" key="saved">
                Edit
            </button>
            <button v-if="docState === 'edited'" key="edited">
                Save
            </button>
            <button v-if="docState === 'editing'" key="editing">
                Cancel
            </button>
        </transition> 
        
        또한 다음과 같이 쓸 수 있습니다.
        <transition>
            <button v-bind:key="docState">
                {{ buttonMessage }}
            </button>
        </transition>
        // ...
        computed: {
            buttonMessage: function () {
                switch (this.docState) {
                case 'saved': return 'Edit'
                case 'edited': return 'Save'
                case 'editing': return 'Cancel'
                }
            }
        }
*/

// 트랜지션 모드
/*
    https://kr.vuejs.org/v2/guide/transitions.html#%ED%8A%B8%EB%9E%9C%EC%A7%80%EC%85%98-%EB%AA%A8%EB%93%9C 참고

    on off 좌우 배열 x
    “on”버튼과 “off”버튼 사이를 트랜지션 할 때 두 버튼이 렌더링됩니다 
    - 다른 트랜지션이 진행되는 동안 하나의 트랜지션이 트랜지션됩니다. 
    이것은 <transition>의 기본 동작입니다 
    - 들어오고 나가는 것이 동시에 발생합니다.   
    
    on off 같은 위치 배열일때 유효
    트랜지션 항목이 절대적으로 서로의 위에 놓일 때처럼 때로는 위 기능이 훌륭합니다.
    그런 다음 슬라이드 트랜지션처럼 보이도록 되었을 수도 있습니다.

    동시 들어가고 떠나는 트랜지션이 항상 바람직한 것은 아니기 때문에 Vue는 몇 가지 대안을 제공합니다 트랜지션 모드 :
        in-out: 처음에는 새로운 엘리먼트가 트랜지션되고, 완료되면 현재 엘리먼트가 트랜지션됩니다.
        out-in: 현재 엘리먼트가 먼저 트랜지션되고, 완료되면 새로운 요소가 바뀝니다.
  
    이제 out-in 으로 on/off 버튼의 트랜지션을 업데이트 해 보겠습니다.
    <transition name="fade" mode="out-in">
        <!-- ... the buttons ... -->
    </transition>
    단순한 속성 추가를 통해 특수 스타일을 추가하지 않고 원래의 트랜지션을 수정했습니다.

    in-out 모드는 자주 사용되지 않지만 때로는 약간 다른 트랜지션 효과에 유용 할 수 있습니다. 이전에 작업했던 슬라이드-페이드 트랜지션과 결합 해 보겠습니다.
    <transition name="fade" mode="out-in">
        <!-- ... the buttons ... -->
    </transition>
*/