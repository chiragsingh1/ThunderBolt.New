"use client";

import { ReactNode, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserContext } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface Props {
    children: ReactNode;
}

const Provider = ({ children }: Props) => {
    const [messages, setMessages] = useState(null);
    const [userDetail, setUserDetail] = useState(null);

    return (
        <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
            <UserContext.Provider value={{ userDetail, setUserDetail }}>
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
            </UserContext.Provider>
        </GoogleOAuthProvider>
    );
};

export default Provider;
