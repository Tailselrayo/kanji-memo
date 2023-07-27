import { computeLvlFromXp } from "@/utils/computeLvlFromXp";
import { Card, Title, useMantineTheme } from "@mantine/core";

interface KanjiInfoCardProps {
    kanji: string;
    kanjiXp: number;
    onClick: (kanji: string, xp: number) => void; 
}

export function KanjiInfoCard(props: KanjiInfoCardProps) {
    const theme = useMantineTheme();
    const lvl = computeLvlFromXp(props.kanjiXp);

    const colorFromLvl = (lvl: number) => {
        const c = theme.colors;
        if (lvl===5) {
            return c.green[5];
        }
        if (lvl===4) {
            return c.blue[8];
        }
        if (lvl===3) {
            return c.yellow[5];
        }
        if (lvl===2) {
            return c.red[5];
        }
        else {
            return c.dark[9];
        }
    }

    const borderSizeFromLvl = (lvl: number) => {
        if (lvl === 5) {
            return lvl;
        }
        else if (lvl === 4) {
            return 3;
        }
        else if (lvl > 1) {
            return 2;
        }
        else {
            return lvl;
        }
    }

    return (
        <Card
            onClick={() => props.onClick(props.kanji, props.kanjiXp)}
            bg="gray.4"
            radius="xs"
            p={14}
            withBorder
            style={{borderWidth: props.kanjiXp?borderSizeFromLvl(lvl):0, borderColor: colorFromLvl(lvl), cursor: props.kanjiXp?"pointer":"auto"}}
        >
            <Title ff="cursive" ta="center">{props.kanjiXp?props.kanji:"?"}</Title>
        </Card>
    )
}