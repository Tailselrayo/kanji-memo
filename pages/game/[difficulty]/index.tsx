import { Kanji } from "@/types/Kanji";
import { getKanjisFromAPI } from "@/utils/getKanjisFromAPI";
import { getKanjisInfo } from "@/utils/getKanjisInfo";
import { Loader } from "@mantine/core";
import { GetServerSidePropsContext } from "next";

interface GameProps {
    error?: string;
    difficulty: number;
    kanji: Kanji[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params = context.params;
    const difficulty = parseInt(params?.difficulty as string);
    if (!difficulty||Array.isArray(difficulty)||isNaN(difficulty)) {
        return ({
            redirect: {
                destination: "/",
                permanent: false,
            }
        })
    }
    if (difficulty < 0 || difficulty > 6) {
        return ({
            redirect: {
                destination: "/",
                permanent: false,
            }
        })
    }
    const responseKanjiList = await fetch(`${process.env.NEXT_PUBLIC_KANJI_API_URL}grade-${difficulty}`);
    if (responseKanjiList.status!==200) {
        return({
            props:{error: responseKanjiList.statusText}
        })
    }
    const gameKanjis = getKanjisFromAPI(await responseKanjiList.json());
    return ({
        props: {difficulty: difficulty, kanji: await getKanjisInfo(gameKanjis)}
    })
}

export default function Game(props: GameProps) {
    console.log(props.difficulty, props.kanji, props.error)
    return(
        <Loader></Loader>
    )
}