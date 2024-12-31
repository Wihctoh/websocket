import { KeyboardEvent, useRef, useState, useEffect } from "react";
import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiOutlineSend } from "react-icons/ai";

import { createMessage } from "../api/api";
import { MessageType } from "./Messages";

function MessageForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => createMessage("Jack", value.trim()),
    onSuccess: () => {
      setValue("");
      setError("");
    },
  });

  const handleSubmitClick = () => {
    if (!value.trim()) {
      setError("Please enter a message");
      return;
    }

    mutate();
  };

  const handleSubmitKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitClick();
    }
  };

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_BASE_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      queryClient.setQueryData(["messages"], (oldData: MessageType[] | undefined) => {
        if (!oldData) return [data];
        return [...oldData, data];
      });
    };

    return () => {
      ws.close();
    };
  }, [queryClient]);

  return (
    <Flex gap='xs' w='100%' mt='lg'>
      <TextInput
        w='100%'
        placeholder='input your message'
        size='lg'
        value={value}
        error={error}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyUp={handleSubmitKeyboard}
      />

      <ActionIcon size='input-lg' onClick={handleSubmitClick}>
        <AiOutlineSend />
      </ActionIcon>
    </Flex>
  );
}

export default MessageForm;
