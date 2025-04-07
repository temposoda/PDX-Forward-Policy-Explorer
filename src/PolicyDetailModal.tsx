import React, { useEffect } from "react";
import { X } from "lucide-react";
import _ from "lodash";
import * as Constants from './lib/constants'

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
  [key: string]: Constants.DomainId[];
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
  getDomainColor: (domain: Constants.DomainId) => string;
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
    const categorySegments: {name: string; stakeholders: string[]}[] = [];
    
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
        .filter(Boolean);
      
      categorySegments.push({
        name: categoryName,
        stakeholders: stakeholdersList
      });
    });
    
    return (
      <div className="space-y-4">
        {categorySegments.map(category => (
          <div key={category.name} className="mb-3 last:mb-0">
            <h4 className="text-sm font-semibold mb-1">{category.name}</h4>
            <ul className="pl-4">
              {category.stakeholders.map((stakeholder, index) => (
                <li key={`${category.name}-${index}`} className="flex items-start mb-1">
                  <span className="mr-2">•</span> {stakeholder}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

// Helper function to render evidence base with markdown
const renderEvidenceBase = (evidenceBase: string) => {
  if (!evidenceBase) return null;
  
  // Parse into sections based on bold headings
  const sections: {heading: string, content: string}[] = [];
  
  // Extract sections by looking for bold headings
  const boldHeadingPattern = /\*\*([^:]+):\*\*/g;
  let lastIndex = 0;
  let match;
  
  // Reset lastIndex to ensure we start from the beginning
  boldHeadingPattern.lastIndex = 0;
  
  while ((match = boldHeadingPattern.exec(evidenceBase)) !== null) {
    const heading = match[1].trim();
    const startContent = match.index + match[0].length;
    
    // Find the end of this section (start of next section or end of string)
    const nextMatch = boldHeadingPattern.exec(evidenceBase);
    boldHeadingPattern.lastIndex = match.index + 1; // Reset to find next match
    
    const endContent = nextMatch ? nextMatch.index : evidenceBase.length;
    const content = evidenceBase.substring(startContent, endContent).trim();
    
    sections.push({ heading, content });
    lastIndex = endContent;
  }
  
  // If no sections were found, just render the whole thing
  if (sections.length === 0) {
    return (
      <div>
        {evidenceBase.split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>
            {line}
          </p>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <div key={i}>
          <p className="font-semibold">{section.heading}:</p>
          <div className="mt-1 pl-4">
            {section.content.split('\n').map((line, j) => (
              <p key={j} className={j > 0 ? 'mt-1' : ''}>
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
  
  // Helper function to render implementation challenges with colors
  const renderChallenges = (challenges: string) => {
    if (!challenges) return null;
    
    // Define challenge severity colors
    const getChallengeColor = (index: number): string => {
      const colors = [
        "bg-orange-500", // High priority
        "bg-yellow-500", // Medium priority
        "bg-blue-500"    // Low priority
      ];
      return colors[index % colors.length];
    };
    
    const challengeItems = challenges
      .split(';')
      .map(c => c.trim())
      .filter(Boolean);
    
    return (
      <>
        {/* Challenge color legend */}
        <div className="mb-3 flex items-center text-xs text-gray-600">
          <span className="mr-3 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-1"></span> Significant challenge
          </span>
          <span className="mr-3 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span> Moderate challenge
          </span>
          <span className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span> Minor priority
          </span>
        </div>
        
        {/* Challenge items */}
        {challengeItems.map((challenge, idx) => (
          <div key={idx} className={`flex items-start ${idx > 0 ? 'mt-3' : ''}`}>
            <div className={`flex-shrink-0 w-2 h-2 mt-1.5 mr-2 rounded-full ${getChallengeColor(idx)}`}></div>
            <div>{challenge}</div>
          </div>
        ))}
      </>
    );
  };

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
              const domainInfo = Constants.DOMAINS.find((d) => d.id === domain);
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
              {Constants.COST_CATEGORIES.find(
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
              {Constants.FISCAL_IMPACTS.find(
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
    </div>
  );
};

export default PolicyDetailModal;