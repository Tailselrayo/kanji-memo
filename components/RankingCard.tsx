import { Card, Group, MantineColor, Text } from "@mantine/core";

interface RankingCardProps {
    color?: MantineColor
    user: string;
    score: number;
    rank: number;
}

export function RankingCard(props: RankingCardProps) {

    return(
        <Card w="50%" h="10%" bg={props.color??"gray.2"}>
            <Group grow>
                <Text fz={20}>{props.rank}.</Text>
                <Text>{props.user}</Text>
                <Text>{props.score}</Text>
            </Group>
        </Card>
    )
}