import Papa from 'papaparse';
import { Policy, PolicyDomain, DomainMap } from './types';
import { SHEET_ID, SHEETS, DomainId } from './constants';

export async function fetchSheet<T>(sheetName: string): Promise<T[]> {
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
        return Papa.parse<T>(text, {
            header: true,
            skipEmptyLines: true,
            transform: (value) => value.trim(),
        }).data;
    } catch (err) {
        console.error(`Error fetching ${sheetName}:`, err);
        throw err;
    }
}

export async function fetchPolicies(): Promise<Policy[]> {
    return fetchSheet<Policy>(SHEETS.policies);
}

export async function fetchPolicyDomains(): Promise<DomainMap> {
    const domainData = await fetchSheet<PolicyDomain>(SHEETS.policyDomains);
    const domainMap: DomainMap = {};

    domainData.forEach((row) => {
        const domains = row.domain_id
            .split(" ")
            .filter(Boolean)
            .map((domain) => domain.replace(/,/g, "").trim()) as DomainId[];

        domainMap[row.policy_id] = domains;
    });

    return domainMap;
}

export async function fetchPolicyById(policyId: string): Promise<Policy | null> {
    const policies = await fetchPolicies();
    return policies.find(p => p.policy_id === policyId) || null;
}