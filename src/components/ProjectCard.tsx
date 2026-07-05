import { Link } from "react-router-dom";
import Media from "./Media";
import { ArrowUpRightIcon } from "./icons/LucideIcons";
import type { Project } from "../types/project";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const summary = [project.meta.projectType, project.meta.industry]
    .filter(Boolean)
    .join(" · ");
  const categoryLabel = project.categories[0] ?? project.category;

  return (
    <article className="project-card" data-project-card={project.slug}>
      <Link className="project-card-link" to={`/work/${project.slug}`} aria-label={`${project.title} ansehen`}>
        <div className="project-thumb">
          <Media src={project.thumbnail} alt={project.title} label={project.title} />
        </div>
        <div className="project-card-body">
          <div className="project-card-meta">
            <span>{categoryLabel}</span>
            <span>{project.year}</span>
          </div>
          <h2>{project.title}</h2>
          {summary ? <p>{summary}</p> : null}
          {project.tags.length > 0 ? (
            <div className="tag-list" aria-label="Tags">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}
          <span className="project-card-cta">
            Projekt ansehen
            <ArrowUpRightIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}
