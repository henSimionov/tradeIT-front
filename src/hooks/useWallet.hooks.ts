import { useSuspenseQuery } from "@tanstack/react-query";
import { IWallet } from "@/api/wallet/wallet.types";
import { getWallet } from "@/api/wallet/wallet.service";

const FIVE_MINUTES = 1000 * 60 * 5;

export const useWallet = (id: string) => {
    return useSuspenseQuery<IWallet>({
        queryKey: ['wallets', id],
        queryFn: () => getWallet(id),
        staleTime: FIVE_MINUTES,
        retry: 2,
    });
};

// export const useWallets = (options?: Partial<UseQueryOptions<Wallet[]>>) => {
//     return useQuery<Wallet[]>({
//         queryKey: ['wallets'],
//         queryFn: getWallets,
//         staleTime: FIVE_MINUTES,
//         retry: 2,
//         ...options,
//     });
// };
