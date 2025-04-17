import { ReadonlyURLSearchParams } from 'next/navigation';
import { DomainId, DomainFilterMode } from './constants';

/**
 * Filter interface for type safety
 */
export interface FilterState {
    domains: DomainId[];
    domainMode: DomainFilterMode;
    cost: string;
    impact: string;
    q: string;
}

/**
 * Type for valid update values: string, array of strings, or null (to remove)
 */
export type UpdateValue = string | string[] | null;

/**
 * Updates URL parameters while preserving existing ones
 */
export function createUpdatedSearchParams(
    searchParams: ReadonlyURLSearchParams,
    updates: Record<string, UpdateValue>
): URLSearchParams {
    const params = new URLSearchParams(searchParams.toString());

    // Process each update
    Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === 'all' || value === '') {
            // Remove parameter completely when reset to default
            params.delete(key);
        } else if (Array.isArray(value)) {
            if (value.length === 0 || (value.length === 1 && value[0] === 'all')) {
                params.delete(key);
            } else {
                params.set(key, value.join(','));
            }
        } else {
            params.set(key, value);
        }
    });

    return params;
}

/**
 * Creates a URL string with updated parameters
 */
export function createUrlWithUpdatedParams(
    currentParams: ReadonlyURLSearchParams,
    updates: Record<string, UpdateValue>,
    basePath: string = '/'
): string {
    const params = createUpdatedSearchParams(currentParams, updates);
    const queryString = params.toString();

    return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Extract filter state from search params
 */
export function getFiltersFromSearchParams(searchParams: ReadonlyURLSearchParams): FilterState {
    return {
        domains: (searchParams.get("domains")?.split(",") as DomainId[]) || ["all"],
        domainMode: (searchParams.get("domainMode") as DomainFilterMode) || "ANY",
        cost: searchParams.get("cost") || "all",
        impact: searchParams.get("impact") || "all",
        q: searchParams.get("q") || "",
    };
}