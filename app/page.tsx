export const dynamic = 'force-static';  // Force static generation

import { fetchPolicies, fetchPolicyDomains } from '@/app/lib/data';
import PolicyList from '@/app/components/PolicyList';
import PageTransition from './components/PageTransition';

export default async function Home() {
  // Fetch at build time
  const policies = await fetchPolicies();
  const policyDomains = await fetchPolicyDomains();

  return (
    <PageTransition>
      <div>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">PDX Forward Policy Explorer</h1>
          <p className="text-gray-600">
            Explore and filter proposed policies by policy area, expected cost,
            and budget impact.
          </p>
        </header>

        {/* Pass data to client component for filtering/interaction */}
        <PolicyList
          policies={policies}
          policyDomains={policyDomains}
        />
      </div>
    </PageTransition>
  );
}