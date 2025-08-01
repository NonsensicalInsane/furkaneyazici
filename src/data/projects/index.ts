export { featuredProjects } from './featured';
export { upcomingProjects, upcomingProjectsConfig } from './upcoming';
export type {
  ProjectLinks,
  ProjectCallToAction,
  ProjectStatus,
  BaseProject,
  FeaturedProject,
  UpcomingProject,
  ProjectSectionConfig,
  ProjectCategories
} from './types';

// Helper function to get all projects
export function getAllProjects() {
  return {
    featured: featuredProjects,
    upcoming: upcomingProjects
  };
}

// Helper function to get projects by status
export function getProjectsByStatus(status: ProjectStatus) {
  const all = getAllProjects();
  return [
    ...all.featured.filter(p => p.status === status),
    ...all.upcoming.filter(p => p.status === status)
  ];
}

// Helper function to get project count
export function getProjectCounts() {
  const all = getAllProjects();
  return {
    total: all.featured.length + all.upcoming.length,
    featured: all.featured.length,
    upcoming: all.upcoming.length,
    completed: all.featured.length,
    inDevelopment: all.upcoming.filter(p => p.status === 'in-development').length,
    planning: all.upcoming.filter(p => p.status === 'planning').length,
    concept: all.upcoming.filter(p => p.status === 'concept').length
  };
}