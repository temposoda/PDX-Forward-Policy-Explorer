'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUrlWithUpdatedParams } from '@/app/lib/navigation';
import { Policy } from '@/app/lib/types';
import { DomainId, DOMAINS, COST_CATEGORIES, FISCAL_IMPACTS } from '@/app/lib/constants';
import {
    Box,
    Typography,
    Button,
    Paper,
    Chip,
    Grid,
    Divider,
    IconButton,
    Tooltip,
    Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import CheckIcon from '@mui/icons-material/Check';
import ReactMarkdown from 'react-markdown';

interface PolicyDetailsProps {
    policy: Policy;
    policyDomains: DomainId[];
}

export default function PolicyDetails({
    policy,
    policyDomains
}: PolicyDetailsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [copied, setCopied] = useState(false);

    // Copy link to policy
    const copyPolicyLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => console.error("Failed to copy URL: ", err));
    };

    // Handle domain clicks
    const handleDomainClick = (domain: DomainId) => {
        // Update only the domains parameter while preserving other filters
        const newUrl = createUrlWithUpdatedParams(searchParams, {
            domains: domain,
            domainMode: "ANY"
        });

        router.push(newUrl);
    };

    const handleBackClick = () => {
        // If we have a referrer from the same origin, use the browser back
        if (document.referrer && document.referrer.includes(window.location.origin)) {
            router.back();
        } else {
            // Otherwise, go back to the home page
            router.push('/');
        }
    };

    // Helper function for domain colors
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

    // Helper function to render stakeholders with categories
    const renderStakeholders = (stakeholdersString: string) => {
        if (!stakeholdersString) return null;

        // Create a more robust regex pattern for categories
        const categoryMatches = stakeholdersString.match(/[A-Z][a-zA-Z\s&amp;]+:/g) || [];

        if (categoryMatches.length === 0) {
            // Simple fallback if no categories detected
            return <Typography variant="body2">{stakeholdersString}</Typography>;
        }

        // Create segments by splitting at each category
        const categorySegments: { name: string; stakeholders: string[] }[] = [];

        categoryMatches.forEach((categoryMatch, index) => {
            const categoryName = categoryMatch.slice(0, -1); // Remove the colon

            // Find start and end positions
            const startPos = stakeholdersString.indexOf(categoryMatch) + categoryMatch.length;
            const endPos = index < categoryMatches.length - 1
                ? stakeholdersString.indexOf(categoryMatches[index + 1])
                : stakeholdersString.length;

            // Extract content
            const content = stakeholdersString.substring(startPos, endPos).trim();

            // Split by semicolons
            const stakeholdersList = content
                .split(';')
                .map(item => item.trim())
                .filter(Boolean)
                .map(item => item.endsWith(',') ? item.slice(0, -1) : item); // Remove trailing commas

            categorySegments.push({
                name: categoryName,
                stakeholders: stakeholdersList
            });
        });

        return (
            <Box component="div" sx={{ '& > div:not(:last-child)': { mb: 1.5 } }}>
                {categorySegments.map(category => (
                    <Box key={category.name}>
                        <Typography variant="body2">
                            <Box component="span" sx={{ fontWeight: 600 }}>{category.name}: </Box>
                            {category.stakeholders.join(', ')}
                        </Typography>
                    </Box>
                ))}
            </Box>
        );
    };

    // Helper function to render implementation challenges with colors
    const renderChallenges = (challenges: string) => {
        if (!challenges) return null;

        // Regex to extract severity descriptor from strings like "[significant] Whatever: ..."
        const severityRegex = /\[([^\]]+)\]/;

        // Define challenge severity colors
        const getChallengeColor = (challenge: string): string => {
            const colors = {
                significant: "#EF4444", // red-500
                major: "#F97316", // orange-500
                moderate: "#EAB308", // yellow-500
                minor: "#3B82F6", // blue-500
                "": "#3B82F6", // blue-500 default
            };

            function extractSeverity(input: string): keyof typeof colors {
                const match = input.match(severityRegex);
                return (match ? match[1] : "") as keyof typeof colors;
            }

            const severity = extractSeverity(challenge);
            return colors[severity];
        };

        function stripSeverityTag(input: string) {
            return input.replace(severityRegex, '').trim();
        }

        const challengeItems = challenges
            .split(';')
            .map(c => ({
                color: getChallengeColor(c),
                text: stripSeverityTag(c)
            }))
            .filter(Boolean);

        return (
            <Box>
                {/* Challenge color legend */}
                <Box
                    sx={{
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.75rem',
                        color: 'text.secondary'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <Box
                            component="span"
                            sx={{
                                display: 'inline-block',
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#EF4444',
                                mr: 0.5
                            }}
                        />
                        Significant
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <Box
                            component="span"
                            sx={{
                                display: 'inline-block',
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#EAB308',
                                mr: 0.5
                            }}
                        />
                        Moderate
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            component="span"
                            sx={{
                                display: 'inline-block',
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#3B82F6',
                                mr: 0.5
                            }}
                        />
                        Minor
                    </Box>
                </Box>

                {/* Challenge items */}
                <Box sx={{ '& > div:not(:first-of-type)': { mt: 1.5 } }}>
                    {challengeItems.map((data, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Box
                                component="span"
                                sx={{
                                    flexShrink: 0,
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: data.color,
                                    mt: 1.2,
                                    mr: 1
                                }}
                            />
                            <Typography variant="body2">{data.text}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        );
    };

    const renderEvidenceBase = (evidenceBase: string) => {
        if (!evidenceBase) return null;

        return (
            <Box
                sx={{
                    '& a': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                        '&:hover': {
                            color: 'primary.dark'
                        }
                    },
                    '& p': {
                        mb: 2
                    }
                }}
            >
                <ReactMarkdown

                >
                    {evidenceBase}
                </ReactMarkdown>
            </Box>
        );
    };

    return (
        <Paper
            elevation={0}
            sx={{
                maxWidth: 'md',
                mx: 'auto',
                p: { xs: 2, sm: 3, md: 4 },
                position: 'relative',
                borderRadius: 2
            }}
        >
            {/* Back button */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBackClick}
                sx={{ mb: 2 }}
                color="primary"
            >
                Back to Policies
            </Button>

            {/* Share button */}
            <Box sx={{ position: 'absolute', top: { xs: 16, sm: 24 }, right: { xs: 16, sm: 24 } }}>
                <Tooltip title={copied ? "Copied!" : "Share policy link"}>
                    <IconButton onClick={copyPolicyLink} color={copied ? "success" : "default"}>
                        {copied ? <CheckIcon /> : <ShareIcon />}
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Policy title and basic info */}
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    pr: { xs: 8, sm: 10 },
                    mb: 2
                }}
            >
                {policy.title}
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ mb: 3 }}
            >
                {policy.summary || policy.description || ""}
            </Typography>

            {/* Domain tags */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Policy Areas:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {policyDomains.map((domain) => {
                        const domainInfo = DOMAINS.find((d) => d.id === domain);
                        const domainColor = getDomainColor(domain);
                        return domainInfo ? (
                            <Chip
                                key={domain}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {domainInfo.emoji} {domain.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                    </Box>
                                }
                                onClick={() => handleDomainClick(domain)}
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
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom>Implementation Cost:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ mr: 1, fontSize: '1.5rem' }}>
                            {COST_CATEGORIES.find(
                                (c) => c.id === policy.implementation_cost_category
                            )?.emoji || "🤔"}
                        </Typography>
                        <Typography variant="body1">
                            {policy.implementation_cost_category.replace(/_/g, ' ')
                                .replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom>Impact on City Budget:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ mr: 1, fontSize: '1.5rem' }}>
                            {FISCAL_IMPACTS.find(
                                (f) => f.id === policy.fiscal_impact_category
                            )?.emoji || "🤔"}
                        </Typography>
                        <Typography variant="body1">
                            {policy.fiscal_impact_category.replace(/_/g, ' ')
                                .replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Evidence Base */}
            {policy.evidence_base && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Evidence Base</Typography>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: 'grey.50'
                        }}
                    >
                        {renderEvidenceBase(policy.evidence_base)}
                    </Paper>
                </Box>
            )}

            {/* Stakeholders */}
            {policy.stakeholders && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Key Stakeholders</Typography>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: 'grey.50'
                        }}
                    >
                        {renderStakeholders(policy.stakeholders)}
                    </Paper>
                </Box>
            )}

            {/* Implementation Challenges */}
            {policy.implementation_challenges && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Implementation Challenges</Typography>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: 'grey.50'
                        }}
                    >
                        {renderChallenges(policy.implementation_challenges)}
                    </Paper>
                </Box>
            )}
        </Paper>
    );
}