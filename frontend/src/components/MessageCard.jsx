import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, Tooltip, useToast } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const MessageCard = ({ message, setMessages }) => {
    const toast = useToast();
    const handleDeleteMessage = async () => {
        try {
            const res = await fetch(BASE_URL + "/messages/" + message.id, {
                method: "DELETE",

            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setMessages((prevMessages) => prevMessages.filter((m) => m.id !== message.id));
            toast({
                title: 'Success',
                status: 'success',
                description: 'Message deleted successfully',
                duration: 2000,
                position: "top-center",
            });
        } catch (error) {
            toast({
                title: 'An error occurred.',
                status: 'error',
                description: error.message,
                duration: 4000,
                position: "top-center",
            });
        }
    };
    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                        <Avatar src={message.authorImgUrl} />
                        <Box>
                            <Heading size="sm">{message.authorNickname}</Heading>
                            <Text>{message.authorRole}</Text>
                            <Text>{message.messageDatetime}</Text>
                        </Box>
                    </Flex>

                    <Flex>
                        <EditModal setMessages={setMessages} message={message} />
                        <Tooltip label='Delete message.'>
                            <IconButton
                                variant="ghost"
                                colorScheme="red"
                                size={"sm"}
                                aria-label="See menu"
                                icon={
                                    <BiTrash size={20}
                                        onClick={handleDeleteMessage}
                                    />}
                            />
                        </Tooltip>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {message.messageText}
                </Text>
            </CardBody>
        </Card >)
};
export default MessageCard;