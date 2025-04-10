'use client';

import { Policy } from '@/app/lib/types';
import { DomainId, DOMAINS, COST_CATEGORIES, FISCAL_IMPACTS } from '@/app/lib/constants';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Share2, Check } from 'lucide-react';

interface PolicyDetailsProps {
    policy: Policy;
    policyDomains: DomainId[]
}

export default function PolicyDetails({
    policy,
    policyDomains
}: PolicyDetailsProps) {
    const router = useRouter();
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

        // Direct navigation for standalone page
        router.push(`/?domains=${domain}`);

    };

    // Helper function for domain colors
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

    // Helper function to render stakeholders with categories
    const renderStakeholders = (stakeholdersString: string) => {
        if (!stakeholdersString) return null;

        // Create a more robust regex pattern for categories
        const categoryMatches = stakeholdersString.match(/[A-Z][a-zA-Z\s&amp;]+:/g) || [];

        if (categoryMatches.length === 0) {
            // Simple fallback if no categories detected
            return <p>{stakeholdersString}</p>;
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
            <div className="space-y-3">
                {categorySegments.map(category => (
                    <div key={category.name} className="mb-2 last:mb-0">
                        <p>
                            <span className="font-semibold">{category.name}:</span>{' '}
                            {category.stakeholders.join(', ')}
                        </p>
                    </div>
                ))}
            </div>
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
                significant: "bg-red-500",
                major: "bg-orange-500",
                moderate: "bg-yellow-500",
                minor: "bg-blue-500",
                "": "bg-blue-500",
            }


            // Test function to demonstrate usage
            function extractSeverity(input: string): keyof typeof colors {
                const match = input.match(severityRegex);
                return (match ? match[1] : "") as keyof typeof colors;
            }
            const severity = extractSeverity(challenge)

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
            <>
                {/* Challenge color legend */}
                <div className="mb-3 flex items-center text-xs text-gray-600">
                    <span className="mr-3 flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span> Significant
                    </span>
                    <span className="mr-3 flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span> Moderate
                    </span>
                    <span className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span> Minor
                    </span>
                </div>

                {/* Challenge items */}
                {challengeItems.map((data, idx) => (
                    <div key={idx} className={`flex items-start ${idx > 0 ? 'mt-3' : ''}`}>
                        <div className={`flex-shrink-0 w-2 h-2 mt-1.5 mr-2 rounded-full ${data.color}`}></div>
                        <div>{data.text}</div>
                    </div>
                ))}
            </>
        );
    };

    const renderEvidenceBase = (evidenceBase: string) => {
        if (!evidenceBase) return null;

        return (
            <div className="prose prose-sm max-w-none prose-a:text-blue-600 prose-a:underline">
                <ReactMarkdown
                    components={{
                        // Customize link rendering
                        a: (props) => (
                            <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                            />
                        ),
                        p: ({ children }) => {
                            return <p className="whitespace-pre-line mb-5">{children}</p>;
                        }
                    }}
                >
                    {evidenceBase}
                </ReactMarkdown>
            </div >
        );
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 relative" >
            {/* Back button */}
            <button
                onClick={() => { router.push('/') }}
                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
            >
                ← Back to Policies
            </button>


            {/* Share button */}
            <button
                onClick={copyPolicyLink}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 flex items-center"
                aria-label="Share policy link"
            >
                {copied ? (
                    <>
                        <Check size={18} className="mr-1 text-green-600" />
                        <span className="text-sm text-green-600">Copied!</span>
                    </>
                ) : (
                    <>
                        <Share2 size={18} className="mr-1" />
                        <span className="text-sm">Share</span>
                    </>
                )}
            </button>

            {/* Policy title and basic info */}
            <h2 className="text-2xl font-semibold mb-4 pr-32">{policy.title}</h2>

            <p className="text-gray-600 mb-6">
                {policy.summary || policy.description || ""}
            </p>

            {/* Domain tags */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Policy Areas:</h3>
                <div className="flex flex-wrap gap-2">
                    {policyDomains.map((domain) => {
                        const domainInfo = DOMAINS.find((d) => d.id === domain);
                        return domainInfo ? (
                            <button
                                key={domain}
                                className={`px-2 py-1 rounded text-sm ${getDomainColor(domain)} hover:opacity-80 cursor-pointer`}
                                onClick={() => handleDomainClick(domain)}
                            >
                                {domainInfo.emoji} {domain.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                            </button>
                        ) : null;
                    })}
                </div>
            </div>

            {/* Cost and impact information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="text-lg font-medium mb-2">Implementation Cost:</h3>
                    <div className="flex items-center">
                        {COST_CATEGORIES.find(
                            (c) => c.id === policy.implementation_cost_category
                        )?.emoji || "🤔"}
                        <span className="ml-2">
                            {policy.implementation_cost_category.replace(/_/g, ' ')
                                .replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-2">Impact on City Budget:</h3>
                    <div className="flex items-center">
                        {FISCAL_IMPACTS.find(
                            (f) => f.id === policy.fiscal_impact_category
                        )?.emoji || "🤔"}
                        <span className="ml-2">
                            {policy.fiscal_impact_category.replace(/_/g, ' ')
                                .replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                    </div>
                </div>
            </div>

            {/* Evidence Base */}
            {policy.evidence_base && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Evidence Base</h3>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                        {renderEvidenceBase(policy.evidence_base)}
                    </div>
                </div>
            )}

            {/* Stakeholders */}
            {policy.stakeholders && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Key Stakeholders</h3>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                        {renderStakeholders(policy.stakeholders)}
                    </div>
                </div>
            )}

            {/* Implementation Challenges */}
            {policy.implementation_challenges && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Implementation Challenges</h3>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                        {renderChallenges(policy.implementation_challenges)}
                    </div>
                </div>
            )}
        </div>
    );
}