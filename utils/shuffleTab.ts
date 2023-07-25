export function shuffleTab<T>(list: T[]) {
    const listCopy = list.slice();
    const Tab = [];
    const n = listCopy.length;
    for (let i=n; i>0; i--){
        Tab.push(listCopy.splice(Math.floor(Math.random()*i), 1)[0]);
    }    
    return Tab;
}