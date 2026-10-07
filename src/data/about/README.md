# About Page Data Management

This directory contains the structured data for the about page, making it easy to manage and update your personal information, experience, and achievements.

## Files Structure

- `types.ts` - TypeScript interfaces and type definitions
- `index.ts` - All the data for the about page
- `README.md` - This documentation file

## How to Use

### Adding New Content

Simply edit the `index.ts` file to add new items to any section:

#### 1. Research Experience
```typescript
research: [
  {
    title: "Your Research Position",
    organization: "Institution Name",
    location: "City, Country",
    startDate: "Month Year",
    endDate: "Month Year", // or "Present"
    description: "Description of your research work...",
    supervisor: "Dr. Supervisor Name", // optional
    supervisorUrl: "https://supervisor-profile.com", // optional
    icon: "tabler:microscope" // see Icons below
  }
]
```

#### 2. Work Experience
```typescript
work: [
  {
    title: "Job Title",
    company: "Company Name",
    companyUrl: "https://company.com", // optional
    location: "City, Country", // optional
    startDate: "Month Year",
    endDate: "Month Year",
    description: [
      "• First responsibility or achievement",
      "• Second responsibility or achievement"
    ],
    supervisor: "Supervisor Name", // optional
    supervisorUrl: "https://supervisor-profile.com", // optional
    projectUrl: "https://project-url.com", // optional
    icon: "tabler:code" // see Icons below
  }
]
```

#### 2b. Earlier work
Short or early positions go here instead of `work`: they're listed as compact
rows (title · company, place · dates) under the work experience.
```typescript
earlierWork: [
  {
    title: "Job Title",
    company: "Company Name",
    companyUrl: "https://company.com", // optional
    location: "City, Country", // optional
    startDate: "Summer 2017",
    endDate: "Summer 2017" // same as startDate → shown once
  }
]
```

#### 3. Education
```typescript
education: [
  {
    degree: "Degree Title",
    institution: "University/School Name",
    startDate: "Year",
    endDate: "Year",
    courses: [ // optional array
      "Course 1: Course Name",
      "Course 2: Course Name"
    ],
    description: "Additional description", // optional
    icon: "tabler:school" // see Icons below
  }
]
```

#### 4. Certifications
Shown as a compact two-column list (small icon, title, provider · date, description).
```typescript
certifications: [
  {
    title: "Certificate Title",
    provider: "Provider Name",
    date: "Month Year", // optional
    description: "Description of what you learned...",
    certificateUrl: "https://certificate-url.com", // optional
    capstoneProject: { // optional
      name: "Project Name",
      url: "https://project-url.com"
    },
    icon: "tabler:chart-bar" // see Icons below
  }
]
```

#### 5. Personal Information
```typescript
personal: {
  name: "Your Name",
  title: "Your Professional Title",
  subtitle: "Greeting text (e.g., 'Hi, I'm')",
  description: [
    "First paragraph about yourself...",
    "Second paragraph...",
    "Third paragraph..."
  ],
  expertise: [
    "Your Skill",
    "Another Skill",
    "Third Skill"
  ],
  stats: {
    yearsResearch: "5+"
  },
  resumeUrl: "/path/to/your/resume.pdf"
}
```

#### 6. Social Links
```typescript
socialLinks: [
  {
    name: "Platform Name",
    url: "https://your-profile.com",
    icon: "tabler:brand-github"
  }
]
```

## Styling Guidelines

### Icons
Every entry takes an icon name from [Tabler Icons](https://tabler.io/icons),
written `tabler:<name>`. They all render in the same accent colour, so the
page stays consistent; emoji don't fit the icon set and are best left out.
Some that fit:
- `tabler:microscope`: research/science
- `tabler:atom`, `tabler:atom-2`: quantum/physics
- `tabler:brain`: AI/ML/neuroscience
- `tabler:code`: software
- `tabler:school`: education
- `tabler:chart-bar`: data science
- `tabler:speakerphone`: outreach/community
- `tabler:settings-automation`: engineering

## Benefits

✅ **Easy to maintain** - All data in one structured file  
✅ **Type safety** - TypeScript interfaces prevent errors  
✅ **Consistent design** - Automated styling based on data  
✅ **Reusable** - Can be used across different pages  
✅ **Scalable** - Easy to add new items without touching the UI code  

## Usage Example

The about page automatically imports and uses this data:

```typescript
import aboutData from '~/data/about/index';
const { personal, research, work, education, certifications, socialLinks } = aboutData;
```

Just update the data files and your changes will appear on the website immediately!