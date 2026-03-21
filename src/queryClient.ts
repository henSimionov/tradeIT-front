import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: 50_000,
        },
        mutations: {
            retry: false,
        },
    },
});