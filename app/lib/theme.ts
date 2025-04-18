import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

// Define your custom theme configuration
const config = defineConfig({
    // Set the CSS variables root element
    cssVarsRoot: ":where(:root, :host)",

    // Add a prefix to CSS variables if needed (optional)
    // cssVarsPrefix: "pdx",

    // Global CSS to apply across the app
    globalCss: {
        "html, body": {
            margin: 0,
            padding: 0,
            textRendering: "optimizeLegibility",
            fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
            letterSpacing: "-0.01em",
            color: "#333333",
            bg: "gray.50",
            fontFamily: "var(--font-inter)",
        },
        "h1, h2, h3, h4, h5, h6": {
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
        },
        "p, li": {
            lineHeight: 1.6,
        },
        // "@media (max-width: 640px)": {
        //     // main: {
        //     //     padding: "0.75rem !important",
        //     // },
        //     h1: {
        //         fontSize: "1.75rem !important",
        //         lineHeight: "1.2 !important",
        //     },
        //     h2: {
        //         fontSize: "1.5rem !important",
        //         lineHeight: "1.25 !important",
        //     },
        //     p: {
        //         // fontSize: "1rem !important",
        //     },
        // },
        ".overflow-auto::-webkit-scrollbar": {
            width: "8px",
        },
        ".overflow-auto::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
        },
        ".overflow-auto::-webkit-scrollbar-thumb": {
            background: "#d1d5db",
            borderRadius: "10px",
        },
        ".overflow-auto::-webkit-scrollbar-thumb:hover": {
            background: "#9ca3af",
        },
        "*:focus-visible": {
            outline: "2px solid #3b82f6",
            outlineOffset: "2px",
        },
    },

    // Theme tokens configuration
    theme: {
        // Define breakpoints
        breakpoints: {
            xs: "480px",
            sm: "640px",
            md: "768px",
            lg: "960px",
            xl: "1200px",
            "2xl": "1536px",
        },

        // Define tokens
        tokens: {
            colors: {
                // Main colors
                background: { value: "#F9FAFB" }, // gray.50
                foreground: { value: "#111827" }, // gray.900
                card: { value: "#FFFFFF" },
                "card-foreground": { value: "#111827" },
                popover: { value: "#FFFFFF" },
                "popover-foreground": { value: "#111827" },

                // UI colors
                primary: { value: "#000000" },
                "primary-foreground": { value: "#FFFFFF" },
                secondary: { value: "#F3F4F6" },
                "secondary-foreground": { value: "#111827" },
                muted: { value: "#F3F4F6" },
                "muted-foreground": { value: "#6B7280" },
                accent: { value: "#F3F4F6" },
                "accent-foreground": { value: "#111827" },
                destructive: { value: "#EF4444" },
                "destructive-foreground": { value: "#FFFFFF" },
                border: { value: "#E5E7EB" },
                input: { value: "#E5E7EB" },
                ring: { value: "#000000" },

                // Gray palette
                gray: {
                    50: { value: "#F9FAFB" },
                    100: { value: "#F3F4F6" },
                    200: { value: "#E5E7EB" },
                    300: { value: "#D1D5DB" },
                    400: { value: "#9CA3AF" },
                    500: { value: "#6B7280" },
                    600: { value: "#4B5563" },
                    700: { value: "#374151" },
                    800: { value: "#1F2937" },
                    900: { value: "#111827" },
                },

                // Blue palette
                blue: {
                    50: { value: "#EFF6FF" },
                    100: { value: "#DBEAFE" },
                    200: { value: "#BFDBFE" },
                    300: { value: "#93C5FD" },
                    400: { value: "#60A5FA" },
                    500: { value: "#3B82F6" },
                    600: { value: "#2563EB" },
                    700: { value: "#1D4ED8" },
                    800: { value: "#1E40AF" },
                    900: { value: "#1E3A8A" },
                },

                // Pink palette
                pink: {
                    100: { value: "#FCE7F3" },
                    200: { value: "#FBCFE8" },
                    300: { value: "#F9A8D4" },
                    400: { value: "#F472B6" },
                    500: { value: "#EC4899" },
                    600: { value: "#DB2777" },
                    700: { value: "#BE185D" },
                    800: { value: "#9D174D" },
                },

                // Green palette
                green: {
                    100: { value: "#D1FAE5" },
                    200: { value: "#A7F3D0" },
                    300: { value: "#6EE7B7" },
                    400: { value: "#34D399" },
                    500: { value: "#10B981" },
                    600: { value: "#059669" },
                    700: { value: "#047857" },
                    800: { value: "#065F46" },
                },

                // Additional palettes from your Tailwind config
                // Add other color palettes as needed
            },

            // Define font families
            fonts: {
                body: { value: "var(--font-inter), system-ui, sans-serif" },
                heading: { value: "var(--font-inter), system-ui, sans-serif" },
                mono: { value: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },
            },

            // Define font sizes
            fontSizes: {
                xs: { value: "0.75rem" },
                sm: { value: "0.875rem" },
                md: { value: "1rem" },
                lg: { value: "1.125rem" },
                xl: { value: "1.25rem" },
                "2xl": { value: "1.5rem" },
                "3xl": { value: "1.875rem" },
                "4xl": { value: "2.25rem" },
                "5xl": { value: "3rem" },
                "6xl": { value: "3.75rem" },
            },

            // Define font weights
            fontWeights: {
                normal: { value: "400" },
                medium: { value: "500" },
                semibold: { value: "600" },
                bold: { value: "700" },
            },

            // Define line heights
            lineHeights: {
                normal: { value: "normal" },
                none: { value: "1" },
                shorter: { value: "1.25" },
                short: { value: "1.375" },
                base: { value: "1.5" },
                tall: { value: "1.625" },
                taller: { value: "2" },
            },

            // Define letter spacings
            letterSpacings: {
                tighter: { value: "-0.05em" },
                tight: { value: "-0.025em" },
                normal: { value: "0" },
                wide: { value: "0.025em" },
                wider: { value: "0.05em" },
                widest: { value: "0.1em" },
            },

            // Define border radius
            radii: {
                none: { value: "0" },
                sm: { value: "0.125rem" },
                base: { value: "0.25rem" },
                md: { value: "0.375rem" },
                lg: { value: "0.5rem" },
                xl: { value: "0.75rem" },
                "2xl": { value: "1rem" },
                "3xl": { value: "1.5rem" },
                full: { value: "9999px" },
            },

            // Define shadows
            shadows: {
                sm: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
                base: { value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" },
                md: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
                lg: { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" },
                xl: { value: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
                "2xl": { value: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
                inner: { value: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)" },
                outline: { value: "0 0 0 3px rgba(66, 153, 225, 0.5)" },
                none: { value: "none" },
            },
        },

        // Define semantic tokens (dark mode support)
        semanticTokens: {
            colors: {
                bg: {
                    default: { value: "{colors.background}" },
                    _dark: { value: "{colors.gray.900}" },
                },
                text: {
                    default: { value: "{colors.foreground}" },
                    _dark: { value: "{colors.gray.100}" },
                },
            },
        },

        // Define text styles
        textStyles: {
            heading: {
                fontFamily: "{fonts.heading}",
                fontWeight: "{fontWeights.bold}",
                lineHeight: "{lineHeights.shorter}",
            },
            body: {
                fontFamily: "{fonts.body}",
                fontWeight: "{fontWeights.normal}",
                lineHeight: "{lineHeights.base}",
            },
        },

        // Define animation keyframes
        keyframes: {
            spin: {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
            },
            ping: {
                "0%": { transform: "scale(1)", opacity: "1" },
                "75%, 100%": { transform: "scale(2)", opacity: "0" },
            },
            pulse: {
                "0%, 100%": { opacity: "1" },
                "50%": { opacity: "0.5" },
            },
            bounce: {
                "0%, 100%": {
                    transform: "translateY(0)",
                    animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
                },
                "50%": {
                    transform: "translateY(-25%)",
                    animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
                },
            },
        },
    },

    // Define component recipes
    // This is where you can define specific component styling recipes
    // For example, button variants, card styles, etc.
    // recipes: {
    //     // Example button recipe
    //     button: {
    //         className: "button",
    //         base: {
    //             display: "inline-flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             borderRadius: "md",
    //             fontWeight: "semibold",
    //             transition: "all 0.2s",
    //         },
    //         variants: {
    //             size: {
    //                 sm: {
    //                     fontSize: "sm",
    //                     px: "3",
    //                     py: "1",
    //                 },
    //                 md: {
    //                     fontSize: "md",
    //                     px: "4",
    //                     py: "2",
    //                 },
    //                 lg: {
    //                     fontSize: "lg",
    //                     px: "6",
    //                     py: "3",
    //                 },
    //             },
    //             variant: {
    //                 solid: {
    //                     bg: "blue.500",
    //                     color: "white",
    //                     _hover: {
    //                         bg: "blue.600",
    //                     },
    //                 },
    //                 outline: {
    //                     bg: "transparent",
    //                     color: "blue.500",
    //                     border: "1px solid",
    //                     borderColor: "blue.500",
    //                     _hover: {
    //                         bg: "blue.50",
    //                     },
    //                 },
    //             },
    //         },
    //         defaultVariants: {
    //             size: "md",
    //             variant: "solid",
    //         },
    //     },
    // },

    // Define component slot recipes for multi-part components
    // slotRecipes: {
    //     // Example card recipe with slots
    //     card: {
    //         slots: ["root", "header", "body", "footer"],
    //         base: {
    //             root: {
    //                 bg: "white",
    //                 borderRadius: "lg",
    //                 boxShadow: "md",
    //                 overflow: "hidden",
    //             },
    //             header: {
    //                 px: "6",
    //                 py: "4",
    //                 borderBottom: "1px solid",
    //                 borderColor: "gray.200",
    //             },
    //             body: {
    //                 px: "6",
    //                 py: "4",
    //             },
    //             footer: {
    //                 px: "6",
    //                 py: "4",
    //                 borderTop: "1px solid",
    //                 borderColor: "gray.200",
    //             },
    //         },
    //         variants: {
    //             size: {
    //                 sm: {
    //                     root: { maxW: "sm" },
    //                     header: { px: "4", py: "2" },
    //                     body: { px: "4", py: "2" },
    //                     footer: { px: "4", py: "2" },
    //                 },
    //                 md: {
    //                     root: { maxW: "md" },
    //                 },
    //                 lg: {
    //                     root: { maxW: "lg" },
    //                     header: { px: "8", py: "6" },
    //                     body: { px: "8", py: "6" },
    //                     footer: { px: "8", py: "6" },
    //                 },
    //             },
    //             variant: {
    //                 elevated: {
    //                     root: { boxShadow: "md" },
    //                 },
    //                 outline: {
    //                     root: {
    //                         boxShadow: "none",
    //                         border: "1px solid",
    //                         borderColor: "gray.200",
    //                     },
    //                 },
    //                 filled: {
    //                     root: {
    //                         boxShadow: "none",
    //                         bg: "gray.50",
    //                     },
    //                 },
    //             },
    //         },
    //         defaultVariants: {
    //             size: "md",
    //             variant: "elevated",
    //         },
    //     },
    // },
});

// Create and export the system with our custom config
const theme = createSystem(defaultConfig, config);
export default theme;