"use client";
import lookup from "@/data/lookup";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useState } from "react";

const CodeView = () => {
    const [activeTab, setActiveTab] = useState("code");
    const [files, setFiles] = useState(lookup.DEFAULT_FILE);

    return (
        <div>
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
        </div>
    );
};

export default CodeView;
