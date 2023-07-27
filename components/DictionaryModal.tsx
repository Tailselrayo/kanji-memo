import { Kanji } from "@/types/Kanji";
import { computeLvlFromXp } from "@/utils/computeLvlFromXp";
import { Group, Modal, Stack, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

interface DictionaryModalProps {
    opened: boolean;
    informations: string;
    onClose: () => void;
}

export function DictionaryModal(props: DictionaryModalProps) {
    const [kanjiInfos, setKanjiInfos] = useState<Kanji|null>(null);

    const informations = props.informations.split(';')
    //information is of following form : ["kanji", "kanjiXp"]

    const extractData = async () => {
        return (await (await fetch(`${process.env.NEXT_PUBLIC_KANJI_API_URL}${informations[0]}`)).json())
    }

    useEffect(()=>{
        if (!kanjiInfos&&!props.informations.length) {
            extractData().then(setKanjiInfos)
        }
    })

    return(
        <Modal 
            opened={props.opened}
            onClose={props.onClose}
        >
            <Modal.Body bg="yellow.3">
                <Modal.Content>
                    <Stack>
                        <Group w="100%" position="apart">
                            <Title ff="cursive">{informations?.[0]}</Title>
                            <Stack align="left">
                                <Text ta="justify">{`Grade : ${kanjiInfos?.grade}`}</Text>
                                <Text ta="justify">{`LV : ${computeLvlFromXp(parseInt(informations?.[1]))}`}</Text>
                                <Text ta="justify">{`Strokes : ${kanjiInfos?.stroke_count}`}</Text>
                            </Stack>
                        </Group>
                    </Stack>
                </Modal.Content>
            </Modal.Body>
            
        </Modal>
    )

}