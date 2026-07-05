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
