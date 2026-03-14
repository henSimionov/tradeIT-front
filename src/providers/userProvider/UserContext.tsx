import { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser as useClerkUser } from '@clerk/react';
import { Loader } from '@/components/ui/Loader';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/api/user/user.types';
import { getUser } from '@/api/user/user.service';


export const useUserQuery = (clerkId: string | undefined) => {
    return useQuery({
        queryKey: ['user', clerkId],
        queryFn: () => getUser(),
        enabled: Boolean(clerkId),
    });
};

export const UserContext = createContext<User>(undefined!);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { user: clerkUser } = useClerkUser();
    const { t } = useTranslation('translation', { keyPrefix: 'userProvider' });
    const { data, isLoading, isError } = useUserQuery(clerkUser?.id);

    if (isLoading) return <Loader />;
    if (isError || !data) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>{t('syncError')}</p>
            </div>
        );
    }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
};