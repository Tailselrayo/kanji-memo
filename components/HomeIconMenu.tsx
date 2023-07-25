import { Group, ActionIcon } from "@mantine/core";
import { IconInfoSquareFilled, IconVolume, IconVolumeOff } from "@tabler/icons-react";

interface HomeIconMenuProps {
    iconSize?: number;
    isSoundOn: boolean;
    onSoundChange: () => void;
}

export function HomeIconMenu(props: HomeIconMenuProps) {
    const iconSize = props.iconSize?props.iconSize:50
    return (
        <Group h="100%" position="right">
              <ActionIcon c="blue" size={iconSize}>
                <IconInfoSquareFilled size={iconSize} />
              </ActionIcon>
              <ActionIcon onClick={props.onSoundChange} color="gray.3" size={iconSize}>
                {props.isSoundOn ?
                  <IconVolume size={iconSize} /> :
                  <IconVolumeOff size={iconSize} />
                }
              </ActionIcon>
            </Group>
    )
}