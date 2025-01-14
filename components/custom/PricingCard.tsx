import lookup from "@/data/lookup";
import { Button } from "../ui/button";

const PricingCard = () => {
    return (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            {lookup.PRICING_OPTIONS.map((option, index) => (
                <div
                    key={option.name}
                    className="border p-7 rounded-xl flex flex-col gap-3 h-full"
                >
                    <div className="flex-grow">
                        <h2 className="font-bold text-2xl">{option.name}</h2>
                        <h2 className="font-medium text-lg mt-3">
                            {option.tokens}
                        </h2>
                        <p className="text-gray-400 mt-2">{option.desc}</p>
                    </div>

                    <div className="mt-auto">
                        <h2 className="font-bold text-4xl text-center my-6">
                            ${option.price}
                        </h2>
                        <Button className="w-full">
                            Upgrade to {option.name}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PricingCard;
