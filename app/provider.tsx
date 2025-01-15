"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { Message, MessagesContext } from "@/context/MessagesContext";
import { UserContext, UserDetail } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";

const Provider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
    const [action, setAction] = useState<any>(null);

    const router = useRouter();
    const convex = useConvex();

    const IsAuthenticated = async () => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(`${localStorage.getItem("user")}`);

            if (!user) {
                router.push("/");
            }
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
            <PayPalScriptProvider
                options={{
                    clientId: process.env
                        .NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
                }}
            >
                <UserContext.Provider value={{ userDetail, setUserDetail }}>
                    <MessagesContext.Provider value={{ messages, setMessages }}>
                        <ActionContext.Provider value={{ action, setAction }}>
                            <NextThemesProvider
                                attribute="class"
                                defaultTheme="dark"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <SidebarProvider
                                    defaultOpen={false}
                                    className="flex flex-col"
                                >
                                    <Header />
                                    {children}

                                    <div className="absolute">
                                        <AppSidebar />
                                    </div>
                                </SidebarProvider>
                            </NextThemesProvider>
                        </ActionContext.Provider>
                    </MessagesContext.Provider>
                </UserContext.Provider>
            </PayPalScriptProvider>
        </GoogleOAuthProvider>
    );
};

export default Provider;
