import { Group, Stack } from "@mantine/core";
import { ReactNode } from "react";
import { HomeIconMenu } from "./HomeIconMenu";
import { ProfilePicture } from "./ProfilePicture";

interface LayoutProps {
    isOnHome?: boolean;
    children: ReactNode;
    isSoundOn: boolean;
    onSoundChange: () => void;
}

export function Layout(props: LayoutProps) {
    return (
        <Stack>
            <Group w="100%" position="apart" align="start">
                <ProfilePicture isOnHome={props.isOnHome} />
                <HomeIconMenu isSoundOn={props.isSoundOn} onSoundChange={props.onSoundChange} />
            </Group>
            {props.children}
        </Stack>
    )
}