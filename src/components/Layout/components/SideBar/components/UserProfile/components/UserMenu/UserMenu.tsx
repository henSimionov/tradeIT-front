import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Key, LogOut } from "lucide-react";
import { GenerateTokenDialog } from "./components/GenerateTokenDialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { IUser, UserRoleEnum } from "@/api/user/user.types";
import { useUser } from "@/providers/userProvider/useUser";

const userInitials = (user: IUser) => {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
}

export const UserMenu = () => {

    const user = useUser();
    const { t } = useTranslation('translation', { keyPrefix: 'sidebar.userProfile' });
    const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);

    const isAdmin = user.role === UserRoleEnum.ADMIN;

    return (
        <div>
            <DropdownMenu>

                <DropdownMenuTrigger>
                    <div className="aspect-square rounded-full bg-brand text-on-brand w-8 h-8 flex items-center justify-center cursor-pointer">
                        {userInitials(user)}
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="bottom" align="start">

                    {isAdmin && (
                        <DropdownMenuItem onSelect={() => { setIsTokenDialogOpen(true); }}>
                            <Key className="mr-2 h-4 w-4 " />{t('generateToken')}
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" /> {t('logout')}
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

            <GenerateTokenDialog
                isOpen={isTokenDialogOpen}
                onOpenChange={setIsTokenDialogOpen}
            />
        </div>
    )
}

