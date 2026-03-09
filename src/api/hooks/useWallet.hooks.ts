import { useSuspenseQuery } from "@tanstack/react-query";
import { getWallet, getWallets } from "@/api/services";
import type { Wallet } from "@/api/types";

const FIVE_MINUTES = 1000 * 60 * 5;

export const useWallet = (id: string) => {
    return useSuspenseQuery<Wallet>({
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
