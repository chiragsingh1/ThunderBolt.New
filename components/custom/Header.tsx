import Image from "next/image";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter, usePathname } from "next/navigation";
import { DownloadIcon, RocketIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { ActionContext } from "@/context/ActionContext";
import LoginDialog from "./LoginDialog";

const Header = () => {
    const { userDetail } = useContext(UserContext);
    const { setAction } = useContext(ActionContext);

    const [openDialog, setOpenDialog] = useState(false);

    const router = useRouter();
    const { toggleSidebar } = useSidebar();
    const path = usePathname();

    const onAction = async (actionName: string) => {
        setAction({
            actionType: actionName,
            timeStamp: Date.now(),
        });
    };

    // useEffect(() => {}, [userDetail]);

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
                <h2 className="text-xl lg:text-2xl transition group-hover:translate-x-1 font-bold">
                    ThunderBolt
                </h2>
            </div>
            {!userDetail?.name && (
                <div className="flex gap-5" style={{ position: "relative" }}>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setOpenDialog(true);
                        }}
                        className="hover:bg-gray-500 transition-colors"
                    >
                        Sign In
                    </Button>
                    {/* <Button
                        className="hover:bg-blue-900 transition-colors bg-blue-500 text-white hidden md:block"
                        onClick={() => {
                            setOpenDialog(true);
                        }}
                    >
                        Get Started
                    </Button> */}
                </div>
            )}
            {userDetail?.name && (
                <div className="flex gap-5">
                    {path !== "/" && path !== "/pricing" && (
                        <>
                            <Button
                                variant="ghost"
                                onClick={() => onAction("export")}
                            >
                                <DownloadIcon /> Export
                            </Button>
                            <Button
                                className="hover:bg-blue-900 transition-colors bg-blue-500 text-white hidden md:inline-flex"
                                onClick={() => onAction("deploy")}
                            >
                                <RocketIcon /> Deploy
                            </Button>
                        </>
                    )}

                    <Image
                        src={userDetail?.picture}
                        alt="user"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer hover:animate-spin z-10"
                        onClick={toggleSidebar}
                    />
                </div>
            )}
            <LoginDialog
                openDialog={openDialog}
                closeDialog={(v) => setOpenDialog(v)}
            />
        </div>
    );
};

export default Header;
