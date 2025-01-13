"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { Message, MessagesContext } from "@/context/MessagesContext";
import { UserContext, UserDetail } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

const Provider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

    const convex = useConvex();

    const IsAuthenticated = async () => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(`${localStorage.getItem("user")}`);

            // fetch user from db
            if (user) {
                const result = await convex.query(api.users.GetUser, {
                    email: user.email,
                });
                setUserDetail(result);
            }
        }
    };

    useEffect(() => {
        IsAuthenticated();
    }, []);

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
