//创建一个虚拟dom节点 vdom vnode
export function h(tag, props, children) {
    return {
        tag,
        props,
        children
    }
}