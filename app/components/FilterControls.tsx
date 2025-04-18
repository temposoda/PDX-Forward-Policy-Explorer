'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { createUrlWithUpdatedParams, getFiltersFromSearchParams } from '@/app/lib/navigation';
import { COST_CATEGORIES, FISCAL_IMPACTS, DOMAINS } from '@/app/lib/constants';
import { MultiSelect } from './MultiSelect';
import {
    Box,
    Input,
    Stack,
    Portal,
    Select,
    Card,
    SegmentGroup,
    Button,
    Flex,
    Badge,
    Grid,
    GridItem,
    HStack,
    Text,
    Spacer,
    CloseButton,
    Field,
    createListCollection
} from '@chakra-ui/react';
import { RepeatIcon } from 'lucide-react';

export default function FilterControls() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filters = getFiltersFromSearchParams(searchParams);

    // State for filters
    const [selectedDomains, setSelectedDomains] = useState(filters.domains);
    const [domainFilterMode, setDomainFilterMode] = useState(filters.domainMode);
    const [selectedCost, setSelectedCost] = useState([filters.cost]);
    const [selectedImpact, setSelectedImpact] = useState([filters.impact]);
    const [searchQuery, setSearchQuery] = useState(filters.q);

    // Update URL when filters change
    useEffect(() => {
        const newUrl = createUrlWithUpdatedParams(
            searchParams,
            {
                domains: selectedDomains[0] === "all" ? null : selectedDomains,
                domainMode: selectedDomains[0] === "all" ? null : domainFilterMode,
                cost: selectedCost?.[0] === "all" ? null : selectedCost,
                impact: selectedImpact?.[0] === "all" ? null : selectedImpact,
                q: searchQuery || null
            },
            pathname
        );

        router.push(newUrl);
    }, [selectedDomains, domainFilterMode, selectedCost, selectedImpact, searchQuery, router, pathname, searchParams]);

    // Reset filters
    const resetFilters = () => {
        setSelectedDomains(["all"]);
        setDomainFilterMode("ANY");
        setSelectedCost(["all"]);
        setSelectedImpact(["all"]);
        setSearchQuery("");
        router.push(pathname);
    };

    // Create collections for Select components
    const costCollection = createListCollection({
        items: COST_CATEGORIES.map(category => ({
            label: `${category.emoji} ${category.name}`,
            value: category.id,
            emoji: category.emoji,
            name: category.name
        }))
    });

    const impactCollection = createListCollection({
        items: FISCAL_IMPACTS.map(impact => ({
            label: `${impact.emoji} ${impact.name}`,
            value: impact.id,
            emoji: impact.emoji,
            name: impact.name
        }))
    });


    const renderActiveFilters = () => {
        if (selectedDomains[0] === "all" &&
            selectedCost?.[0] === "all" &&
            selectedImpact?.[0] === "all" &&
            !searchQuery) {
            return null; // No filters active
        }

        return (
            <Flex wrap="wrap" gap="2" mt="4">
                {selectedDomains[0] !== "all" && selectedDomains.map(domain => {
                    const domainInfo = DOMAINS.find((d) => d.id === domain);
                    return domainInfo ? (
                        <Badge
                            key={domain}
                            colorScheme="blue"
                            paddingStart="2"
                            paddingEnd="1"
                            paddingY="1"
                            borderRadius="full"
                        >
                            <HStack gap="1">
                                <Text>{domainInfo.emoji} {domainInfo.name}</Text>
                                <CloseButton
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const newDomains = selectedDomains.filter(d => d !== domain);
                                        setSelectedDomains(newDomains.length ? newDomains : ["all"]);
                                    }}
                                    aria-label={`Remove ${domainInfo.name} filter`}
                                />
                            </HStack>
                        </Badge>
                    ) : null;
                })}

                {selectedCost?.[0] !== "all" && (
                    <Badge
                        colorScheme="blue"
                        paddingStart="2"
                        paddingEnd="1"
                        paddingY="1"
                        borderRadius="full"
                    >
                        <HStack gap="1">
                            <Text>
                                {COST_CATEGORIES.find(c => c.id === selectedCost?.[0])?.emoji}{' '}
                                {COST_CATEGORIES.find(c => c.id === selectedCost?.[0])?.name}
                            </Text>
                            <CloseButton
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCost(["all"]);
                                }}
                                aria-label="Remove cost filter"
                            />
                        </HStack>
                    </Badge>
                )}

                {selectedImpact?.[0] !== "all" && (
                    <Badge
                        colorScheme="blue"
                        paddingStart="2"
                        paddingEnd="1"
                        paddingY="1"
                        borderRadius="full"
                    >
                        <HStack gap="1">
                            <Text>
                                {FISCAL_IMPACTS.find(f => f.id === selectedImpact?.[0])?.emoji}{' '}
                                {FISCAL_IMPACTS.find(f => f.id === selectedImpact?.[0])?.name}
                            </Text>
                            <CloseButton
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedImpact(["all"]);
                                }}
                                aria-label="Remove budget impact filter"
                            />
                        </HStack>
                    </Badge>
                )}

                {searchQuery && (
                    <Badge
                        colorScheme="blue"
                        paddingStart="2"
                        paddingEnd="1"
                        paddingY="1"
                        borderRadius="full"
                    >
                        <HStack gap="1">
                            <Text>🔍 &ldquo;{searchQuery}&rdquo;</Text>
                            <CloseButton
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSearchQuery("");
                                }}
                                aria-label="Clear search"
                            />
                        </HStack>
                    </Badge>
                )}
            </Flex>
        );
    };

    return (
        <Box mb="8">
            {/* Search */}
            <Input
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="lg"
                mb="4"
            />

            <Card.Root variant="outline" mb="4">
                <Card.Body>
                    <Stack gap="6">
                        {/* Policy Areas Section */}
                        <Box>
                            <Field.Root>
                                <Field.Label fontWeight="medium" fontSize="md">Policy Areas:</Field.Label>
                                <Flex alignItems="center" flexWrap="wrap" gap="3">
                                    <SegmentGroup.Root
                                        value={domainFilterMode}
                                        onValueChange={(e) => setDomainFilterMode(e.value as any)}
                                        colorPalette="blue"
                                        size="sm"
                                    >
                                        <SegmentGroup.Indicator />
                                        <SegmentGroup.Items items={["ANY", "ALL"]} />
                                    </SegmentGroup.Root>

                                    <Text fontSize="sm" fontWeight="medium" color="gray.600">of these</Text>

                                    <Box flex="1">
                                        <MultiSelect
                                            selected={selectedDomains}
                                            onChange={setSelectedDomains}
                                        />
                                    </Box>
                                </Flex>
                            </Field.Root>
                        </Box>

                        {/* Cost and Impact in 2 columns on larger screens */}
                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="6">
                            {/* Cost Filter using new Select pattern */}
                            <GridItem>
                                <Select.Root
                                    value={selectedCost}
                                    onValueChange={(details) => setSelectedCost(details.value)}
                                    collection={costCollection}
                                >
                                    <Select.Label fontWeight="medium" fontSize="md">Implementation Cost:</Select.Label>
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="Select cost category" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {costCollection.items.map((category) => (
                                                    <Select.Item item={category} key={category.value}>
                                                        {category.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                            </GridItem>

                            {/* Impact Filter using new Select pattern */}
                            <GridItem>
                                <Select.Root
                                    value={selectedImpact}
                                    onValueChange={(details) => setSelectedImpact(details.value)}
                                    collection={impactCollection}
                                >
                                    <Select.Label fontWeight="medium" fontSize="md">Budget Impact:</Select.Label>
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="Select budget impact" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {impactCollection.items.map((impact) => (
                                                    <Select.Item item={impact} key={impact.value}>
                                                        {impact.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                            </GridItem>
                        </Grid>

                        <Flex wrap="wrap" justify="space-between" align="center">
                            {renderActiveFilters()}
                            <Spacer />
                            {/* Reset button */}
                            {(selectedDomains[0] !== "all" ||
                                selectedCost?.[0] !== "all" ||
                                selectedImpact?.[0] !== "all" ||
                                searchQuery !== "") && (
                                    <Button
                                        variant="outline"
                                        colorScheme="red"
                                        size="sm"
                                        onClick={resetFilters}
                                        ml="auto"
                                        mt={{ base: 4, md: 0 }}
                                    >
                                        <RepeatIcon /> Reset Filters
                                    </Button>
                                )}
                        </Flex>
                    </Stack>
                </Card.Body>
            </Card.Root>
        </Box>
    );
}