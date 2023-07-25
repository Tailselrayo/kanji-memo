import { Kanji } from "@/types/Kanji";

export async function getKanjisInfo(list: string[]) {
    const kanjiList: Kanji[] = [];
    for (const kanji of list){
        const response = await fetch(`${process.env.NEXT_PUBLIC_KANJI_API_URL}${kanji}`);
        kanjiList.push(await response.json())
    }
    return kanjiList;
}