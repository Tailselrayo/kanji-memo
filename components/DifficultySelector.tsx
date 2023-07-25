import { Button, Group, Stack, Title } from "@mantine/core"
import Link from "next/link";

interface DifficultySelectorProps {
    nbGrades?: number;
}

export function DifficultySelector(props: DifficultySelectorProps) {
    return (
        <Stack align="center" justify="center">
            <Title color="gray.1">Select kanji's difficulty</Title>
            <Group>
                {Array.from({ length: props.nbGrades ? props.nbGrades : 6 }).map((_, index) => {
                    const difficulty = index + 1;
                    return (
                        <Link key={index} href={`/game/${difficulty}`}>
                            <Button color={`red.${difficulty+2}`}>{difficulty}</Button>
                        </Link>
                    )
                })}
            </Group>
        </Stack>
    )
}