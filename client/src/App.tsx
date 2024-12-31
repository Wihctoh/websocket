import { Title, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { getAllMessages } from "./api/api";

import MessageForm from "./components/MessageForm";
import Messages from "./components/Messages";

function App() {
  const { data, isPending, error } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => getAllMessages(),
  });

  if (isPending) {
    return (
      <Flex p='xl' w='100%' h='100vh' gap='10' direction='column' justify='flex-end' align='center'>
        <Title order={1}>Loading...</Title>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex p='xl' w='100%' h='100vh' gap='10' direction='column' justify='flex-end' align='center'>
        <MessageForm />
      </Flex>
    );
  }

  return (
    <Flex p='xl' w='100%' h='100vh' gap='10' direction='column' justify='flex-end' align='center'>
      <Messages data={data} />

      <MessageForm />
    </Flex>
  );
}

export default App;
