import { DifficultySelector } from "@/components/DifficultySelector";
import { Layout } from "@/components/Layout";
import {  Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

export default function Redirect() {
    const [currentUser] = useLocalStorage({ key: "currentUser" })
    const [isSoundOn, setIsSoundOn] = useLocalStorage<boolean>({ key: "isSoundOn" })
    return (
        <Layout currentUser={currentUser} isSoundOn={isSoundOn} onSoundChange={()=>setIsSoundOn(!isSoundOn)}>
            <Stack>
                <DifficultySelector />
            </Stack>
        </Layout>
    )
}