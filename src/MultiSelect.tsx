import React, { useState, useEffect, useRef } from "react";

export type DomainFilterMode = "ANY" | "ALL";
import { DomainId, DOMAINS } from "./App";
// Add new multi-select dropdown component
interface MultiSelectProps {
  selected: DomainId[];
  onChange: (selected: DomainId[]) => void;
}

const DomainMultiSelect: React.FC<MultiSelectProps> = ({
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[200px] text-left rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
      >
        {selectedDomains.length === 1 ? (
          <span>
            {selectedDomains[0].emoji} {selectedDomains[0].name}
          </span>
        ) : (
          <span>{selectedDomains.length} areas selected</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-[200px] rounded-md bg-white shadow-lg border border-gray-200">
          <div className="py-1">
            {DOMAINS.map((domain) => (
              <div
                key={domain.id}
                onClick={() => toggle(domain.id)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                  selected.includes(domain.id) ? "bg-blue-50" : ""
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

export default DomainMultiSelect;
