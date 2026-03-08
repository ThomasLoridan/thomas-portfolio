export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  photo: string;
  stats: Stat[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  accent: string;
  logoInitials: string;
}

export type SkillColor = 'blue' | 'violet' | 'teal';

export interface SkillCategory {
  name: string;
  color: SkillColor;
  skills: string[];
}

export interface Certification {
  id: number;
  issuer: string;
  name: string;
  year: string;
  logo: string | null;
  logoWidth: number;
  logoHeight: number;
  url: string | null;
  accentColor: string;
  isAward: boolean;
  awardIcon?: string;
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  impact: string;
  tags: string[];
  githubUrl: string;
}
