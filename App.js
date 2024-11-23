import {effectWatch, reactive} from './core/reactivity/index.js'
import {h} from './core/h.js'
// const {effectWatch, reactive} = require('./core/reactivity/index.js')
// let a = reactive({
//     value: 1
// });
// let b;
// effectWatch(() => {
//     b = a.value + 10
//     console.log(b)
// })
// a.value = 30

//vue3
export default  {
    //template -> render一种演变
    render(context){
    //    effectWatch(() => {
        //每次修改数据都要重新创建
        //要计算最小的数据更新点 - vdo
        //js->diff

        //清除上一个
        //tag
        //props
        //children
        // document.body.innerText = ''
        // 构建试图view = b
        // const div = document.createElement('div')
        // div.innerText = context.state.count
        // return div
        //root
        // document.body.append(div)
    //    })
    return h('div',
         {id:'app - ' + context.state.count,class: 'red'},
        //   String(context.state.count)
        [h('p',null, 'hello world！！'),h('p',null, String(context.state.count))]
        )
    },
    setup() {
        // 构建状态 a = 响应式数据
        const state = reactive({
            count: 1
        });
        window.state = state;
        return {state};
    }
}

// App.render(App.setup())