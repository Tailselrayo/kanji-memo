import { computeLvlFromXp } from "@/utils/computeLvlFromXp";
import { Card, Title } from "@mantine/core";

interface KanjiInfoCardProps {
    kanji: string;
    kanjiXp: number;
    onClick: (kanji: string, xp: number) => void; 
}

export function KanjiInfoCard(props: KanjiInfoCardProps) {
    return (
        <Card
            onClick={() => props.onClick(props.kanji, props.kanjiXp)}
            bg="gray.4"
            radius="xs"
            p={14}
            withBorder
            style={{borderWidth: computeLvlFromXp(props.kanjiXp), borderColor: "black", cursor: props.kanjiXp?"pointer":"auto"}}
        >
            <Title ff="cursive" ta="center">{props.kanjiXp?props.kanji:"?"}</Title>
        </Card>
    )
}