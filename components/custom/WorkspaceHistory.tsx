"use client";

import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { GenericId } from "convex/values";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

interface WorkSpaceListType {
    _id: GenericId<"workspace">;
    _creationTime: number;
    fileData?: any;
    messages: any;
    user: GenericId<"users">;
}

const WorkspaceHistory = () => {
    const [workspaceList, setWorkspaceList] = useState<WorkSpaceListType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toggleSidebar } = useSidebar();
    const { userDetail, setUserDetail } = useContext(UserContext);
    const convex = useConvex();

    useEffect(() => {
        if (userDetail?._id) {
            GetAllWorkspaces();
        }
    }, [userDetail?._id]);

    const GetAllWorkspaces = async () => {
        try {
            setIsLoading(true);
            const result = await convex.query(api.workspace.GetAllWorkspaces, {
                userId: userDetail?._id as GenericId<"users">,
            });
            setWorkspaceList(result);
        } catch (error) {
            console.error("Error fetching workspaces:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="font-medium text-lg">Your Chats</h2>
            <div>
                {workspaceList &&
                    workspaceList?.map((workspace, i) => (
                        <Link
                            key={workspace?._id}
                            href={`/workspace/${workspace?._id}`}
                        >
                            <h2
                                className="text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer"
                                onClick={toggleSidebar}
                            >
                                {workspace?.messages[0]?.content}
                            </h2>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default WorkspaceHistory;
