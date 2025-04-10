'use client';

import { useSearchParams } from 'next/navigation';
import { Policy, DomainMap } from '@/app/lib/types';
import { DomainId, DomainFilterMode } from '@/app/lib/constants';
import FilterControls from '@/app/components/FilterControls';
import PolicyCard from '@/app/components/PolicyCard';


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

    // Utility function for domain colors
    const getDomainColor = (domain: DomainId): string => {
        const colors: Record<Exclude<DomainId, "all">, string> = {
            housing: "bg-pink-100 text-pink-800",
            environment: "bg-green-100 text-green-800",
            safety: "bg-yellow-100 text-yellow-800",
            democracy: "bg-blue-100 text-blue-800",
            "economic-development": "bg-orange-100 text-orange-800",
            "infrastructure-and-transportation": "bg-indigo-100 text-indigo-800",
            "social-services": "bg-purple-100 text-purple-800",
            "public-health": "bg-red-100 text-red-800",
        };

        return (
            colors[domain as Exclude<DomainId, "all">] || "bg-gray-100 text-gray-800"
        );
    };



    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">PDX Forward Policy Explorer</h1>
                <p className="text-gray-600">
                    Explore and filter proposed policies by policy area, expected cost,
                    and budget impact.
                </p>
            </header>

            <FilterControls />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPolicies.map((policy) => (
                    <PolicyCard
                        key={policy.policy_id}
                        policy={policy}
                        policyDomains={policyDomains[policy.policy_id] || []}
                        searchQuery={searchQuery}
                        getDomainColor={getDomainColor}
                    />
                ))}
            </div>

            {filteredPolicies.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No policies found matching the selected filters.
                </div>
            )}
        </div>
    );
}