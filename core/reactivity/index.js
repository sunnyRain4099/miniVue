//响应式库

//依赖
let currentEffect;
class Dep {
    //收集依赖
    constructor(val) {
       //es6+
        this.subs = new Set()
        this._val = val
    }

    get value() {
        this.depend()
        return this._val
    }

    set value(newVal) {
        this._val = newVal
        this.notice()
    }

    depend() {
        if(currentEffect){ 
           this.subs.add(currentEffect)
        }
    }

    //触发依赖
    notice() {
        //触发我们之前收集的依赖
        this.subs.forEach((effect) => {
            effect()
        })
    }
}

//
export function effectWatch(effect) {
    //收集依赖
    currentEffect = effect
    effect()
    // dep.depend()
    currentEffect = null
}

// const dep = new Dep(10)

// let b;
// effectWatch(() => {
//     b = dep.value + 10
//     console.log(b)
// })

// //dep值发生变更
// dep.value = 30
// dep.notice()

//reactive
//dep -> number String
// object -> key -> dep

//1.这个对象什么时候改变
//object.a -> get
//object.a = 10 -> set

//vue2
//proxy
let targetMap = new Map()
const getDep = (target, key) => {
    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    let dep = depsMap.get(key)
    if(!dep){
        dep = new Dep()
        depsMap.set(key, dep)
    }
    return dep
}
export function reactive(obj) {
    
    return new Proxy(obj, {
        get(target, key) {
            //dep储存在哪里
           const dep = getDep(target, key)
            //收集依赖
            dep.depend()

            //return target[key]
            return Reflect.get(target, key)
        },
        set(target, key, value) {
            const dep = getDep(target, key)
            //触发依赖
            const result = Reflect.set(target, key, value)
            dep.notice()
            return result
        }
        })
}

// const user = reactive({
//     name: 'zhangsan',
//     age: 10
// })


// effectWatch(() => {
//     console.log("过了一段时间")
//     const double = user.age
//     console.log(double)
// })

// user.age = 20
