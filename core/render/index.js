// n1 oldVnode  n2 newVnode
export function diff(n1, n2) {
    //tag
    if(n1.tag != n2.tag) {
        //清空
        n1.el.replaceChild(n2.tag)
    }else {
        //小细节
        const el = (n2.el = n1.el)
        //props
        const {props: newProps} = n2
        const {props: oldProps} = n1

        if(newProps && oldProps){
            Object.keys(newProps).forEach(key => {
                const oldValue = oldProps[key]
                const newValue = newProps[key]
                if(newValue != oldValue) {
                    el.setAttribute(key, newValue)
                }
            });
        }

        if(oldProps) {
            Object.keys(oldProps).forEach((key) => {
             if (!newProps[key]) {
                el.removeAttribute(key)
            }
            }
            )
        }
        //children -> (暴力算法)
        const { children: newChildren } = n2
        const { children: oldChildren } = n1

        if(typeof newChildren == 'string') {
            if(typeof oldChildren == 'string') {
                if(newChildren != oldChildren) {
                    el.textContent = newChildren
                }
            }else if(Array.isArray(oldChildren)) {
                el.textContent = newChildren
            }
        }else if(Array.isArray(newChildren)) {
            if(typeof oldChildren == 'string') {
                el.innerHTML = ''
                mountElement(n2, el)
            }else if(Array.isArray(oldChildren)) {
                //diff
                const length = Math.min(oldChildren.length, newChildren.length)

                //处理公共的vnode
                for(let index = 0; index < length; index++) {
                    const newVnode = newChildren[index];
                    const oldVnode = oldChildren[index];
                    diff(oldVnode, newVnode)
                }

                if (newChildren.length > length) {
                    //新增节点
                    for (let index = length; index < newChildren.length; index++) {
                        const newVnode = newChildren[index];
                        mountElement(newVnode);
                    }
                }

                if (oldChildren.length > length) {
                    //删除节点
                    for (let index = length; index < oldChildren.length; index++) {
                        const oldVnode = oldChildren[index];
                        oldVnode.el.parent.removeChild(oldVnode.el)
                    }
                }
            }
        }
    }
    
}

//vdom -> dom
export function mountElement(vnode, container) {
    const {tag, props, children} = vnode
    //tag
    const element = (vnode.el = document.createElement(tag))
    //pops
    if(props) {
        for(const key in props) {
            const val = props[key];
            element.setAttribute(key, val);
        }
    }
    //children
    //1. 他可以接受一个 string
    if(typeof children == 'string') {
        console.log('children', children)
        const textNode = document.createTextNode(children)
        element.append(textNode)
    }
    //2. 他可以接受一个 array数组
    else if(Array.isArray(children)) {
        children.forEach(child => {
            mountElement(child, element)
        })
    }
    //插入
    container.append(element)
}