import { useUser } from "@/providers/userProvider/useUser";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, Key } from "lucide-react";
import { useTranslation } from "react-i18next";
import { UserRoleEnum } from "@/api/user/user.types";
import { useState } from "react";
import { GenerateTokenDialog } from "./GenerateTokenDialog";

export const UserProfile = () => {
    const user = useUser();
    const { t } = useTranslation('translation', { keyPrefix: 'sidebar.userProfile' });
    const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);

    return (
        <div className="px-4 py-4 border-t border-subtle">
            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="aspect-square rounded-full bg-brand text-on-brand w-8 h-8 flex items-center justify-center cursor-pointer">
                            {user.initials}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start">
                        {user.role === UserRoleEnum.ADMIN && (
                            <DropdownMenuItem onSelect={() => { setIsTokenDialogOpen(true); }}>
                                <Key className="mr-2 h-4 w-4 text-primary" />{t('generateToken')}
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" /> {t('logout')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div>
                    <div className="text-sm font-semibold text-text-base truncate">{user.firstName} {user.lastName}</div>
                    <div className="text-xs text-text-muted truncate">{user.email}</div>
                </div>
            </div>
            <GenerateTokenDialog
                isOpen={isTokenDialogOpen}
                onOpenChange={setIsTokenDialogOpen}
            />
        </div>
    )
}
