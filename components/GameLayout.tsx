import { Kanji } from "@/types/Kanji";
import { shuffleTab } from "@/utils/shuffleTab";
import { Group, SimpleGrid, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { GameCard } from "./GameCard";
import { useSounds } from "@/hooks/useSounds";

interface GameLayoutProps {
    kanjis: Kanji[]
    score: number;
    onVictory: () => void;
    onPairMatched: (isMatched: boolean) => void;
}

export function GameLayout(props: GameLayoutProps) {
    const [shuffledKanjis, setShuffledKanjis] = useState<Kanji[]>([]);
    const [shuffledMeanings, setShuffledMeanings] = useState<Kanji[]>([]);
    const [selectedKanji, setSelectedKanji] = useState('');
    const [selectedMeaning, setSelectedMeaning] = useState('');
    const [foundKanjis, setFoundKanjis] = useState<string[]>([]);
    const { soundHandlers } = useSounds();

    const step = Math.ceil(props.kanjis.length / 4);

    const onKanjiClick = (kanji: string) => {
        setSelectedKanji(kanji);
        soundHandlers.play("cardIsTurned1");
    }

    const onMeaningClick = (meaning: string) => {
        setSelectedMeaning(meaning);
        soundHandlers.play("cardIsTurned1");
    }

    const handleSelectedPair = () => {
        const kanjiFromK = props.kanjis.filter((elem) => elem.kanji === selectedKanji)[0].kanji;
        const kanjiFromM = props.kanjis.filter((elem) => elem.meanings[0] === selectedMeaning)[0].kanji;
        props.onPairMatched(kanjiFromK === kanjiFromM)
        if (kanjiFromK === kanjiFromM) {
            setFoundKanjis(foundKanjis.concat([selectedKanji]))
            soundHandlers.play("pairMatches")
        }
        else {
            setTimeout(() => soundHandlers.play("cardIsTurned2"), 1000);
        }
        setTimeout(() => {
            setSelectedKanji("");
            setSelectedMeaning("");
        }, 1000)
    }

    useEffect(() => {
        if (selectedKanji.length !== 0 && selectedMeaning.length !== 0) {
            handleSelectedPair();
        }
    }, [selectedKanji, selectedMeaning])

    useEffect(() => {
        if (props.kanjis.length === shuffledKanjis.length) {
            return;
        }
        setShuffledKanjis(shuffleTab(props.kanjis));
        setShuffledMeanings(shuffleTab(props.kanjis));
        setFoundKanjis([]);
    })

    useEffect(() => {
        if (foundKanjis.length === props.kanjis.length) {
            setTimeout(() => props.onVictory(), 1000);
        }
    }, [foundKanjis])

    useEffect(() => {
        soundHandlers.store({
            "cardIsTurned1": "/sfx/card-flip-2.wav",
            "cardIsTurned2": "/sfx/card-flip-1.wav",
            "pairMatches": "/sfx/correct.wav",
        })
    },[])

    return (
        <>
            <Title ta="center" color="gray.2">Score : {props.score}</Title>

            <Group grow>
                <Group position="right">
                    <SimpleGrid cols={step}>
                        {shuffledKanjis.map((elem, index) => {
                            const isFound = foundKanjis.includes(elem.kanji);
                            return (
                                <GameCard
                                    {...elem}
                                    key={index}
                                    type="kanji"
                                    isDisabled={!isFound && (selectedKanji.length !== 0 && elem.kanji !== selectedKanji)}
                                    isTurned={selectedKanji === elem.kanji || isFound}
                                    isFound={isFound}
                                    onClick={() => onKanjiClick(elem.kanji)}
                                />
                            )
                        })}
                    </SimpleGrid>
                </Group>
                <Group position="left">
                    <SimpleGrid cols={step}>
                        {shuffledMeanings.map((elem, index) => {
                            const isFound = foundKanjis.includes(elem.kanji);
                            return (
                                <GameCard
                                    {...elem}
                                    key={index}
                                    type="meaning"
                                    isDisabled={!isFound && (selectedMeaning.length !== 0 && elem.meanings[0] !== selectedMeaning)}
                                    isTurned={elem.meanings[0] === selectedMeaning || isFound}
                                    isFound={isFound}
                                    onClick={() => onMeaningClick(elem.meanings[0])}
                                />
                            )
                        })}
                    </SimpleGrid>
                </Group>
            </Group>
        </>
    )
}