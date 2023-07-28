import { Group, Stack } from "@mantine/core";
import { ReactNode } from "react";
import { HomeIconMenu } from "./HomeIconMenu";
import { ProfilePicture } from "./ProfilePicture";

interface LayoutProps {
    isOnHome?: boolean;
    userPb?: number;
    ranking?: number;
    children: ReactNode;
}

export function Layout(props: LayoutProps) {
    return (
        <Stack>
            <Group w="100%" position="apart" align="start">
                <ProfilePicture isOnHome={props.isOnHome} userPb={props.userPb} ranking={props.ranking}/>
                <HomeIconMenu />
            </Group>
            {props.children}
        </Stack>
    )
}