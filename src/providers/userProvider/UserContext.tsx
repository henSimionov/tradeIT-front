import { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser as useClerkUser } from '@clerk/react';
import { Loader } from '@/components/ui/Loader';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/api/user/user.types';
import { getUser } from '@/api/user/user.service';
import { ONE_SECOND } from '@/time';

export const useAppUserQuery = (clerkId: string | undefined) => {
    return useQuery({
        queryKey: ['appUser', clerkId],
        queryFn: () => getUser(),
        enabled: Boolean(clerkId),
        retry: 5,
        retryDelay: (attempt) => Math.min(attempt * ONE_SECOND, ONE_SECOND * 5),
        staleTime: Infinity,
    });
};

export const UserContext = createContext<User>(undefined!);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { user: clerkUser } = useClerkUser();
    const { t } = useTranslation('translation', { keyPrefix: 'userProvider' });
    const { data: appUser, isLoading, isError } = useAppUserQuery(clerkUser?.id);

    if (isLoading) return <Loader />;
    if (isError || !appUser) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>{t('syncError')}</p>
            </div>
        );
    }

    return (
        <UserContext.Provider value={appUser}>
            {children}
        </UserContext.Provider>
    );
};