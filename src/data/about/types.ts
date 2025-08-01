export interface AboutContent {
  personal: PersonalInfo;
  research: ResearchExperience[];
  work: WorkExperience[];
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
    projects: string;
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
  icon: string;
  color: string;
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
  icon: string;
  color: string;
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  courses?: string[];
  description?: string;
  icon: string;
  color: string;
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
  icon: string;
  color: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}