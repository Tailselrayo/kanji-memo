import { Stack, Text, Avatar } from "@mantine/core";

interface ProfilePictureProps {
    currentUser: string;
}

export function ProfilePicture(props: ProfilePictureProps) {
    return (
        <Stack align="left">
            <Avatar src="/temporary_avatar.svg" alt="pp" size={100} radius="xl" />
            <Text color="gray.1">{`Welcome, ${props.currentUser ? props.currentUser : "guest"}`}</Text>
        </Stack>
    )
}