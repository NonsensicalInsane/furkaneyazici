import type { AboutContent } from './types';

export const aboutData: AboutContent = {
  personal: {
    name: "Furkan",
    title: "Physicist & Quantum Software Engineer",
    subtitle: "Hi, I'm",
    description: [
      "I'm a computational physicist working on deep learning and quantum computing — from the underlying math to real applications.",
      "During my undergrad I worked in several research groups, and co-founded a university community that organized events including a hackathon."
    ],
    expertise: [
      "Physics",
      "Deep Learning", 
      "Quantum Computing"
    ],
    stats: {
      yearsResearch: "3+"
    },
    resumeUrl: "/assets/pdf/Furkan_Esref_Yazici_CV.pdf"
  },

  research: [
    {
      title: "Undergraduate Research Assistant",
      organization: "Simply Complex Lab",
      location: "Ankara, Turkey",
      startDate: "Nov 2021",
      endDate: "Jun 2023",
      description: "Assisted a PhD student's project on causality in interparticle collisions, contributing to its Python tooling, in a lab studying far-from-equilibrium phenomena.",
      supervisor: "Prof. Dr. Serim İlday",
      icon: "tabler:microscope"
    },
    {
      title: "Undergraduate Research Assistant",
      organization: "METU IVMER (Research and Application Center for Space and Accelerator Technologies)",
      location: "Ankara, Turkey",
      startDate: "Feb 2020",
      endDate: "Jun 2021",
      description: "Built Quantum Convolutional Neural Networks (QCNN) for image detection and applied quantum machine learning to the Travelling Salesman problem.",
      supervisor: "Prof. M. Bilge Demirköz",
      icon: "tabler:atom"
    }
  ],

  work: [
    {
      title: "Quantum Software Engineer",
      company: "Qavis",
      companyUrl: "https://www.qavis.co",
      startDate: "Jun 2024",
      endDate: "Present",
      description: [
        "Developed quantum-powered cargo optimization and routing algorithms; built the React front end for a FastAPI microservice.",
        "Supported the CEO in fundraising and business development with investors and partner companies."
      ],
      icon: "tabler:code"
    },
    {
      title: "Outreach Coordinator",
      company: "QTurkey",
      companyUrl: "https://www.qturkey.org",
      startDate: "Sep 2021",
      endDate: "Jan 2023",
      description: [
        "Grew the QTurkey community and built domestic and international collaborations through quantum-technology outreach events across Turkey."
      ],
      icon: "tabler:speakerphone"
    },
    {
      title: "Coordinator Intern",
      company: "QWorld",
      companyUrl: "https://www.qworld.net",
      startDate: "Jul 2021",
      endDate: "Aug 2021",
      description: [
        "Built QMap — a website cataloguing and classifying quantum education courses."
      ],
      supervisor: "Zeki Can Seskir",
      supervisorUrl: "https://scholar.google.com/citations?user=vbMPLTMAAAAJ&hl=en",
      // qmap.qworld.net is offline; this is the Wayback Machine's copy from May 2022
      projectUrl: "https://web.archive.org/web/20220524093751/https://qmap.qworld.net/",
      projectLabel: "qmap.qworld.net (archived)",
      icon: "tabler:map"
    }
  ],

  // Shown as a short list under the work experience
  earlierWork: [
    {
      title: "Industrial Automation Intern",
      company: "ALTINAY Technology Group",
      companyUrl: "https://altinay.com/en/home/",
      location: "Istanbul, Turkey",
      startDate: "Summer 2017",
      endDate: "Summer 2017"
    },
    {
      title: "Electrical Maintenance Technician Intern",
      company: "KANCA",
      companyUrl: "https://www.kanca.com.tr/",
      location: "Istanbul, Turkey",
      startDate: "Summer 2016",
      endDate: "Summer 2016"
    }
  ],

  education: [
        {
      degree: "Master of Science in Physics",
      institution: "Gebze Technical University",
      startDate: "2026",
      endDate: "Present",
      courses: [

      ],
      icon: "tabler:school"
    },
    {
      degree: "Bachelor of Science in Physics",
      institution: "Middle East Technical University",
      startDate: "2018",
      endDate: "2025",
      courses: [
        "CENG 501: Deep Learning",
        "PHYS 409: Physics of Condensed Matter I",
        "PHYS 312: Elementary of Solid State",
        "PHYS 495: Group Theory in Physics",
        "PHYS 444: Computational Physics II",
        "BIOL 106: Biology",
        "BIOL 317: Molecular Biology"
      ],
      icon: "tabler:school"
    },
    {
      degree: "Technical School - Industrial Automation",
      institution: "ENKA Anatolian High School",
      startDate: "2014",
      endDate: "2018",
      icon: "tabler:building"
    }
  ],

  certifications: [
    {
      title: "IBM Data Science Professional Certificate",
      provider: "IBM - Coursera",
      description: "Data science fundamentals, machine learning, and hands-on project work in Python with industry-standard tools.",
      certificateUrl: "https://coursera.org/share/bd44b9059c4517a867fad0664b0e406d",
      capstoneProject: {
        name: "SpaceX Launch Success Analysis",
        url: "https://github.com/NonsensicalInsane/IBMDataScienceCourse"
      },
      icon: "tabler:chart-bar"
    },
    {
      title: "Google Data Analytics Professional Certificate",
      provider: "Google - Coursera",
      description: "Data cleaning, analysis, and visualization with SQL, R, spreadsheets, and Tableau.",
      certificateUrl: "https://coursera.org/share/5d9bc17f9ad0748a5ddd18392041e7f3",
      icon: "tabler:chart-line"
    },
    {
      title: "Deep Learning",
      provider: "Neuromatch Academy",
      date: "August 2021",
      description: "Advanced neural-network architectures with TensorFlow and PyTorch, applied to vision and NLP tasks.",
      certificateUrl: "https://portal.neuromatchacademy.org/certificate/924f0e9d-1fa4-44a7-8ae5-9e218b707508",
      icon: "tabler:brain"
    },
    {
      title: "Computational Neuroscience",
      provider: "Neuromatch Academy",
      date: "August 2021",
      description: "Neural data analysis, modeling of neural systems, and machine learning applied to neuroscience.",
      certificateUrl: "https://portal.neuromatchacademy.org/certificate/d8922efe-9a30-460d-97aa-759f9b2a6e20",
      icon: "tabler:activity"
    },
    {
      title: "Qiskit Summer School Quantum Machine Learning",
      provider: "IBM Qiskit",
      date: "August 2021",
      description: "Quantum machine learning with Qiskit — algorithm implementation and optimization.",
      certificateUrl: "https://drive.google.com/file/d/1SJ-ukSxDxv2DZesPCvr86eufqZYWmpJJ/view",
      icon: "tabler:atom-2"
    }
  ],

  socialLinks: [
    {
      name: "GitHub",
      url: "https://www.github.com/nonsensicalinsane",
      icon: "tabler:brand-github"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/furkaneyazici",
      icon: "tabler:brand-linkedin"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/furkaneyazici",
      icon: "tabler:brand-instagram"
    }
  ]
};

export default aboutData;