export interface AboutContent {
  personal: PersonalInfo;
  research: ResearchExperience[];
  work: WorkExperience[];
  /** Early, short positions: listed compactly under the work experience */
  earlierWork: EarlierWork[];
  education: Education[];
  certifications: Certification[];
  socialLinks: SocialLink[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string[];
  expertise: string[];
  stats: {
    yearsResearch: string;
  };
  resumeUrl: string;
}

export interface ResearchExperience {
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  supervisor?: string;
  supervisorUrl?: string;
  /** Icon name, e.g. "tabler:atom" (https://tabler.io/icons) */
  icon: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string[];
  supervisor?: string;
  supervisorUrl?: string;
  projectUrl?: string;
  /** Link text for projectUrl (defaults to the URL) */
  projectLabel?: string;
  /** Icon name, e.g. "tabler:atom" (https://tabler.io/icons) */
  icon: string;
}

export interface EarlierWork {
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  courses?: string[];
  description?: string;
  /** Icon name, e.g. "tabler:atom" (https://tabler.io/icons) */
  icon: string;
}

export interface Certification {
  title: string;
  provider: string;
  date?: string;
  description: string;
  certificateUrl?: string;
  capstoneProject?: {
    name: string;
    url: string;
  };
  /** Icon name, e.g. "tabler:atom" (https://tabler.io/icons) */
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  /** Icon name, e.g. "tabler:brand-github" */
  icon: string;
}