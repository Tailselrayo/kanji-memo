export function getKanjisFromAPI(list: string[], nbKanji=12) {
    const kanjiList = [];
    for (let i=0; i<nbKanji; i++) {
        const rdNb = Math.floor(Math.random()*list.length)
        kanjiList.push(list.splice(rdNb,1)[0])
    }
    return kanjiList
}