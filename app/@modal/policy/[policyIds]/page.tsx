'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchPolicyById, fetchPolicyDomains } from '@/app/lib/data';
import { Policy, DomainMap } from '@/app/lib/types';
import { DOMAINS, COST_CATEGORIES, FISCAL_IMPACTS, DomainId } from '@/app/lib/constants';
import ReactMarkdown from 'react-markdown';
import { X, Share2, Check } from 'lucide-react';

export default function PolicyDetailModal() {
    const params = useParams();
    const router = useRouter();
    const policyId = params.policyId as string;

    const [policy, setPolicy] = useState<Policy | null>(null);
    const [policyDomains, setPolicyDomains] = useState<DomainId[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadPolicy = async () => {
            try {
                setLoading(true);

                const [policyData, domainsData] = await Promise.all([
                    fetchPolicyById(policyId),
                    fetchPolicyDomains(),
                ]);

                if (!policyData) {
                    setError('Policy not found');
                    return;
                }

                setPolicy(policyData);
                setPolicyDomains(domainsData[policyId] || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load policy');
            } finally {
                setLoading(false);
            }
        };

        loadPolicy();
    }, [policyId]);

    // Close modal and return to main page
    const closeModal = () => {
        router.back(); // This returns to the previous page
    };

    // Handle clicks outside the modal to close it
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Similar helper functions as before for rendering different sections...
    // (Keep the same helper functions you had in the previous implementation)

    // Function to handle domain clicks
    const handleDomainClick = (domain: DomainId) => {
        // Close the modal and navigate to filtered view
        router.push(`/?domains=${domain}`);
    };

    // Copy link to policy
    const copyPolicyLink = () => {
        const url = new URL(window.location.href);
        url.pathname = `/policy/${policyId}`;

        navigator.clipboard.writeText(url.toString())
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => console.error("Failed to copy URL: ", err));
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

    // Include the same helper functions for rendering stakeholders and challenges
    // as in your previous implementation

    if (!policy && !loading && !error) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                {/* Close button */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                {/* Share button */}
                <button
                    onClick={copyPolicyLink}
                    className="absolute top-4 right-14 text-gray-500 hover:text-gray-700 flex items-center"
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

                {loading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="text-lg">Loading policy details...</div>
                    </div>
                ) : error ? (
                    <div className="p-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h3 className="text-red-800 font-semibold mb-2">
                                Error Loading Policy
                            </h3>
                            <p className="text-red-600">{error}</p>
                        </div>
                    </div>
                ) : policy && (
                    <>
                        {/* Policy title and basic info */}
                        <h2 className="text-2xl font-semibold mb-4 pr-32">{policy.title}</h2>

                        <p className="text-gray-600 mb-6">
                            {policy.summary || policy.description || ""}
                        </p>

                        {/* Rest of your policy detail content */}
                        {/* Include all the sections you had in your previous implementation */}
                    </>
                )}
            </div>
        </div>
    );
}