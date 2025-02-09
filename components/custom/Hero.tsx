"use client";

import { Message, MessagesContext } from "@/context/MessagesContext";
import { UserContext } from "@/context/UserContext";
import lookup from "@/data/lookup";
import { ArrowRight, Link } from "lucide-react";
import { useContext, useState } from "react";
import LoginDialog from "./LoginDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Cover } from "../ui/cover";

const Hero = () => {
    const [userInput, setUserInput] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserContext);

    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);

    const router = useRouter();

    const onGenerate = async (input: string) => {
        if (!userDetail?.name) {
            setOpenDialog(true);
            return;
        }

        if (!userDetail || !userDetail.token || userDetail?.token < 10) {
            toast("You don't have enough tokens to generate response");
            return;
        }

        const msg: Message = {
            role: "user",
            content: input,
        };
        setMessages([...messages, msg]);

        const workspaceId = await CreateWorkspace({
            user: userDetail?._id,
            messages: [msg],
        });

        // console.log("LOG: workspaceId", workspaceId);

        router.push(`/workspace/${workspaceId}`);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center -mt-0 md:-mt-20">
            <div className="flex flex-col items-center gap-2 w-full px-4 md:px-6 drop-shadow-xl">
                <h2 className="font-bold text-3xl lg:text-5xl text-center">
                    {lookup.HERO_HEADING} at
                </h2>
                <Cover>
                    <h2 className="font-bold text-3xl lg:text-5xl text-center">
                        {lookup.HERO_DESC}
                    </h2>
                </Cover>

                <div className="p-6 border rounded-xl max-w-2xl w-full mt-3 bg-[#3d3d3a]">
                    <div className="flex gap-2">
                        <textarea
                            placeholder={lookup.INPUT_PLACEHOLDER}
                            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        {userInput && (
                            <ArrowRight
                                onClick={() => onGenerate(userInput)}
                                className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer text-white hover:bg-blue-600 transition-colors"
                            />
                        )}
                    </div>
                    <div>
                        <Link className="w-5 h-5 hover:text-blue-500 transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center text-center md:flex-row flex-wrap max-w-2xl mx-auto pt-5 md:justify-center gap-2">
                {lookup.SUGGESTIONS.map((suggestion, index) => (
                    <h2
                        key={index}
                        className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer hover:border-blue-300 transition-colors"
                        onClick={() => onGenerate(suggestion)}
                    >
                        {suggestion}
                    </h2>
                ))}
            </div>
            <LoginDialog
                openDialog={openDialog}
                closeDialog={(v) => setOpenDialog(v)}
            />
        </div>
    );
};

export default Hero;
