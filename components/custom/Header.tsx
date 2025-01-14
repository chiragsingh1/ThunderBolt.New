import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Header = () => {
    const { userDetail, setUserDetail } = useContext(UserContext);
    const router = useRouter();

    return (
        <div
            className="flex p-4 justify-between items-center"
            onClick={() => router.push("/")}
        >
            <div className="flex gap-2 items-center group cursor-pointer">
                <Image
                    src="/logo.png"
                    alt="ThunderBolt.New"
                    width={40}
                    height={40}
                    className="group-hover:scale-125 transition-transform group-hover:-rotate-6"
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
        </div>
    );
};

export default Header;
