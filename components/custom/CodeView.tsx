"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserContext } from "@/context/UserContext";
import { ActionContext } from "@/context/ActionContext";
import { api } from "@/convex/_generated/api";
import lookup from "@/data/lookup";
import prompt from "@/data/prompt";
import { countToken } from "@/lib/utils";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { GenericId } from "convex/values";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import SandpackPreviewClient from "./SandpackPreviewClient";

const CodeView = () => {
    // Separate loading states for different operations to prevent interference
    const [workspaceLoading, setWorkspaceLoading] = useState(true);
    const [generatingCode, setGeneratingCode] = useState(false);
    const [activeTab, setActiveTab] = useState("code");
    const [files, setFiles] = useState(lookup.DEFAULT_FILE);

    // Ref to prevent multiple simultaneous code generation requests
    const isProcessingRef = useRef(false);

    // Get route parameter and context values
    const { id } = useParams();
    const { messages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserContext);
    const { action, setAction } = useContext(ActionContext);

    // Initialize mutations and Convex client
    const UpdateFiles = useMutation(api.workspace.UpdateFiles);
    const UpdateTokens = useMutation(api.users.UpdateToken);
    const convex = useConvex();

    // Fetch initial workspace data when component mounts
    const GetWorkspaceData = useCallback(async () => {
        try {
            setWorkspaceLoading(true);
            const result = await convex.query(api.workspace.GetWorkspace, {
                workspaceId: id as GenericId<"workspace">,
            });
            // Merge default files with workspace data
            const mergedFiles = { ...lookup.DEFAULT_FILE, ...result?.fileData };
            setFiles(mergedFiles);
        } catch (error) {
            console.error("Error fetching workspace data:", error);
        } finally {
            setWorkspaceLoading(false);
        }
    }, [id, convex]);

    // Generate code using AI based on user messages
    const GenerateAICode = useCallback(async () => {
        // Prevent multiple simultaneous generations
        if (isProcessingRef.current || !messages.length) return;

        try {
            isProcessingRef.current = true;
            setGeneratingCode(true); // Start loading state for code generation

            const lastMessage = messages[messages.length - 1];
            // Only proceed if the last message is from the user
            if (lastMessage.role !== "user") return;

            // Prepare and send request to AI code generation endpoint
            const PROMPT =
                prompt.CODE_GEN_PROMPT + " " + JSON.stringify(messages);
            const result = await axios.post("/api/gen-ai-code", {
                prompt: PROMPT,
            });

            const AIresponse = result.data;

            // Update files with AI-generated code
            const mergedFiles = {
                ...lookup.DEFAULT_FILE,
                ...AIresponse?.files,
            };
            setFiles(mergedFiles);

            // Persist files to database
            await UpdateFiles({
                workspaceId: id as GenericId<"workspace">,
                files: AIresponse?.files,
            });

            // Calculate and update token usage
            const token =
                Number(userDetail?.token) -
                Number(countToken(JSON.stringify(AIresponse)));

            setUserDetail((prev) => ({ ...prev, token }));

            await UpdateTokens({
                userId: userDetail?._id as GenericId<"users">,
                tokenCount: token,
            });

            setActiveTab("preview");
        } catch (error) {
            console.error("Error generating AI code:", error);
        } finally {
            setGeneratingCode(false); // End loading state for code generation
            isProcessingRef.current = false;
        }
    }, [messages, id, userDetail, UpdateFiles, UpdateTokens, setUserDetail]);

    // Load initial workspace data
    useEffect(() => {
        if (id) {
            GetWorkspaceData();
        }
    }, [id, GetWorkspaceData]);

    // Trigger code generation when new user message arrives
    useEffect(() => {
        if (messages?.length > 0 && !isProcessingRef.current) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === "user") {
                GenerateAICode();
            }
        }
    }, [messages, GenerateAICode]);

    return (
        <div className="relative">
            <div className="bg-[#181818] w-full p-2 border">
                <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-2 justify-center rounded-full">
                    <h2
                        className={`text-sm cursor-pointer ${
                            activeTab === "code" &&
                            "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
                        }`}
                        onClick={() => setActiveTab("code")}
                    >
                        Code
                    </h2>
                    <h2
                        className={`text-sm cursor-pointer ${
                            activeTab === "preview" &&
                            "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
                        }`}
                        onClick={() => setActiveTab("preview")}
                    >
                        Preview
                    </h2>
                </div>
            </div>
            <SandpackProvider
                template="react"
                theme="dark"
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
                        <SandpackPreviewClient />
                    )}
                </SandpackLayout>
            </SandpackProvider>
            {/* Loading overlay with context-specific messages */}
            {(workspaceLoading || generatingCode) && (
                <div className="p-10 bg-gray-900/80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
                    <Loader2Icon className="animate-spin h-10 w-10 text-white" />
                    <h2 className="text-white">
                        {workspaceLoading
                            ? "Loading workspace..."
                            : "Generating your code..."}
                    </h2>
                </div>
            )}
        </div>
    );
};

export default CodeView;
