import { Moon, Sparkles, Sun, LogOut } from "lucide-react";
import { useState } from "react";
import { useTheme, Theme } from "@/providers/themeProvider/useTheme";
import { useUser } from "@/providers/userProvider/useUser";
import NotificationBell from "@/components/layout/notification-bell";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";

const THEME_CONFIG: Record<Theme, { icon: React.ReactNode; label: string }> = {
    [Theme.Light]: { icon: <Sun size={15} />, label: "Light mode" },
    [Theme.Dark]: { icon: <Moon size={15} />, label: "Dark mode" },
    [Theme.Purple]: { icon: <Sparkles size={15} />, label: "Purple mode" },
} as const;

const Topbar = () => {
    const { theme, setTheme } = useTheme();
    const user = useUser();

    const themes = Object.keys(THEME_CONFIG) as Theme[];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];

    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // TODO: replace with real data
    const notificationCount = 3;

    return (
        <header data-component="Topbar" className="shrink-0 flex items-center justify-end gap-1 px-4 py-2 border-b border-subtle bg-surface transition-colors duration-200">

            <button
                data-slot="theme-switcher"
                onClick={() => setTheme(nextTheme)}
                aria-label={THEME_CONFIG[theme].label}
                title={THEME_CONFIG[theme].label}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-surface-raised hover:text-text-base transition-colors"
            >
                {THEME_CONFIG[theme].icon}
            </button>

            <NotificationBell count={notificationCount} />

            <div className="w-px h-5 bg-subtle mx-1" />

            <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                    <button
                        data-slot="user"
                        onMouseEnter={() => setUserMenuOpen(true)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-raised transition-colors outline-none"
                    >
                        <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-on-brand text-xs font-bold shrink-0">
                            {user.initials}
                        </div>
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-52 border-none bg-surface-raised rounded-lg shadow-lg p-2"
                    onMouseLeave={() => setUserMenuOpen(false)}
                >
                    <DropdownMenuLabel className="font-normal">
                        <p className="text-sm font-semibold text-text-base">{user.name}</p>
                        <p className="text-xs text-text-muted mt-0.5">{user.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-text-muted gap-2.5 cursor-pointer">
                        <LogOut size={14} />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </header>
    );
};

export default Topbar;
