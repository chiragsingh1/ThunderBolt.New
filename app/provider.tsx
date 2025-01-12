"use client";

import { ReactNode, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";

interface Props {
    children: ReactNode;
}

const Provider = ({ children }: Props) => {
    const [messages, setMessages] = useState("");
    return (
        <div>
            <MessagesContext.Provider value={{ messages, setMessages }}>
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                </NextThemesProvider>
            </MessagesContext.Provider>
        </div>
    );
};

export default Provider;
