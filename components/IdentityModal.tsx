import { Button, Group, Modal, Tabs, TextInput } from "@mantine/core";
import { FormEvent } from "react";

interface IdentityModalProps {
    name: string;
    opened: boolean;
    isError: boolean;
    isRegister?: boolean;
    onClose: () => void;
    onLogin: (e: FormEvent) => void;
    onRegister: (e: FormEvent) => void;
    onNameChange: (change: string) => void;
    onTabChange: () => void;
}

export function IdentityModal(props: IdentityModalProps) {
    return (
        <Modal.Root
            opened={props.opened}
            onClose={props.onClose}
            closeOnClickOutside={false}
        >
            <Modal.Overlay />
            <Modal.Body>
                <Modal.Content>
                    <Tabs onTabChange={props.onTabChange} defaultValue={props.isRegister?"register":"login"}>
                        <Tabs.List>
                            <Tabs.Tab value="login">Login</Tabs.Tab>
                            <Tabs.Tab value="register">Register</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="login">
                            <form onSubmit={props.onLogin}>
                                <Group align="end" position="center" p="sm">
                                    <TextInput
                                        label="Indentify yourself !"
                                        placeholder='Ex: Alex'
                                        inputWrapperOrder={["label","error","input"]}
                                        error={props.isError?"Username doesn't exist":""}
                                        value={props.name}
                                        onChange={(e) => props.onNameChange(e.target.value)}
                                    />
                                    <Button type="submit">Submit</Button>
                                </Group>
                            </form>
                        </Tabs.Panel>
                        <Tabs.Panel value="register">
                            <form onSubmit={props.onRegister}>
                                <Group align="end" position="center" p="sm">
                                    <TextInput
                                        label="Indentify yourself !"
                                        placeholder='Ex: Alex'
                                        inputWrapperOrder={["label","error","input"]}
                                        error={props.isError?"Username already registered":""}
                                        value={props.name}
                                        onChange={(e) => props.onNameChange(e.target.value)}
                                    />
                                    <Button type="submit">Submit</Button>
                                </Group>
                            </form>
                        </Tabs.Panel>
                    </Tabs>
                </Modal.Content>
            </Modal.Body>
        </Modal.Root>
    )
}