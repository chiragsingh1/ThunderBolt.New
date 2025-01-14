"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import colors from "@/data/colors";
import lookup from "@/data/lookup";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { GenericId } from "convex/values";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Prompt from "@/data/prompt";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { countToken } from "@/lib/utils";

const ChatView = () => {
    const { id } = useParams();
    const convex = useConvex();
    const UpdateMessages = useMutation(api.workspace.UpdateMessages);
    const UpdateTokens = useMutation(api.users.UpdateToken);

    const { toggleSidebar } = useSidebar();

    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(true);

    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserContext);

    const GetWorkspaceData = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id as GenericId<"workspace">,
        });
        setMessages(result?.messages);
    };

    const GetAIResponse = async () => {
        setLoading(true);
        const prompt = Prompt.CHAT_PROMPT + JSON.stringify(messages);
        const result = await axios.post("/api/ai", {
            prompt,
        });
        // console.log(result.data.result);
        const AIresponse = { content: result.data.result, role: "ai" };
        setMessages((prev) => [...prev, AIresponse]);

        await UpdateMessages({
            messages: [...messages, AIresponse],
            workspaceId: id as GenericId<"workspace">,
        });

        const token =
            Number(userDetail?.token) -
            Number(countToken(JSON.stringify(AIresponse)));

        await UpdateTokens({
            userId: userDetail?._id as GenericId<"users">,
            tokenCount: token,
        });

        setLoading(false);
    };

    const onGenerate = async (input: any) => {
        setMessages((prev) => [...prev, { content: input, role: "user" }]);
        setUserInput("");
    };

    useEffect(() => {
        id && GetWorkspaceData();
    }, [id]);

    useEffect(() => {
        if (messages?.length > 0) {
            const role = messages[messages.length - 1].role;
            if (role === "user") {
                GetAIResponse();
            }
        }
    }, [messages]);

    return (
        <div className="relative h-[85vh] flex flex-col">
            <div className="flex-1 overflow-y-scroll scrollbar-hide px-5">
                {messages?.map((message, index) => (
                    <div
                        key={index}
                        className="p-3 px-5 rounded-lg mb-2 flex gap-3 items-center leading-7"
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
                        <ReactMarkdown className="flex flex-col">
                            {message.content}
                        </ReactMarkdown>
                    </div>
                ))}
                {loading && (
                    <div
                        className="p-3 px-5 rounded-lg mb-2 flex gap-3 items-center"
                        style={{ backgroundColor: colors.BACKGROUND }}
                    >
                        <Loader2Icon className="animate-spin h-5 w-5" />
                        <h2>Generating response....</h2>
                    </div>
                )}
            </div>
            {/* Input Section */}
            <div className="flex gap-2 items-end">
                {userDetail && (
                    <Image
                        src={userDetail?.picture}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full cursor-pointer hover:animate-spin"
                        onClick={toggleSidebar}
                    />
                )}
                <div className="p-6 border rounded-xl max-w-2xl w-full mt-3 bg-gray-800">
                    <div className="flex gap-2">
                        <textarea
                            placeholder={lookup.INPUT_PLACEHOLDER}
                            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
                            onChange={(e) => setUserInput(e.target.value)}
                            value={userInput}
                        />
                        {userInput && (
                            <ArrowRight
                                onClick={() => {
                                    onGenerate(userInput);
                                }}
                                className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer text-white hover:bg-blue-600 transition-colors"
                            />
                        )}
                    </div>
                    <div>
                        <Link className="w-5 h-5 hover:text-blue-500 transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatView;
