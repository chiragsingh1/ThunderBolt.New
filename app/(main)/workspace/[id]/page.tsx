import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";

const Workspace = () => {
    return (
        <div className="p-3 pr-5 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
                <ChatView />
                <div className="col-span-2 mt-5 md:mt-0">
                    <CodeView />
                </div>
            </div>
        </div>
    );
};

export default Workspace;
