import { IdentityModal } from '@/components/IdentityModal'
import { Layout } from '@/components/Layout'
import { User } from '@/types/User'
import { createUser, getLeaderBoard, getPb, selectUser } from '@/utils/supabase'
import { ActionIcon, Affix, Button, Group, Stack, Text } from '@mantine/core'
import { useDisclosure, useInputState, useLocalStorage } from '@mantine/hooks'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { IconBook, IconLogout } from '@tabler/icons-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

export default function Home() {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>({ key: "currentUser", defaultValue: null });
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useInputState("");
  const [opened, modalHandlers] = useDisclosure(false);

  const onRegister = async (e: FormEvent) => {
    e.preventDefault();
    onIdentification((await createUser(inputValue)))


  }

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    onIdentification(await selectUser(inputValue))
  }

  const onIdentification = (data: PostgrestSingleResponse<User>) => {
    if (!(data.status === 201 || data.status === 200)) {
      setIsError(true)
      return;
    }
    setCurrentUser(data.data);
    setInputValue("");
    modalHandlers.close();
    setIsError(false);
  }

  const onLogout = () => {
    setCurrentUser(null);
    modalHandlers.open();
  }

  useEffect(() => setIsError(false), [inputValue])
  return (
    <>
      <IdentityModal
        isRegister={false}
        opened={opened && !currentUser}
        isError={isError}
        name={inputValue}
        onClose={() => { }}
        onNameChange={setInputValue}
        onLogin={onLogin}
        onRegister={onRegister}
        onTabChange={() => setIsError(false)}
      />
      <Layout isOnHome>
        <Stack align="center">
          <Link style={{ display: "flex", textDecoration: "none", width: "50%" }} href="/choose-level">
            <Button size="xl" w="100%" variant="gradient" gradient={{ from: "red", to: "orange" }} h={50}>
              Play
            </Button>
          </Link>
          <Group grow>
            <Link style={{ display: "flex", textDecoration: "none", width: "50%" }} href="/dictionary">
              <Button size="xl" h={50} variant="gradient" gradient={{ from: "blue", to: "teal" }}>
                Kanji Stats
              </Button>
            </Link>
            <Link style={{ display: "flex", textDecoration: "none", width: "50%" }} href="/leaderboard">
              <Button size="xl" h={50} variant="gradient" gradient={{from:"yellow",to:"orange"}}>
                Leaderboard
              </Button>
            </Link>
          </Group>
        </Stack>
        <Affix position={{ right: 20, bottom: 20 }} zIndex={1}>
          <ActionIcon onClick={onLogout} color="red" size={40}>
            <IconLogout size={40} />
          </ActionIcon>
        </Affix>
        <Affix position={{ left: 20, bottom: 20 }} zIndex={1}>
          <Link href="/dictionary">
            <ActionIcon color="orange.3" size={50}>
              <IconBook size={50} />
            </ActionIcon>
          </Link>
        </Affix>
      </Layout>
    </>
  )
}
