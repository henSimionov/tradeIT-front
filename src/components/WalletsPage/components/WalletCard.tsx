import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";

interface WalletCardProps {
  name: string;
  value: string | number;
}

export const WalletCard = ({ name, value }: WalletCardProps) => {
  return (
    <Card className="grow flex items-center gap-4 p-4 border border-gray-200 min-w-72">
      <div className="bg-brand/10 rounded-full p-2">
        <Wallet className="text-brand w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-lg">{name}</span>
        <span className="text-xl font-bold">{value}</span>
      </div>
    </Card>
  );
};
