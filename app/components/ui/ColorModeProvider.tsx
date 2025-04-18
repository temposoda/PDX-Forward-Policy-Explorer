'use client';

import { ReactNode, createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { PaletteMode } from '@mui/material';
import { getTheme } from '@/app/lib/theme';

type ColorModeContextType = {
    mode: PaletteMode;
    toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextType>({
    mode: 'light',
    toggleColorMode: () => { },
});

export const useColorMode = () => useContext(ColorModeContext);

interface ColorModeProviderProps {
    children: ReactNode;
}

export function ColorModeProvider({ children }: ColorModeProviderProps) {
    // Try to get the user's preference from localStorage on the client side
    const [mode, setMode] = useState<PaletteMode>('light');

    useEffect(() => {
        // Check for saved preference
        const savedMode = localStorage.getItem('color-mode') as PaletteMode | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            // Check for system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setMode('dark');
            }
        }
    }, []);

    // Update localStorage when mode changes
    useEffect(() => {
        localStorage.setItem('color-mode', mode);
        // Optional: Update the document's class for global CSS that might depend on dark mode
        document.documentElement.classList.toggle('dark', mode === 'dark');
    }, [mode]);

    const colorMode = useMemo(
        () => ({
            mode,
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [mode]
    );

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}