import { Group, ActionIcon, Modal, Title } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { IconInfoSquareFilled, IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { InformationBox } from "./InformationBox";

interface HomeIconMenuProps {
  iconSize?: number;
}

export function HomeIconMenu(props: HomeIconMenuProps) {
  const [isSoundOn, setIsSoundOn] = useLocalStorage<boolean>({key: "isSoundOn"})
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
        <ActionIcon onClick={()=>setIsSoundOn(!isSoundOn)} color="dark" size={iconSize}>
          {isSoundOn ?
            <IconVolume size={iconSize} /> :
            <IconVolumeOff size={iconSize} />
          }
        </ActionIcon>
      </Group>
    </>
  )
}