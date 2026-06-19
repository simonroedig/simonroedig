import bshImg from "@/assets/career/bsh.jpg";
import rohdeImg from "@/assets/career/rohde.jpg";
import bmwImg from "@/assets/career/bmw.jpg";
import teachingImg from "@/assets/career/teaching.jpg";
import wackerImg from "@/assets/career/wacker.jpg";

export type Experience = {
  id: string;
  company: string;
  role: string;
  date: string;
  sortDate: string; // YYYY-MM
  color: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
};

// Newest first
export const experiences: Experience[] = [
  {
    id: "bsh",
    company: "B/S/H/",
    role: "User Interaction & AI Prototyping",
    date: "07/2025",
    sortDate: "2025-07",
    color: "#f4724a",
    image: bshImg,
    shortDescription: "User Interaction & AI Prototyping Work-Study.",
    fullDescription:
      "Working student in the Interaction team focusing on ovens and cooktops. Introduced advanced prototyping workflows, combined UX methods with programming and AI, conducted user studies, developed component-based design architectures, and helped standardize multi-brand design processes.",
  },
  {
    id: "rohde-schwarz",
    company: "Rohde & Schwarz",
    role: "Full-Stack Software Development",
    date: "09/2024",
    sortDate: "2024-09",
    color: "#b5b9bc",
    image: rohdeImg,
    shortDescription: "Full-Stack Softwaredevelopment Work-Study.",
    fullDescription:
      "Working student position focused on full-stack software development. Developed internal tools using AI and large language models to automate business processes and communication workflows. Worked across the full software lifecycle from ideation to deployment.",
  },
  {
    id: "bmw",
    company: "BMW",
    role: "UX & Prototyping Internship",
    date: "12/2023",
    sortDate: "2023-12",
    color: "#accdef",
    image: bmwImg,
    shortDescription: "UX & Prototyping Full-Time Internship.",
    fullDescription:
      "Full-time internship in the User Interaction and UX/UI department at BMW Group (May–November 2023). Contributed to UX design, concept development, and high-fidelity prototyping for infotainment systems of the Neue Klasse vehicle generation. Gained practical experience in automotive UX and cross-functional collaboration.",
  },
  {
    id: "teaching",
    company: "Teaching",
    role: "Digital Media Tutor — LMU Munich",
    date: "03/2023",
    sortDate: "2023-03",
    color: "#db5971",
    image: teachingImg,
    shortDescription: "Some Words About My Experience as a Tutor.",
    fullDescription:
      "Experience as a university tutor for Digital Media at LMU Munich. Responsible for presenting course content, creating and grading assignments, and teaching topics such as compression algorithms, audio/video processing, web development, and digitization. Focused on helping students understand complex topics through clear explanations and interactive tutorials.",
  },
  {
    id: "wacker",
    company: "Wacker Polysilicon",
    role: "Semiconductors & Microchips",
    date: "08/2022",
    sortDate: "2022-08",
    color: "#beeba3",
    image: wackerImg,
    shortDescription: "Recurring Work-Study for Semiconductors and Microchips.",
    fullDescription:
      "Worked at Wacker Chemie AG between 2019–2022 as part of a recurring Werkstudium program. Participated in polysilicon manufacturing processes for the semiconductor industry and gained practical insight into chip-production workflows and high-tech material manufacturing.",
  },
];
