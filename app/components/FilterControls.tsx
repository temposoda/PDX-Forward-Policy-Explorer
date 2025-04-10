'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DomainId, COST_CATEGORIES, FISCAL_IMPACTS } from '@/app/lib/constants';
import { DomainFilterMode } from '@/app/lib/types';
import MultiSelect from './MultiSelect';

export default function FilterControls() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse initial state from URL parameters
    const initialDomains = (searchParams.get("domains")?.split(",") as DomainId[]) || ["all"];
    const initialDomainMode = (searchParams.get("domainMode") as DomainFilterMode) || "ANY";
    const initialCost = searchParams.get("cost") || "all";
    const initialImpact = searchParams.get("impact") || "all";
    const initialQuery = searchParams.get("q") || "";

    // State for filters
    const [selectedDomains, setSelectedDomains] = useState<DomainId[]>(initialDomains);
    const [domainFilterMode, setDomainFilterMode] = useState<DomainFilterMode>(initialDomainMode);
    const [selectedCost, setSelectedCost] = useState(initialCost);
    const [selectedImpact, setSelectedImpact] = useState(initialImpact);
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();

        if (selectedDomains[0] !== "all") {
            params.set("domains", selectedDomains.join(","));
            params.set("domainMode", domainFilterMode);
        }
        if (selectedCost !== "all") params.set("cost", selectedCost);
        if (selectedImpact !== "all") params.set("impact", selectedImpact);
        if (searchQuery) params.set("q", searchQuery);

        const newUrl = params.toString()
            ? `/?${params.toString()}`
            : "/";

        router.push(newUrl);
    }, [selectedDomains, domainFilterMode, selectedCost, selectedImpact, searchQuery, router]);

    // Reset filters
    const resetFilters = () => {
        setSelectedDomains(["all"]);
        setDomainFilterMode("ANY");
        setSelectedCost("all");
        setSelectedImpact("all");
        setSearchQuery("");
        router.push("/");
    };

    return (
        <div className="mb-6 space-y-4">
            {/* Search */}
            <div className="w-full">
                <input
                    type="text"
                    placeholder="Search policies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div className="p-4 border border-gray-200 rounded-md bg-white">
                {/* Policy Areas Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Policy Areas:</label>
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Domain Filter with ANY/ALL toggle - widened buttons with more padding */}
                        <div className="flex items-center border rounded-md overflow-hidden min-w-[110px]">
                            <button
                                onClick={() => setDomainFilterMode("ANY")}
                                className={`px-4 py-2 text-sm ${domainFilterMode === "ANY"
                                    ? "bg-blue-100 text-blue-800"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                ANY
                            </button>
                            <button
                                onClick={() => setDomainFilterMode("ALL")}
                                className={`px-4 py-2 text-sm border-l ${domainFilterMode === "ALL"
                                    ? "bg-blue-100 text-blue-800"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                ALL
                            </button>
                        </div>
                        <span className="text-sm">of these</span>
                        <div className="flex-grow">
                            <MultiSelect
                                selected={selectedDomains}
                                onChange={setSelectedDomains}
                            />
                        </div>
                    </div>
                </div>

                {/* Cost and Impact in 2 columns on larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Cost Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Implementation Cost:</label>
                        <select
                            value={selectedCost}
                            onChange={(e) => setSelectedCost(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Impact:</label>
                        <select
                            value={selectedImpact}
                            onChange={(e) => setSelectedImpact(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            {FISCAL_IMPACTS.map((impact) => (
                                <option key={impact.id} value={impact.id}>
                                    {impact.emoji || "🤔"} {impact.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Reset button */}
                {(selectedDomains[0] !== "all" ||
                    selectedCost !== "all" ||
                    selectedImpact !== "all" ||
                    searchQuery !== "") && (
                        <div className="flex justify-end">
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md border border-red-200 transition-colors"
                            >
                                🔄 Reset Filters
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
}