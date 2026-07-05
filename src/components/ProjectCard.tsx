import { Link } from "react-router-dom";
import type { Project } from "../types/project";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const summary = [project.meta.projectType, project.meta.scope]
    .filter(Boolean)
    .join(" / ");
  const categoryLabel = project.categories.join(", ");

  return (
    <article className="project-card" data-project-card={project.slug}>
      <Link to={`/work/${project.slug}`} aria-label={`${project.title} ansehen`}>
        <div className="project-thumb">
          <img src={project.thumbnail} alt="" loading="lazy" />
        </div>
        <div className="project-card-body">
          <div className="project-card-meta">
            <span>{categoryLabel}</span>
            <span>{project.year}</span>
          </div>
          <h2>{project.title}</h2>
          <p>{summary}</p>
          <div className="tag-list" aria-label="Tags">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
