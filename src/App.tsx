import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import _ from "lodash";
import DomainMultiSelect, { type DomainFilterMode } from "./MultiSelect";
import { Analytics } from "@vercel/analytics/react";
import PolicyDetailModal, { Policy } from "./PolicyDetailModal";
import { DOMAINS, DomainId, FISCAL_IMPACTS, COST_CATEGORIES, CostCategory, DomainMap, FiscalImpact } from "./lib/constants";

const SHEET_ID = "1wGJeSwToqQp7Mg-77TYRzBlrTRsoECJg0QUMDXU3Q_4";

const SHEETS = {
  policies: "Policies",
  policyDomains: "Policy_Domains",
} as const;

type SheetName = (typeof SHEETS)[keyof typeof SHEETS];


interface HighlightedTextProps {
  text: string;
  searchQuery: string;
}

// Helper component to highlight matched text
const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  searchQuery,
}) => {
  if (!searchQuery || !text) return <>{text}</>;

  const parts = text.split(
    new RegExp(`(${_.escapeRegExp(searchQuery)})`, "gi")
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

const PolicyExplorer: React.FC = () => {
  // Parse initial state from URL parameters
  const params = new URLSearchParams(window.location.search);
  const initialDomains = (params.get("domains")?.split(",") as DomainId[]) || [
    "all",
  ];
  const initialDomainMode =
    (params.get("domainMode") as DomainFilterMode) || "ANY";

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [policyDomains, setPolicyDomains] = useState<DomainMap>({});
  const [selectedDomains, setSelectedDomains] =
    useState<DomainId[]>(initialDomains);
  const [domainFilterMode, setDomainFilterMode] =
    useState<DomainFilterMode>(initialDomainMode);
  const [selectedCost, setSelectedCost] = useState<CostCategory>(
    (params.get("cost") as CostCategory) || "all"
  );
  const [selectedImpact, setSelectedImpact] = useState<FiscalImpact>(
    (params.get("impact") as FiscalImpact) || "all"
  );
  const [searchQuery, setSearchQuery] = useState(params.get("q") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New state for modal
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [modalOpen, setModalOpen] = useState(false);


  const [pendingPolicyId, setPendingPolicyId] = useState<string | null>(null);

  // On component mount, capture the policy ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const policyId = params.get("policy");
    console.log(policyId)
    if (policyId) {
      setPendingPolicyId(policyId);
    }
  }, []); // Empty dependency array means this runs once on mount

  // After policies load, check if we have a pending policy to open
  useEffect(() => {
    console.log({ pendingPolicyId, policies })

    if (pendingPolicyId && policies.length > 0) {
      const policy = policies.find(p => p.policy_id === pendingPolicyId);
      if (policy) {
        setSelectedPolicy(policy);
        setModalOpen(true);
        setPendingPolicyId(null); // Clear the pending ID
      }
    }
  }, [pendingPolicyId, policies]);

  // Modal handlers
  const openPolicyDetails = (policy: Policy) => {
    setSelectedPolicy(policy);
    setModalOpen(true);

    // Update URL with policy ID
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("policy", policy.policy_id);

    // Preserve existing filters if present
    if (selectedDomains[0] !== "all") {
      currentParams.set("domains", selectedDomains.join(","));
      currentParams.set("domainMode", domainFilterMode);
    }
    if (selectedCost !== "all") currentParams.set("cost", selectedCost);
    if (selectedImpact !== "all") currentParams.set("impact", selectedImpact);
    if (searchQuery) currentParams.set("q", searchQuery);

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const closeModal = () => {
    setModalOpen(false);

    // Remove policy parameter from URL but keep filters
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete("policy");

    const newUrl = currentParams.toString()
      ? `${window.location.pathname}?${currentParams.toString()}`
      : window.location.pathname;

    window.history.pushState({}, "", newUrl);
  };

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
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [
    selectedDomains,
    domainFilterMode,
    selectedCost,
    selectedImpact,
    searchQuery,
  ]);

  useEffect(() => {
    const fetchSheet = async (sheetName: SheetName) => {
      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
            sheetName
          )}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${sheetName}`);
        }

        const text = await response.text();
        return Papa.parse<Policy | PolicyDomain>(text, {
          header: true,
          skipEmptyLines: true,
          transform: (value) => value.trim(),
        }).data;
      } catch (err) {
        console.error(`Error fetching ${sheetName}:`, err);
        throw err;
      }
    };

    const loadData = async () => {
      try {
        setLoading(true);
        const [policiesData, domainData] = await Promise.all([
          fetchSheet(SHEETS.policies) as Promise<Policy[]>,
          fetchSheet(SHEETS.policyDomains) as Promise<PolicyDomain[]>,
        ]);

        const domainMap: DomainMap = {};
        domainData.forEach((row) => {
          const domains = row.domain_id
            .split(" ")
            .filter(Boolean)
            .map((domain) => domain.replace(/,/g, "").trim()) as DomainId[];
          domainMap[row.policy_id] = domains;
        });

        setPolicies(policiesData);
        setPolicyDomains(domainMap);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load policy data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredPolicies = React.useMemo(() => {
    return policies.filter((policy) => {
      const matchesCost =
        selectedCost === "all" ||
        policy.implementation_cost_category === selectedCost;
      const matchesImpact =
        selectedImpact === "all" ||
        policy.fiscal_impact_category === selectedImpact;

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
  }, [
    policies,
    policyDomains,
    selectedDomains,
    domainFilterMode,
    selectedCost,
    selectedImpact,
    searchQuery,
  ]);

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-lg">Loading Portland policy data...</div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 mx-auto max-w-2xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold mb-2">
            Error Loading Policies
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Analytics />
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">PDX Forward Policy Explorer</h1>
        <p className="text-gray-600">
          Explore and filter proposed policies by policy area, expected cost,
          and budget impact.
        </p>
      </header>

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

        <div className="flex flex-wrap gap-4">
          {/* Domain Filter with AND/OR toggle */}
          <div className="flex gap-2 items-center">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={() => setDomainFilterMode("ANY")}
                className={`px-3 py-2 text-sm ${domainFilterMode === "ANY"
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-gray-100"
                  }`}
              >
                ANY
              </button>
              <button
                onClick={() => setDomainFilterMode("ALL")}
                className={`px-3 py-2 text-sm border-l ${domainFilterMode === "ALL"
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-gray-100"
                  }`}
              >
                ALL
              </button>
            </div>
            <span>of these</span>
            <DomainMultiSelect
              selected={selectedDomains}
              onChange={setSelectedDomains}
            />
          </div>

          <span className="border "> </span>
          {/* Cost Filter */}
          <select
            value={selectedCost}
            onChange={(e) => setSelectedCost(e.target.value as CostCategory)}
            className="block w-[200px] rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {COST_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.emoji || "🤔"} {category.name}
              </option>
            ))}
          </select>

          {/* Impact Filter */}
          <select
            value={selectedImpact}
            onChange={(e) => setSelectedImpact(e.target.value as FiscalImpact)}
            className="block w-[200px] rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {FISCAL_IMPACTS.map((impact) => (
              <option key={impact.id} value={impact.id}>
                {impact.emoji || "🤔"} {impact.name}
              </option>
            ))}
          </select>

          {/* Reset button - updated to include new domain filters */}
          {(selectedDomains[0] !== "all" ||
            selectedCost !== "all" ||
            selectedImpact !== "all" ||
            searchQuery !== "") && (
              <button
                onClick={() => {
                  setSelectedDomains(["all"]);
                  setDomainFilterMode("ANY");
                  setSelectedCost("all");
                  setSelectedImpact("all");
                  setSearchQuery("");
                  window.history.replaceState({}, "", window.location.pathname);
                }}
                className="px-4 py-2 text text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md border border-red-200 transition-colors"
              >
                🔄 Reset Filters
              </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPolicies.map((policy) => (
          <div
            key={policy.policy_id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="p-4">
              {/* Linked title */}
              <h3 className="text-lg font-semibold mb-2">
                <button
                  className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                  onClick={() => openPolicyDetails(policy)}
                >
                  <HighlightedText
                    text={policy.title}
                    searchQuery={searchQuery}
                  />
                </button>
              </h3>

              <p className="text-gray-600 mb-4">
                <HighlightedText
                  text={policy.summary || policy.description || ""}
                  searchQuery={searchQuery}
                />
              </p>

              {/* Domain tags */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-2">Policy Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {(policyDomains[policy.policy_id] || []).map((domain) => {
                    const domainInfo = DOMAINS.find((d) => d.id === domain);
                    return domainInfo ? (
                      <span
                        key={domain}
                        className={`px-2 py-1 rounded text-sm ${getDomainColor(
                          domain
                        )}`}
                      >
                        {domainInfo.emoji}{" "}
                        <HighlightedText
                          text={_.startCase(domain)}
                          searchQuery={searchQuery}
                        />
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Cost and impact tags */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">
                    Implementation Cost:
                  </h4>
                  <div className="flex items-center">
                    {COST_CATEGORIES.find(
                      (c) => c.id === policy.implementation_cost_category
                    )?.emoji || "🤔"}
                    <span className="ml-2 text-sm">
                      {_.startCase(policy.implementation_cost_category)}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 mb-2">
                    Impact on City Budget:
                  </h4>
                  <div className="flex items-center">
                    {FISCAL_IMPACTS.find(
                      (f) => f.id === policy.fiscal_impact_category
                    )?.emoji || "🤔"}
                    <span className="ml-2 text-sm">
                      {_.startCase(policy.fiscal_impact_category)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPolicies.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No policies found matching the selected filters.
        </div>
      )}

      {/* Policy Detail Modal */}
      <PolicyDetailModal
        policy={selectedPolicy}
        isOpen={modalOpen}
        onClose={closeModal}
        policyDomains={policyDomains}
        getDomainColor={getDomainColor}
      />
    </div>
  );
};

export default PolicyExplorer;

// Helper interface that you might need to define
interface PolicyDomain {
  policy_id: string;
  domain_id: string;
}