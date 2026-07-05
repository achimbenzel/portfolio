import { useMemo, useState } from "react";
import FilterBar, { type ProjectFilter } from "../components/FilterBar";
import Header from "../components/Header";
import ProjectGrid from "../components/ProjectGrid";
import { projects } from "../data/projects.generated";
import type { Project, ProjectSoftware } from "../types/project";

type ProjectSort = "popularity" | "date";

const categoryOrder = ["Brand Identity", "Motion Design / Animation", "3D Design", "AI"];

const extraSoftwareFilters: ProjectSoftware[] = [
  {
    name: "FL Studio",
    icon: "/Assets/software/fl-studio.png",
  },
  {
    name: "Miro",
    icon: "/Assets/software/miro.svg",
  },
  {
    name: "Claude",
    icon: "/Assets/software/claude.svg",
  },
  {
    name: "ChatGPT",
    icon: "/Assets/software/chatgpt.svg",
  },
  {
    name: "Codex",
    icon: "/Assets/software/codex.svg",
  },
];

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function uniqueSoftwareOptions(values: ProjectSoftware[]) {
  const options = new Map<string, ProjectSoftware>();

  for (const value of values) {
    if (!options.has(value.name)) {
      options.set(value.name, value);
    }
  }

  return Array.from(options.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function byNewest(projectA: Project, projectB: Project) {
  return (
    projectB.date.year - projectA.date.year ||
    projectB.date.month - projectA.date.month ||
    projectB.popularity - projectA.popularity
  );
}

function sortProjects(projectList: Project[], sortOption: ProjectSort) {
  return [...projectList].sort((projectA, projectB) => {
    if (sortOption === "date") {
      return byNewest(projectA, projectB);
    }

    return projectB.popularity - projectA.popularity || byNewest(projectA, projectB);
  });
}

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>({
    type: "all",
    value: "All",
  });
  const [sortOption, setSortOption] = useState<ProjectSort>("popularity");

  const categories = useMemo(() => {
    const projectCategories = uniqueSorted(projects.flatMap((project) => project.categories));
    const orderedCategories = categoryOrder.filter((category) =>
      projectCategories.includes(category),
    );
    const customCategories = projectCategories.filter(
      (category) => !categoryOrder.includes(category),
    );

    return [...orderedCategories, ...customCategories];
  }, []);
  const tags = useMemo(
    () => uniqueSorted(projects.flatMap((project) => project.tags)),
    [],
  );
  const software = useMemo(
    () => uniqueSoftwareOptions([...projects.flatMap((project) => project.software), ...extraSoftwareFilters]),
    [],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter.type === "category") {
      return projects.filter((project) => project.categories.includes(activeFilter.value));
    }

    if (activeFilter.type === "tag") {
      return projects.filter((project) => project.tags.includes(activeFilter.value));
    }

    if (activeFilter.type === "software") {
      return projects.filter((project) =>
        project.software.some((tool) => tool.name === activeFilter.value),
      );
    }

    return projects;
  }, [activeFilter]);

  const sortedProjects = useMemo(
    () => sortProjects(filteredProjects, sortOption),
    [filteredProjects, sortOption],
  );

  return (
    <main className="home-page">
      <Header />
      <FilterBar
        activeFilter={activeFilter}
        categories={categories}
        software={software}
        tags={tags}
        onFilterChange={setActiveFilter}
      />
      <div className="result-row">
        <span>Projekte</span>
        <div className="sort-control" aria-label="Projekte sortieren">
          <button
            className={sortOption === "popularity" ? "active" : ""}
            type="button"
            onClick={() => setSortOption("popularity")}
          >
            Beliebtheit
          </button>
          <button
            className={sortOption === "date" ? "active" : ""}
            type="button"
            onClick={() => setSortOption("date")}
          >
            Datum
          </button>
        </div>
      </div>
      <ProjectGrid projects={sortedProjects} />
    </main>
  );
}
