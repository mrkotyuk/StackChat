import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import MessageGrid from "./components/MessageGrid";
import { useState } from "react";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
  const [messages, setMessages] = useState([]);
  return (
    <Stack minH={"100vh"}>
      <Navbar setMessages={setMessages} />
      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={"4xl"}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textAlign={"center"}
          mb={8}>
          <Text
            as={"span"}
            bgGradient={'linear(to-r, yellow.400, blue.500)'}
            bgClip={'text'}
          >
            Available messages:
          </Text>
        </Text>

        <MessageGrid messages={messages} setMessages={setMessages} />

      </Container>
    </Stack>
  );
}

export default App;
