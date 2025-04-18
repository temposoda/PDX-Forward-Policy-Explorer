import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Improved dark mode theme settings
export const getTheme = () => {
    let theme = createTheme({
        palette: {
            mode: 'light',
            ...{
                // Light mode palette (unchanged)
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
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: 500,
                    },
                    // Higher contrast for text buttons in dark mode
                    text: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            color: theme.palette.primary.light,
                            '&:hover': {
                                backgroundColor: 'rgba(96, 165, 250, 0.12)',
                            },
                        }),
                    }),
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        borderRadius: '0.5rem',
                        ...(theme.palette.mode === 'dark'
                            ? {
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(148, 163, 184, 0.1)',
                                backgroundColor: '#1e293b', // Slate-800
                            }
                            : {
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                            }
                        ),
                    }),
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        borderRadius: '9999px', // Full rounded like Tailwind's rounded-full
                        ...(theme.palette.mode === 'dark' && {
                            '&.MuiChip-filled': {
                                backgroundColor: '#334155', // Slate-700 for better contrast
                                color: theme.palette.text.primary,
                            },
                            '&.MuiChip-outlined': {
                                borderColor: '#475569', // Slate-600
                            },
                        }),
                    }),
                    deleteIcon: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            color: theme.palette.text.primary,
                            '&:hover': {
                                color: '#94a3b8', // Slate-400
                            },
                        }),
                    }),
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            backgroundImage: 'none',
                            backgroundColor: '#1e293b', // Slate-800
                            '&.MuiPaper-outlined': {
                                borderColor: 'rgba(148, 163, 184, 0.2)', // Slate-400 with opacity
                            },
                        }),
                    }),
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(148, 163, 184, 0.2)', // Slate-400 with opacity
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(148, 163, 184, 0.3)', // Darker on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                backgroundColor: '#0f172a', // Slate-900 for input fields
                            },
                        }),
                    }),
                },
            },
            MuiSelect: {
                styleOverrides: {
                    select: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            backgroundColor: '#0f172a', // Slate-900 for select fields
                        }),
                    }),
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            color: theme.palette.text.primary,
                            borderColor: 'rgba(148, 163, 184, 0.2)', // Slate-400 with opacity
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(96, 165, 250, 0.2)', // Primary color with opacity
                                color: theme.palette.primary.light,
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(148, 163, 184, 0.1)', // Slate-400 with opacity
                            },
                        }),
                    }),
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    paper: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            backgroundColor: '#1e293b', // Slate-800
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
                        }),
                    }),
                    option: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            '&[aria-selected="true"]': {
                                backgroundColor: 'rgba(96, 165, 250, 0.2)', // Primary color with opacity
                            },
                            '&[data-focus="true"]': {
                                backgroundColor: 'rgba(148, 163, 184, 0.1)', // Slate-400 with opacity
                            },
                        }),
                    }),
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(96, 165, 250, 0.2)', // Primary color with opacity
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(148, 163, 184, 0.1)', // Slate-400 with opacity
                            },
                        }),
                    }),
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        ...(theme.palette.mode === 'dark' && {
                            color: theme.palette.primary.light,
                            '&:hover': {
                                color: '#93c5fd', // Even lighter blue
                            },
                        }),
                    }),
                },
            },
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
    });

    // Apply responsive font sizes
    theme = responsiveFontSizes(theme);

    return theme;
};