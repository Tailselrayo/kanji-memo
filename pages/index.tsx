import { HomeIconMenu } from '@/components/HomeIconMenu'
import { IdentityModal } from '@/components/IdentityModal'
import { ProfilePicture } from '@/components/ProfilePicture'
import { ActionIcon, Affix, Avatar, Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core'
import { useDisclosure, useInputState, useLocalStorage } from '@mantine/hooks'
import { IconLogout } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

export default function Home() {
  const [users, setUsers] = useLocalStorage<string[]>({ key: "users", defaultValue: [] })
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useInputState("");
  const [isSoundOn, setIsSoundOn] = useLocalStorage<boolean>({key: "isSoundOn", defaultValue: true});
  const [currentUser, setCurrentUser] = useLocalStorage({ key: "currentUser" });
  const [opened, modalHandlers] = useDisclosure(true);

  const onRegister = (e: FormEvent) => {
    e.preventDefault();
    if (onIdentification(users.includes(inputValue))) {
      setUsers(users.concat([inputValue]))
    }

  }

  const onLogin = (e: FormEvent) => {
    e.preventDefault();
    onIdentification(!users.includes(inputValue))
  }

  const onIdentification = (error: boolean) => {
    if (error){
      setIsError(true)
      return !error
    }
    setCurrentUser(inputValue);
    setInputValue("");
    modalHandlers.close();
    setIsError(false);
    return !error
  }

  const onLogout = () => {
    setCurrentUser("");
    modalHandlers.open();
  }

  useEffect(()=>setIsError(false),[inputValue])
  return (
    <>
      <IdentityModal 
        isRegister={!users.length}
        opened={opened&&!currentUser}
        isError={isError}
        name={inputValue}
        onClose={()=>{}}
        onNameChange={setInputValue}
        onLogin={onLogin}
        onRegister={onRegister}
        onTabChange={()=>setIsError(false)}
      />
      <Stack h="100%" w="100%">
        <Group h="60%" align="apart" grow>
          <ProfilePicture currentUser={currentUser} />
          <Stack w="60%" align="center" justify="center">
            <Link style={{display: "flex", textDecoration: "none", width: "100%"}} href="/choose-level">
              <Button w="100%" variant="gradient" gradient={{ from: "red", to: "orange" }} h={50}>
                <Text fz="xl">Play</Text>
              </Button>
            </Link>
            <Button w="100%" h={50} variant="gradient" gradient={{ from: "blue", to: "teal" }}>
              <Text fz="xl">Shop</Text>
            </Button>
          </Stack>
          <Stack align="right" justify="right">
            <HomeIconMenu isSoundOn={isSoundOn} onSoundChange={() => setIsSoundOn(!isSoundOn)} />
          </Stack>
        </Group>
        <Affix position={{right: 20, bottom: 20}}>
          <ActionIcon onClick={onLogout} color="red" size={40}>
            <IconLogout size={40}/>
          </ActionIcon>
        </Affix>
      </Stack>
    </>
  )
}
