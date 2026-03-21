import { Theme } from "@/providers/themeProvider/ThemeContext"
import { useTheme } from "@/providers/themeProvider/useTheme";
import { Button } from "@/components/ui/button";
import { Moon, Sparkles, Sun } from "lucide-react"
import { ReactNode, useCallback, useMemo } from "react";

const themes: { theme: Theme; icon: ReactNode }[] = [
    { theme: Theme.Light, icon: <Sun size={15} /> },
    { theme: Theme.Dark, icon: <Moon size={15} /> },
    { theme: Theme.Purple, icon: <Sparkles size={15} /> },
]

export const ThemePicker = () => {
    const { theme, setTheme } = useTheme();

    const chaangeTheme = useCallback(() => {
        const nextTheme = themes[(themes.findIndex(t => t.theme === theme) + 1) % themes.length]
        setTheme(nextTheme.theme);
    }, [theme, setTheme])

    const themeIcon = useMemo(() => {
        const currentTheme = themes.find(t => t.theme === theme);
        return currentTheme ? currentTheme.icon : null;
    }, [theme]);

    return (
        <Button

            onClick={chaangeTheme}
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg text-text-muted hover:bg-surface-raised hover:text-text-base"
        >
            {themeIcon}
        </Button>
    )
}
