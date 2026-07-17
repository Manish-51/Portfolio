export type Theme = "dark" | "light";

export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  tags: string[];
}

export type SkillCategory =
  | "Languages"
  | "Data & BI"
  | "Frontend"
  | "Backend"
  | "Tools & Cloud"
  | "Machine Learning";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 - 100
  icon: string; // short label used to render a glyph
}

export type ProjectCategory =
  | "Data Analytics"
  | "Web App"
  | "AI / ML"
  | "Finance & Trading"
  | "Mobile";

export type ProjectMediaType = "image" | "video" | "file";

export interface ProjectMedia {
  id: string;
  type: ProjectMediaType;
  label: string;
  src: string;
  alt?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  stack: string[];
  year: string;
  featured?: boolean;
  links?: {
    live?: string;
    repo?: string;
  };
  media?: ProjectMedia[];
  accent: string; // tailwind gradient classnames
}

export type CertificationCategory =
  | "Data & Analytics"
  | "Cloud"
  | "Development"
  | "Academic";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: CertificationCategory;
  date: string;
  credentialId?: string;
  skills: string[];
  certificateUrl?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  path: string;
}
