import moment from "moment";
import { Flex, Text, Card, ScrollArea } from "@mantine/core";
import { useEffect, useRef } from "react";

export type MessageType = {
  _id: string;
  name: string;
  message: string;
  createdAt: Date;
};

type Props = {
  data: MessageType[];
};

function Messages({ data }: Props) {
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <ScrollArea w='100%' viewportRef={viewport}>
      {data?.map((message) => (
        <Card key={message._id} mt={5}>
          <Flex justify='space-between'>
            <Text>{moment(message.createdAt).fromNow()}</Text>
            <Text>
              {message.message}: {message.name}
            </Text>
          </Flex>
        </Card>
      ))}
    </ScrollArea>
  );
}

export default Messages;
