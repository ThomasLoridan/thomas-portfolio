import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'sonar',
    name: 'SONAR',
    subtitle: 'Network Defense Automation',
    description:
      'First production-grade post-scheduling system for 500+ Intermodal routes. Consolidated 4 data sources, cutting cycle time from 4 hours to 5 minutes for the entire EU network.',
    impact: '€13.3M ARR',
    tags: ['Python', 'AWS ECS', 'S3', 'Automation', 'ETL'],
    githubUrl: 'https://github.com/ThomasLoridan',
  },
  {
    id: 'oracle',
    name: 'ORACLE',
    subtitle: 'Capacity Audit Platform',
    description:
      'Automated ground transportation capacity auditing across 250+ routes in 26 EU countries. Replaced 40 hours/month of manual spreadsheet analysis with a fully automated weekly pipeline.',
    impact: '€250K Savings',
    tags: ['Python', 'SQL', 'QuickSight', 'ETL', '26 Countries'],
    githubUrl: 'https://github.com/ThomasLoridan',
  },
  {
    id: 'exec-analytics',
    name: 'Executive Analytics',
    subtitle: 'Unified KPI Platform',
    description:
      'Unified fragmented reporting into a single source-of-truth for L7+ leadership. 80+ ETL pipelines consolidating 35 countries, 530 lanes, and 40 real-time KPIs in one dashboard.',
    impact: '80+ KPIs, 530 Lanes',
    tags: ['SQL', 'Python', 'QuickSight', 'AWS Glue', 'BI'],
    githubUrl: 'https://github.com/ThomasLoridan',
  },
  {
    id: 'pm-portfolio',
    name: 'PM Portfolio',
    subtitle: 'Open Source',
    description:
      'Public portfolio of PM projects with PRDs, architecture decision records, and shipped code. Demonstrates the full PM → Engineer execution loop with real business impact.',
    impact: 'Open Source',
    tags: ['Next.js', 'TypeScript', 'Product Management'],
    githubUrl: 'https://github.com/ThomasLoridan',
  },
];
