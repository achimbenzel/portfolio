export type ProjectTextBlock = {
  type: "text";
  eyebrow?: string;
  headline?: string;
  body: string;
};

export type ProjectImageBlock = {
  type: "image";
  src: string;
  alt: string;
};

export type ProjectImageGridBlock = {
  type: "imageGrid";
  /** Optional fixed aspect ratio per cell, e.g. "1620 / 2025" for portrait images. */
  ratio?: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
};

export type ProjectVideoBlock = {
  type: "video";
  src: string;
  title: string;
  poster?: string;
  /** Optional aspect ratio, e.g. "2560 / 1920" for a 4:3 clip at full width. */
  ratio?: string;
};

export type ProjectTestimonialBlock = {
  type: "testimonial";
  photo: string;
  name: string;
  role: string;
  quote: string;
};

export type ProjectContentBlock =
  | ProjectTextBlock
  | ProjectImageBlock
  | ProjectImageGridBlock
  | ProjectVideoBlock
  | ProjectTestimonialBlock;

export type ProjectMeta = Record<string, string>;

export type ProjectDate = {
  month: number;
  year: number;
};

export type Project = {
  id: string;
  folder: string;
  title: string;
  slug: string;
  year: string;
  date: ProjectDate;
  popularity: number;
  client: string;
  category: string;
  categories: string[];
  tags: string[];
  software: ProjectSoftware[];
  thumbnail: string;
  description: string;
  meta: ProjectMeta;
  content: ProjectContentBlock[];
};

export type ProjectSoftware = {
  name: string;
  icon: string;
};
