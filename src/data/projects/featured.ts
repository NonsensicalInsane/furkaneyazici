import type { FeaturedProject } from './types';

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Sample Featured Project",
    description: "A sample project to demonstrate the structure and prevent type errors.",
    icon: "tabler:code",
    techStack: ["TypeScript", "React", "Node.js"],
    status: "completed",
    callToAction: {
      text: "View Project",
      href: "#",
      variant: "primary"
    },
    links: {
      github: "#",
      demo: "#"
    }
  }
];