import { effectWatch  } from "./reactivity/index.js";
import { mountElement,diff } from "./render/index.js";
export function createApp(rootComponent) {
    return {
        mount(rootContainer){
            const context = rootComponent.setup();
            const isMount = false;
            let prevSubTree

            effectWatch(() => {
                console.log(rootContainer);
                rootContainer.innerHTML = ``; //清空
                if(!isMount){
                //init
                const subTree = rootComponent.render(context);
                mountElement(subTree, rootContainer);
                console.log(subTree);
                prevSubTree = subTree;
                }else{
                    //update
                    const subTree = rootComponent.render(context);
                    diff(prevSubTree, subTree);
                    prevSubTree = subTree;
                }
                
                
                // diff
                // newVode old
                // rootContainer.append(element);
            })
        }
    }
}