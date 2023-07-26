import { Stack, Text, Avatar } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { User } from "@/types/User";

interface ProfilePictureProps {
    isOnHome?: boolean;
}

export function ProfilePicture(props: ProfilePictureProps) {
    const [currentUser] = useLocalStorage<User|null>({key: "currentUser"});
    const [localBestScore] = useLocalStorage({key: "userPB"});
    return (
        <Stack align="left">
            <Avatar src="/temporary_avatar.svg" alt="pp" size={100} radius="xl" />
            <Text color="gray.1">
                {props.isOnHome?
                `Welcome, ${currentUser? currentUser.username : "guest"}`:
                `Best score of ${currentUser?.username} : ${localBestScore}`}
            </Text>
        </Stack>
    )
}