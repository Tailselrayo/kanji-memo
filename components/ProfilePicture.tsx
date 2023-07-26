import { Stack, Text, Avatar } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { User } from "@/types/User";

interface ProfilePictureProps {
    isOnHome?: boolean;
    userPb?: number;
}

export function ProfilePicture(props: ProfilePictureProps) {
    const [currentUser] = useLocalStorage<User|null>({key: "currentUser"});
    return (
        <Stack align="left">
            <Avatar src="/temporary_avatar.svg" alt="pp" size={100} radius="xl" />
            <Text color="gray.1">
                {props.isOnHome?
                `Welcome, ${currentUser?.username??"guest"}`:
                `Best score of ${currentUser?.username} : ${props.userPb??0}`}
            </Text>
        </Stack>
    )
}