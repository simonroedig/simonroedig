export type Project = {
  id: string;
  title: string;
  date: string;
  sortDate: string;
  color: string;
  shortDescription: string;
  fullDescription: string;
};

// Newest first
export const projects: Project[] = [
  {
    id: "anodi",
    title: "Anodi",
    date: "02/2026",
    sortDate: "2026-02",
    color: "#7E818B",
    shortDescription: "Design of a \"Phygital\" Record Player for Intentional Listening.",
    fullDescription:
      "Conceptual \"phygital\" record player combining streaming services with the intentional rituals of vinyl listening. Features a digital rotating interface, album-focused interaction design, and a physical tonearm to encourage mindful music consumption.",
  },
  {
    id: "privacy-deck",
    title: "PrivacyDeck",
    date: "03/2026",
    sortDate: "2026-03",
    color: "#5fd4fe",
    shortDescription: "Tangible Low-Friction Desktop Privacy Control Dashboard.",
    fullDescription:
      "Physical privacy dashboard providing instant control over camera, microphone, and privacy settings through dedicated hardware controls. Uses a Raspberry Pi Pico, LEDs, display, Python daemon, and a companion software interface.",
  },
  {
    id: "dart-ai",
    title: "DartAI",
    date: "10/2025",
    sortDate: "2025-10",
    color: "#e45f68",
    shortDescription: "Voice-Controlled Dart Game App.",
    fullDescription:
      "Voice-controlled dart scoring application that allows players to track scores through speech input. Includes score announcements using text-to-speech and plans for AI-powered opponents and improved voice recognition.",
  },
  {
    id: "doggy-match",
    title: "DoggyMatch",
    date: "08/2025",
    sortDate: "2025-08",
    color: "#edd6c6",
    shortDescription: "Functional Dog-Sitting Social Media App.",
    fullDescription:
      "Full social networking application built with Flutter and Firebase. Supports dog-owner and dog-sitter matchmaking, user profiles, posts, announcements, location-based discovery, and real-time messaging.",
  },
  {
    id: "noisescape",
    title: "NoiseScape",
    date: "08/2025",
    sortDate: "2025-08",
    color: "#FFFCA3",
    shortDescription: "Adaptive White Noise Sound Generation via EEG (BCI).",
    fullDescription:
      "Brain-computer-interface system that uses EEG signals to discover personalized noise profiles for relaxation, concentration, or sleep. Automatically evaluates different sound configurations and identifies optimal frequency combinations.",
  },
  {
    id: "scentconnect",
    title: "ScentConnect",
    date: "03/2025",
    sortDate: "2025-03",
    color: "#DF5996",
    shortDescription: "Reverse Engineered Air-Fresheners to Connect Peoples' Parfume.",
    fullDescription:
      "Connected physical devices that exchange scents between two people through motion-triggered perfume release. Built through reverse engineering, embedded programming, Wi-Fi communication, sensors, motors, and custom control logic.",
  },
  {
    id: "pulse-ll",
    title: "PulseLL",
    date: "08/2024",
    sortDate: "2024-08",
    color: "#dcc4e4",
    shortDescription: "AI-Generated Music That Adapts to Your Heart Rate While Running.",
    fullDescription:
      "Hackathon project generating adaptive workout music based on real-time heart-rate data. Included smartwatch integration, physiological data processing, AI music generation, backend development, and audio streaming.",
  },
  {
    id: "song-treasure",
    title: "SongTreasure",
    date: "08/2024",
    sortDate: "2024-08",
    color: "#d4d4d4",
    shortDescription: "Uncover Hidden Spotify Gems with Machine Learning.",
    fullDescription:
      "Machine-learning-powered web application that predicts song popularity and recommends lesser-known music from Spotify. Built using a dataset of over 1.6 million songs, feature engineering, regression models, Flask, and Spotify integration.",
  },
  {
    id: "s-bin",
    title: "S-Bin",
    date: "06/2024",
    sortDate: "2024-06",
    color: "#f0c289",
    shortDescription: "AI-Enabled Recycling Bin for Your Home.",
    fullDescription:
      "Physical AI assistant developed in an interdisciplinary workshop. Uses computer vision and GPT-4 Vision to identify and sort waste automatically. Includes Raspberry Pi hardware, sensors, Python software, and a companion mobile application.",
  },
  {
    id: "chordsync",
    title: "ChordSync",
    date: "03/2024",
    sortDate: "2024-03",
    color: "#a3e6eb",
    shortDescription: "A Spotify Web-App for Autoscrolling Chords.",
    fullDescription:
      "Bachelor thesis project integrating Spotify playback with automatically synchronized chord sheets. Uses lyric matching, timestamp alignment, interpolation algorithms, and user research to create a seamless play-along experience for musicians.",
  },
  {
    id: "rememory",
    title: "Rememory",
    date: "09/2023",
    sortDate: "2023-09",
    color: "#5ad0b9",
    shortDescription: "Interaction Design and Physical Prototyping of a Balloon Game.",
    fullDescription:
      "Collaborative memory game using sensor-equipped balloons. Players reproduce sequences through balloon interactions. Included custom hardware development, 3D printing, embedded programming, networking, and physical interaction design.",
  },
  {
    id: "connectivity-control",
    title: "ConnectivityControl",
    date: "03/2023",
    sortDate: "2023-03",
    color: "#d8c2b0",
    shortDescription: "IoT: Connectivity Mode Control on Smart Home Devices.",
    fullDescription:
      "Large team IoT project enabling smart devices to switch between Offline, Access Point, Local Network, and Online modes. Included hardware development, middleware integration, React-based interfaces, MQTT communication, and web technologies.",
  },
  {
    id: "webdevelopment",
    title: "Webdevelopment",
    date: "03/2023",
    sortDate: "2023-03",
    color: "#acc8df",
    shortDescription: "Some Words About My Website.",
    fullDescription:
      "Personal website designed and implemented entirely from scratch using HTML, CSS, and JavaScript. Inspired by Neo-Brutalism and built through a full design process from sketching and Figma prototyping to frontend and backend implementation.",
  },
  {
    id: "chrome-extension",
    title: "Chrome Extension",
    date: "02/2023",
    sortDate: "2023-02",
    color: "#71ba6a",
    shortDescription: "Web Browser Extension: Themes for University Website.",
    fullDescription:
      "Chrome extension developed for LMU's Uni2Work platform, enabling users to apply alternative visual themes including Pride-themed designs. Published on the Chrome Web Store and built using HTML, CSS, JavaScript, and browser APIs.",
  },
  {
    id: "music",
    title: "Music",
    date: "01/2023",
    sortDate: "2023-01",
    color: "#cda369",
    shortDescription: "My Favourite Recreational Activity Is Creating and Playing Music.",
    fullDescription:
      "Self-taught musician experienced with guitar, piano, ukulele, and music theory. Deep interest in the relationship between music, physics, harmony, and emotional expression through composition and performance.",
  },
  {
    id: "ecoshower",
    title: "EcoShower",
    date: "09/2022",
    sortDate: "2022-09",
    color: "#b8d9ea",
    shortDescription: "Using Practical Research, Analysis, Ideation, and Prototyping.",
    fullDescription:
      "Sustainability-focused shower concept developed through contextual inquiry, affinity diagramming, ideation workshops, storyboards, and prototyping. The concept uses a smart LED-equipped shower head and mobile app to encourage shorter showers and reduce water consumption.",
  },
  {
    id: "quarto",
    title: "\"Quarto\" Game",
    date: "09/2022",
    sortDate: "2022-09",
    color: "#598cc2",
    shortDescription: "Browser-Based Board Game with an AI.",
    fullDescription:
      "Browser implementation of the board game Quarto, including drag-and-drop interactions and a custom AI opponent. Originated from a university systems programming project involving networking, protocols, and C programming.",
  },
  {
    id: "meet",
    title: "\"Meet\" Prototype",
    date: "01/2022",
    sortDate: "2022-01",
    color: "#c9e5d2",
    shortDescription: "Mobile Application Prototype Following a UCD Process.",
    fullDescription:
      "Social event application prototype developed by a team of students following a User-Centered Design process. Included brainstorming, wireframing, prototyping, heuristic evaluation, usability testing, and iterative refinement.",
  },
  {
    id: "media-design",
    title: "Media Design",
    date: "11/2021",
    sortDate: "2021-11",
    color: "#e393f3",
    shortDescription: "I Started Freelancing in Video and Graphic Design When I Was 14.",
    fullDescription:
      "Started with 3D intro animations for YouTubers and later freelanced in graphic and motion design. Developed expertise in tools such as Photoshop, After Effects, Premiere Pro, Figma, Maya, and Cinema4D while working on commercial and creative projects.",
  },
];
