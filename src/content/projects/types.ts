import type { ImageMetadata } from 'astro';

export interface ProjectLinks {
  github?: string;
  demo?: string;
  documentation?: string;
  playStore?: string;
  appStore?: string;
  whitepaper?: string;
  website?: string;
  blog?: string; // Optional link to related blog post
}

export interface ProjectCallToAction {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'tertiary' | 'link';
}

export type ProjectStatus = 'completed' | 'in-development' | 'planning' | 'concept' | 'archived';

export interface BaseProject {
  title: string;
  description: string;
  icon: string;
  techStack: string[];
  status: ProjectStatus;
  callToAction: ProjectCallToAction;
  links: ProjectLinks;
  /**
   * Screenshot / preview image shown at the top of the card.
   * Import the image in the data file:
   *   import riskforge from '~/assets/images/projects/riskforge.png';
   *   image: { src: riskforge, alt: 'Risk Forge dashboard' }
   */
  image?: {
    src: ImageMetadata | string;
    alt: string;
  };
}

export interface FeaturedProject extends BaseProject {
  status: 'completed';
}

export interface UpcomingProject extends BaseProject {
  status: 'in-development' | 'planning' | 'concept';
  progress: number; // Percentage (0-100)
  expectedCompletion: string; // ISO date string
}

export interface ProjectSectionConfig {
  title: string;
  subtitle: string;
  heroImage?: {
    src: string;
    alt: string;
  };
}

export interface ProjectCategories {
  featured: FeaturedProject[];
  upcoming: UpcomingProject[];
  archived?: BaseProject[];
}


