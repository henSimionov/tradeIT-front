import { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { RedirectToSignIn, useAuth, useUser as useClerkUser } from '@clerk/react';
import { Loader } from '@/components/ui/Loader';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/api/user/user.types';
import { getUser } from '@/api/user/user.service';

export const useMe = (clerkId: string | undefined) => {
    return useQuery({
        queryKey: ['users/me', clerkId],
        queryFn: getUser,
        enabled: Boolean(clerkId),
        retry: 3,
        retryDelay: 2000,
    });
};

export const UserContext = createContext<IUser | undefined>(undefined);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const { t } = useTranslation('translation', { keyPrefix: 'userProvider' });

    const { isLoaded: clerkLoaded, isSignedIn } = useAuth();
    const { user: clerkUser } = useClerkUser();
    const { data: user, isLoading: backendLoading, isError: backendError } = useMe(clerkUser?.id);

    if (!clerkLoaded || (isSignedIn && backendLoading)) return <Loader />;
    if (!isSignedIn) return <RedirectToSignIn />;

    if (backendError || !user) return <div
        className="flex h-screen items-center justify-center">{t('syncError')}
    </div>;

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
