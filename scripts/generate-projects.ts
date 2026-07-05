import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  Project,
  ProjectContentBlock,
  ProjectImageBlock,
  ProjectImageGridBlock,
  ProjectSoftware,
  ProjectTestimonialBlock,
  ProjectTextBlock,
  ProjectVideoBlock,
} from "../src/types/project";

type ProjectInput = Omit<Project, "id" | "folder">;

const rootDir = process.cwd();
const projectsDir = path.join(rootDir, "public", "Projects");
const outputFile = path.join(rootDir, "src", "data", "projects.generated.ts");
const requiredFields = [
  "title",
  "slug",
  "year",
  "date",
  "popularity",
  "client",
  "category",
  "tags",
  "thumbnail",
  "description",
  "meta",
  "content",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readString(value: unknown, field: string, folder: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Project ${folder}: "${field}" must be a non-empty string.`);
  }

  return value;
}

function readNumber(value: unknown, field: string, folder: string) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Project ${folder}: "${field}" must be a finite number.`);
  }

  return value;
}

function splitCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqueList(values: string[]) {
  return Array.from(new Set(values));
}

function readStringList(value: unknown, field: string, folder: string) {
  if (typeof value === "string") {
    const list = splitCommaList(value);

    if (list.length === 0) {
      throw new Error(`Project ${folder}: "${field}" must include at least one value.`);
    }

    return list;
  }

  if (Array.isArray(value)) {
    const list = value.flatMap((item, index) => {
      if (typeof item !== "string") {
        throw new Error(`Project ${folder}: "${field}[${index}]" must be a string.`);
      }

      return splitCommaList(item);
    });

    if (list.length === 0) {
      throw new Error(`Project ${folder}: "${field}" must include at least one value.`);
    }

    return uniqueList(list);
  }

  throw new Error(`Project ${folder}: "${field}" must be a string or an array of strings.`);
}

function resolveAsset(folder: string, asset: string) {
  if (asset.startsWith("/")) {
    return asset;
  }

  return `/Projects/${folder}/${asset}`;
}

function resolveSoftwareIcon(icon: string) {
  if (icon.startsWith("/")) {
    return icon;
  }

  const iconFile = icon.endsWith(".svg") ? icon : `${icon}.svg`;
  return `/Assets/software/${iconFile}`;
}

function validateSoftware(software: unknown, folder: string): ProjectSoftware[] {
  if (software === undefined) {
    return [];
  }

  if (!Array.isArray(software)) {
    throw new Error(`Project ${folder}: "software" must be an array.`);
  }

  return software.map((tool, index) => {
    if (!isRecord(tool)) {
      throw new Error(`Project ${folder}: software item ${index + 1} is invalid.`);
    }

    const name = readString(tool.name, `software[${index}].name`, folder);
    const icon = readString(tool.icon, `software[${index}].icon`, folder);

    return {
      name,
      icon: resolveSoftwareIcon(icon),
    };
  });
}

function validateTextBlock(block: Record<string, unknown>, folder: string): ProjectTextBlock {
  const body = readString(block.body, "content[].body", folder);

  return {
    type: "text",
    eyebrow: typeof block.eyebrow === "string" ? block.eyebrow : undefined,
    headline: typeof block.headline === "string" ? block.headline : undefined,
    body,
  };
}

function validateImageBlock(
  block: Record<string, unknown>,
  folder: string,
): ProjectImageBlock {
  const src = readString(block.src, "content[].src", folder);
  const alt = readString(block.alt, "content[].alt", folder);

  return {
    type: "image",
    src: resolveAsset(folder, src),
    alt,
  };
}

function validateImageGridBlock(
  block: Record<string, unknown>,
  folder: string,
): ProjectImageGridBlock {
  if (!Array.isArray(block.images) || block.images.length === 0) {
    throw new Error(`Project ${folder}: imageGrid blocks need at least one image.`);
  }

  return {
    type: "imageGrid",
    images: block.images.map((image, index) => {
      if (!isRecord(image)) {
        throw new Error(`Project ${folder}: imageGrid image ${index + 1} is invalid.`);
      }

      const src = readString(image.src, `content[].images[${index}].src`, folder);
      const alt = readString(image.alt, `content[].images[${index}].alt`, folder);

      return {
        src: resolveAsset(folder, src),
        alt,
      };
    }),
  };
}

function validateVideoBlock(block: Record<string, unknown>, folder: string): ProjectVideoBlock {
  const src = readString(block.src, "content[].src", folder);
  const title = readString(block.title, "content[].title", folder);
  const poster = typeof block.poster === "string" ? resolveAsset(folder, block.poster) : undefined;

  return {
    type: "video",
    src: resolveAsset(folder, src),
    title,
    poster,
  };
}

function validateTestimonialBlock(
  block: Record<string, unknown>,
  folder: string,
): ProjectTestimonialBlock {
  const photo = readString(block.photo, "content[].photo", folder);
  const name = readString(block.name, "content[].name", folder);
  const role = readString(block.role, "content[].role", folder);
  const quote = readString(block.quote, "content[].quote", folder);

  return {
    type: "testimonial",
    photo: resolveAsset(folder, photo),
    name,
    role,
    quote,
  };
}

function validateContent(content: unknown, folder: string): ProjectContentBlock[] {
  if (!Array.isArray(content)) {
    throw new Error(`Project ${folder}: "content" must be an array.`);
  }

  return content.map((block, index) => {
    if (!isRecord(block) || typeof block.type !== "string") {
      throw new Error(`Project ${folder}: content block ${index + 1} is invalid.`);
    }

    if (block.type === "text") {
      return validateTextBlock(block, folder);
    }

    if (block.type === "image") {
      return validateImageBlock(block, folder);
    }

    if (block.type === "imageGrid") {
      return validateImageGridBlock(block, folder);
    }

    if (block.type === "video") {
      return validateVideoBlock(block, folder);
    }

    if (block.type === "testimonial") {
      return validateTestimonialBlock(block, folder);
    }

    throw new Error(`Project ${folder}: unsupported content block type "${block.type}".`);
  });
}

function validateProject(rawProject: unknown, folder: string): Project {
  if (!isRecord(rawProject)) {
    throw new Error(`Project ${folder}: project.json must contain an object.`);
  }

  for (const field of requiredFields) {
    if (!(field in rawProject)) {
      throw new Error(`Project ${folder}: missing required field "${field}".`);
    }
  }

  const project = rawProject as Record<keyof ProjectInput, unknown>;
  const title = readString(project.title, "title", folder);
  const slug = readString(project.slug, "slug", folder);
  const year = readString(project.year, "year", folder);
  const popularity = readNumber(project.popularity, "popularity", folder);
  const client = readString(project.client, "client", folder);
  const rawCategory = readString(project.category, "category", folder);
  const categories =
    project.categories === undefined
      ? readStringList(rawCategory, "category", folder)
      : readStringList(project.categories, "categories", folder);
  const category = rawCategory;
  const thumbnail = readString(project.thumbnail, "thumbnail", folder);
  const description = readString(project.description, "description", folder);

  if (!isRecord(project.date)) {
    throw new Error(`Project ${folder}: "date" must be an object.`);
  }

  const date = {
    month: readNumber(project.date.month, "date.month", folder),
    year: readNumber(project.date.year, "date.year", folder),
  };

  if (!Array.isArray(project.tags) || project.tags.some((tag) => typeof tag !== "string")) {
    throw new Error(`Project ${folder}: "tags" must be an array of strings.`);
  }

  const tags = project.tags as string[];

  if (!isRecord(project.meta)) {
    throw new Error(`Project ${folder}: "meta" must be an object.`);
  }

  const meta = Object.fromEntries(
    Object.entries(project.meta).map(([key, value]) => {
      if (typeof value !== "string") {
        throw new Error(`Project ${folder}: meta field "${key}" must be a string.`);
      }

      return [key, value];
    }),
  );

  return {
    id: folder,
    folder,
    title,
    slug,
    year,
    date,
    popularity,
    client,
    category,
    categories,
    tags,
    software: validateSoftware(project.software, folder),
    thumbnail: resolveAsset(folder, thumbnail),
    description,
    meta,
    content: validateContent(project.content, folder),
  };
}

async function readProjects() {
  const entries = await readdir(projectsDir, { withFileTypes: true }).catch(() => []);
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const projects = await Promise.all(
    folders.map(async (folder) => {
      const jsonPath = path.join(projectsDir, folder, "project.json");
      const file = await readFile(jsonPath, "utf8");

      return validateProject(JSON.parse(file), folder);
    }),
  );

  const slugs = new Set<string>();
  for (const project of projects) {
    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug "${project.slug}".`);
    }

    slugs.add(project.slug);
  }

  return projects;
}

async function writeGeneratedFile(projects: Project[]) {
  await mkdir(path.dirname(outputFile), { recursive: true });

  const serializedProjects = JSON.stringify(projects, null, 2);
  const output = `import type { Project } from "../types/project";

// Generated at build/dev start because browsers cannot scan public folders at runtime.
export const projects: Project[] = ${serializedProjects};
`;

  await writeFile(outputFile, output, "utf8");
}

const projects = await readProjects();
await writeGeneratedFile(projects);

console.log(`Generated ${projects.length} projects.`);
