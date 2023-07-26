import { Group, ActionIcon, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoSquareFilled, IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { InformationBox } from "./InformationBox";
import { createUser } from "@/utils/supabase";

interface HomeIconMenuProps {
  iconSize?: number;
  isSoundOn: boolean;
  onSoundChange: () => void;
}

export function HomeIconMenu(props: HomeIconMenuProps) {
  const [opened, modalHandlers] = useDisclosure();
  const iconSize = props.iconSize ? props.iconSize : 50
  return (
    <>
      <Modal
        size="xl"
        opened={opened}
        onClose={modalHandlers.close}
        title={<Title ta="center" >Informations</Title>}
        styles={(theme)=>({
          content: {backgroundColor: theme.colors.dark[5], color: theme.colors.gray[1]},
          header: {backgroundColor: "black", color: theme.colors.gray[1]}
        })}
      >
        <InformationBox />
      </Modal>
      <Group position="right">
        <ActionIcon onClick={modalHandlers.open} c="yellow" size={iconSize}>
          <IconInfoSquareFilled size={iconSize} />
        </ActionIcon>
        <ActionIcon onClick={()=>createUser(Math.floor(Math.random()*10).toString())} color="dark" size={iconSize}>
          {props.isSoundOn ?
            <IconVolume size={iconSize} /> :
            <IconVolumeOff size={iconSize} />
          }
        </ActionIcon>
      </Group>
    </>
  )
}