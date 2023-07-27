import { Group, Text } from "@mantine/core"

interface DictionaryListProps {
    label: string;
    accessLvl: number;
    list: string[] | undefined;
}

export function DictionaryList(props: DictionaryListProps) {

    const n = props.list?.length;
    const mainGroupSize = 4;

    const deliverAccess = (accessLvl: number, index: number) => {
        if (accessLvl===5) {
            return true;
        }
        else if (accessLvl===4&&index<6) {
            return true;
        }
        else if (accessLvl === 3&&index<mainGroupSize) {
            return true;
        }
        else if (accessLvl === 2 && index < 2) {
            return true;
        }
        else if (accessLvl === 1 && index < 1) {
            return true;
        }
        return false;
    }

    return (
        <>
            <Text fw="bold" ta="center" fz="lg">{props.label}</Text>
            <Group grow>
                {
                    Array.from({ length: n ?? 0 }).map((_, index) => {
                        const isAccessible = deliverAccess(props.accessLvl, index);
                        if (index < mainGroupSize) {
                            return (
                                <Text ta="center" key={index} fz="sm" italic={!isAccessible}>{isAccessible? props.list![index] : "locked"}</Text>
                            )
                        }
                    })
                }
            </Group>
            <Group grow>
                {
                    Array.from({ length: n ?? 0 }).map((_, index) => {
                        const isAccessible = deliverAccess(props.accessLvl, index);
                        if (index >= mainGroupSize&&index<12) {
                            return (
                                <Text ta="center" key={index} fz="xs" italic={!isAccessible}>{isAccessible ? props.list![index] : "locked"}</Text>
                            )
                        }
                    })
                }
            </Group>
        </>
    )
}