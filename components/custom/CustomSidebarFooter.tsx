import { CreditCard, HelpCircle, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const options = [
    {
        name: "Settings",
        icon: Settings,
        path: "",
    },
    {
        name: "Help Center",
        icon: HelpCircle,
        path: "",
    },
    {
        name: "My Subscription",
        icon: CreditCard,
        path: "/pricing",
    },
    {
        name: "Logout",
        icon: LogOut,
        path: "",
    },
];

const CustomSidebarFooter = () => {
    const router = useRouter();

    return (
        <div className="p-2 mb-10">
            {options.map((option, index) => (
                <Button
                    variant="ghost"
                    className="w-full flex justify-start my-3"
                    key={index}
                    onClick={
                        option.path?.length !== 0
                            ? () => router.push(option.path as string)
                            : () => {}
                    }
                >
                    <option.icon size={24} />
                    <span>{option.name}</span>
                </Button>
            ))}
        </div>
    );
};

export default CustomSidebarFooter;
