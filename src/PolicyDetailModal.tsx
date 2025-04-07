import React, { useEffect } from "react";
import {  COST_CATEGORIES, DOMAINS, DomainId, FISCAL_IMPACTS } from "./lib/constants";
import { X } from "lucide-react";
import _ from "lodash";


// Define the types based on your existing data structure
export interface Policy {
  policy_id: string;
  title: string;
  summary?: string;
  description?: string;
  implementation_cost_category: string;
  fiscal_impact_category: string;
  evidence_base?: string;
  stakeholders?: string;
  implementation_challenges?: string;
}

interface DomainMap {
  [key: string]: DomainId[];
}

// Types for the categories from your App.tsx
export interface CategoryOption {
  id: string;
  name: string;
  emoji: string;
}

interface PolicyDetailModalProps {
  policy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
  policyDomains: DomainMap;
  getDomainColor: (domain: DomainId) => string;
}

const PolicyDetailModal: React.FC<PolicyDetailModalProps> = ({
  policy,
  isOpen,
  onClose,
  policyDomains,
  getDomainColor,
}) => {
  // Add effect for escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen || !policy) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Policy title and basic info */}
        <h2 className="text-2xl font-semibold mb-4">{policy.title}</h2>
        
        <p className="text-gray-600 mb-6">
          {policy.summary || policy.description || ""}
        </p>

        {/* Domain tags */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Policy Areas:</h3>
          <div className="flex flex-wrap gap-2">
            {(policyDomains[policy.policy_id] || []).map((domain) => {
              const domainInfo = DOMAINS.find((d) => d.id === domain);
              return domainInfo ? (
                <span
                  key={domain}
                  className={`px-2 py-1 rounded text-sm ${getDomainColor(domain)}`}
                >
                  {domainInfo.emoji} {_.startCase(domain.replace(/-/g, ' '))}
                </span>
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
                {_.startCase(policy.implementation_cost_category)}
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
                {_.startCase(policy.fiscal_impact_category)}
              </span>
            </div>
          </div>
        </div>

        {/* Evidence Base */}
        {policy.evidence_base && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Evidence Base</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>{policy.evidence_base}</p>
            </div>
          </div>
        )}

        {/* Stakeholders */}
        {policy.stakeholders && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Key Stakeholders</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>{policy.stakeholders}</p>
            </div>
          </div>
        )}

        {/* Implementation Challenges */}
        {policy.implementation_challenges && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Implementation Challenges</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>{policy.implementation_challenges}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyDetailModal;