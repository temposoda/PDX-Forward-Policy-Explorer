'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { createUrlWithUpdatedParams, getFiltersFromSearchParams } from '@/app/lib/navigation';
import { COST_CATEGORIES, FISCAL_IMPACTS, DOMAINS } from '@/app/lib/constants';
import MultiSelect from './MultiSelect';

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

    const renderActiveFilters = () => {
        if (selectedDomains[0] === "all" &&
            selectedCost === "all" &&
            selectedImpact === "all" &&
            !searchQuery) {
            return null; // No filters active
        }

        return (
            <div className="mt-4 flex flex-wrap gap-2">
                {selectedDomains[0] !== "all" && selectedDomains.map(domain => {
                    const domainInfo = DOMAINS.find((d) => d.id === domain);
                    return domainInfo ? (
                        <span
                            key={domain}
                            className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center font-medium"
                        >
                            {domainInfo.emoji} {domainInfo.name}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const newDomains = selectedDomains.filter(d => d !== domain);
                                    setSelectedDomains(newDomains.length ? newDomains : ["all"]);
                                }}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                                aria-label={`Remove ${domainInfo.name} filter`}
                            >
                                ×
                            </button>
                        </span>
                    ) : null;
                })}

                {selectedCost !== "all" && (
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center font-medium">
                        {COST_CATEGORIES.find(c => c.id === selectedCost)?.emoji}
                        {' '}
                        {COST_CATEGORIES.find(c => c.id === selectedCost)?.name}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedCost("all");
                            }}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            aria-label={`Remove ${COST_CATEGORIES.find(c => c.id === selectedCost)?.name} filter`}
                        >
                            ×
                        </button>
                    </span>
                )}

                {selectedImpact !== "all" && (
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center font-medium">
                        {FISCAL_IMPACTS.find(f => f.id === selectedImpact)?.emoji}
                        {' '}
                        {FISCAL_IMPACTS.find(f => f.id === selectedImpact)?.name}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedImpact("all");
                            }}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            aria-label={`Remove ${FISCAL_IMPACTS.find(f => f.id === selectedImpact)?.name} filter`}
                        >
                            ×
                        </button>
                    </span>
                )}

                {searchQuery && (
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center font-medium">
                        🔍 &ldquo;{searchQuery}&rdquo;
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setSearchQuery("");
                            }}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="w-full">
                <input
                    type="text"
                    placeholder="Search policies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
                    aria-label="Search policies"
                />
            </div>

            <div className="p-5 border border-gray-200 rounded-md bg-white shadow-sm">
                {/* Policy Areas Section */}
                <div className="mb-6">
                    <label className="block text-base font-medium text-gray-800 mb-3">Policy Areas:</label>
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Domain Filter with ANY/ALL toggle - widened buttons with more padding */}
                        <div className="flex items-center border rounded-md overflow-hidden min-w-[120px] shadow-sm">
                            <button
                                onClick={() => setDomainFilterMode("ANY")}
                                className={`px-4 py-2.5 text-sm font-medium ${domainFilterMode === "ANY"
                                    ? "bg-blue-100 text-blue-800"
                                    : "hover:bg-gray-100 text-gray-700"
                                    }`}
                            >
                                ANY
                            </button>
                            <button
                                onClick={() => setDomainFilterMode("ALL")}
                                className={`px-4 py-2.5 text-sm font-medium border-l ${domainFilterMode === "ALL"
                                    ? "bg-blue-100 text-blue-800"
                                    : "hover:bg-gray-100 text-gray-700"
                                    }`}
                            >
                                ALL
                            </button>
                        </div>
                        <span className="text-sm font-medium text-gray-600">of these</span>
                        <div className="flex-grow">
                            <MultiSelect
                                selected={selectedDomains}
                                onChange={setSelectedDomains}
                            />
                        </div>
                    </div>
                </div>

                {/* Cost and Impact in 2 columns on larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Cost Filter */}
                    <div>
                        <label className="block text-base font-medium text-gray-800 mb-3">Implementation Cost:</label>
                        <select
                            value={selectedCost}
                            onChange={(e) => setSelectedCost(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
                            aria-label="Select implementation cost filter"
                        >
                            {COST_CATEGORIES.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.emoji || "🤔"} {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Impact Filter */}
                    <div>
                        <label className="block text-base font-medium text-gray-800 mb-3">Budget Impact:</label>
                        <select
                            value={selectedImpact}
                            onChange={(e) => setSelectedImpact(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
                            aria-label="Select budget impact filter"
                        >
                            {FISCAL_IMPACTS.map((impact) => (
                                <option key={impact.id} value={impact.id}>
                                    {impact.emoji || "🤔"} {impact.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex justify-between flex-wrap gap-4'>
                    {renderActiveFilters()}

                    {/* Reset button */}
                    {(selectedDomains[0] !== "all" ||
                        selectedCost !== "all" ||
                        selectedImpact !== "all" ||
                        searchQuery !== "") && (
                            <div className="flex justify-end">
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md border border-red-200 transition-colors font-medium text-sm shadow-sm"
                                    aria-label="Reset all filters"
                                >
                                    🔄 Reset Filters
                                </button>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}