'use client';

import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Input,
  Stack,
  Text,
  Popover,
  Portal
} from '@chakra-ui/react';
import { ChevronDownIcon } from 'lucide-react';
import { DomainId, DOMAINS } from '@/app/lib/constants';

export type DomainFilterMode = "ANY" | "ALL";

interface MultiSelectProps {
  selected: DomainId[];
  onChange: (selected: DomainId[]) => void;
}

export function MultiSelect({ selected, onChange }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const ref = useRef<HTMLDivElement>(null);


  const toggle = (domainId: DomainId) => {
    if (domainId === "all") {
      onChange(["all"]);
      return;
    }

    const newSelected = selected.includes(domainId)
      ? selected.filter((id) => id !== domainId)
      : [...selected.filter((id) => id !== "all"), domainId];

    onChange(newSelected.length ? newSelected : ["all"]);
  };

  const selectedDomains =
    selected[0] === "all"
      ? [DOMAINS[0]]
      : DOMAINS.filter((d) => selected.includes(d.id));

  const filteredDomains = DOMAINS.filter(domain =>
    domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.emoji.includes(searchTerm)
  );

  return (
    <Box ref={ref} position="relative" w="100%">
      <Popover.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Popover.Trigger asChild>
          <Button
            w="100%"
            justifyContent="space-between"
            textAlign="left"
            h="40px"
            variant="outline"
            size="md"
            className="dropdown-button"
          >
            {selectedDomains.length === 1 ? (
              <Box display="flex" alignItems="center">
                <Text mr="1">{selectedDomains[0].emoji}</Text>
                <Text>{selectedDomains[0].name}</Text>
              </Box>
            ) : (
              <Box display="flex" alignItems="center">
                <Box display="flex" mr="2">
                  {selectedDomains.slice(0, 3).map((domain, index) => (
                    <Text as="span" key={domain.id} ml={index > 0 ? "-1" : "0"}>
                      {domain.emoji}
                    </Text>
                  ))}
                  {selectedDomains.length > 3 && (
                    <Text as="span" fontSize="xs" color="gray.500" ml={1}>
                      +{selectedDomains.length - 3}
                    </Text>
                  )}
                </Box>
                <Text>{selectedDomains.length} areas selected</Text>
              </Box>
            )}
            <Box className="multi-select-chevron">
              <ChevronDownIcon />
            </Box>
          </Button>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content width="100%">
              <Popover.Body p="2">
                <Stack gap="2">
                  <Input
                    placeholder="Search policy areas..."
                    size="sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <Box as="ul"
                    listStyleType="none"
                    maxH="200px"
                    overflowY="auto"
                    p="0"
                    m="0"
                  >
                    {filteredDomains.map((domain) => (
                      <Box
                        as="li"
                        key={domain.id}
                        onClick={() => {
                          toggle(domain.id);
                          if (domain.id === "all") {
                            setIsOpen(false);
                          }
                        }}
                        cursor="pointer"
                        _hover={{ bg: "gray.50" }}
                        borderRadius="md"
                        p="2"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box display="flex" alignItems="center">
                          <Text mr="2">{domain.emoji}</Text>
                          <Text>{domain.name}</Text>
                        </Box>
                        <Checkbox.Root checked={selected.includes(domain.id)}
                          pointerEvents="none">
                          <Checkbox.HiddenInput />
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Label />
                        </Checkbox.Root>

                      </Box>
                    ))}
                    {filteredDomains.length === 0 && (
                      <Box as="li" p="2" color="gray.500">
                        No policy areas found
                      </Box>
                    )}
                  </Box>
                </Stack>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Box>
  );
}