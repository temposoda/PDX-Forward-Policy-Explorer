import { DomainId } from './constants';

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

export interface PolicyDomain {
    policy_id: string;
    domain_id: string;
}

export type DomainMap = {
    [key: string]: DomainId[];
};

export type DomainFilterMode = "ANY" | "ALL";

export interface CategoryOption {
    id: string;
    name: string;
    emoji: string;
}