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
    icon: "🔬", // emoji icon
    color: "from-blue-500 to-purple-600" // Tailwind gradient
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
    icon: "⚛️", // emoji icon
    color: "from-emerald-500 to-teal-600" // Tailwind gradient
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
    icon: "🎓", // emoji icon
    color: "from-violet-500 to-purple-600" // Tailwind gradient
  }
]
```

#### 4. Certifications
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
    icon: "📊", // emoji icon
    color: "from-blue-500 to-cyan-600" // Tailwind gradient
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
    "🔬 Your Skill",
    "🧠 Another Skill", 
    "⚛️ Third Skill"
  ],
  stats: {
    yearsResearch: "5+",
    projects: "10+"
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
    icon: "🐙", // emoji icon
    color: "optional-color" // optional
  }
]
```

## Styling Guidelines

### Icons
Use emoji icons for visual consistency. Recommended icons:
- 🔬 Research/Science
- ⚛️ Quantum/Physics
- 🧠 AI/ML/Neuroscience
- 💼 Professional/Business
- 🎓 Education
- 📊 Data Science
- 🌟 Leadership/Community
- ⚙️ Engineering/Technical

### Colors
Use Tailwind CSS gradient classes for consistent theming:
- Research: `from-blue-500 to-purple-600`, `from-purple-500 to-indigo-600`
- Work: `from-emerald-500 to-teal-600`, `from-teal-500 to-cyan-600`
- Education: `from-violet-500 to-purple-600`, `from-purple-500 to-pink-600`
- Certifications: `from-blue-500 to-cyan-600`, `from-green-500 to-emerald-600`

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