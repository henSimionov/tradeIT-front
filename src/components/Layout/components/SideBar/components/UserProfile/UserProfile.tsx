import { useUser } from "@/providers/userProvider/useUser";
import { UserMenu } from "./components/UserMenu";

export const UserProfile = () => {
    const user = useUser();

    return (
        <div className="px-4 py-4 border-t border-subtle">
            <div className="flex items-center gap-3">
                <UserMenu></UserMenu>
                <div>
                    <div className="text-sm font-semibold text-text-base">{user.firstName} {user.lastName}</div>
                    <div className="text-xs text-text-muted">{user.email}</div>
                </div>
            </div>
        </div>
    )
}