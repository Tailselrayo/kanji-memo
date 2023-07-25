import { Kanji } from "@/types/Kanji";
import { Card, Title, Text } from "@mantine/core";

interface GameCardProps extends Kanji {
    isDisabled?: boolean;
    isFound?: boolean;
    type: "kanji" | "meaning";
    isTurned: boolean;
    onClick: () => void;
}

export function GameCard(props: GameCardProps) {

    const onClick = () => {
        if (props.isDisabled || props.isFound) {
            return;
        }
        props.onClick();
    }

    return (
        <Card
            onClick={onClick}
            w={150}
            h={75}
            bg={(props.isDisabled) ? "gray" : (props.type === "kanji" ? "blue.3" : "teal")}
            padding="xs"
            withBorder
            style={{ borderColor: props.isFound ? "green" : "black" }}
        >
            {(!props.isDisabled&&props.isTurned) ? ((props.type === "kanji") ?
                <>
                    <Title ta="center" fz="xl">{props.kanji}</Title>
                    <Text ta="center" fz="md">
                        {props.kun_readings[0]}
                        {(props.kun_readings.length && props.on_readings.length) ? "/" : ""}
                        {props.on_readings[0]}
                    </Text>
                </> :
                <Text ta="center">{props.meanings[0]}</Text>) :
                <></>
            }
        </Card>
    )

}