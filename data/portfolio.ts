export type TechGroup = {
  title: string;
  items: string[];
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  github: string;
  demo: string;
  accent: string;
};

export type JourneyItem = {
  title: string;
  stack: string;
  number: string;
};

export const techGroups: TechGroup[] = [
  { title: "Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "PHP", "SQL"] },
  { title: "Frontend", items: ["React", "Next.js", "Vue.js", "Tailwind CSS"] },
  { title: "Backend", items: ["Laravel", "PHP"] },
  { title: "Database", items: ["MySQL", "PostgreSQL", "Prisma"] },
  { title: "3D & Animation", items: ["Three.js", "React Three Fiber", "GSAP"] },
  { title: "Other Tools", items: ["Git", "GitHub", "Vite"] },
];

export const projects: Project[] = [
  {
    title: "FaceTime Attendance System",
    description: "A role-based employee attendance management system built for structured, day-to-day workforce operations.",
    technologies: ["Laravel", "React", "Inertia", "TypeScript", "Tailwind CSS", "MySQL"],
    features: ["Employee attendance", "Time-in / time-out", "Late tracking", "Overtime", "Leave requests", "Role-based dashboards", "User management"],
    github: "#contact",
    demo: "#contact",
    accent: "FT",
  },
  {
    title: "InterviewAI",
    description: "An AI-powered interview preparation platform designed around focused practice, analysis, and measurable progress.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    features: ["Mock interviews", "Resume analyzer", "Question bank", "Progress tracking", "User authentication", "AI-assisted preparation"],
    github: "#contact",
    demo: "#contact",
    accent: "AI",
  },
];

export const journey: JourneyItem[] = [
  { number: "01", title: "Learning the Web", stack: "HTML → CSS → JavaScript" },
  { number: "02", title: "Frontend Development", stack: "React → Vue → TypeScript → Tailwind" },
  { number: "03", title: "Backend Development", stack: "PHP → Laravel → MySQL" },
  { number: "04", title: "Modern Full-Stack", stack: "Next.js → PostgreSQL → Prisma" },
  { number: "05", title: "Creative Development", stack: "Three.js → React Three Fiber → GSAP" },
];

export const socialLinks = {
  email: "johnlorens017@example.com",
  github: "https://github.com/flynnn-dev",
  linkedin: "https://www.linkedin.com/in/john-lorens-baldon-30186b3a1/",
};
