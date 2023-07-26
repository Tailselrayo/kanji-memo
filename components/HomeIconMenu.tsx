import { Group, ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoSquareFilled, IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { InformationBox } from "./InformationBox";

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
      <Modal opened={opened} onClose={modalHandlers.close}>
        <InformationBox />
      </Modal>
      <Group position="right">
        <ActionIcon onClick={modalHandlers.open} c="yellow" size={iconSize}>
          <IconInfoSquareFilled size={iconSize} />
        </ActionIcon>
        <ActionIcon onClick={props.onSoundChange} color="dark" size={iconSize}>
          {props.isSoundOn ?
            <IconVolume size={iconSize} /> :
            <IconVolumeOff size={iconSize} />
          }
        </ActionIcon>
      </Group>
    </>
  )
}