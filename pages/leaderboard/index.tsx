import { Layout } from "@/components/Layout";
import { RankingCard } from "@/components/RankingCard";
import { RankingData } from "@/types/RankingData"
import { User } from "@/types/User";
import { getLeaderBoard } from "@/utils/supabase"
import { ActionIcon, Affix, Stack, Tabs, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { PostgrestError } from "@supabase/supabase-js";
import { IconHome2 } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

interface LeaderboardProps {
    data: RankingData[];
    error?: PostgrestError;
}

export async function getServerSideProps() {
    const response = await getLeaderBoard();
    const data: RankingData[] = response?.data;
    return ({
        props: { data: data, error: response.error }
    })
}

export default function Leaderboard(props: LeaderboardProps) {
    const [currentUser] = useLocalStorage<User | null>({ key: "currentUser" })
    const [selectedGrade, setSelectedGrade] = useState(1)

    const getGradeLeaderboard = (grade: number) => {
        let lB: [{ pseudo: string, score: number }] = [{ pseudo: "p", score: 0 }];
        lB.pop();
        props.data.forEach((elem) => {
            if (grade === elem.grade) {
                lB.push({ pseudo: elem.username, score: elem.max });
            }
        })
        lB.sort((a, b) => b.score - a.score)
        return lB
    }

    const getUserRank = () => {
        let rank = 0;
        const list = getGradeLeaderboard(selectedGrade);
        list.forEach((elem, index) => {
            if (elem.pseudo === currentUser?.username) {
                rank += index + 1;
            }
        })
        return rank;
    }

    return (
        <Layout ranking={getUserRank()}>
            <Tabs variant="outline" defaultValue="g1">
                <Tabs.List position="center">
                    {Array.from({ length: 6 }).map((_, index) => {
                        return (
                            <Tabs.Tab onClick={() => setSelectedGrade(index + 1)} key={index} value={`g${index + 1}`}>
                                <Text color="gray.2">GRADE {index + 1}</Text>
                            </Tabs.Tab>
                        )
                    })}
                </Tabs.List>
                {
                    Array.from({ length: 6 }).map((_, index) => {
                        const gradeLB = getGradeLeaderboard(index + 1);
                        return (
                            <Tabs.Panel key={index} value={`g${index + 1}`}>
                                <Stack h="100%" align="center" spacing="xs" p="xs">
                                    {Array.from({ length: gradeLB.length ?? 0 }).map((_, rank) => {
                                        if (rank < 5)
                                            return (
                                                <RankingCard
                                                    key={rank}
                                                    user={gradeLB[rank].pseudo}
                                                    score={gradeLB[rank].score}
                                                    rank={rank + 1}
                                                />
                                            )
                                    })}
                                </Stack>
                            </Tabs.Panel>
                        )
                    })
                }

            </Tabs>
            <Affix position={{ left: 0, bottom: 0 }} p="xs" zIndex={1}>
                <Link href="/">
                    <ActionIcon color="gray.1" size={40}>
                        <IconHome2 size={40} />
                    </ActionIcon>
                </Link>
            </Affix>
        </Layout>
    )
}