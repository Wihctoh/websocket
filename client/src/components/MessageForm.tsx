import { KeyboardEvent, useRef, useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { AiOutlineSend } from "react-icons/ai";

import { createMessage } from "../api/api";
import { MessageType } from "./Messages";

function MessageForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const socket = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createMessage("Jack", value.trim()),
    onSuccess: () => {
      setValue("");
      setError("");
    },
    onError: (error) => {
      setError(`Failed to send message: ${error.message}`);
    },
  });

  const handleSubmitClick = useCallback(() => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setError("Enter a message");
      return;
    }

    mutate();
  }, [value, mutate]);

  const handleSubmitKeyboard = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        handleSubmitClick();
      }
    },
    [handleSubmitClick]
  );

  useEffect(() => {
    socket.current = new WebSocket(import.meta.env.VITE_WS_BASE_URL);

    socket.current.onopen = () => {
      notifications.show({
        title: "Connected",
        message: "You are connected",
        color: "green",
        position: "top-left",
      });
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      queryClient.setQueryData(["messages"], (oldData: MessageType[] | undefined) => {
        if (!oldData) return [data];
        return [...oldData, data];
      });
    };

    socket.current.onclose = () => {
      notifications.show({
        title: "Disconnected",
        message: "connection lost",
        color: "red",
        position: "top-left",
      });
    };
  }, [queryClient]);

  return (
    <Flex gap='xs' w='100%' mt='lg' align='flex-end'>
      <TextInput
        w='100%'
        autoFocus
        description='shift + enter to send'
        placeholder='input your message'
        size='lg'
        value={value}
        error={error}
        rightSection={
          <ActionIcon size='input-lg' onClick={handleSubmitClick} loading={isPending}>
            <AiOutlineSend />
          </ActionIcon>
        }
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyUp={handleSubmitKeyboard}
      />
    </Flex>
  );
}

export default MessageForm;
