import { DayPeriod, getCurrentSlot } from '@/time';
import { createContext, useEffect, useState } from 'react';


enum Theme {
    Light = 'light',
    Dark = 'dark',
    Purple = 'purple',
}

const DEFAULT_THEMES: Record<DayPeriod, Theme> = {
    [DayPeriod.Morning]: Theme.Light,
    [DayPeriod.Afternoon]: Theme.Light,
    [DayPeriod.Evening]: Theme.Dark,
    [DayPeriod.Night]: Theme.Purple,
} as const;

const getDefaultTheme = (): Theme => DEFAULT_THEMES[getCurrentSlot()];

const ThemeContext = createContext<IThemeContextValue | null>(null);

const ALL_THEMES = Object.values(Theme) as string[];

export interface IThemeContextValue {
    theme: Theme;
    setTheme: (t: Theme) => void;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem('tradeit-theme');
        return ALL_THEMES.includes(stored ?? '') ? (stored as Theme) : getDefaultTheme();
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove(...ALL_THEMES);
        root.classList.add(theme);
        localStorage.setItem('tradeit-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, Theme };
