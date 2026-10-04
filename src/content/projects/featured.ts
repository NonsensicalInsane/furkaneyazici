import type { FeaturedProject } from './types';

/**
 * Featured (completed) projects — shown on the homepage (first 3) and the
 * Projects page. The section stays hidden until this array has entries.
 *
 * Tips for an attractive card:
 *  - `image`: a screenshot or diagram is the single biggest visual upgrade.
 *    Put files in src/assets/images/projects/ and import them (see template).
 *    Ideal ratio 16:9 (e.g. 1280×720). A short GIF also works.
 *  - `links.demo`: a live demo beats everything — put it first when you have one.
 *  - `links.blog`: link a write-up post ("/your-post-slug/") — the card shows a
 *    prominent "Read the write-up →" link. Tell the story: problem → approach → result.
 *  - `links.whitepaper`: use for arXiv / papers on research projects.
 *  - `callToAction`: the big button. Point it at the best destination
 *    (demo > blog > repo) with a verb: "Try it live", "Read the story", "View source".
 *  - `techStack`: max ~4 visible; the rest collapses to "+n more".
 */

// Example (uncomment and adapt):
//
// import riskforgeShot from '../../assets/images/projects/riskforge.png';
//
// {
//   title: 'Risk Forge',
//   description: 'Real-time fraud & credit risk scoring: rules + LightGBM served over FastAPI, with Prometheus metrics.',
//   icon: 'tabler:credit-card',
//   techStack: ['Python', 'FastAPI', 'LightGBM', 'Docker'],
//   status: 'completed',
//   image: { src: riskforgeShot, alt: 'Risk Forge scoring dashboard' },
//   callToAction: { text: 'Try it live', href: 'https://riskforge.example.com', variant: 'primary' },
//   links: {
//     github: 'https://github.com/nonsensicalinsane/riskforge',
//     demo: 'https://riskforge.example.com',
//     blog: '/riskforge-fraud-scoring/',
//   },
// },

export const featuredProjects: FeaturedProject[] = [];
