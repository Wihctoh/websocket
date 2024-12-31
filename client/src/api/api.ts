import axios from "axios";

import { MessageType } from "../components/Messages";

export const getAllMessages = async (): Promise<MessageType[]> => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/messages`);
  return data.data;
};

export const createMessage = async (name: string, message: string): Promise<MessageType> => {
  const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/messages`, { name, message });
  return data.data;
};
