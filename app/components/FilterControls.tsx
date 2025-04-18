'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { createUrlWithUpdatedParams, getFiltersFromSearchParams } from '@/app/lib/navigation';
import { COST_CATEGORIES, FISCAL_IMPACTS, DOMAINS } from '@/app/lib/constants';
import { MultiSelect } from './MultiSelect';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Grid,
    FormControl,
    FormLabel,
    ToggleButtonGroup,
    ToggleButton,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Chip,
    Stack,
    Typography
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function FilterControls() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filters = getFiltersFromSearchParams(searchParams);

    // State for filters
    const [selectedDomains, setSelectedDomains] = useState(filters.domains);
    const [domainFilterMode, setDomainFilterMode] = useState(filters.domainMode);
    const [selectedCost, setSelectedCost] = useState(filters.cost);
    const [selectedImpact, setSelectedImpact] = useState(filters.impact);
    const [searchQuery, setSearchQuery] = useState(filters.q);

    // Update URL when filters change
    useEffect(() => {
        const newUrl = createUrlWithUpdatedParams(
            searchParams,
            {
                domains: selectedDomains[0] === "all" ? null : selectedDomains,
                domainMode: selectedDomains[0] === "all" ? null : domainFilterMode,
                cost: selectedCost === "all" ? null : selectedCost,
                impact: selectedImpact === "all" ? null : selectedImpact,
                q: searchQuery || null
            },
            pathname
        );

        router.push(newUrl);
    }, [selectedDomains, domainFilterMode, selectedCost, selectedImpact, searchQuery, router, pathname, searchParams]);

    // Reset filters
    const resetFilters = () => {
        setSelectedDomains(["all"]);
        setDomainFilterMode("ANY");
        setSelectedCost("all");
        setSelectedImpact("all");
        setSearchQuery("");
        router.push(pathname);
    };

    // Handle removing a single domain filter
    const handleRemoveDomain = (domainToRemove: string) => {
        const newDomains = selectedDomains.filter(d => d !== domainToRemove);
        setSelectedDomains(newDomains.length ? newDomains : ["all"]);
    };

    // Render active filter chips
    const renderActiveFilters = () => {
        if (
            selectedDomains[0] === "all" &&
            selectedCost === "all" &&
            selectedImpact === "all" &&
            !searchQuery
        ) {
            return null; // No filters active
        }

        return (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedDomains[0] !== "all" && selectedDomains.map(domain => {
                    const domainInfo = DOMAINS.find(d => d.id === domain);
                    return domainInfo ? (
                        <Chip
                            key={domain}
                            label={
                                <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                    {domainInfo.emoji} {domainInfo.name}
                                </Box>
                            }
                            color="primary"
                            onDelete={() => handleRemoveDomain(domain)}
                        />
                    ) : null;
                })}

                {selectedCost !== "all" && (
                    <Chip
                        label={
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                {COST_CATEGORIES.find(c => c.id === selectedCost)?.emoji}{' '}
                                {COST_CATEGORIES.find(c => c.id === selectedCost)?.name}
                            </Box>
                        }
                        color="primary"
                        onDelete={() => setSelectedCost("all")}
                    />
                )}

                {selectedImpact !== "all" && (
                    <Chip
                        label={
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                {FISCAL_IMPACTS.find(f => f.id === selectedImpact)?.emoji}{' '}
                                {FISCAL_IMPACTS.find(f => f.id === selectedImpact)?.name}
                            </Box>
                        }
                        color="primary"
                        onDelete={() => setSelectedImpact("all")}
                    />
                )}

                {searchQuery && (
                    <Chip
                        label={
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                🔍 &quot;{searchQuery}&quot;
                            </Box>
                        }
                        color="primary"
                        onDelete={() => setSearchQuery("")}
                    />
                )}
            </Box>
        );
    };

    return (
        <Box sx={{ mb: 4 }}>
            {/* Search */}
            <TextField
                fullWidth
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
            />

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Stack spacing={3}>
                        {/* Policy Areas Section */}
                        <Box>
                            <FormControl fullWidth>
                                <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'medium' }}>
                                    Policy Areas:
                                </FormLabel>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                    <ToggleButtonGroup
                                        value={domainFilterMode}
                                        exclusive
                                        onChange={(_, newMode) => newMode && setDomainFilterMode(newMode)}
                                        size="small"
                                        color="primary"
                                    >
                                        <ToggleButton value="ANY">ANY</ToggleButton>
                                        <ToggleButton value="ALL">ALL</ToggleButton>
                                    </ToggleButtonGroup>

                                    <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
                                        of these
                                    </Typography>

                                    <Box sx={{ flexGrow: 1 }}>
                                        <MultiSelect
                                            selected={selectedDomains}
                                            onChange={(newDomains) => {
                                                setSelectedDomains(newDomains);
                                                // When switching from "all" to specific domains, set a default filter mode
                                                if (selectedDomains[0] === "all" && newDomains[0] !== "all") {
                                                    setDomainFilterMode("ANY");
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </FormControl>
                        </Box>

                        {/* Cost and Impact in 2 columns on larger screens */}
                        <Grid container spacing={3}>
                            {/* Cost Filter */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="cost-label">Implementation Cost</InputLabel>
                                    <Select
                                        labelId="cost-label"
                                        value={selectedCost}
                                        onChange={(e) => setSelectedCost(e.target.value)}
                                        label="Implementation Cost"
                                    >
                                        {COST_CATEGORIES.map(category => (
                                            <MenuItem key={category.id} value={category.id}>
                                                <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {category.emoji} {category.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Impact Filter */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="impact-label">Budget Impact</InputLabel>
                                    <Select
                                        labelId="impact-label"
                                        value={selectedImpact}
                                        onChange={(e) => setSelectedImpact(e.target.value)}
                                        label="Budget Impact"
                                    >
                                        {FISCAL_IMPACTS.map(impact => (
                                            <MenuItem key={impact.id} value={impact.id}>
                                                <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {impact.emoji} {impact.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                            {renderActiveFilters()}

                            {/* Reset button */}
                            {(selectedDomains[0] !== "all" ||
                                selectedCost !== "all" ||
                                selectedImpact !== "all" ||
                                searchQuery !== "") && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={resetFilters}
                                        startIcon={<RestartAltIcon />}
                                        sx={{ ml: { xs: 0, md: 'auto' }, mt: { xs: 2, md: 0 } }}
                                    >
                                        Reset Filters
                                    </Button>
                                )}
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}