import { z } from 'zod';

const env = import.meta.env;

export const config = {
    api: {
        baseUrl: z.url().parse(env.VITE_API_URL)
    },
    query: {
        staleTime: z.coerce.number().default(30_000).parse(env.VITE_QUERY_STALE_TIME),
        retry: z.coerce.number().default(1).parse(env.VITE_QUERY_RETRY),
    },
    clerk: {
        publishableKey: z.string().parse(env.VITE_CLERK_PUBLISHABLE_KEY),
        tokenMethod: 'Bearer',
    },
};