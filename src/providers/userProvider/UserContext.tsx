import { createContext } from 'react';
import { useUser as useClerkUser } from '@clerk/react';

interface User {
    id: string;
    name: string;
    email: string;
}

const UserContext = createContext<User>(undefined!);

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const { user } = useClerkUser();

    const value: User = {
        id: user!.id,
        name: user!.firstName!,
        email: user!.primaryEmailAddress!.emailAddress,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext };
