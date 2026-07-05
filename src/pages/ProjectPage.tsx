import { Link, useParams } from "react-router-dom";
import ProjectContentRenderer from "../components/ProjectContentRenderer";
import { ChevronLeftIcon, ChevronRightIcon } from "../components/icons/LucideIcons";
import { projects } from "../data/projects.generated";
import type { Project } from "../types/project";
import NotFoundPage from "./NotFoundPage";

const metaLabels: Record<string, string> = {
  projectType: "Typ",
  scope: "Scope",
  industry: "Branche",
};

function byProjectPriority(projectA: Project, projectB: Project) {
  return (
    projectB.popularity - projectA.popularity ||
    projectB.date.year - projectA.date.year ||
    projectB.date.month - projectA.date.month
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((projectItem) => projectItem.slug === slug);

  if (!project) {
    return <NotFoundPage />;
  }

  const orderedProjects = [...projects].sort(byProjectPriority);
  const projectIndex = orderedProjects.findIndex((projectItem) => projectItem.slug === slug);
  const hasProjectSiblings = orderedProjects.length > 1;
  const previousProject = hasProjectSiblings
    ? orderedProjects[(projectIndex - 1 + orderedProjects.length) % orderedProjects.length]
    : null;
  const nextProject = hasProjectSiblings
    ? orderedProjects[(projectIndex + 1) % orderedProjects.length]
    : null;
  const categoryLabel = project.categories.join(", ");

  return (
    <main className="project-page">
      <Link className="back-link" to="/">
        <ChevronLeftIcon />
        Zur&uuml;ck zur &Uuml;bersicht
      </Link>

      <header className="project-hero">
        <div>
          <span className="eyebrow">{categoryLabel}</span>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
        <dl className="project-meta">
          <div>
            <dt>Jahr</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Kunde</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Kategorie</dt>
            <dd>{categoryLabel}</dd>
          </div>
          {Object.entries(project.meta)
            .filter(([key]) => key !== "source")
            .map(([key, value]) => (
              <div key={key}>
                <dt>{metaLabels[key] ?? key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          {project.software.length > 0 ? (
            <div className="project-meta-software">
              <dt>Software</dt>
              <dd>
                <span className="project-software-list">
                  {project.software.map((tool) => (
                    <span className="software-item" key={tool.name} title={tool.name}>
                      <img src={tool.icon} alt="" loading="lazy" />
                      {tool.name}
                    </span>
                  ))}
                </span>
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      <figure className="project-hero-image">
        <img src={project.thumbnail} alt="" />
      </figure>

      <ProjectContentRenderer content={project.content} />

      <nav className="project-end-nav" aria-label="Projekt Navigation">
        {previousProject ? (
          <Link className="project-nav-link" to={`/work/${previousProject.slug}`}>
            <ChevronLeftIcon />
            Zur&uuml;ck / {previousProject.title}
          </Link>
        ) : null}
        <Link className="project-nav-link" to="/">
          &Uuml;bersicht
        </Link>
        {nextProject ? (
          <Link className="project-nav-link project-nav-link-next" to={`/work/${nextProject.slug}`}>
            Weiter / {nextProject.title}
            <ChevronRightIcon />
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
