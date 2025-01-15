import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter, usePathname } from "next/navigation";
import { DownloadIcon, RocketIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { ActionContext } from "@/context/ActionContext";

const Header = () => {
    const { userDetail, setUserDetail } = useContext(UserContext);
    const { action, setAction }: any = useContext(ActionContext);

    const router = useRouter();
    const { toggleSidebar } = useSidebar();
    const path = usePathname();

    const onAction = async (actionName: string) => {
        setAction({
            actionType: actionName,
            timeStamp: Date.now(),
        });
    };

    return (
        <div className="flex p-4 justify-between items-center">
            <div className="flex gap-2 items-center group cursor-pointer">
                <Image
                    src="/logo.png"
                    alt="ThunderBolt.New"
                    width={40}
                    height={40}
                    className="group-hover:scale-125 transition-transform group-hover:-rotate-6"
                    onClick={() => router.push("/")}
                />
                <h2 className="text-2xl font-mono transition group-hover:translate-x-1">
                    ThunderBolt.New
                </h2>
            </div>
            {!userDetail?.name && (
                <div className="flex gap-5">
                    <Button variant="ghost">Sign In</Button>
                    <Button className="hover:bg-blue-900 transition-colors bg-blue-500 text-white">
                        Get Started
                    </Button>
                </div>
            )}
            {userDetail?.name && path !== "/" && (
                <div className="flex gap-5">
                    <Button variant="ghost" onClick={() => onAction("export")}>
                        <DownloadIcon /> Export
                    </Button>
                    <Button
                        className="hover:bg-blue-900 transition-colors bg-blue-500 text-white"
                        onClick={() => onAction("deploy")}
                    >
                        <RocketIcon /> Deploy
                    </Button>

                    <Image
                        src={userDetail?.picture}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full cursor-pointer hover:animate-spin"
                        onClick={toggleSidebar}
                    />
                </div>
            )}
        </div>
    );
};

export default Header;
