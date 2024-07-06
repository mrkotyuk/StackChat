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
    RadioGroup,
    Radio,
    ModalFooter,
    useToast,
    Tooltip
} from "@chakra-ui/react";
import { useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateMessageModal = ({ setMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        authorNickname: "",
        authorRole: "",
        messageText: "",
        authorGender: ""
    });
    const toast = useToast();

    const handleCreateMessage = async (e) => {
        e.preventDefault(); // prevent page reload
        setIsLoading(true);

        try {
            const res = await fetch(BASE_URL + "/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            toast({
                status: 'success',
                title: 'Yayy 💐',
                description: "Message created successfully.",
                duration: 2000,
                position: "top-center",
            });
            onClose();
            setMessages((prevMessages) => [...prevMessages, data]);
            // clear inputs
            setInputs({
                authorNickname: "",
                authorRole: "",
                messageText: "",
                authorGender: ""
            });
        } catch (error) {
            toast({
                status: 'error',
                title: 'An error occurred.',
                description: error.message,
                duration: 4000,
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return <>
        <Tooltip label='Create a message.'>
            <Button onClick={onOpen}>
                <BiMessageAdd size={20} />
            </Button>
        </Tooltip >
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <form onSubmit={handleCreateMessage}>

                <ModalContent>
                    <ModalHeader> New message </ModalHeader>

                    <ModalCloseButton />

                    <ModalBody pb={6}>

                        <Flex alignItems={"center"} gap={4}>
                            {/*Left */}
                            <FormControl>
                                <FormLabel>Nickname</FormLabel>
                                <Input placeholder="Nickname"
                                    value={inputs.authorNickname}
                                    onChange={(e) => setInputs({ ...inputs, authorNickname: e.target.value })} />
                            </FormControl>

                            {/*Right */}
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="Role"
                                    value={inputs.authorRole}
                                    onChange={(e) => setInputs({ ...inputs, authorRole: e.target.value })} />
                            </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                resize={"none"}
                                overflowY={"hidden"}
                                placeholder="Something about."
                                value={inputs.messageText}
                                onChange={(e) => setInputs({ ...inputs, messageText: e.target.value })} />
                        </FormControl>

                        <RadioGroup mt={4}>
                            <Flex gap={5}>
                                <Radio value="male"
                                    onChange={(e) => setInputs({ ...inputs, authorGender: e.target.value })}>
                                    Male</Radio>
                                <Radio value="female"
                                    onChange={(e) => setInputs({ ...inputs, authorGender: e.target.value })}>
                                    Female</Radio>
                            </Flex>
                        </RadioGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue" mr={3} type="submit"
                            isLoading={isLoading}
                        >
                            Send
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>

                </ModalContent>
            </form>
        </Modal>
    </>
};

export default CreateMessageModal;