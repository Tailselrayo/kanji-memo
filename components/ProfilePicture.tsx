import { Stack, Text, Avatar } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

interface ProfilePictureProps {
    isOnHome?: boolean;
}

export function ProfilePicture(props: ProfilePictureProps) {
    const [currentUser] = useLocalStorage({key: "currentUser"});
    const [localBestScore] = useLocalStorage({key: "userPB"});
    return (
        <Stack align="left">
            <Avatar src="/temporary_avatar.svg" alt="pp" size={100} radius="xl" />
            <Text color="gray.1">
                {props.isOnHome?
                `Welcome, ${currentUser ? currentUser : "guest"}`:
                `Best score of ${currentUser} : ${localBestScore}`}
            </Text>
        </Stack>
    )
}