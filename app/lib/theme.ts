import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Create a theme instance for each mode
export const getTheme = (mode: PaletteMode) => {
    let theme = createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // Light mode palette
                    primary: {
                        main: '#3b82f6', // Blue 500 from Tailwind
                    },
                    secondary: {
                        main: '#10b981', // Green 500 from Tailwind
                    },
                    background: {
                        default: '#f9fafb', // Gray 50 from Tailwind
                        paper: '#ffffff',
                    },
                    text: {
                        primary: '#111827', // Gray 900 from Tailwind
                        secondary: '#6b7280', // Gray 500 from Tailwind
                    },
                    error: {
                        main: '#ef4444', // Red 500 from Tailwind
                    },
                }
                : {
                    // Dark mode palette
                    primary: {
                        main: '#60a5fa', // Blue 400 from Tailwind
                    },
                    secondary: {
                        main: '#34d399', // Green 400 from Tailwind
                    },
                    background: {
                        default: '#111827', // Gray 900 from Tailwind
                        paper: '#1f2937', // Gray 800 from Tailwind
                    },
                    text: {
                        primary: '#f9fafb', // Gray 50 from Tailwind
                        secondary: '#9ca3af', // Gray 400 from Tailwind
                    },
                    error: {
                        main: '#f87171', // Red 400 from Tailwind
                    },
                }),
        },
        typography: {
            fontFamily: [
                'var(--font-inter)',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ].join(','),
            h1: {
                fontWeight: 700,
                letterSpacing: '-0.025em',
            },
            h2: {
                fontWeight: 700,
                letterSpacing: '-0.025em',
            },
            h3: {
                fontWeight: 600,
                letterSpacing: '-0.025em',
            },
            h4: {
                fontWeight: 600,
            },
            h5: {
                fontWeight: 500,
            },
            h6: {
                fontWeight: 500,
            },
            body1: {
                lineHeight: 1.6,
            },
            body2: {
                lineHeight: 1.6,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: 500,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: '9999px', // Full rounded like Tailwind's rounded-full
                    },
                },
            },
        },
    });

    // Apply responsive font sizes
    theme = responsiveFontSizes(theme);

    return theme;
};