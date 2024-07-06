import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";
import MessageCard from "./MessageCard";

const MessageGrid = ({ messages, setMessages }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch(BASE_URL + "/messages");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        }
        getMessages();
        // Періодичне отримання повідомлень
        const intervalId = setInterval(getMessages, 3000); // 3000 мс = 3 секунд

        // Очищення інтервалу при демонтажі компонента
        return () => clearInterval(intervalId);
    }, [setMessages])

    return (
        <>
            <Grid
                templateColumns="1fr"
                flexDirection="column-reverse"
                display="flex"
                gap={4}
            >
                {messages.map((message) => (
                    <MessageCard key={message.id} message={message} setMessages={setMessages} />
                ))}
            </Grid>
            {isLoading && (
                <Flex justifyContent={"center"}>
                    <Spinner thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl' />
                </Flex>
            )}
            {!isLoading && messages.length === 0 && (
                <Flex justifyContent={"center"}>
                    <Text as={"span"} fontSize={"2x1"} fontWeight={"bold"} mr={2}>
                        No messages found. 😟
                    </Text>
                </Flex>
            )}

        </>
    );
};
export default MessageGrid;