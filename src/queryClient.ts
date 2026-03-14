import { QueryClient } from '@tanstack/react-query';
import { config } from '@/config';
import { AxiosError, isAxiosError } from 'axios';

const noRetryStatuses = [401, 403, 404];

function shouldRetry(failureCount: number, error: Error | AxiosError): boolean {
    const status = isAxiosError(error) ? error.response?.status : undefined;

    if (status && noRetryStatuses.includes(status)) {
        return false;
    }
    return failureCount < config.query.retryCount;
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: config.query.staleTime,
            retry: shouldRetry,
        },
    },
});
