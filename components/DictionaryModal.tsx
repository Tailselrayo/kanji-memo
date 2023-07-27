import { Kanji } from "@/types/Kanji";
import { Group, Stack, Title, Text } from "@mantine/core";
import { DictionaryList } from "./DictionaryList";

interface DictionaryModalProps {
    lvl: number;
    informations: Kanji | null;
}

export function DictionaryModal(props: DictionaryModalProps) {
    const meanings = props.informations?.meanings;
    const kunReads = props.informations?.kun_readings;
    const onReads = props.informations?.on_readings;
    return (
        <Stack>
            <Group w="100%" position="apart">
                <Title ff="cursive" fz={80}>{props.informations?.kanji}</Title>
                <Stack align="left" spacing={0}>
                    <Text ta="justify">{`Grade : ${props.informations?.grade}`}</Text>
                    <Text ta="justify">{`LV : ${props.lvl}`}</Text>
                    <Text ta="justify">{`Strokes : ${props.informations?.stroke_count}`}</Text>
                </Stack>
            </Group>
            <Stack>
                <DictionaryList
                    accessLvl={props.lvl}
                    list={meanings}
                    label="Meanings"
                />
            </Stack>
            <Stack>
                <DictionaryList
                    accessLvl={props.lvl}
                    list={kunReads}
                    label="KUN-Readings"
                />
            </Stack>
            <Stack>
                <DictionaryList
                    accessLvl={props.lvl}
                    list={onReads}
                    label="ON-Readings"
                />
            </Stack>
        </Stack>
    )

}