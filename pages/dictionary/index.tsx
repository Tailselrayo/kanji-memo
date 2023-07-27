import { KanjiInfoCard } from "@/components/KanjiInfoCard";
import { DBKanji } from "@/types/DBKanji";
import { getUserXp } from "@/utils/supabase";
import { Affix, Pagination, SimpleGrid, Stack, Tabs, Text } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { DictionaryModal } from "@/components/DictionaryModal";

interface DictionaryProps {
    kanjis: [string[]];
}

export async function getServerSideProps() {
    let kanjiTab: [string[]] = [[]];
    for (let i = 1; i < 7; i++) {
        const data = (await (await fetch(`${process.env.NEXT_PUBLIC_KANJI_API_URL}grade-${i}`)).json());
        kanjiTab.push(data);
    }
    return ({
        props: {
            kanjis: kanjiTab,
        }
    })
}

export default function Dictionary(props: DictionaryProps) {
    const [currentUser] = useLocalStorage<User | null>({ key: "currentUser" });
    const [dataBaseKanjis, setDataBaseKanjis] = useState<DBKanji[] | null>(null)
    const [selectedGrade, setSelectedGrade] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [opened, modalHandlers] = useDisclosure();
    const [viewedKanjiInformations, setViewedKanjiInformations] = useState("")
    //this last hook represent the informations "(kanji;xp)" passed from cards to the detailed modal.

    const pageCapacity = 35;

    const onCardClick = (kanji: string, xp: number) => {
        setViewedKanjiInformations(`${kanji};${xp}`)
        if (xp) {
            modalHandlers.open();
        }
    }

    const fillDataBaseKanjis = (list: any[] | null) => {
        if (list?.length) {
            setDataBaseKanjis(list)
        }
        else {
            const emptyData: DBKanji = {
                user: currentUser!.id,
                kanji: "fake",
                grade: selectedGrade,
                xp: 0,
            }
            setDataBaseKanjis([emptyData])
        }
    }

    const fetchKanjiXp = (kanji: string) => {
        let xp = 0;
        dataBaseKanjis?.forEach((infos) => {
            if (infos.kanji === kanji) {
                xp += infos.xp;
            }
        })
        return xp;
    }

    useEffect(() => {
        console.log(dataBaseKanjis)
        if (currentUser && selectedGrade && selectedGrade !== dataBaseKanjis?.[0].grade) {
            getUserXp(currentUser.id, selectedGrade).then(fillDataBaseKanjis);
            setActivePage(1);
        }
    }, [selectedGrade, currentUser, dataBaseKanjis])

    return (
        <Tabs w="100%" h="100%" variant="outline" defaultValue="g1">
            <Tabs.List>
                {Array.from({ length: 6 }).map((_, index) => {
                    const grade = index + 1;
                    return (
                        <Tabs.Tab
                            key={index}
                            value={`g${grade}`}
                            onClick={() => setSelectedGrade(grade)}
                        >
                            <Text color="gray.1">{`GRADE ${grade}`}</Text>
                        </Tabs.Tab>
                    )
                })

                }
            </Tabs.List>
            <Tabs.Panel value={`g${selectedGrade}`} p="xl">
                <DictionaryModal
                    opened={opened}
                    informations={viewedKanjiInformations}
                    onClose={modalHandlers.close}
                />
                <SimpleGrid cols={7}>
                    {
                        Array.from({ length: pageCapacity }).map((_, index) => {
                            const kanjiIndex = index + (activePage - 1) * 35;
                            if (kanjiIndex < props.kanjis[selectedGrade].length) {
                                const kanji = props.kanjis[selectedGrade][index + (activePage - 1) * 35];
                                return (
                                    <KanjiInfoCard
                                        key={index}
                                        kanji={kanji}
                                        kanjiXp={fetchKanjiXp(kanji)}
                                        onClick={onCardClick}
                                    />
                                )
                            }
                        })
                    }
                </SimpleGrid>
                <Affix w="100%" position={{ bottom: 0 }}>
                    <Stack p="sm" align="center" justify="end">
                        <Pagination
                            value={activePage}
                            onChange={setActivePage}
                            total={Math.ceil(props.kanjis[selectedGrade].length / 35)}
                            withControls={false}
                            withEdges={false}
                        />
                    </Stack>
                </Affix>
            </Tabs.Panel>
        </Tabs>
    )
}