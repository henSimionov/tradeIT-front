import { z } from 'zod';

const env = import.meta.env;

export const config = {
    api: {
        baseUrl: z.url().parse(env.VITE_API_URL)
    },
    clerk: {
        publishableKey: z.string().parse(env.VITE_CLERK_PUBLISHABLE_KEY),
    },
};