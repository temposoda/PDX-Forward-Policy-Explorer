'use client';

import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Typography,
  createFilterOptions
} from '@mui/material';
import { DomainId, DOMAINS } from '@/app/lib/constants';

export type DomainFilterMode = "ANY" | "ALL";

interface MultiSelectProps {
  selected: DomainId[];
  onChange: (selected: DomainId[]) => void;
}

interface DomainOption {
  id: string;
  name: string;
  emoji: string;
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
    ? []  // Show empty selection when "all" is selected
    : domainOptions.filter(d => selected.includes(d.id as DomainId));

  // Custom filter to handle emoji search
  const filterOptions = createFilterOptions<DomainOption>({
    stringify: (option) => `${option.emoji} ${option.name}`,
  });

  // Handle selection changes
  const handleChange = (_: any, newValues: DomainOption[]) => {
    // If no values are selected, default to "all"
    if (newValues.length === 0) {
      onChange(["all"]);
      return;
    }

    // Otherwise, use the selected domains
    onChange(newValues.map((item) => item.id as DomainId));
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={domainOptions.filter(d => d.id !== "all")}  // Exclude "all" from options
      value={selectedDomains}
      onChange={handleChange}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props
        return (
          <Box id={`policy-domain-${option.name}`} component="li" key={key} {...optionProps} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 1, fontSize: '1.1rem' }}>{option.emoji}</Typography>
            <Typography>{option.name}</Typography>
          </Box>
        )
      }}
      renderValue={(values, getItemProps) =>
        values.map((option, index) => {
          const { key, ...itemProps } = getItemProps({ index })
          return (
            <Chip
              key={key}
              label={
                <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                  {option.emoji} {option.name}
                </Box>
              }
              {...itemProps}
              size="small"
            />
          )
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          placeholder={selected[0] === "all" ? "Select policy areas..." : ""}
        />
      )}
      slotProps={{
        listbox: { sx: { maxHeight: '300px' } },
      }}
      popupIcon={null}
      clearIcon={null}
      sx={{
        '& .MuiOutlinedInput-root': {
          padding: '3px 8px',
        }
      }}
    />
  );
}