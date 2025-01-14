"use client";

import PricingCard from "@/components/custom/PricingCard";
import { UserContext } from "@/context/UserContext";
import colors from "@/data/colors";
import lookup from "@/data/lookup";
import { useContext } from "react";

const Pricing = () => {
    const { userDetail, setUserDetail } = useContext(UserContext);

    return (
        <div className="mt-10 flex flex-col items-center w-full p-10 md:px-48">
            <h2 className="font-bold text-5-xl">Pricing</h2>
            <p className="text-gray-400 max-w-xl text-center mt-4">
                {lookup.PRICING_DESC}
            </p>

            <div
                className="p-5 border rounded-xl w-full flex justify-between items-center mt-7"
                style={{ backgroundColor: colors.BACKGROUND }}
            >
                <h2 className="text-lg">
                    <span className="font-bold ">{userDetail?.token}</span>{" "}
                    Token Left
                </h2>
                <div className="">
                    <h2 className="font-medium">Need more tokens?</h2>
                    <p>Upgrade your plan below</p>
                </div>
            </div>
            <PricingCard />
        </div>
    );
};

export default Pricing;
