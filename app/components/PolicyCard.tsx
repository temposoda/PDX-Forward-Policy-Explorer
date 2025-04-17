'use client';

import Link from 'next/link';
import { Policy } from '@/app/lib/types';
import { DomainId, DOMAINS, COST_CATEGORIES, FISCAL_IMPACTS } from '@/app/lib/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUrlWithUpdatedParams } from '@/app/lib/navigation';

interface PolicyCardProps {
    policy: Policy;
    policyDomains: DomainId[];
    searchQuery: string;
    getDomainColor: (domain: DomainId) => string;
}

export default function PolicyCard({
    policy,
    policyDomains,
    searchQuery,
    getDomainColor
}: PolicyCardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Function to handle domain chip clicks
    const handleDomainClick = (domain: DomainId, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click

        // Update only the domains parameter while preserving other filters
        const newUrl = createUrlWithUpdatedParams(searchParams, {
            domains: domain,
            domainMode: "ANY"
        });

        router.push(newUrl);
    };

    // Helper component for highlighted text
    const HighlightedText = ({ text, searchQuery }: { text: string, searchQuery: string }) => {
        if (!searchQuery || !text) return <>{text}</>;

        const parts = text.split(
            new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi")
        );

        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                        <span key={i} className="bg-yellow-200 px-0.5 rounded">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:border-blue-300">
            <div className="p-5">
                {/* Policy title */}
                <h3 className="text-xl font-semibold mb-3">
                    <Link
                        href={`/policy/${policy.policy_id}`}
                        className="text-blue-700 hover:text-blue-900 hover:underline text-left"
                    >
                        <HighlightedText text={policy.title} searchQuery={searchQuery} />
                    </Link>
                </h3>

                {/* Policy description */}
                <p className="text-gray-700 mb-5 line-clamp-3 text-base leading-relaxed">
                    <HighlightedText
                        text={policy.summary || policy.description || ""}
                        searchQuery={searchQuery}
                    />
                </p>

                {/* Domain tags */}
                <div className="mb-5">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Policy Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                        {policyDomains.map((domain) => {
                            const domainInfo = DOMAINS.find((d) => d.id === domain);
                            return domainInfo ? (
                                <button
                                    key={domain}
                                    className={`px-3 py-1.5 rounded-full text-sm ${getDomainColor(domain)} hover:opacity-80 cursor-pointer transition-colors font-medium`}
                                    onClick={(e) => handleDomainClick(domain, e)}
                                >
                                    {domainInfo.emoji}{" "}
                                    <span className="hidden sm:inline">
                                        <HighlightedText
                                            text={domain.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                            searchQuery={searchQuery}
                                        />
                                    </span>
                                </button>
                            ) : null;
                        })}
                    </div>
                </div>

                {/* Cost and impact information */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="text-xs font-medium text-gray-600 mb-1.5">Implementation Cost:</h4>
                        <div className="flex items-center">
                            <span className="text-lg mr-2">
                                {COST_CATEGORIES.find(
                                    (c) => c.id === policy.implementation_cost_category
                                )?.emoji || "🤔"}
                            </span>
                            <span className="font-medium">
                                {policy.implementation_cost_category.replace(/_/g, ' ')
                                    .replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="text-xs font-medium text-gray-600 mb-1.5">Budget Impact:</h4>
                        <div className="flex items-center">
                            <span className="text-lg mr-2">
                                {FISCAL_IMPACTS.find(
                                    (f) => f.id === policy.fiscal_impact_category
                                )?.emoji || "🤔"}
                            </span>
                            <span className="font-medium">
                                {policy.fiscal_impact_category.replace(/_/g, ' ')
                                    .replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}