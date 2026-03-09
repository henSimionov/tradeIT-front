import { useWallet } from "@/api/hooks/useWallet.hooks";

const walletId = 'cmmaij95l000072lir6svhc3j'; // TODO: get from user context, for now hardcoded

// TODO: it shouldn't work this way, it should take all the ** user ** wallets, will be dixed after the user context is implemented, for now it will just take one wallet with hardcoded id
export const PortfolioAssets = () => {
    const { data: wallet } = useWallet(walletId);
    console.log(wallet);
    return (
        <div>
            {wallet.walletAssets?.map(wa => <div key={wa.id}>{wa.asset.displayName}</div>)}
        </div>
    );
};
