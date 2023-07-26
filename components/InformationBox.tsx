import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { Title, Text, Group, List, Box } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

export function InformationBox() {
    const [embla, setEmbla] = useState<Embla>();

    useAnimationOffsetEffect(embla, 300)
    return (
        <>
            <Carousel
                slideSize="100%"
                slideGap="xs"
                styles={{ control: { '&[data-inactive]': { opacity: 0, cursor: 'default' } } }}
                withIndicators
                getEmblaApi={setEmbla}
            >
                <Carousel.Slide p="sm">
                    <Title ta="center" fz="xl">Game presentation</Title>
                    <Group noWrap p="sm">
                        <Image src="/clean_game.png" alt="ill" width={300} height={200} />
                        <List p="sm" c="gray.1" ta="justify">
                            <List.Item >Each game will take place on a board, as shown on the side</List.Item>
                            <List.Item>Cards on the left have kanji on them, on the right are written their meanings</List.Item>
                            <List.Item>The goal is to match each kanji with its meaning</List.Item>
                            <List.Item>The less tries you take to match all kanji, the more points you will gather</List.Item>
                        </List>
                    </Group>
                </Carousel.Slide>
                <Carousel.Slide p="sm">
                    <Title ta="center" fz="xl">How to play</Title>
                    <Group noWrap p="sm">
                        <Image src="/game_illustration.png" alt="ill2" width={150} height={200} />
                        <List p="sm" c="gray.1" ta="justify">
                            <List.Item>Click on a card to turn it around, be careful as only one card per type can be turned at once</List.Item>
                            <List.Item>When all cards are correctly matched, the step ends. There are 3 steps per game.</List.Item>
                            <List.Item>First step will have 4 kanji to match, and 4 more will be added each step</List.Item>
                            <List.Item>Difficulty corresponds to japanese grading of kanji, and can be setup before or after any game</List.Item>
                        </List>
                    </Group>
                </Carousel.Slide>
            </Carousel>
        </>
    )
}