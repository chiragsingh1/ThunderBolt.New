"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import colors from "@/data/colors";
import lookup from "@/data/lookup";
import { useConvex } from "convex/react";
import { GenericId } from "convex/values";
import { ArrowRight, Link } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const ChatView = () => {
    const { id } = useParams();
    const convex = useConvex();

    const [userInput, setUserInput] = useState("");

    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserContext);

    const GetWorkspaceData = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id as GenericId<"workspace">,
        });
        setMessages(result?.messages);
    };

    useEffect(() => {
        id && GetWorkspaceData();
    }, [id]);

    return (
        <div className="relative h-[85vh] flex flex-col">
            <div className="flex-1 overflow-y-scroll">
                {messages?.map((message, index) => (
                    <div
                        key={index}
                        className="p-3 px-5 rounded-lg mb-2 flex gap-3 items-center"
                        style={{ backgroundColor: colors.BACKGROUND }}
                    >
                        {message?.role === "user" && (
                            <Image
                                src={userDetail?.picture as string}
                                alt="User"
                                width={35}
                                height={35}
                                className="rounded-full"
                            />
                        )}
                        <h2>{message.content}</h2>
                    </div>
                ))}
            </div>
            {/* Input Section */}
            <div className="p-6 border rounded-xl max-w-2xl w-full mt-3 bg-gray-800">
                <div className="flex gap-2">
                    <textarea
                        placeholder={lookup.INPUT_PLACEHOLDER}
                        className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    {userInput && (
                        <ArrowRight
                            onClick={() => {}}
                            className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer text-white hover:bg-blue-600 transition-colors"
                        />
                    )}
                </div>
                <div>
                    <Link className="w-5 h-5 hover:text-blue-500 transition-colors cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default ChatView;
