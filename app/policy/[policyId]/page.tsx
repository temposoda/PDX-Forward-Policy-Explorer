export const dynamic = 'force-static';
import { fetchPolicyById, fetchPolicyDomains, fetchPolicies } from '@/app/lib/data';
import PolicyDetailPage from '@/app/components/PolicyDetailPage';
import PageTransition from '@/app/components/PageTransition';

export async function generateStaticParams() {
    const policies = await fetchPolicies();
    return policies.map((policy) => ({
        policyId: policy.policy_id,
    }));
}

export default async function Page({ params }: any) {
    const { policyId } = await params
    // Fetch data at build time
    const policy = await fetchPolicyById(policyId);
    const policyDomains = await fetchPolicyDomains();
    if (!policy) return <div>loading...</div>
    return (
        <PageTransition>
            <PolicyDetailPage
                policy={policy}
                policyDomains={policyDomains[policyId] || []}
            />
        </PageTransition>
    );
}