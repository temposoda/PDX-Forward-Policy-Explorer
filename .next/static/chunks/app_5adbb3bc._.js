(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_5adbb3bc._.js", {

"[project]/app/lib/constants.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "COST_CATEGORIES": (()=>COST_CATEGORIES),
    "DOMAINS": (()=>DOMAINS),
    "FISCAL_IMPACTS": (()=>FISCAL_IMPACTS),
    "SHEETS": (()=>SHEETS),
    "SHEET_ID": (()=>SHEET_ID),
    "STAKEHOLDER_CATEGORIES": (()=>STAKEHOLDER_CATEGORIES)
});
const COST_CATEGORIES = [
    {
        id: "all",
        name: "All Costs",
        emoji: "🔍"
    },
    {
        id: "none",
        name: "No Cost",
        emoji: "🆓"
    },
    {
        id: "minimal",
        name: "Minimal Cost",
        emoji: "💰"
    },
    {
        id: "moderate",
        name: "Moderate Cost",
        emoji: "💰💰"
    },
    {
        id: "substantial",
        name: "Substantial Cost",
        emoji: "💰💰💰"
    },
    {
        id: "variable",
        name: "Variable Cost",
        emoji: "🎲"
    }
];
const FISCAL_IMPACTS = [
    {
        id: "all",
        name: "All Budgets",
        emoji: "🔍"
    },
    {
        id: "revenue_neutral",
        name: "Revenue Neutral",
        emoji: "⚖️"
    },
    {
        id: "cost_saving",
        name: "Cost Saving",
        emoji: "💎"
    },
    {
        id: "needs_revenue",
        name: "Needs Revenue",
        emoji: "🤌"
    }
];
const DOMAINS = [
    {
        id: "all",
        name: "Policy Areas",
        emoji: "🔍"
    },
    {
        id: "housing",
        name: "Housing",
        emoji: "🏘️"
    },
    {
        id: "environment",
        name: "Environment",
        emoji: "🌱"
    },
    {
        id: "safety",
        name: "Safety",
        emoji: "🛡️"
    },
    {
        id: "democracy",
        name: "Democracy",
        emoji: "🗳️"
    },
    {
        id: "economic-development",
        name: "Economic Development",
        emoji: "📈"
    },
    {
        id: "infrastructure-and-transportation",
        name: "Infrastructure & Transportation",
        emoji: "🚌"
    },
    {
        id: "social-services",
        name: "Social Services",
        emoji: "🤝"
    },
    {
        id: "public-health",
        name: "Public Health",
        emoji: "⚕️"
    }
];
const STAKEHOLDER_CATEGORIES = [];
const SHEET_ID = "1wGJeSwToqQp7Mg-77TYRzBlrTRsoECJg0QUMDXU3Q_4";
const SHEETS = {
    policies: "Policies",
    policyDomains: "Policy_Domains"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/lib/data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchPolicies": (()=>fetchPolicies),
    "fetchPolicyById": (()=>fetchPolicyById),
    "fetchPolicyDomains": (()=>fetchPolicyDomains),
    "fetchSheet": (()=>fetchSheet)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/constants.ts [app-client] (ecmascript)");
;
;
async function fetchSheet(sheetName) {
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHEET_ID"]}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${sheetName}`);
        }
        const text = await response.text();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].parse(text, {
            header: true,
            skipEmptyLines: true,
            transform: (value)=>value.trim()
        }).data;
    } catch (err) {
        console.error(`Error fetching ${sheetName}:`, err);
        throw err;
    }
}
async function fetchPolicies() {
    return fetchSheet(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHEETS"].policies);
}
async function fetchPolicyDomains() {
    const domainData = await fetchSheet(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHEETS"].policyDomains);
    const domainMap = {};
    domainData.forEach((row)=>{
        const domains = row.domain_id.split(" ").filter(Boolean).map((domain)=>domain.replace(/,/g, "").trim());
        domainMap[row.policy_id] = domains;
    });
    return domainMap;
}
async function fetchPolicyById(policyId) {
    const policies = await fetchPolicies();
    return policies.find((p)=>p.policy_id === policyId) || null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/policy/[policyId]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PolicyDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function PolicyDetailPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const policyId = params.policyId;
    const [policy, setPolicy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [policyDomains, setPolicyDomains] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PolicyDetailPage.useEffect": ()=>{
            const loadPolicy = {
                "PolicyDetailPage.useEffect.loadPolicy": async ()=>{
                    try {
                        setLoading(true);
                        const [policyData, domainsData] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPolicyById"])(policyId),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPolicyDomains"])()
                        ]);
                        if (!policyData) {
                            setError('Policy not found');
                            return;
                        }
                        setPolicy(policyData);
                        setPolicyDomains(domainsData[policyId] || []);
                    } catch (err) {
                        setError(err instanceof Error ? err.message : 'Failed to load policy');
                    } finally{
                        setLoading(false);
                    }
                }
            }["PolicyDetailPage.useEffect.loadPolicy"];
            loadPolicy();
        }
    }["PolicyDetailPage.useEffect"], [
        policyId
    ]);
    // Handle domain clicks
    const handleDomainClick = (domain)=>{
        router.push(`/?domains=${domain}`);
    };
    // Copy link to policy
    const copyPolicyLink = ()=>{
        navigator.clipboard.writeText(window.location.href).then(()=>{
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        }).catch((err)=>console.error("Failed to copy URL: ", err));
    };
    // Helper function for domain colors
    const getDomainColor = (domain)=>{
        const colors = {
            housing: "bg-pink-100 text-pink-800",
            environment: "bg-green-100 text-green-800",
            safety: "bg-yellow-100 text-yellow-800",
            democracy: "bg-blue-100 text-blue-800",
            "economic-development": "bg-orange-100 text-orange-800",
            "infrastructure-and-transportation": "bg-indigo-100 text-indigo-800",
            "social-services": "bg-purple-100 text-purple-800",
            "public-health": "bg-red-100 text-red-800"
        };
        return colors[domain] || "bg-gray-100 text-gray-800";
    };
    // Helper function to render stakeholders with categories
    const renderStakeholders = (stakeholdersString)=>{
        if (!stakeholdersString) return null;
        // Create a more robust regex pattern for categories
        const categoryMatches = stakeholdersString.match(/[A-Z][a-zA-Z\s&amp;]+:/g) || [];
        if (categoryMatches.length === 0) {
            // Simple fallback if no categories detected
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: stakeholdersString
            }, void 0, false, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 91,
                columnNumber: 20
            }, this);
        }
        // Create segments by splitting at each category
        const categorySegments = [];
        categoryMatches.forEach((categoryMatch, index)=>{
            const categoryName = categoryMatch.slice(0, -1); // Remove the colon
            // Find start and end positions
            const startPos = stakeholdersString.indexOf(categoryMatch) + categoryMatch.length;
            const endPos = index < categoryMatches.length - 1 ? stakeholdersString.indexOf(categoryMatches[index + 1]) : stakeholdersString.length;
            // Extract content
            const content = stakeholdersString.substring(startPos, endPos).trim();
            // Split by semicolons
            const stakeholdersList = content.split(';').map((item)=>item.trim()).filter(Boolean).map((item)=>item.endsWith(',') ? item.slice(0, -1) : item); // Remove trailing commas
            categorySegments.push({
                name: categoryName,
                stakeholders: stakeholdersList
            });
        });
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: categorySegments.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-2 last:mb-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    category.name,
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/policy/[policyId]/page.tsx",
                                lineNumber: 127,
                                columnNumber: 29
                            }, this),
                            ' ',
                            category.stakeholders.join(', ')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 126,
                        columnNumber: 25
                    }, this)
                }, category.name, false, {
                    fileName: "[project]/app/policy/[policyId]/page.tsx",
                    lineNumber: 125,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/policy/[policyId]/page.tsx",
            lineNumber: 123,
            columnNumber: 13
        }, this);
    };
    // Helper function to render implementation challenges with colors
    const renderChallenges = (challenges)=>{
        if (!challenges) return null;
        // Regex to extract severity descriptor from strings like "[significant] Whatever: ..."
        const severityRegex = /\[([^\]]+)\]/;
        // Define challenge severity colors
        const getChallengeColor = (challenge)=>{
            const colors = {
                significant: "bg-red-500",
                major: "bg-orange-500",
                moderate: "bg-yellow-500",
                minor: "bg-blue-500",
                "": "bg-blue-500"
            };
            // Test function to demonstrate usage
            function extractSeverity(input) {
                const match = input.match(severityRegex);
                return match ? match[1] : "";
            }
            const severity = extractSeverity(challenge);
            return colors[severity];
        };
        function stripSeverityTag(input) {
            return input.replace(severityRegex, '').trim();
        }
        const challengeItems = challenges.split(';').map((c)=>({
                color: getChallengeColor(c),
                text: stripSeverityTag(c)
            })).filter(Boolean);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 flex items-center text-xs text-gray-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mr-3 flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block w-2 h-2 rounded-full bg-red-500 mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/app/policy/[policyId]/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 25
                                }, this),
                                " Significant"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/policy/[policyId]/page.tsx",
                            lineNumber: 178,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mr-3 flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/app/policy/[policyId]/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 25
                                }, this),
                                " Moderate"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/policy/[policyId]/page.tsx",
                            lineNumber: 181,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/app/policy/[policyId]/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 25
                                }, this),
                                " Minor"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/policy/[policyId]/page.tsx",
                            lineNumber: 184,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/policy/[policyId]/page.tsx",
                    lineNumber: 177,
                    columnNumber: 17
                }, this),
                challengeItems.map((data, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-start ${idx > 0 ? 'mt-3' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex-shrink-0 w-2 h-2 mt-1.5 mr-2 rounded-full ${data.color}`
                            }, void 0, false, {
                                fileName: "[project]/app/policy/[policyId]/page.tsx",
                                lineNumber: 192,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: data.text
                            }, void 0, false, {
                                fileName: "[project]/app/policy/[policyId]/page.tsx",
                                lineNumber: 193,
                                columnNumber: 25
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 191,
                        columnNumber: 21
                    }, this))
            ]
        }, void 0, true);
    };
    const renderEvidenceBase = (evidenceBase)=>{
        if (!evidenceBase) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "prose prose-sm max-w-none prose-a:text-blue-600 prose-a:underline",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                components: {
                    // Customize link rendering
                    a: ({ node, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            ...props,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "text-blue-600 hover:text-blue-800 underline"
                        }, void 0, false, {
                            fileName: "[project]/app/policy/[policyId]/page.tsx",
                            lineNumber: 209,
                            columnNumber: 29
                        }, void 0)
                },
                children: evidenceBase
            }, void 0, false, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 205,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/policy/[policyId]/page.tsx",
            lineNumber: 204,
            columnNumber: 13
        }, this);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[200px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg",
                children: "Loading policy details..."
            }, void 0, false, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 227,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/policy/[policyId]/page.tsx",
            lineNumber: 226,
            columnNumber: 13
        }, this);
    }
    if (error || !policy) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 mx-auto max-w-2xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 border border-red-200 rounded-lg p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-red-800 font-semibold mb-2",
                        children: "Error Loading Policy"
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 236,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-600",
                        children: error || "Policy not found"
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 239,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/'),
                        className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
                        children: "Back to Policies"
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 240,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 235,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/policy/[policyId]/page.tsx",
            lineNumber: 234,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>router.push('/'),
                className: "mb-4 text-blue-600 hover:text-blue-800 flex items-center",
                children: "← Back to Policies"
            }, void 0, false, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 254,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: copyPolicyLink,
                className: "absolute top-4 right-4 text-gray-500 hover:text-gray-700 flex items-center",
                "aria-label": "Share policy link",
                children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 18,
                            className: "mr-1 text-green-600"
                        }, void 0, false, {
                            fileName: "[project]/app/policy/[policyId]/page.tsx",
                            lineNumber: 269,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-green-600",
                            children: "Copied!"
                        }, void 0, false, {
                            fileName: "[project]/app/policy/[policyId]/page.tsx",
                            lineNumber: 270,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                            size: 18,
                            className: "mr-1"
                        }, void 0, false, {
                            fileName: "[project]/app/policy/[policyId]/page.tsx",
                            lineNumber: 274,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm",
                            children: "Share"
                        }, void 0, false, {
                            fileName: "[project]/app/policy/[policyId]/page.tsx",
                            lineNumber: 275,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 262,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-semibold mb-4 pr-32",
                children: policy.title
            }, void 0, false, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 281,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600 mb-6",
                children: policy.summary || policy.description || ""
            }, void 0, false, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 283,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-medium mb-2",
                        children: "Policy Areas:"
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 289,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: policyDomains.map((domain)=>{
                            const domainInfo = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"].find((d)=>d.id === domain);
                            return domainInfo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `px-2 py-1 rounded text-sm ${getDomainColor(domain)} hover:opacity-80 cursor-pointer`,
                                onClick: ()=>handleDomainClick(domain),
                                children: [
                                    domainInfo.emoji,
                                    " ",
                                    domain.replace(/-/g, " ").replace(/\b\w/g, (l)=>l.toUpperCase())
                                ]
                            }, domain, true, {
                                fileName: "[project]/app/policy/[policyId]/page.tsx",
                                lineNumber: 294,
                                columnNumber: 29
                            }, this) : null;
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 290,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 288,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium mb-2",
                                children: "Implementation Cost:"
                            }, void 0, false, {
                                fileName: "[project]/app/policy/[policyId]/page.tsx",
                                lineNumber: 309,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COST_CATEGORIES"].find((c)=>c.id === policy.implementation_cost_category)?.emoji || "🤔",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2",
                                        children: policy.implementation_cost_category.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase())
                                    }, void 0, false, {
                                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                                        lineNumber: 314,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/policy/[policyId]/page.tsx",
                                lineNumber: 310,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 308,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium mb-2",
                                children: "Impact on City Budget:"
                            }, void 0, false, {
                                fileName: "[project]/app/policy/[policyId]/page.tsx",
                                lineNumber: 322,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FISCAL_IMPACTS"].find((f)=>f.id === policy.fiscal_impact_category)?.emoji || "🤔",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2",
                                        children: policy.fiscal_impact_category.replace(/_/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase())
                                    }, void 0, false, {
                                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/policy/[policyId]/page.tsx",
                                lineNumber: 323,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 321,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 307,
                columnNumber: 13
            }, this),
            policy.evidence_base && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-medium mb-2",
                        children: "Evidence Base"
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 338,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 border border-gray-200 p-4 rounded-md",
                        children: renderEvidenceBase(policy.evidence_base)
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 339,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 337,
                columnNumber: 17
            }, this),
            policy.stakeholders && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-medium mb-2",
                        children: "Key Stakeholders"
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 348,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 border border-gray-200 p-4 rounded-md",
                        children: renderStakeholders(policy.stakeholders)
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 349,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 347,
                columnNumber: 17
            }, this),
            policy.implementation_challenges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-medium mb-2",
                        children: "Implementation Challenges"
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 358,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 border border-gray-200 p-4 rounded-md",
                        children: renderChallenges(policy.implementation_challenges)
                    }, void 0, false, {
                        fileName: "[project]/app/policy/[policyId]/page.tsx",
                        lineNumber: 359,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/policy/[policyId]/page.tsx",
                lineNumber: 357,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/policy/[policyId]/page.tsx",
        lineNumber: 252,
        columnNumber: 9
    }, this);
}
_s(PolicyDetailPage, "mbRtTarr8HvepprKNY5qaU2VVxs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PolicyDetailPage;
var _c;
__turbopack_context__.k.register(_c, "PolicyDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_5adbb3bc._.js.map