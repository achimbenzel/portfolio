import type { Project } from "../types/project";
import { projects as generatedProjects } from "./projects.generated";

/**
 * Begriffe, die ausschließlich als Tags verwendet werden dürfen und niemals als
 * eigenständige Kategorie in der Filterleiste auftauchen sollen. Falls ein
 * Projekt sie dennoch als Kategorie führt, werden sie hier zu Tags umgewandelt.
 */
export const TAG_ONLY_TERMS = ["Erkläranimation", "Musikvisualisierung"];

const tagOnlyLookup = new Set(TAG_ONLY_TERMS.map((term) => term.toLowerCase()));

function isTagOnly(value: string) {
  return tagOnlyLookup.has(value.toLowerCase());
}

function normalizeProject(project: Project): Project {
  const keptCategories = project.categories.filter((category) => !isTagOnly(category));
  const demotedCategories = project.categories.filter((category) => isTagOnly(category));

  if (demotedCategories.length === 0) {
    return project;
  }

  // Fallback: never leave a project without any category.
  const categories = keptCategories.length > 0 ? keptCategories : [project.category];
  const tags = Array.from(new Set([...project.tags, ...demotedCategories]));
  const category = isTagOnly(project.category) ? (categories[0] ?? project.category) : project.category;

  return { ...project, categories, category, tags };
}

export const projects: Project[] = generatedProjects.map(normalizeProject);
