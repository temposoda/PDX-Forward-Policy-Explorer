'use client';

import { useSearchParams } from 'next/navigation';
import { Policy, DomainMap } from '@/app/lib/types';
import { DomainId, DomainFilterMode } from '@/app/lib/constants';
import FilterControls from '@/app/components/FilterControls';
import PolicyCard from '@/app/components/PolicyCard';
import {
    Box,
    Typography,
    Grid,
    Paper,
} from '@mui/material';

export default function PolicyList({
    policies,
    policyDomains
}: {
    policies: Policy[],
    policyDomains: DomainMap
}) {
    const searchParams = useSearchParams();

    // Parse filter parameters
    const selectedDomains = (searchParams.get("domains")?.split(",") as DomainId[]) || ["all"];
    const domainFilterMode = (searchParams.get("domainMode") as DomainFilterMode) || "ANY";
    const selectedCost = searchParams.get("cost") || "all";
    const selectedImpact = searchParams.get("impact") || "all";
    const searchQuery = searchParams.get("q") || "";

    // Filter policies based on current filters
    const filteredPolicies = policies.filter((policy) => {
        const matchesCost =
            selectedCost === "all" || policy.implementation_cost_category === selectedCost;

        const matchesImpact =
            selectedImpact === "all" || policy.fiscal_impact_category === selectedImpact;

        // Domain filtering with ANY/ALL logic
        const policyDomainList = policyDomains[policy.policy_id] || [];
        const matchesDomain =
            selectedDomains[0] === "all" ||
            (domainFilterMode === "ANY"
                ? selectedDomains.some((d) => policyDomainList.includes(d))
                : selectedDomains.every((d) => policyDomainList.includes(d)));

        const searchText = searchQuery.toLowerCase();
        const matchesSearch =
            searchQuery === "" ||
            policy.title.toLowerCase().includes(searchText) ||
            (policy.description || "").toLowerCase().includes(searchText) ||
            (policy.summary || "").toLowerCase().includes(searchText);

        return matchesCost && matchesImpact && matchesDomain && matchesSearch;
    });

    return (
        <Box>
            <FilterControls />

            {/* Results counter */}
            <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 2.5, fontWeight: 500 }}
            >
                {filteredPolicies.length === 1
                    ? "1 policy found"
                    : `${filteredPolicies.length} policies found`}
            </Typography>

            <Grid container spacing={3}>
                {filteredPolicies.map((policy) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={policy.policy_id}>
                        <PolicyCard
                            policy={policy}
                            policyDomains={policyDomains[policy.policy_id] || []}
                            searchQuery={searchQuery}
                        />
                    </Grid>
                ))}
            </Grid>

            {filteredPolicies.length === 0 && (
                <Paper
                    variant="outlined"
                    sx={{
                        textAlign: 'center',
                        py: 6,
                        px: 2,
                        bgcolor: 'background.paper'
                    }}
                >
                    <Typography variant="h6" gutterBottom>No policies found</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try adjusting your filters or search terms
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}