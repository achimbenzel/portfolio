import { useState } from "react";
import SoftwareIcon from "./SoftwareIcon";
import { MinusIcon, PlusIcon } from "./icons/LucideIcons";

export type ProjectFilter =
  | { type: "all"; value: "All" }
  | { type: "category"; value: string }
  | { type: "tag"; value: string }
  | { type: "software"; value: string };

export type SoftwareFilterOption = {
  name: string;
  icon: string;
};

type FilterBarProps = {
  activeFilter: ProjectFilter;
  categories: string[];
  tags: string[];
  software: SoftwareFilterOption[];
  onFilterChange: (filter: ProjectFilter) => void;
};

function isActive(activeFilter: ProjectFilter, type: ProjectFilter["type"], value: string) {
  return activeFilter.type === type && activeFilter.value === value;
}

export default function FilterBar({
  activeFilter,
  categories,
  tags,
  software,
  onFilterChange,
}: FilterBarProps) {
  const [areTagsOpen, setAreTagsOpen] = useState(
    activeFilter.type === "tag" || activeFilter.type === "software",
  );

  return (
    <section className="filter-bar" aria-label="Projektfilter">
      <div className="filter-group">
        <span className="filter-label">Kategorie</span>
        <button
          className={isActive(activeFilter, "all", "All") ? "filter-chip active" : "filter-chip"}
          data-filter-type="all"
          data-filter-value="All"
          type="button"
          onClick={() => onFilterChange({ type: "all", value: "All" })}
        >
          Alle
        </button>
        {categories.map((category) => (
          <button
            className={
              isActive(activeFilter, "category", category) ? "filter-chip active" : "filter-chip"
            }
            data-filter-type="category"
            data-filter-value={category}
            key={category}
            type="button"
            onClick={() => onFilterChange({ type: "category", value: category })}
          >
            {category}
          </button>
        ))}
        <button
          className={
            areTagsOpen || activeFilter.type === "tag" || activeFilter.type === "software"
              ? "filter-chip filter-toggle active"
              : "filter-chip filter-toggle"
          }
          type="button"
          aria-expanded={areTagsOpen}
          aria-label={areTagsOpen ? "Weitere Filter ausblenden" : "Weitere Filter anzeigen"}
          onClick={() => setAreTagsOpen((isOpen) => !isOpen)}
        >
          {areTagsOpen ? <MinusIcon /> : <PlusIcon />}
          <span>Tags &amp; Software</span>
        </button>
      </div>

      <div
        className={areTagsOpen ? "filter-tags-panel open" : "filter-tags-panel"}
        aria-hidden={!areTagsOpen}
      >
        <div className="filter-tags-inner">
          <div className="filter-group filter-group-details">
            <span className="filter-label">Tags</span>
            <div className="filter-chip-row">
              {tags.map((tag) => (
                <button
                  className={isActive(activeFilter, "tag", tag) ? "filter-chip active" : "filter-chip"}
                  data-filter-type="tag"
                  data-filter-value={tag}
                  key={tag}
                  type="button"
                  tabIndex={areTagsOpen ? 0 : -1}
                  onClick={() => onFilterChange({ type: "tag", value: tag })}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          {software.length > 0 ? (
            <div className="filter-group filter-group-details">
              <span className="filter-label">Software</span>
              <div className="filter-chip-row">
                {software.map((tool) => (
                  <button
                    className={
                      isActive(activeFilter, "software", tool.name)
                        ? "filter-chip filter-chip-icon active"
                        : "filter-chip filter-chip-icon"
                    }
                    data-filter-type="software"
                    data-filter-value={tool.name}
                    key={tool.name}
                    type="button"
                    tabIndex={areTagsOpen ? 0 : -1}
                    onClick={() => onFilterChange({ type: "software", value: tool.name })}
                  >
                    <SoftwareIcon src={tool.icon} name={tool.name} />
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
