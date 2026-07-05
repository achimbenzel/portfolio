import type { Project } from "../types/project";
import ProjectCard from "./ProjectCard";

type ProjectGridProps = {
  projects: Project[];
  onReset?: () => void;
};

export default function ProjectGrid({ projects, onReset }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <p>Keine Projekte für diesen Filter gefunden.</p>
        {onReset ? (
          <button className="empty-state-reset" type="button" onClick={onReset}>
            Filter zurücksetzen
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <section className="project-grid" aria-label="Projektübersicht">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  );
}
