"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import lookup from "@/data/lookup";
import prompt from "@/data/prompt";
import { countToken } from "@/lib/utils";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { GenericId } from "convex/values";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const CodeView = () => {
    const [activeTab, setActiveTab] = useState("code");
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(lookup.DEFAULT_FILE);

    const { id } = useParams();

    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserContext);

    const UpdateFiles = useMutation(api.workspace.UpdateFiles);
    const UpdateTokens = useMutation(api.users.UpdateToken);
    const convex = useConvex();

    const GetWorkspaceData = async () => {
        setLoading(true);
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id as GenericId<"workspace">,
        });
        const mergedFiles = { ...lookup.DEFAULT_FILE, ...result?.fileData };
        setFiles(mergedFiles);
        setLoading(false);
    };

    useEffect(() => {
        id && GetWorkspaceData();
    }, [id]);

    const GenerateAICode = async () => {
        setLoading(true);
        const PROMPT = prompt.CODE_GEN_PROMPT + " " + JSON.stringify(messages);

        const result = await axios.post("/api/gen-ai-code", {
            prompt: PROMPT,
        });

        const AIresponse = result.data;
        console.log(AIresponse);

        const mergedFiles = { ...lookup.DEFAULT_FILE, ...AIresponse?.files };
        setFiles(mergedFiles);
        await UpdateFiles({
            workspaceId: id as GenericId<"workspace">,
            files: AIresponse?.files,
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

    useEffect(() => {
        if (messages?.length > 0) {
            const role = messages[messages.length - 1].role;
            if (role === "user") {
                GenerateAICode();
            }
        }
    }, [messages]);

    return (
        <div className="relative">
            <div className="bg-[#181818] w-full p-2 border">
                <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-2 justify-center rounded-full">
                    <h2
                        className={`text-sm cursor-pointer ${activeTab === "code" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
                        onClick={() => setActiveTab("code")}
                    >
                        Code
                    </h2>
                    <h2
                        className={`text-sm cursor-pointer ${activeTab === "preview" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
                        onClick={() => setActiveTab("preview")}
                    >
                        Preview
                    </h2>
                </div>
            </div>
            <SandpackProvider
                template="react"
                theme={"dark"}
                customSetup={{
                    dependencies: {
                        ...lookup.DEPENDENCY,
                    },
                }}
                files={files}
                options={{
                    externalResources: ["https://cdn.tailwindcss.com"],
                }}
            >
                <SandpackLayout>
                    {activeTab === "code" ? (
                        <>
                            <SandpackFileExplorer style={{ height: "80vh" }} />
                            <SandpackCodeEditor style={{ height: "80vh" }} />
                        </>
                    ) : (
                        <>
                            <SandpackPreview
                                style={{ height: "80vh" }}
                                showNavigator
                            />
                        </>
                    )}
                </SandpackLayout>
            </SandpackProvider>
            {loading && (
                <div className="p-10 bg-gray-900/80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
                    <Loader2Icon className="animate-spin h-10 w-10 text-white" />
                    <h2 className="text-white">Generating your code...</h2>
                </div>
            )}
        </div>
    );
};

export default CodeView;
