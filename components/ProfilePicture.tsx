import { Stack, Text, Avatar } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { User } from "@/types/User";

interface ProfilePictureProps {
    isOnHome?: boolean;
    userPb?: number;
    ranking?: number;
}

export function ProfilePicture(props: ProfilePictureProps) {
    const [currentUser] = useLocalStorage<User|null>({key: "currentUser"});

    const getRankingWriting = (rank: number) => {
        const end = rank%10;
        const tens = (rank-end)/10;
        if (end===1&&tens%10!==1) {
            return "st"
        }
        else if (end===2&&tens%10!==1) {
            return "nd"
        }
        else {
            return "th"
        }
    }

    return (
        <Stack align="left">
            <Avatar src="/temporary_avatar.svg" alt="pp" size={100} radius="xl" />
            <Text color="gray.1">
                {props.isOnHome?
                `Welcome, ${currentUser?.username??"guest"}`: (props.ranking?
                `Ranking of ${currentUser?.username} : ${props.ranking}${getRankingWriting(props.ranking)}`:
                `Best score of ${currentUser?.username} : ${props.userPb??0}`)}
            </Text>
        </Stack>
    )
}