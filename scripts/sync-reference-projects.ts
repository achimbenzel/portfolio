import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ProjectContentBlock } from "../src/types/project";

type ReferenceText = {
  title: string;
  client: string;
  year: string;
  scope: string;
  industry: string;
  category: string;
  description: string;
};

type ReferenceProject = {
  slug: string;
  de: ReferenceText;
  images: string[];
  layout: Array<
    | { type: "hero" }
    | { type: "pair"; images: number[] }
    | { type: "full"; image: number }
    | { type: "centerblock" | "cblock"; de: { h: string; p: string } }
  >;
  testimonial?: {
    photo: string;
    de: {
      name: string;
      role: string;
      quote: string;
    };
  };
};

type ProjectImport = {
  folder: string;
  source: string;
  slug: string;
  category: string;
  tags: string[];
  date: {
    month: number;
    year: number;
  };
  popularity: number;
};

const root = process.cwd();
const imports: ProjectImport[] = [
  {
    folder: "01",
    source: "gute-stube",
    slug: "gute-stube-freisen",
    category: "Brand Identity",
    tags: ["Brand Strategy", "Visual Identity", "Print Design"],
    date: { month: 6, year: 2025 },
    popularity: 100,
  },
  {
    folder: "02",
    source: "joeys-picknick",
    slug: "joeys-picknick-mainz",
    category: "Brand Identity",
    tags: ["Brand Strategy", "Digital Design", "Web Design"],
    date: { month: 1, year: 2026 },
    popularity: 90,
  },
  {
    folder: "03",
    source: "logo-types",
    slug: "logo-types",
    category: "3D Design",
    tags: ["Logo Design", "Custom Typography", "3D Logos"],
    date: { month: 12, year: 2025 },
    popularity: 80,
  },
];

function imageBlock(title: string, sourceFile: string): ProjectContentBlock {
  return {
    type: "image",
    src: sourceFile,
    alt: `${title} - ${sourceFile}`,
  };
}

function imageGridBlock(title: string, images: string[]): ProjectContentBlock {
  return {
    type: "imageGrid",
    images: images.map((sourceFile) => ({
      src: sourceFile,
      alt: `${title} - ${sourceFile}`,
    })),
  };
}

function toContentBlocks(project: ReferenceProject): ProjectContentBlock[] {
  const blocks: ProjectContentBlock[] = [];

  for (const block of project.layout) {
    if (block.type === "hero") {
      continue;
    }

    if (block.type === "full") {
      blocks.push(imageBlock(project.de.title, project.images[block.image]));
      continue;
    }

    if (block.type === "pair") {
      blocks.push(imageGridBlock(project.de.title, block.images.map((index) => project.images[index])));
      continue;
    }

    blocks.push({
      type: "text",
      eyebrow: block.type === "cblock" ? "System" : "Konzept",
      headline: block.de.h,
      body: block.de.p || project.de.description,
    });
  }

  if (project.testimonial) {
    blocks.push({
      type: "testimonial",
      photo: project.testimonial.photo,
      name: project.testimonial.de.name,
      role: project.testimonial.de.role,
      quote: project.testimonial.de.quote,
    });
  }

  return blocks;
}

async function syncProject(projectImport: ProjectImport) {
  const sourceDir = path.join(root, "Reference", "projects", projectImport.source);
  const targetDir = path.join(root, "public", "Projects", projectImport.folder);
  const rawProject = await readFile(path.join(sourceDir, "project.json"), "utf8");
  const referenceProject = JSON.parse(rawProject) as ReferenceProject;

  await mkdir(targetDir, { recursive: true });

  const files = await readdir(sourceDir);
  await Promise.all(
    files
      .filter((file) => /\.(webp|png|jpg|jpeg)$/i.test(file))
      .map((file) => cp(path.join(sourceDir, file), path.join(targetDir, file))),
  );

  const project = {
    title: referenceProject.de.title,
    slug: projectImport.slug,
    year: referenceProject.de.year,
    date: projectImport.date,
    popularity: projectImport.popularity,
    client: referenceProject.de.client,
    category: projectImport.category,
    tags: projectImport.tags,
    thumbnail: "hero.webp",
    description: referenceProject.de.description,
    meta: {
      projectType: "Kundenprojekt",
      scope: referenceProject.de.scope,
      industry: referenceProject.de.industry,
    },
    content: toContentBlocks(referenceProject),
  };

  await writeFile(path.join(targetDir, "project.json"), `${JSON.stringify(project, null, 2)}\n`);
}

await Promise.all(imports.map(syncProject));

console.log(`Synced ${imports.length} reference projects.`);
