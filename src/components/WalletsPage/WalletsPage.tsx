import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { WalletCard } from "./components/WalletCard";

export const WalletsPage = () => {

    const wallets = useMemo(() => [
        { name: "Wallet 1", value: "$1000" },
        { name: "Wallet 2", value: "$2000" },
        { name: "Wallet 2", value: "$2000" },
        { name: "Wallet 2", value: "$2000" },
        { name: "Wallet 2", value: "$2000" },
        { name: "Wallet 2", value: "$2000" },
        { name: "Wallet 2", value: "$2000" },
        { name: "Wallet 2", value: "$2000" },
        { name: "Wallet 2", value: "$2000" }
    ], []);

    return (
        <div className="w-full flex flex-col justify-center px-5  py-10">
            <span className="text-2xl font-bold text-text-base mb-4">My Wallets</span>
            <Card className="flex justify-between items-center gap-4 border border-gray-300">
                <div className="flex flex-col p-5">
                    <span className="font-medium text-lg">Total Portfolio Value</span>
                    <span className="text-3xl font-bold">Some Fucking Value$</span>
                </div>
                <div className="p-5">
                    <Button variant="brand" className="w-32">Add New Wallet</Button>
                </div>
            </Card>

            <div className="flex flex-wrap gap-5 mt-10">
                {wallets.map((wallet, index) => (<WalletCard key={index} name={wallet.name} value={wallet.value} />))}
            </div>
        </div>
    );
};
