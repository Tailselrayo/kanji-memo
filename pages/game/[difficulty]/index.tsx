import { GameLayout } from "@/components/GameLayout";
import { Layout } from "@/components/Layout";
import { Kanji } from "@/types/Kanji";
import { Score } from "@/types/Score";
import { User } from "@/types/User";
import { getKanjisFromAPI } from "@/utils/getKanjisFromAPI";
import { getKanjisInfo } from "@/utils/getKanjisInfo";
import { addScore, getPb, updateKanji } from "@/utils/supabase";
import { Button, Stack, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface GameProps {
    error?: string;
    difficulty: number;
    kanji: Kanji[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params = context.params;
    const difficulty = parseInt(params?.difficulty as string);
    if (!difficulty || Array.isArray(difficulty) || isNaN(difficulty)) {
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
    if (responseKanjiList.status !== 200) {
        return ({
            props: { error: responseKanjiList.statusText }
        })
    }
    else {
        const gameKanjis = getKanjisFromAPI(await responseKanjiList.json());
        return ({
            props: { difficulty: difficulty, kanji: await getKanjisInfo(gameKanjis) }
        })
    }
}

export default function Game(props: GameProps) {
    const [localBestScore, setLocalBestScore] = useState<Score|null>(null);
    const [currentUser] = useLocalStorage<User|null>({key: "currentUser"})
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [hasWon, setHasWon] = useState(false);
    const [score, setScore] = useState(0);


    const onStepVictory = async () => {
        if (step === 3) {
            setHasWon(true);
            setScore(score+1000)
            await addScore(currentUser!.id, score+1000, props.difficulty);
            if (currentUser) {
                props.kanji.forEach( (kanji, index) => {
                    updateKanji(currentUser.id, kanji.kanji, Math.ceil(3-index/4), props.difficulty)
                })
            }
            return;
        }
        setScore(score + (step === 2 ? 500 : 200))
        setStep(step + 1);
    }

    const onPairMatched = (isMatched: boolean) => {
        if (isMatched) {
            setScore(score + 25 * (2 ** step));
        }
        else {
            setScore(score - 15 * step);
        }
    }


   useEffect(()=> {
        if (!localBestScore&&currentUser) {
            getPb(currentUser.id, props.difficulty).then(setLocalBestScore);
        }
    })
        


    return (
        <Layout userPb={localBestScore?.score}>
            {hasWon ?
                <Stack mx="auto" w="50%" align="center">
                    <Title color="gray.1">Congrats ! Your score is {score}</Title>
                    <Stack w="100%">
                        <Button w="100%" size="xl" onClick={router.reload} variant="gradient" gradient={{ from: "lime", to: "green" }}>
                            Play again
                        </Button>
                        <Link href="/choose-level" style={{ width: "100%" }}>
                            <Button size="xl" w="100%" variant="gradient" gradient={{ from: "red", to: "orange" }}>
                                Change difficulty
                            </Button>
                        </Link>
                        <Link href="/" style={{ width: "100%" }}>
                            <Button size="xl" w="100%" variant="gradient" gradient={{ from: "blue", to: "teal" }}>
                                Home
                            </Button>
                        </Link>
                    </Stack>
                </Stack> :
                <>
                    <GameLayout
                        kanjis={props.kanji.slice(0, step * 4)}
                        onVictory={onStepVictory}
                        onPairMatched={onPairMatched}
                        score={score}
                    />
                </>
            }
        </Layout>
    )
}