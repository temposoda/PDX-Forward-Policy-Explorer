export const dynamic = 'force-static';  // Force static generation

import { fetchPolicies, fetchPolicyDomains } from '@/app/lib/data';
import PolicyList from '@/app/components/PolicyList';
import PageTransition from './components/PageTransition';
import { Typography, Box } from '@mui/material';

export default async function Home() {
  // Fetch at build time
  const policies = await fetchPolicies();
  const policyDomains = await fetchPolicyDomains();

  return (
    <PageTransition>
      <Box>
        <Box component="header" sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 1.5,
              fontWeight: 'bold',
              color: 'text.primary',
              letterSpacing: '-0.025em'
            }}
          >
            PDX Forward Policy Explorer
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 'md',
              lineHeight: 1.6
            }}
          >
            Explore and filter proposed policies by policy area, expected cost,
            and budget impact.
          </Typography>
        </Box>

        {/* Pass data to client component for filtering/interaction */}
        <PolicyList
          policies={policies}
          policyDomains={policyDomains}
        />
      </Box>
    </PageTransition>
  );
}