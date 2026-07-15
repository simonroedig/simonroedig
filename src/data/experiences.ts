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
    date: "09/2024 - 09/2026",
    sortDate: "2025-07",
    color: "#f4724a",
    image: bshImg,
    shortDescription: "User Interaction & AI Prototyping Work-Study.",
    fullDescription: `Disclaimer: Due to contractual obligations with BSH and the public availability of my website, I am unable to disclose specific details regarding the projects I worked on. Therefore, I will only provide a brief and general overview about my time at BSH.

Since September 2024, I have been part of the Interaction team at BSH Group’s Munich headquarters, focusing on ovens and cooktops while collaborating with a global shared services team across other home appliances.

Noticing gaps in prototyping practices and issues in colleagues understanding complex concepts, I took the initiative to build and code advanced prototypes, selecting frameworks and coding setups that best fit our needs. By combining traditional UX methods with programming and AI, I developed prototypes that were more tangible and dynamic than the previous approaches, and explored how AI can help automate prototype generation to accelerate concept testing. Beyond creating these workflows, I shared my knowledge with colleagues, lecturing the team to ensure everyone could leverage these new approaches effectively. This not only increased our efficiency but also brought the team to a common skill level, empowering us to explore and test ideas more confidently.

In addition, I conducted iterative user studies with participants, gathering insights to refine and validate our concepts based on mentioned prototypes, and I contributed to unifying multi-brand processes by developing shared information structures and component-based design architectures, ensuring consistency and efficiency across teams and products globally.

This role has been an immersive experience, allowing me to experiment with emerging technologies, take ownership of prototyping practices, and shape multi-brand design processes, all while redefining how user experience and AI-driven design intersect in next-generation home appliances.

Patent

Patenting Next-Generation Cooktop UI

A standout milestone of my time at BSH was co-inventing a novel, patent-pending user interaction and interface concept for induction cooktops (Filed: German Patent Application, pending publication).

As a co-inventor (holding a 22% contribution share), I designed the core logic that makes this technology scalable. Specifically, I developed a mathematical approach to define the optimal number of light indicators required to make this new UI concept adapt to a wide variety of induction cooktop layouts. To validate and refine this logic, I built multiple interactive prototypes. It has been incredibly rewarding to see this systematic approach transition from early code exploration directly into a final, upcoming product line and form the foundation of our patent application.`
  },
  {
    id: "rohde-schwarz",
    company: "Rohde & Schwarz",
    role: "Full-Stack Software Development",
    date: "01/2024 - 07/2024",
    sortDate: "2024-09",
    color: "#b5b9bc",
    image: rohdeImg,
    shortDescription: "Full-Stack Softwaredevelopment Work-Study.",
    fullDescription: `Disclaimer: Due to contractual obligations with Rohde & Schwarz and the public availability of my website, I am unable to disclose specific details regarding the projects I worked on. Therefore, I will only provide a brief and general overview about my time at Rohde & Schwarz.

During my time as a working student at Rohde & Schwarz from January to June 2024, I contributed to key initiatives within the Application Development department. My role focused on full-stack software development for internal tools, leveraging artificial intelligence and large language models to automate business processes and streamline communication workflows between customers and sales.

At Rohde & Schwarz, I deepened my programming skills and explored various technologies to create practical solutions that improved efficiency and reliability. This hands-on experience gave me a comprehensive understanding of the software development lifecycle in a professional environment, from ideation to deployment.

Working at Rohde & Schwarz was highly rewarding, allowing me to apply my skills to meaningful projects while gaining invaluable insight into the operations of a leading technology company, complex software development and the potential of AI to drive real-world business improvements.`
  },
  {
    id: "bmw",
    company: "BMW",
    role: "UX & Prototyping Internship",
    date: "05/2023 - 11/2023",
    sortDate: "2023-12",
    color: "#accdef",
    image: bmwImg,
    shortDescription: "UX & Prototyping Full-Time Internship.",
    fullDescription: `Disclaimer: Due to contractual obligations with BMW and the public availability of my website, I am unable to disclose specific details regarding the projects I worked on. Therefore, I will only provide a brief and general overview about my time at BMW.

From May to November 2023, I had the privilege of interning full-time at the BMW Group in Munich, where I was an integral part of the User Interaction and UX/UI Department. My role was pivotal in supporting the team in UX design and prototyping, specifically focusing on developing concepts, enhancing user experiences, and creating high-fidelity prototypes for in-vehicle infotainment systems designed for the eagerly anticipated Neue Klasse 2025 cars.

This experience was not only highly educational but also deeply fulfilling. It enabled me to apply my theoretical knowledge within a practical, real-world setting, directly contributing to automotive products. I had the fortune of working alongside highly skilled professionals whose expertise in their fields was matched by their commitment to nurturing my growth as a designer. Their mentorship helped me deepen my understanding of UX/UI design processes and the critical role of collaboration in driving innovation.

I am immensely grateful for the experiences and insights gained during my internship at BMW Group. These learnings have profoundly enriched my perspective on design and user experience, ensuring a lasting impact on my approach to future endeavors in the field.`
  },
  {
    id: "teaching",
    company: "Teaching",
    role: "Digital Media Tutor — LMU Munich",
    date: "09/2021 - 03/2022",
    sortDate: "2023-03",
    color: "#db5971",
    image: teachingImg,
    shortDescription: "Some Words About My Experience as a Tutor.",
    fullDescription: `Back in school, I was always looking forward to presentations. I enjoyed standing in front of the class and speaking about a subject that interested me. My teacher once told me after a good presentation, "You have the skill. When thoroughly understanding a topic, you are able to teach it and enlighten others." He recommended that I pursue this skill in some way after school.

In my third semester at LMU Munich, after feeling confident with my knowledge in a course that I'd successfully passed the year before, I decided to apply for an Assistant/Tutor position in Digital Media. The content of this course includes digitization, compression techniques with algorithms like Huffman coding or LZW, chroma subsampling, video compression, audio editing, number systems, and web development with HTML, CSS, and JavaScript.

My tasks were presenting the course content in weekly tutorials as well as creating and grading assignments. I really enjoyed giving tutorials, standing next to a whiteboard in front of students, and conveying the subject's content. Helping a struggling student or seeing them all understand a complicated topic after I explained it to them, and coming up with ideas on how to approach and teach a difficult subject matter, were the things that made me enjoy being a tutor and continue working as one in my subsequent semesters.`
  },
  {
    id: "wacker",
    company: "Wacker Polysilicon",
    role: "Semiconductors & Microchips",
    date: "2019 - 2022",
    sortDate: "2022-08",
    color: "#beeba3",
    image: wackerImg,
    shortDescription: "Recurring Work-Study for Semiconductors and Microchips.",
    fullDescription: `Disclaimer: Due to contractual obligations with Wacker and the public availability of my website, I am unable to disclose specific details regarding the projects I worked on. Therefore, I will only provide a brief and general overview about my time at Wacker.

Between 2019 and 2022, I had the unique opportunity to work at Wacker Chemie AG in Burghausen as part of a Werkstudium program. Over the course of three years, I participated annually for two months full-time in various stages of the polysilicon manufacturing process, specifically focused on the semiconductor and microchip industries.

These experiences provided me with valuable hands-on exposure to the inner workings of polysilicon and chip production, offering insight into the complex processes behind high-tech material development. Each year, I deepened my understanding of manufacturing workflows, making meaningful contributions to Wacker's operations.`
  }
];
