import { useLocalStorage } from "@mantine/hooks"
import { useState } from "react";

export function useSounds() {
    const [isSoundOn, setIsSoundOn] = useLocalStorage<boolean>({ key: "isSoundOn" });
    const [sounds, setSounds] = useState<{ [key: string]: HTMLAudioElement }>({});

    const toggle = () => {
        setIsSoundOn(!isSoundOn);
    }

    const store = (dictionary: {[key: string]:string }) => {
        const audio: {[key: string]: HTMLAudioElement} = {};
        Object.keys(dictionary).forEach((key)=>{
            audio[key] = new Audio(dictionary[key])
        })
        setSounds(audio);
    }

    const play = (key: string) => {
        if (isSoundOn) {
            sounds[key].currentTime = 0;
            sounds[key].play();
        }
    }

    return (
        {
            sounds: isSoundOn,
            soundHandlers: { toggle, store, play },
        }
    )
}