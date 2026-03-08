import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Technical',
    color: 'blue',
    skills: [
      'Python',
      'SQL',
      'FastAPI',
      'Next.js',
      'TypeScript',
      'AWS',
      'GCP',
      'BigQuery',
      'Docker',
      'pandas',
      'ETL Pipelines',
      'Cloud Architecture',
      'REST APIs',
      'Salesforce',
    ],
  },
  {
    name: 'Product',
    color: 'violet',
    skills: [
      'PRD Writing',
      'Roadmap Planning',
      'OKR Definition',
      'Stakeholder Management',
      'A/B Testing',
      'Data-Driven Decisions',
      'User Research',
    ],
  },
  {
    name: 'Tools',
    color: 'teal',
    skills: [
      'QuickSight',
      'Jira',
      'Confluence',
      'GitHub',
      'Metabase',
      'PowerBI',
      'Excel',
      'Figma',
      'Slack',
    ],
  },
];
