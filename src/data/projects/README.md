# Projects Data Structure

This folder contains organized project data for easy management and maintenance.

## 📁 File Structure

```
src/data/projects/
├── index.ts          # Main exports and helper functions
├── featured.ts       # Completed/featured projects
├── upcoming.ts       # Projects in development
├── types.ts          # TypeScript interfaces
└── README.md         # This file
```

## 🚀 Usage

### Adding a New Featured Project

Edit `featured.ts` and add a new project object:

```typescript
{
  title: 'Your Project Name',
  description: 'Brief description highlighting key features and technologies used.',
  icon: 'tabler:icon-name', // Choose from Tabler icons
  techStack: ['React', 'Node.js', 'PostgreSQL'], // Technologies used
  status: 'completed',
  callToAction: {
    text: 'View Live Demo', // Button text
    href: 'https://your-demo.com',
    variant: 'primary' // 'primary' | 'secondary' | 'tertiary' | 'link'
  },
  links: {
    github: 'https://github.com/username/project',
    demo: 'https://your-demo.com',
    documentation: 'https://docs.yourproject.com'
  }
}
```

### Adding an Upcoming Project

Edit `upcoming.ts` and add a new project:

```typescript
{
  title: 'Future Project',
  description: 'What you plan to build and why it\'s exciting.',
  icon: 'tabler:icon-name',
  techStack: ['Technology', 'Stack', 'Planned'],
  status: 'in-development', // 'in-development' | 'planning' | 'concept'
  progress: 45, // Percentage complete (0-100)
  expectedCompletion: '2024-06-01', // ISO date string
  callToAction: {
    text: 'Coming Soon',
    href: '#',
    variant: 'secondary'
  },
  links: {
    github: 'https://github.com/username/future-project'
  }
}
```

## 🎨 Available Icons

Common Tabler icons for projects:
- `tabler:code` - General coding
- `tabler:world` - Web applications
- `tabler:device-mobile` - Mobile apps
- `tabler:database` - Database projects
- `tabler:cloud` - Cloud/DevOps
- `tabler:brain` - AI/ML projects
- `tabler:shopping-cart` - E-commerce
- `tabler:chart-line` - Analytics/Data
- `tabler:shield-check` - Security projects
- `tabler:users` - Social/Community apps

[Browse all Tabler icons](https://tabler-icons.io/)

## 🎯 Button Variants & Strategy

### Button Hierarchy (Most to Least Prominent)
- **primary**: Main user action - what you want visitors to do first
- **secondary**: Important secondary action - still very visible
- **tertiary**: Additional resources - subtle but accessible
- **link**: Simple text links - minimal styling

### Recommended Strategy by Project Type

**Web Applications with Live Demo:**
- Primary: "View Live Demo" / "Try It Live"
- GitHub in links section

**Mobile Applications:**
- Primary: "Download App" (App Store/Play Store)
- GitHub in links section

**Open Source/Code-First Projects:**
- Primary: "View Source Code" / "GitHub Repository"
- Documentation as secondary if available

**Documentation/Tools:**
- Primary: "View Documentation" / "Get Started"
- GitHub as secondary

**Example Button Texts:**
- ✅ "View Live Demo", "Try It Live", "Download App"
- ✅ "View Source Code", "GitHub Repository"  
- ✅ "View Documentation", "Read Docs"
- ❌ "Click Here", "Link", "More Info" (too generic)

## 📊 Project Status

### Featured Projects
- `completed`: Finished and deployed projects

### Upcoming Projects
- `in-development`: Currently building
- `planning`: Detailed planning phase
- `concept`: Early idea/research phase

## 🔧 Helper Functions

Import helper functions for advanced usage:

```typescript
import { getAllProjects, getProjectsByStatus, getProjectCounts } from '../data/projects';

// Get all projects organized by type
const projects = getAllProjects();

// Get only completed projects
const completed = getProjectsByStatus('completed');

// Get project statistics
const stats = getProjectCounts();
```

## 📝 Tips

1. **Descriptions**: Keep them concise but informative (1-2 sentences)
2. **Tech Stack**: List 3-5 main technologies
3. **Links**: Always include GitHub, add demo if available
4. **Icons**: Choose icons that represent your project type
5. **Progress**: Update upcoming project progress regularly

## 🔄 Updating Projects

1. **Move completed projects**: When an upcoming project is finished, move it from `upcoming.ts` to `featured.ts`
2. **Update status**: Change status from 'in-development' to 'completed'
3. **Add demo links**: Include live demo and documentation links
4. **Update description**: Add final results and achievements