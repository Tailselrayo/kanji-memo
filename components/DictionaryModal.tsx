import { Kanji } from "@/types/Kanji";
import { Group, Stack, Title, Text } from "@mantine/core";
import { DictionaryList } from "./DictionaryList";
import { computeLvlFromXp } from "@/utils/computeLvlFromXp";

interface DictionaryModalProps {
    xp: number;
    informations: Kanji | null;
}

export function DictionaryModal(props: DictionaryModalProps) {
    const meanings = props.informations?.meanings;
    const kunReads = props.informations?.kun_readings;
    const onReads = props.informations?.on_readings;
    const lvl = computeLvlFromXp(props.xp);
    return (
        <Stack>
            <Group w="100%" position="apart" style={{ borderBottomStyle: "dashed", borderBottomWidth: 3 }}>
                <Title ff="cursive" fz={80}>{props.informations?.kanji}</Title>
                <Stack align="center" spacing="lg" w="60%">
                    <Group w="100%" position="apart">
                        <Text fz="sm" italic ta="justify">{`Strokes : ${props.informations?.stroke_count}`}</Text>
                        <Text fz="md" fw="bold" ta="justify" italic>{`Grade : ${props.informations?.grade}`}</Text>
                    </Group>
                    <Group w="100%" position="right">
                        <Text fz="lg" fw="bold" italic ta="justify">{`LV${lvl} (${props.xp}xp)`}</Text>
                    </Group>



                </Stack>
            </Group>
            <Stack style={{ borderBottomStyle: "double", borderBottomWidth: 1 }}>
                <DictionaryList
                    accessLvl={lvl}
                    list={meanings}
                    label="Meanings"
                />
            </Stack>
            <Stack style={{ borderBottomStyle: "double", borderBottomWidth: 1 }}>
                <DictionaryList
                    accessLvl={lvl}
                    list={kunReads}
                    label="KUN-Readings"
                />
            </Stack>
            <Stack>
                <DictionaryList
                    accessLvl={lvl}
                    list={onReads}
                    label="ON-Readings"
                />
            </Stack>
        </Stack>
    )

}