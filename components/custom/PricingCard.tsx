import lookup from "@/data/lookup";
// import { Button } from "../ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { GenericId } from "convex/values";

interface OptionType {
    name: string;
    tokens: string;
    value: number;
    desc: string;
    price: number;
}

const PricingCard = () => {
    const { userDetail, setUserDetail } = useContext(UserContext);
    const [selectedPlan, setSelectedPlan] = useState<OptionType>();

    const UpdateToken = useMutation(api.users.UpdateToken);

    const onPaymentSuccess = async () => {
        const token = Number(userDetail?.token) + Number(selectedPlan?.value);
        console.log(token);

        await UpdateToken({
            tokenCount: token,
            userId: userDetail?._id as GenericId<"users">,
        });
    };

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
                        {/* <Button className="w-full">
                            Upgrade to {option.name}
                        </Button> */}
                        <PayPalButtons
                            disabled={!userDetail}
                            onApprove={() => onPaymentSuccess()}
                            onCancel={() => console.log("Payment Cancelled")}
                            style={{ layout: "horizontal", tagline: false }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                // @ts-ignore
                                                value: option.price,
                                                currency_code: "USD",
                                            },
                                        },
                                    ],
                                });
                            }}
                            onClick={() => setSelectedPlan(option)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PricingCard;
