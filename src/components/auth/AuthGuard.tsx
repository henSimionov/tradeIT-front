import { useAuth, RedirectToSignIn } from '@clerk/react';

import { UserProvider } from '@/providers/userProvider/UserContext';
import { Loader } from '@/components/ui/Loader';

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) return <Loader />;
    if (!isSignedIn) return <RedirectToSignIn />;

    return <UserProvider>{children}</UserProvider>;
};
