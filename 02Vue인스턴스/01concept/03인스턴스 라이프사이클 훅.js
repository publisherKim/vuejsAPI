// 각 Vue 인스턴스는 데이터 관찰을 설정하고, 템플릿을 컴파일하고, 인스턴스를 DOM에 마운트하고, 데이터가 변경 될 때 DOM을 업데이트해야 할 때 일련의 초기화 단계를 거침
new Vue({
    data: {
      a: 1
    },
    created: function () {
      // `this` 는 vm 인스턴스를 가리킵니다.
      console.log('a is: ' + this.a)
    }
});
// => "a is: 1"

/*
    life cycle 순서도
        new Vue() instance 생성
        init Events & lifecycle: start
            beforeCreate 뷰객체를 생성하는시기
        init injections & reacitivity: 주입및 반응성 즉 뷰객체의 데이터 바인딩및 돔과 반응할 상태를 결정
            created: 뷰객체를 생성하고 난뒤
                has "el option", has "template option" check 언제 하냐하면 vm.$mount(el) is called 뷰모델의 마운트 함수가 el을 인자로 전달하고 호출되어졌을때 임을 알수 있다.
        yes일 경우 Compile template inot render function!!
        no일 경우 Compile el's outerHTML as template!!
            beforeMount: 마운트가 되기전 상태
        Create vm.$el and replace "el" width it 뷰객체사의 생성된 인스턴스와 돔의 el을 매칭해 교체하기 시작하는 시점이다.
            mounted: when data changes 
                beforeUpdate
                    Vircture Dom re-render and patch
                updated
                when vm.$destory() is called  이함수가 호출되면
            beforeDestroy: 파괴하기 이전 상태
        Teardown watchers, child componets and event listeners 모든 행동들이 사라짐을 알수 있다. 
            destoryed: 모든것이 파괴되었다.
        Destoryed: 파괴되어졌다.
*/
// https://kr.vuejs.org/v2/guide/instance.html#%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8 라이프 싸이클 다이어 그램을 참조하자.

