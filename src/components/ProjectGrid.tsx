import type { Project } from "../types/project";
import ProjectCard from "./ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <p>Keine Projekte fuer diesen Filter gefunden.</p>
      </div>
    );
  }

  return (
    <section className="project-grid" aria-label="Projektuebersicht">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  );
}
