import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    ModalFooter,
    IconButton,
    useToast,
    Tooltip
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi"
import { BASE_URL } from "../App";

const EditModal = ({ setMessages, message }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        authorNickname: message.authorNickname,
        authorRole: message.authorRole,
        messageText: message.messageText,
    });

    const handleEditMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/messages/" + message.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }

            setMessages((prevMessages) => prevMessages.map((m) => m.id === message.id ? data : m));
            toast({
                status: 'success',
                title: 'Yayy 💐',
                description: "Message updated successfully.",
                duration: 2000,
                position: "top-center",
            });
            onClose();
        } catch (error) {
            toast({
                title: 'An error occurred.',
                status: 'error',
                description: error.message,
                duration: 4000,
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return <>
        <Tooltip label='Edit message.'>
            <IconButton
                onClick={onOpen}
                variant='ghost'
                colorScheme='blue'
                aria-label='See menu'
                size={"sm"}
                icon={<BiEditAlt size={20} />}
            />
        </Tooltip >
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <form onSubmit={handleEditMessage}>

                <ModalContent>
                    <ModalHeader> Edit message </ModalHeader>

                    <ModalCloseButton />

                    <ModalBody pb={6}>

                        <Flex alignItems={"center"} gap={4}>
                            {/*Left */}
                            <FormControl>
                                <FormLabel>Nickname</FormLabel>
                                <Input placeholder="Nickname"
                                    value={inputs.authorNickname}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, authorNickname: e.target.value }))}
                                />
                            </FormControl>

                            {/*Right */}
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="Role"
                                    value={inputs.authorRole}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, authorRole: e.target.value }))}
                                />
                            </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                resize={"none"}
                                overflowY={"hidden"}
                                placeholder="Something about."
                                value={inputs.messageText}
                                onChange={(e) => setInputs((prev) => ({ ...prev, messageText: e.target.value }))}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>Update</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>

                </ModalContent>
            </form>
        </Modal>
    </>
}
export default EditModal;