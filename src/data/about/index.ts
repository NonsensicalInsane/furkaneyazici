import type { AboutContent } from './types';

export const aboutData: AboutContent = {
  personal: {
    name: "FEY",
    title: "Interdisciplinary Researcher & Quantum Computing Enthusiast",
    subtitle: "Hi, I'm",
    description: [
      "Hello, I am an interdisciplinary researcher who is passionate about exploring various fields, conducting research in these areas, and endeavoring to transform my studies into projects. In addition to my areas of interest, I am also a computational physicist.",
      "The specific areas I am specializing in primarily involve the mathematical and theoretical aspects of deep learning and quantum computing, as well as their applications to various other fields.",
      "Due to my passion for research, I have been involved in numerous research groups during my undergraduate studies to enhance my skills. Additionally, to reach out to a broader audience, I co-founded a community at my university with my friends and organized various events, including a hackathon."
    ],
    expertise: [
      "🔬 Physics",
      "🧠 Deep Learning", 
      "⚛️ Quantum Computing"
    ],
    stats: {
      yearsResearch: "3+",
      projects: "1+"
    },
    resumeUrl: "/assets/pdf/Furkan_Eşref_Yazıcı_CV.pdf"
  },

  research: [
    {
      title: "Undergraduate Research Assistant",
      organization: "Simply Complex Lab",
      location: "Ankara, Turkey",
      startDate: "Nov 2021",
      endDate: "Jun 2023",
      description: "The laboratory's research area centers on intricate, far-from-equilibrium phenomena. I was actively helped on the development of Python code to assess causality resulting from interparticle collisions . Supervisor: Dr. Serim Ilday.",
      supervisor: "Dr. Serim İlday",
      icon: "🔬",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Undergraduate Research Assistant",
      organization: "IVMER The Research and Application",
      location: "Ankara, Turkey",
      startDate: "Feb 2020",
      endDate: "Jun 2022",
      description: "Contributed to Quantum Convolutional Neural Networks (QCNN) for image detection utilizing various quantum gate algorithms. Also, applied Quantum Machine Learning techniques to address the 'Travelling Salesman' problem within a research team.",
      supervisor: "Prof. M. Bilge Demirköz",
      icon: "⚛️",
      color: "from-purple-500 to-indigo-600"
    }
  ],

  work: [
    {
      title: "Quantum Software Engineer",
      company: "Qavis",
      companyUrl: "https://www.qoordinate.tech",
      startDate: "Sep 2023",
      endDate: "Present",
      description: [
        "Developed advanced logistics algorithms utilizing Quantum Computing to optimize cargo with neural networks and helped on routing algorithms. Built and designed website using React for microservice powered by FastAPI.",
        "Collaborated with investors and partner companies to assist the CEO in fundraising and business development activities."
      ],
      icon: "⚛️",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Outreach Coordinator",
      company: "QTurkey",
      companyUrl: "https://www.qturkey.org",
      startDate: "Sep 2021",
      endDate: "Jan 2023",
      description: [
        "The aim of the QTurkey (Quantum Turkey) community is to spread quantum technologies and raise awareness through events held in Turkey.",
        "As the Outreach Team, our aim is to ensure the growth of the QTurkey community, establish domestic and international collaborations, and to keep the QTurkey family active by organizing new events."
      ],
      icon: "🌟",
      color: "from-teal-500 to-cyan-600"
    },
    {
      title: "Internship, Coordinator",
      company: "QWorld",
      companyUrl: "https://www.qworld.net",
      startDate: "Jul 2021",
      endDate: "Aug 2021",
      description: [
        "The project included the website and classification of all courses and related stuffs."
      ],
      supervisor: "Zeki Can Seskir",
      supervisorUrl: "https://scholar.google.com/citations?user=vbMPLTMAAAAJ&hl=en",
      projectUrl: "https://github.com/GehadSalemFekry/QMap",
      icon: "🌍",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Internship, Industrial Automation",
      company: "ALTINAY Technology Group",
      companyUrl: "http://www.altinay.com/en/home/",
      location: "Istanbul, Turkey",
      startDate: "Summer 2017",
      endDate: "Summer 2017",
      description: [],
      icon: "⚙️",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Internship, Electrical Maintenance Technician",
      company: "KANCA",
      companyUrl: "https://www.kanca.com.tr/",
      location: "Istanbul, Turkey",
      startDate: "Summer 2016",
      endDate: "Summer 2016",
      description: [],
      icon: "🔧",
      color: "from-indigo-500 to-purple-600"
    }
  ],

  education: [
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
      icon: "🎓",
      color: "from-violet-500 to-purple-600"
    },
    {
      degree: "Technical School - Industrial Automation",
      institution: "ENKA Anatolian High School",
      startDate: "2014",
      endDate: "2018",
      icon: "🏫",
      color: "from-purple-500 to-pink-600"
    }
  ],

  certifications: [
    {
      title: "IBM Data Science Professional Certificate",
      provider: "IBM - Coursera",
      description: "I completed the IBM Data Science Professional Certificate, a rigorous program covering data science fundamentals, machine learning, and practical project work. This certificate demonstrates my proficiency in data analysis, Python programming, and the use of industry-standard tools and libraries.",
      certificateUrl: "https://coursera.org/share/bd44b9059c4517a867fad0664b0e406d",
      capstoneProject: {
        name: "SpaceX Launch Success Analysis",
        url: "https://github.com/NonsensicalInsane/IBMDataScienceCourse"
      },
      icon: "📊",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Google Data Analytics Professional Certificate",
      provider: "Google - Coursera",
      description: "I acquired key skills in data cleaning, analysis, and visualization using spreadsheets, SQL, R programming, and Tableau. I learned to organize and analyze data, create visualizations, and present findings effectively. Developed expertise in spreadsheet usage, data ethics, problem-solving, and decision-making.",
      certificateUrl: "https://coursera.org/share/5d9bc17f9ad0748a5ddd18392041e7f3",
      icon: "📈",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Deep Learning",
      provider: "Neuromatch Academy",
      date: "August 2021",
      description: "Completed Neuromatch's Deep Learning course, focusing on advanced neural network architectures and applications. Learned to design, train, and implement deep learning models for tasks such as image recognition and natural language processing, utilizing frameworks like TensorFlow and PyTorch.",
      certificateUrl: "https://portal.neuromatchacademy.org/certificate/924f0e9d-1fa4-44a7-8ae5-9e218b707508",
      icon: "🧠",
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Computational Neuroscience",
      provider: "Neuromatch Academy",
      date: "August 2021",
      description: "Completed the Neuromatch Computational Neuroscience course, focusing on computational techniques for understanding brain function. Gained skills in neural data analysis, modeling of neural systems, and applying machine learning to neuroscience research.",
      certificateUrl: "https://portal.neuromatchacademy.org/certificate/d8922efe-9a30-460d-97aa-759f9b2a6e20",
      icon: "🧬",
      color: "from-teal-500 to-blue-600"
    },
    {
      title: "Qiskit Summer School Quantum Machine Learning",
      provider: "IBM Qiskit",
      date: "August 2021",
      description: "Completed IBM's Qiskit Quantum Machine Learning course, learning to apply quantum computing in machine learning. Gained skills in quantum algorithm implementation and optimization using Qiskit.",
      certificateUrl: "https://drive.google.com/file/d/1SJ-ukSxDxv2DZesPCvr86eufqZYWmpJJ/view",
      icon: "⚛️",
      color: "from-orange-500 to-red-600"
    }
  ],

  socialLinks: [
    {
      name: "GitHub",
      url: "https://www.github.com/nonsensicalinsane",
      icon: "🐙"
    },
    {
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/furkaneyazici",
      icon: "💼"
    }
  ]
};

export default aboutData;