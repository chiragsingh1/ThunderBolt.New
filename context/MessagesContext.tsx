import { createContext, Dispatch, SetStateAction } from "react";

export interface Message {
    role: string;
    content: string;
}

// export interface Messages {
//     messages: Message[];
//     setMessages: Dispatch<SetStateAction<Message[]>>;
// }

interface MessageContextType {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

export const MessagesContext = createContext<MessageContextType>({
    messages: [],
    setMessages: () => {},
});
