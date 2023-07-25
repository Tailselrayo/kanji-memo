import { DifficultySelector } from "@/components/DifficultySelector";
import { HomeIconMenu } from "@/components/HomeIconMenu";
import { ProfilePicture } from "@/components/ProfilePicture";
import { Group, Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

export default function Redirect() {
    const [currentUser] = useLocalStorage({ key: "currentUser" })
    const [isSoundOn, setIsSoundOn] = useLocalStorage<boolean>({ key: "isSoundOn" })
    return (
        <Stack w="100%">
            <Group w="100%" position="apart">
                <ProfilePicture currentUser={currentUser} />
                <Stack h="100%" justify="start">
                    <HomeIconMenu isSoundOn={isSoundOn} onSoundChange={() => setIsSoundOn(!isSoundOn)} />
                </Stack>
            </Group>
            <Stack>
                <DifficultySelector />
            </Stack>
        </Stack>
    )
}