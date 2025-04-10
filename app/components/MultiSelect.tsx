'use client';

import React, { useState, useEffect, useRef } from "react";
import { DomainId, DOMAINS } from "@/app/lib/constants";
import { ChevronDown } from "lucide-react";

export type DomainFilterMode = "ANY" | "ALL";

interface MultiSelectProps {
  selected: DomainId[];
  onChange: (selected: DomainId[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white flex items-center justify-between"
      >
        <div className="flex-grow truncate flex items-center">
          {selectedDomains.length === 1 ? (
            <span>
              {selectedDomains[0].emoji} {selectedDomains[0].name}
            </span>
          ) : (
            <div className="flex items-center">
              <div className="flex mr-2">
                {/* Show up to 3 emoji icons */}
                {selectedDomains.slice(0, 3).map((domain, index) => (
                  <span key={domain.id} className={index > 0 ? "-ml-1" : ""}>
                    {domain.emoji}
                  </span>
                ))}
                {selectedDomains.length > 3 && (
                  <span className="ml-1 text-xs text-gray-500">+{selectedDomains.length - 3}</span>
                )}
              </div>
              <span>{selectedDomains.length} areas selected</span>
            </div>
          )}
        </div>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto">
          <div className="py-1">
            {DOMAINS.map((domain) => (
              <div
                key={domain.id}
                onClick={() => toggle(domain.id)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${selected.includes(domain.id) ? "bg-blue-50" : ""
                  }`}
              >
                <span>
                  {domain.emoji} {domain.name}
                </span>
                {selected.includes(domain.id) && (
                  <span className="text-blue-600">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;