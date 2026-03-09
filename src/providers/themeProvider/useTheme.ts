import { useContext } from 'react';
import { ThemeContext, type IThemeContextValue } from './ThemeContext';

export { Theme } from './ThemeContext';

export const useTheme = (): IThemeContextValue => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) throw new Error('useTheme must be used inside <ThemeProvider>');
    return themeContext;
};
