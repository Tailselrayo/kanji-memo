import { GameLayout } from "@/components/GameLayout";
import { Layout } from "@/components/Layout";
import { Kanji } from "@/types/Kanji";
import { getKanjisFromAPI } from "@/utils/getKanjisFromAPI";
import { getKanjisInfo } from "@/utils/getKanjisInfo";
import { Button, Stack, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";

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
    const [isSoundOn, setIsSoundOn] = useLocalStorage<boolean>({ key: "isSoundOn" })
    const [localBestScore, setLocalBestScore] = useLocalStorage({ key: "userPB", defaultValue: 0 });
    const [step, setStep] = useState(1);
    const [hasWon, setHasWon] = useState(false);
    const [score, setScore] = useState(0);

    const onStepVictory = () => {
        if (step === 3) {
            setHasWon(true);
            setScore(score + 1000);
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


    const onRestart = () => {
        setHasWon(false);
        setStep(1);
        if (score > localBestScore) {
            setLocalBestScore(score);
        }
        setScore(0);
    }

    return (
        <Layout isSoundOn={isSoundOn} onSoundChange={() => setIsSoundOn(!isSoundOn)}>
            {hasWon ?
                <Stack mx="auto" w="50%" align="center">
                    <Title color="gray.1">Congrats ! Your score is {score}</Title>
                    <Stack w="100%">
                        <Button w="100%" size="xl" onClick={onRestart} variant="gradient" gradient={{ from: "lime", to: "green" }}>
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