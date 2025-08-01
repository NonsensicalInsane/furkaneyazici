import type { UpcomingProject } from './types';

export const upcomingProjects: UpcomingProject[] = [
  {
    title: "Sample Upcoming Project",
    description: "A sample upcoming project to demonstrate the structure and prevent type errors.",
    icon: "tabler:rocket",
    techStack: ["TypeScript", "Astro", "Tailwind CSS"],
    status: "in-development",
    progress: 75,
    expectedCompletion: "2024-06-01",
    callToAction: {
      text: "Learn More",
      href: "#",
      variant: "secondary"
    },
    links: {
      github: "#"
    }
  }
];

export const upcomingProjectsConfig = {
  heroImage: {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
    alt: 'Development workspace with code on multiple monitors'
  },
  title: "<span class='text-gradient'>Upcoming Projects</span>",
  subtitle: "Exciting projects currently in development"
};