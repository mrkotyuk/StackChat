import { useColorMode, Button, Text, Flex, Box, Container, useColorModeValue, Tooltip } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import CreateMessageModal from "./CreateMessageModal";

const Navbar = ({ setMessages }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    return <Container maxW={"900px"}>
        <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                {/*Left side */}
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    display={{ base: "none", sm: "flex" }}
                    gap={2}
                >
                    <img src="/stack.png" alt="React logo" width={64} height={64} />
                    <Text fontSize={"2xl"} fontWeight={500} display={{ base: "none", md: "block" }}
                        as={"span"}
                        bgGradient={'linear(to-l, yellow.400, blue.500)'}
                        bgClip={'text'}>
                        StackChat
                    </Text>
                    <Text fontSize={"2xl"} fontWeight={500}>
                        🔥
                    </Text>
                </Flex>

                {/* Right side */}
                <Flex gap={3} alignItems={"center"}>
                    <Tooltip label='Toggle light or dark mode.'>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
                        </Button>
                    </Tooltip>
                    <CreateMessageModal setMessages={setMessages} />
                </Flex>
            </Flex>
        </Box>
    </Container >;

};
export default Navbar;