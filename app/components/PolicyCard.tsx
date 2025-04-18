'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUrlWithUpdatedParams } from '@/app/lib/navigation';
import { Policy } from '@/app/lib/types';
import { DomainId, DOMAINS, FISCAL_IMPACTS } from '@/app/lib/constants';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Paper,
    Grid,
    Link as MuiLink
} from '@mui/material';

interface PolicyCardProps {
    policy: Policy;
    policyDomains: DomainId[];
    searchQuery: string;
}

export default function PolicyCard({
    policy,
    policyDomains,
    searchQuery,
}: PolicyCardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Function to handle domain chip clicks
    const handleDomainClick = (domain: DomainId, e: React.MouseEvent) => {
        e.preventDefault(); // Prevent card click

        // Update only the domains parameter while preserving other filters
        const newUrl = createUrlWithUpdatedParams(searchParams, {
            domains: domain,
            domainMode: "ANY"
        });

        router.push(newUrl);
    };

    // Helper function to get domain color based on domain type
    const getDomainColor = (domain: DomainId): { main: string; contrastText: string } => {
        const colors: Record<Exclude<DomainId, "all">, { main: string; contrastText: string }> = {
            housing: { main: "#FCE7F3", contrastText: "#9D174D" }, // pink-100, pink-800
            environment: { main: "#D1FAE5", contrastText: "#065F46" }, // green-100, green-800
            safety: { main: "#FEF3C7", contrastText: "#92400E" }, // yellow-100, yellow-800
            democracy: { main: "#DBEAFE", contrastText: "#1E40AF" }, // blue-100, blue-800
            "economic-development": { main: "#FFEDD5", contrastText: "#9A3412" }, // orange-100, orange-800
            "infrastructure-and-transportation": { main: "#E0E7FF", contrastText: "#3730A3" }, // indigo-100, indigo-800
            "social-services": { main: "#F3E8FF", contrastText: "#6B21A8" }, // purple-100, purple-800
            "public-health": { main: "#FEE2E2", contrastText: "#991B1B" }, // red-100, red-800
        };

        return colors[domain as Exclude<DomainId, "all">] || { main: "#F3F4F6", contrastText: "#1F2937" };
    };

    // Helper component for highlighted text
    const HighlightedText = ({ text, searchQuery }: { text: string; searchQuery: string }) => {
        if (!searchQuery || !text) return <>{text}</>;

        const parts = text.split(
            new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi")
        );

        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                        <Box
                            component="span"
                            key={i}
                            sx={{
                                bgcolor: 'yellow.200',
                                px: 0.5,
                                borderRadius: '2px',
                                backgroundColor: 'rgba(255, 235, 59, 0.5)'
                            }}
                        >
                            {part}
                        </Box>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <Card
            variant="outlined"
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                '&:hover': {
                    boxShadow: 3,
                    borderColor: 'primary.light'
                },
            }}
        >
            <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Policy title */}
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    <MuiLink
                        component={Link}
                        href={`/policy/${policy.policy_id}`}
                        underline="hover"
                        color="primary.main"
                        sx={{
                            display: 'block',
                            textAlign: 'left',
                            '&:hover': { color: 'primary.dark' }
                        }}
                    >
                        <HighlightedText text={policy.title} searchQuery={searchQuery} />
                    </MuiLink>
                </Typography>

                {/* Policy description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    <HighlightedText
                        text={policy.summary || policy.description || ""}
                        searchQuery={searchQuery}
                    />
                </Typography>

                {/* Domain tags */}
                <Box sx={{ mb: 2.5, mt: 'auto' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                        Policy Areas:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {policyDomains.map((domain) => {
                            const domainInfo = DOMAINS.find((d) => d.id === domain);
                            const domainColor = getDomainColor(domain);
                            return domainInfo ? (
                                <Chip
                                    key={domain}
                                    label={
                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                            {domainInfo.emoji}{" "}
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: { xs: 'none', sm: 'inline' },
                                                    ml: 0.5
                                                }}
                                            >
                                                <HighlightedText
                                                    text={domain.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                                    searchQuery={searchQuery}
                                                />
                                            </Box>
                                        </Box>
                                    }
                                    size="small"
                                    onClick={(e) => handleDomainClick(domain, e)}
                                    sx={{
                                        bgcolor: domainColor.main,
                                        color: domainColor.contrastText,
                                        '&:hover': {
                                            bgcolor: domainColor.main,
                                            opacity: 0.8
                                        }
                                    }}
                                />
                            ) : null;
                        })}
                    </Box>
                </Box>

                {/* Cost and impact information */}
                <Grid container spacing={1.5}>
                    <Grid size={{ xs: 6 }}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 1.5,
                                bgcolor: 'grey.50',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: 'block',
                                    mb: 0.5,
                                    fontWeight: 500
                                }}
                            >
                                Implementation Cost:
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flex: 1
                            }}>
                                {/* Render money bags horizontally */}
                                {policy.implementation_cost_category === "substantial" && (
                                    <Box sx={{ display: 'flex', mr: 1 }}>
                                        <span>💰💰💰</span>
                                    </Box>
                                )}
                                {policy.implementation_cost_category === "moderate" && (
                                    <Box sx={{ display: 'flex', mr: 1 }}>
                                        <span>💰💰</span>
                                    </Box>
                                )}
                                {policy.implementation_cost_category === "minimal" && (
                                    <Box sx={{ display: 'flex', mr: 1 }}>
                                        <span>💰</span>
                                    </Box>
                                )}
                                {policy.implementation_cost_category === "none" && (
                                    <Box sx={{ display: 'flex', mr: 1 }}>
                                        <span>🆓</span>
                                    </Box>
                                )}
                                {policy.implementation_cost_category === "variable" && (
                                    <Box sx={{ display: 'flex', mr: 1 }}>
                                        <span>🎲</span>
                                    </Box>
                                )}
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {policy.implementation_cost_category.replace(/_/g, ' ')
                                        .replace(/\b\w/g, l => l.toUpperCase())}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 1.5,
                                bgcolor: 'grey.50',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: 'block',
                                    mb: 0.5,
                                    fontWeight: 500
                                }}
                            >
                                Budget Impact:
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flex: 1
                            }}>
                                <Typography variant="body2" sx={{ mr: 1, fontSize: '1.2rem' }}>
                                    {FISCAL_IMPACTS.find(
                                        (f) => f.id === policy.fiscal_impact_category
                                    )?.emoji || "🤔"}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {policy.fiscal_impact_category.replace(/_/g, ' ')
                                        .replace(/\b\w/g, l => l.toUpperCase())}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}