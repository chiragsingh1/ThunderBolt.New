import { createContext, Dispatch, SetStateAction } from "react";

export interface Message {
    role: string;
    content: string;
}

interface MessageContextType {
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
}

export const MessagesContext = createContext<MessageContextType>({
    messages: [],
    setMessages: () => {},
});
