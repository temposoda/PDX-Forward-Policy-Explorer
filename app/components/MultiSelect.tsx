'use client';

import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Typography
} from '@mui/material';
import { DomainId, DOMAINS } from '@/app/lib/constants';

export type DomainFilterMode = "ANY" | "ALL";

interface MultiSelectProps {
  selected: DomainId[];
  onChange: (selected: DomainId[]) => void;
}

export function MultiSelect({ selected, onChange }: MultiSelectProps) {
  // Create domain options from the DOMAINS constant
  const domainOptions = DOMAINS.map(domain => ({
    id: domain.id,
    name: domain.name,
    emoji: domain.emoji
  }));

  // Find selected domains
  const selectedDomains = selected[0] === "all"
    ? [domainOptions[0]]
    : domainOptions.filter(d => selected.includes(d.id as DomainId));

  // Handle selection changes
  const handleChange = (_: any, newValues: any) => {
    // Check if "All" is selected
    if (newValues.some((item: any) => item.id === "all")) {
      onChange(["all"]);
      return;
    }

    // If no values are selected, default to "all"
    if (newValues.length === 0) {
      onChange(["all"]);
      return;
    }

    // Otherwise, use the selected domains
    onChange(newValues.map((item: any) => item.id as DomainId));
  };

  return (
    <Autocomplete
      multiple
      options={domainOptions}
      value={selectedDomains}
      onChange={handleChange}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Typography sx={{ mr: 1 }}>{option.emoji}</Typography>
          <Typography>{option.name}</Typography>
        </Box>
      )}
      renderTags={(values, getTagProps) =>
        values.map((option, index) => (
          <Chip
            label={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                {option.emoji} {option.name}
              </Box>
            }
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          placeholder={selected.length > 0 ? "" : "Select policy areas..."}
        />
      )}
    />
  );
}