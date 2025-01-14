import { CreditCard, HelpCircle, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";

const CustomSidebarFooter = () => {
    const options = [
        {
            name: "Settings",
            icon: Settings,
        },
        {
            name: "Help Center",
            icon: HelpCircle,
        },
        {
            name: "My Subscription",
            icon: CreditCard,
        },
        {
            name: "Logout",
            icon: LogOut,
        },
    ];

    return (
        <div className="p-2 mb-10">
            {options.map((option, index) => (
                <Button
                    variant="ghost"
                    className="w-full flex justify-start my-3"
                    key={index}
                >
                    <option.icon size={24} />
                    <span>{option.name}</span>
                </Button>
            ))}
        </div>
    );
};

export default CustomSidebarFooter;
