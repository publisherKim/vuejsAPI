// 배열 변경 감지
// 변이 메소드: Vue는 감시중인 배열의 변이 메소드를 래핑하여 뷰 갱신을 트리거합니다. 래핑된 메소드는 다음과 같습니다.
/*
    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()
*/
example1.items.push({ message: 'Baz' })

// 배열 대체
/*
    이름에서 알 수 있듯 변이 메소드는 호출된 원본 배열을 변형합니다. 
    이와 비교하여 변형을 하지 않는 방법도 있습니다. 
    바로 filter(), concat() 와 slice() 입니다. 
    이 방법을 사용하면 원본 배열을 변형하지 않고 항상 새 배열을 반환합니다. 
    변형이 없는 방법으로 작업할 때 이전 배열을 새 배열로 바꿀 수 있습니다.
*/
example1.items = example1.items.filter(function (item) {
    return item.message.match(/Foo/)
});
// 프로그램에서 원본에 변형을 가하지 않는것은 매우 중요하다.
/*
    이렇게 하면 Vue가 기존 DOM을 버리고 전체 목록을 다시 렌더링 한다고 생각할 수 있습니다. 
    다행히도, 그렇지는 않습니다. 
    Vue는 DOM 요소 재사용을 극대화하기 위해 몇가지 똑똑한 구현을 하므로 배열을 겹치는 객체가 포함된 다른 배열로 대체하여 효율적입니다.
*/

// 주의 사항
/*
    JavaScript의 제한으로 인해 Vue는 배열에 대해 다음과 같은 변경 사항을 감지할 수 없습니다.
        1. 인덱스로 배열에 있는 항목을 직접 설정하는 경우, 예: 
            vm.items[indexOfItem] = newValue
        2. 배열 길이를 수정하는 경우, 예: vm.items.length = newLength

    
*/
// 주의 사항 중 1번을 극복하기 위해 다음 두 경우 모두 vm.items[indexOfItem] = newValue 와 동일하게 수행하며, 반응형 시스템에서도 상태 변경을 트리거 합니다.
// Vue.set
Vue.set(example1.items, indexOfItem, newValue);
// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue);
// 직접적으로 변경된 값을 인자로 전달해주어야 한다.

// 주의 사항 중 2번을 극복하기 위해 splice를 사용
example1.items.splice(newLength);
// 새로운 배열을 할당하여야 한다. 반응성 떄문이다.
// data의 변화를 감지하기 위한 방법.