'use client';

import Link from 'next/link';
import { Policy } from '@/app/lib/types';
import { DomainId, DOMAINS, COST_CATEGORIES, FISCAL_IMPACTS } from '@/app/lib/constants';
import { useRouter } from 'next/navigation';

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

    // Function to handle domain chip clicks
    const handleDomainClick = (domain: DomainId, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click
        router.push(`/?domains=${domain}`);
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
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
                {/* Policy title */}
                <h3 className="text-lg font-semibold mb-2">
                    <Link
                        href={`/policy/${policy.policy_id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                    >
                        <HighlightedText text={policy.title} searchQuery={searchQuery} />
                    </Link>
                </h3>

                {/* Policy description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                    <HighlightedText
                        text={policy.summary || policy.description || ""}
                        searchQuery={searchQuery}
                    />
                </p>

                {/* Domain tags */}
                <div className="mb-4">
                    <h4 className="text-sm text-gray-500 mb-2">Policy Areas:</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {policyDomains.map((domain) => {
                            const domainInfo = DOMAINS.find((d) => d.id === domain);
                            return domainInfo ? (
                                <button
                                    key={domain}
                                    className={`px-2 py-1 rounded text-xs sm:text-sm ${getDomainColor(domain)} hover:opacity-80 cursor-pointer transition-colors`}
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
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                    <div>
                        <h4 className="text-xs text-gray-500 mb-1">Implementation Cost:</h4>
                        <div className="flex items-center">
                            {COST_CATEGORIES.find(
                                (c) => c.id === policy.implementation_cost_category
                            )?.emoji || "🤔"}
                            <span className="ml-1 truncate">
                                {policy.implementation_cost_category.replace(/_/g, ' ')
                                    .replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs text-gray-500 mb-1">Budget Impact:</h4>
                        <div className="flex items-center">
                            {FISCAL_IMPACTS.find(
                                (f) => f.id === policy.fiscal_impact_category
                            )?.emoji || "🤔"}
                            <span className="ml-1 truncate">
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