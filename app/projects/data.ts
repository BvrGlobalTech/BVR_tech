import {
  BookOpen, CalendarDays, ClipboardCheck, Clock, GraduationCap, Users,
  type LucideIcon,
} from "lucide-react";
import type { StaticImageData } from "next/image";
import type { ArtKind } from "@/components/ProjectArt";

export type Project = {
  /** Used in the web address: /projects/<slug> */
  slug: string;
  title: string;
  category: string;
  /** Short text for the card on the projects page */
  summary: string;
  /** Up to 4 short tags shown on the card */
  tags: string[];
  /** Card illustration: "timetable" | "web" | "generic" (replaced by real screenshots if you add them) */
  art: ArtKind;
  /** Longer intro on the detail page */
  description: string;
  overview: string[];
  features: { icon: LucideIcon; title: string; text: string }[];
  /** Optional chips, e.g. user roles */
  roles?: string[];
  /** Optional: scheduling approaches section (only used by the timetable project) */
  approaches?: { kind: "csp" | "ga" | "greedy"; title: string; text: string }[];
  stack: { label: string; items: string[] }[];
  /** Optional: put files in /public/projects/ and list them, e.g. { src: "/projects/a.png", alt: "..." } */
  screenshots?: { src: string | StaticImageData; alt: string }[];
};

/* ------------------------------------------------------------------
   ADD A PROJECT: copy one object, change the text, give it a new slug.
   The card on /projects and the page /projects/<slug> are created
   automatically.

   {
     slug: "my-project",
     title: "My Project",
     category: "Web Application",
     summary: "One or two sentences for the card.",
     tags: ["React.js", "Node.js"],
     art: "web",
     description: "A longer intro for the detail page.",
     overview: ["Paragraph one.", "Paragraph two."],
     features: [{ icon: Users, title: "Feature", text: "What it does." }],
     stack: [{ label: "Frontend", items: ["React.js"] }],
   },
------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    slug: "timetable-attendance",
    title: "Timetable & Attendance Application",
    category: "Full-Stack Web Application",
    summary:
      "A role-based academic platform for timetable scheduling, attendance tracking and academic information management.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    art: "timetable",
    description:
      "A role-based academic management application designed to simplify timetable scheduling, attendance tracking and academic information management for administrators, faculty and students.",
    overview: [
      "The application provides a centralized platform for managing academic activities through separate Admin, Faculty and Student interfaces. It includes automated timetable generation using Constraint Satisfaction, Genetic Algorithm and Greedy approaches, helping organize academic schedules while considering scheduling constraints.",
      "It also supports attendance management, academic topic and notes sharing, faculty free-hour tracking and automated subject-wise result extraction to generate SGPA and CGPA insights.",
    ],
    roles: ["Admin", "Faculty", "Student"],
    features: [
      { icon: Users, title: "Role-based access", text: "Separate Admin, Faculty and Student interfaces, each focused on what that person needs." },
      { icon: CalendarDays, title: "Automated timetables", text: "Schedules generated using Constraint Satisfaction, Genetic Algorithm and Greedy approaches." },
      { icon: Clock, title: "Free-hour tracking", text: "Faculty free hours tracked alongside timetable management." },
      { icon: ClipboardCheck, title: "Attendance management", text: "Attendance tracking for academic activities, handled in one place." },
      { icon: BookOpen, title: "Notes & topics sharing", text: "Academic topics and notes shared through the application." },
      { icon: GraduationCap, title: "Result insights", text: "Subject-wise results extracted automatically to give SGPA and CGPA insights." },
    ],
    approaches: [
      { kind: "csp", title: "Constraint Satisfaction", text: "Treats scheduling rules as constraints that a valid timetable has to satisfy." },
      { kind: "ga", title: "Genetic Algorithm", text: "Evolves many candidate timetables, keeping and combining the best ones." },
      { kind: "greedy", title: "Greedy Approach", text: "Builds a timetable step by step, making the best available choice at each stage." },
    ],
    stack: [
      { label: "Frontend", items: ["React.js"] },
      { label: "Backend", items: ["Node.js", "Express.js"] },
      { label: "Database", items: ["MongoDB"] },
      { label: "Language", items: ["JavaScript"] },
      { label: "Scheduling", items: ["Constraint Satisfaction", "Genetic Algorithm", "Greedy Algorithm"] },
    ],
    screenshots: [
      // { src: "/projects/timetable-1.png", alt: "Timetable generation screen" },
    ],
  },
];