import anodiImg from "@/assets/projects/anodi.png";
import privacyDeckImg from "@/assets/projects/privacydeck.jpg";
import dartAiImg from "@/assets/projects/dartai.jpg";
import doggyMatchImg from "@/assets/projects/doggy.jpg";
import noiseScapeImg from "@/assets/projects/noisescape.jpg";
import scentConnectImg from "@/assets/projects/scentconnect.jpg";
import pulseLlImg from "@/assets/projects/pulsell.jpg";
import songTreasureImg from "@/assets/projects/songtreasure.jpg";
import sBinImg from "@/assets/projects/sbin.jpg";
import chordSyncImg from "@/assets/projects/chordsync.jpg";
import rememoryImg from "@/assets/projects/rememory.jpg";
import connectivityControlImg from "@/assets/projects/pwp.jpg";
import chromeExtensionImg from "@/assets/projects/chromextension.jpg";
import musicImg from "@/assets/projects/music.jpg";
import ecoShowerImg from "@/assets/projects/concept.jpg";
import quartoImg from "@/assets/projects/quarto.jpg";
import meetImg from "@/assets/projects/meet.jpg";
import mediaDesignImg from "@/assets/projects/mediadesign.jpg";
import webDevelopmentImg from "@/assets/projects/webdev.jpg";

// New imports for opencards
import ocWebRedesign from "@/assets/projects/opencards/website/redesign.png";

import ocMeetPortf from "@/assets/projects/opencards/meet/portf.jpg";
import ocQuarto from "@/assets/projects/opencards/quarto/quarto.jpg";
import ocChromeScreen from "@/assets/projects/opencards/chrome/screenshot.jpg";
import ocShowerStory from "@/assets/projects/opencards/shower/storyboard.jpg";
import ocConnDemo from "@/assets/projects/opencards/connect/demo.gif";

import ocSbinGif from "@/assets/projects/opencards/sbin/sbingif.gif";
import ocSbinStory from "@/assets/projects/opencards/sbin/storyboard.jpg";
import ocSbinApp2 from "@/assets/projects/opencards/sbin/sbinapp2.jpg";

import ocSongDemo from "@/assets/projects/opencards/songtreasure/songtreasuredemo.gif";
import ocPulseStory from "@/assets/projects/opencards/pulsell/StoryboardPIIS.jpg";
import ocNoiseScreen from "@/assets/projects/opencards/noisescape/noisescape_screen.jpg";
import ocScentScreen from "@/assets/projects/opencards/scent/scentscreen.jpg";

import ocDoggy from "@/assets/projects/opencards/doggy/doggy.jpg";
import ocDoggyDemo from "@/assets/projects/opencards/doggy/doggydemo.gif";

import ocDartAi from "@/assets/projects/opencards/dartai/dartai.jpg";

import ocPrivacyScreen from "@/assets/projects/opencards/privacydeck/privacydeck_large.jpg";
import ocPrivacyPdf from "@/assets/projects/opencards/privacydeck/PrivacyDeck_Paper_Compressed.pdf";

import ocAnodi1 from "@/assets/projects/opencards/anodi/anodi1.png";
import ocAnodi2 from "@/assets/projects/opencards/anodi/anodi2.png";
import ocAnodi3 from "@/assets/projects/opencards/anodi/anodi3.png";
import ocAnodi4 from "@/assets/projects/opencards/anodi/anodi4.png";

export type RichContentBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt?: string; noBorder?: boolean; size?: "xxsmall" | "xsmall" | "small" | "large" | "xlarge" }
  | { type: "video"; url: string }
  | { type: "link"; text: string; url: string }
  | { type: "pdf"; url: string; text?: string };

export type Project = {
  category: "Personal" | "University";
  isStarred: boolean;
  id: string;
  title: string;
  date: string;
  sortDate: string;
  color: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  richContent?: RichContentBlock[];
};

export const projects: Project[] = [
  {
    id: "anodi",
    category: "Personal",
    isStarred: false,
    title: "Anodi",
    date: "02/2026",
    sortDate: "2026-02",
    color: "#7E818B",
    image: anodiImg,
    shortDescription: "Design of a \"Phygital\" Record Player for Intentional Listening.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocAnodi1 },
      { type: "text", content: "Music streaming services such as Spotify have made access to music nearly effortless. While this convenience enhances efficiency and availability, it also contributes to an overwhelming abundance of content. As a result, music consumption often becomes passive, and the perceived value of listening diminishes.\n\nIn contrast, analog media like vinyl records and CDs encouraged a more intentional and ritualized experience. The physical act of selecting, handling, and playing music created a deeper sense of engagement." },
      { type: "image", src: ocAnodi3, noBorder: true, size: "xsmall" },
      { type: "text", content: "Anodi is a conceptual response to this shift. It reimagines the record player by combining the accessibility of digital streaming with the tactile qualities of analog interaction. Originally developed as part of a potential master’s thesis idea, the project now exists as a design exploration and visualization.\n\nThe concept envisions a record player where the traditional vinyl is replaced by a digital interface. At its center is a touchscreen, either circular and physically rotating, or rectangular with a circular display that simulates rotation. Through this interface, users can access streaming services such as Spotify or Tidal, presented in a deliberately reduced and curated UI. Music is organized strictly in albums, echoing the structure of physical formats and encouraging more intentional listening." },
      { type: "image", src: ocAnodi4, noBorder: true, size: "xsmall" },
      { type: "text", content: "A defining feature of Anodi is its physical tonearm. To begin playback, the user must manually move and place the tonearm onto the digital surface. This interaction triggers the rotation of the interface, visualizes contact through subtle feedback, and initiates playback, mirroring the ritual of a traditional record player.\n\nThe goal of Anodi is to reintroduce meaningful friction into the listening experience. By slowing down interaction and emphasizing physical engagement, the concept aims to transform music consumption from a passive activity into a more conscious and valued ritual, while still leveraging the convenience of modern streaming technologies." },
      { type: "image", src: ocAnodi2 }

    ]
  },
  {
    id: "privacy-deck",
    category: "University",
    isStarred: false,
    title: "PrivacyDeck",
    date: "03/2026",
    sortDate: "2026-03",
    color: "#5fd4fe",
    image: privacyDeckImg,
    shortDescription: "Tangible Low-Friction Desktop Privacy Control Dashboard.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocPrivacyScreen, size: "xlarge" },
      { type: "text", content: "PrivacyDeck — Tangible Privacy Control. Zero Effort. Always Aware.\n\nDeveloped for the Practical Privacy and Security (PPS) course at LMU Munich together with Franziska Oberländer, Mustafa Durani, and Tristan Häuser.\n\nAlthough privacy tools exist, they are buried deep inside complex, fragmented OS settings with no unified dashboard or immediate feedback. Most users therefore never enable protective features. PrivacyDeck solves this with a compact USB-connected physical panel: instant control via buttons, toggles, and a slider over camera, microphone, and other core privacy functions. A physial personalized avatar reflects your current privacy state via LEDs, delivering real-time visual feedback. Awareness alone is enough — no more embarrassing moments or background leaks.\n\nFully working on Linux (tested on Zorin OS), partially supported on Windows 11 and macOS. Hardware uses a Raspberry Pi Pico (RP2040) with TFT display, neopixel LEDs, and controls; the host runs a Python daemon. A separate GUI prototype visualizes the digital avatar and configuration.\n\nThe full repository contains all 3D-printable assets, laser-cut case files, Pico code, the OS daemon, and the GUI software prototype." },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/T16Eui8qbHk" },
      { type: "link", url: ocPrivacyPdf, text: "➜ Scientific Paper" },
      { type: "link", url: "https://github.com/simonroedig/PrivacyDeck", text: "➜ PrivacyDeck on Github" }
    ]
  },
  {
    id: "dart-ai",
    category: "Personal",
    isStarred: false,
    title: "DartAI",
    date: "10/2025",
    sortDate: "2025-10",
    color: "#e45f68",
    image: dartAiImg,
    shortDescription: "Voice-Controlled Dart Game App.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocDartAi },
      { type: "text", content: "DartAI is an intuitive web app that allows users to play real darts while tracking their scores and progress using voice input.\n\nI noticed a growing trend among young people playing darts, particularly with traditional steel-tip darts, which require a real dartboard and lack built-in electronic scoring. To automate scorekeeping, many players resort to expensive camera setups that detect and evaluate thrown darts.\n\nTo make this process simpler and more accessible, I created DartAI — a web-based application that lets players call out their hit fields, with the app processing those voice inputs automatically. In addition, DartAI features a voice moderator that announces scores and updates using Google’s Chirp 3 TTS. Players can also compete with friends and track their scores together. Looking ahead, I plan to implement an AI opponent feature that allows users to play against computer-controlled players of varying difficulty levels and further improve the voice recognition capabilities.\n\nCheck out my GitHub repository for more details. Or try it out online." },
      { type: "link", url: "https://github.com/simonroedig/DartAI", text: "➜ DartAI on Github" },
      { type: "link", url: "https://simonroedig.github.io/DartAI/", text: "➜ DartAI Online" }
    ]
  },
  {
    id: "doggy-match",
    category: "Personal",
    isStarred: false,
    title: "DoggyMatch",
    date: "08/2025",
    sortDate: "2025-08",
    color: "#edd6c6",
    image: doggyMatchImg,
    shortDescription: "Functional Dog-Sitting Social Media App.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocDoggy },
      { type: "text", content: "DoggyMatch is a full-fledged social networking app I built with Flutter and Firebase that connects dog owners with dog sitters, and also helps owners connect with each other. I started this project as a way to teach myself mobile app development and explore how to build a cross-platform application from the ground up. What began as a learning project eventually became a fully functional social media app with working chats, posts, friends, and more." },
      { type: "image", src: ocDoggyDemo, size: "xxsmall" },
      { type: "text", content: "I started by designing the app's user interface in Figma, creating wireframes and components to visualize the app's flow and layout. This rather big personal project taught me the importance of frontloading design work before jumping into coding. I then set up the backend using Firebase, which provided a robust and scalable solution for user authentication, real-time database management, and cloud storage. For the frontend, I chose Flutter due to its ability to create natively compiled applications for both iOS and Android from a single codebase. The app allows users to create their own profiles, define whether they are dog owners or dog sitters, create posts, publish announcements, find friends via location, and chat with each other in real-time.\n\nCheck out my GitHub repository for more details." },
      { type: "link", url: "https://github.com/simonroedig/DoggyMatch", text: "➜ DoggyMatch on Github" }
    ]
  },
  {
    id: "noisescape",
    category: "University",
    isStarred: true,
    title: "NoiseScape",
    date: "08/2025",
    sortDate: "2025-08",
    color: "#FFFCA3",
    image: noiseScapeImg,
    shortDescription: "Adaptive White Noise Sound Generation via EEG (BCI).",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocNoiseScreen },
      { type: "text", content: "Many people listen to \"White Noise\" sounds to help them relax, focus, or fall asleep. White Noise contains all frequencies within the range of human hearing. However, there are also other “colors” of noise, such as Brown Noise, which emphasizes lower frequencies. Noise generators are widely available online, allowing people to create their own customized sounds.\n\nThis led me to realize that people often have personal preferences for the exact composition of noise they listen to. Different combinations of frequencies and volumes may be better suited for different moods or mental states, such as relaxation, concentration, or sleep.\n\nTogether with my team of three colleagues, we developed NoiseScape — a system that helps users discover their ideal noise profile. By connecting a Brain-Computer Interface (BCI) to our software, users can choose a target state they want to achieve (e.g., relaxation). The system then runs a series of sound setups, analyzes the EEG data, and identifies the specific frequencies that best maintain the chosen state for that individual.\n\nCheck out our GitHub repository for details on how it works in the README." },
      { type: "link", url: "https://github.com/simonroedig/NoiseScape", text: "➜ NoiseScape on Github" }
    ]
  },
  {
    id: "scentconnect",
    category: "University",
    isStarred: false,
    title: "ScentConnect",
    date: "03/2025",
    sortDate: "2025-03",
    color: "#DF5996",
    image: scentConnectImg,
    shortDescription: "Reverse Engineered Air-Fresheners to Connect Peoples' Parfume.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocScentScreen, size: "small" },
      { type: "text", content: "In a Practical Experience Design Workshop, my colleagues and I developed Scent Connect — a pair of interconnected devices that release each other’s perfume through a movement trigger on the other person’s device.\n\nHow it works:\nMotion Detection: When Person A moves in their space, a sensor detects the motion and sends a signal to Person B’s device, and vice versa. Movement from either side triggers the scent dispersal for the other person.\nScent Activation: Person B’s Scent Connect then releases their favorite fragrance of Person A, instantly creating a sensory link between them. The same happens in reverse when Person B moves.\n\nLED Feedback:\nPerson A’s device:\n– White: Movement detected at Person A’s location.\n– Green: Signal successfully sent to Person B’s device.\n– Red: Error – scent could not be dispensed.\nPerson B’s device:\n– Partner’s color (e.g., Blue/Purple): Device activated, releasing Person A’s scent.\n\nTo build this system, we reverse-engineered a standard air freshener from a drugstore. We identified the gearwheel mechanism’s control algorithm and replaced it with a custom setup: a microcontroller, a DC motor, and a motion sensor to trigger the release on command. An on/off switch and indicator light allow manual control, while the LED system shows status updates when each device triggers and releases the perfume. The control logic was programmed in MicroPython and the devices communicate over Wi-Fi.\n\nCheck out my GitHub repository for more details." },
      { type: "link", url: "https://github.com/simonroedig/ScentConnect", text: "➜ ScentConnect on Github" }
    ]
  },
  {
    id: "pulse-ll",
    category: "University",
    isStarred: true,
    title: "PulseLL",
    date: "08/2024",
    sortDate: "2024-08",
    color: "#dcc4e4",
    image: pulseLlImg,
    shortDescription: "AI-Generated Music That Adapts to Your Heart Rate While Running.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocPulseStory, size: "small" },
      { type: "text", content: "Physical exercise is often more enjoyable and effective when accompanied by music, especially when the music is tailored to the specific activity and pace of the workout.\n\nHowever, manually managing music during a workout can be disruptive and counterproductive. PulseLL addresses this by creating an intelligent system that automatically generates and adjusts music based on real-time workout data, eliminating the need for manual interaction.\n\nMy team of four colleagues and I developed PulseLL during a one-week hackathon, where I led the backend development. My responsibilities included creating the server, processing physiological data from the iOS smartwatch client, generating and interpreting music using ChatGPT, and enabling live audio streaming to the client for the user to listen to.\n\nYou can find my contribution to this project and more in depth explanation on my GitHub profile." },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/T1xxkC8WIHs?si=isZWKGBEuABaf3TE&start=41" },

      { type: "link", url: "https://github.com/simonroedig/PulseLL_Backend", text: "➜ PulseLL (Backend) on Github" }
    ]
  },
  {
    id: "song-treasure",
    category: "University",
    isStarred: true,
    title: "SongTreasure",
    date: "08/2024",
    sortDate: "2024-08",
    color: "#d4d4d4",
    image: songTreasureImg,
    shortDescription: "Uncover Hidden Spotify Gems with Machine Learning.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocSongDemo },
      { type: "text", content: "As a music enthusiast, I often find myself bored and uninspired by the repetitive nature of Spotify's playlists. Seeking a solution my team and I developed SongTreasure, a web application that uses machine learning to recommend hidden gems on Spotify. You can simply select your desired genre and ammount of songs and SongTreasure will search for the newest unknown songs in Spotify's database, predict the songs' popularity with our machine learning model and present them to you. You can also authenticate with your Spotify account and save the songs to your playlist after listening to a preview of them.\n\nTo achieve this we have gather over 1.6 million songs from Spotify's library, did data preprocessing, feature engineering, and trained a regression based machine learning model to predict the popularity of songs. We then built a fully responsive web application with Flask that connects to Spotify's API and applies our model to recommend songs to the user.\n\nSongTreasure is now open-source and available on my GitHub profile." },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/8V1NvSnASxg?si=CPMOc3YkaireK4qi" },
      { type: "link", url: "https://github.com/simonroedig/SongTreasure", text: "➜ SongTreasure on Github" }
    ]
  },
  {
    id: "s-bin",
    category: "University",
    isStarred: false,
    title: "S-Bin",
    date: "06/2024",
    sortDate: "2024-06",
    color: "#f0c289",
    image: sBinImg,
    shortDescription: "AI-Enabled Recycling Bin for Your Home.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocSbinGif },
      { type: "image", src: ocSbinStory, size: "small" },
      { type: "text", content: "S-Bin is the result of a Design Workshop where we created physical AI assistants for the home. I collaborated with five other students from Hochschule München, studying \"Digital Technology Management\", LMU students studying \"Art and Multimedia\", and fellow students from my course of study in \"HCI\". Our task was to systematically explore innovative digital concepts for new integration and interaction possibilities for physical AI assistants.\n\nMy team and I developed \"S-Bin,\" a smart recycling bin that uses AI to recognize and sort waste. We employed woodcutting, 3D printing, physical computing with a Raspberry Pi, microcontroller, and various sensors, programming in Python.\n\nOnce the waste is detected by a distance sensor as it is thrown into the bin, it is moved to a section equipped with a camera and an LED. The camera captures an image of the waste and sends it to GPT-4 Vision. Upon receiving the analysis, S-Bin sorts the waste into the appropriate section. If the waste is not recognized or is non-recyclable, it is returned to the user for manual disposal.\n\nAdditionally, we developed an iOS app that connects with S-Bin and displays statistics about the waste produced by the user." },
      { type: "image", src: ocSbinApp2, size: "xxsmall" },
    ]
  },
  {
    id: "chordsync",
    category: "University",
    isStarred: true,
    title: "ChordSync",
    date: "03/2024",
    sortDate: "2024-03",
    color: "#a3e6eb",
    image: chordSyncImg,
    shortDescription: "A Spotify Web-App for Autoscrolling Chords.",
    fullDescription: "",
    richContent: [
      { type: "image", src: chordSyncImg },
      { type: "text", content: "Musicians, particularly guitarists, often encounter disruptions when attempting to play chords along with songs (\"play-along\"), as they face the cumbersome task of manually searching for chord-sheets, selecting songs with available chords, and scrolling through these sheets to stay synchronized with the music.\n\nSeeking a solution, I came up with the idea of ChordSync, a software I designed and implemented to streamline the play-along experience for guitarists.\n\nAfter finalizing my idea, I conducted research to validate it with users and to understand the market. I then began the initial development process, exploring the feasibility of the two main algorithms in Python. After confirming that the algorithms could be implemented, I decided to base my Bachelor Thesis on this idea. I contacted several researchers at LMU Munich until I found Dr. Jakob Karolus, who offered his supervision for this project.\n\nChordSync seamlessly integrates with Spotify, allowing for instant retrieval and display of accurate chord-sheets sourced from Ultimate-Guitar. Furthermore, it incorporates a bi-directional Autoscroll algorithm that synchronizes the song’s playback with the displayed chord-sheet. By utilizing timestamps provided by the Musixmatch lyrics API, the algorithm matches lyrics with those from Ultimate-Guitar, overcoming obstacles such as spelling disparities and variations in line separations. In cases where direct matches are not feasible, an interpolation algorithm is employed to synchronize sections and chords.\n\nI conducted a user study with 12 participants focusing on the temporal dimension of disruption occurrences, resulting in refinements to ChordSync’s UI, and demonstrating its capability to circumvent disruptions and provide a more seamless, efficient play-along experience.\n\nChordSync is a non-commercial research project developed as part of an academic thesis. The code is occasionally public on my GitHub for transparency, but it is not intended for reuse, redistribution, or monetization, and anyone running it does so at their own responsibility due to its reliance on third-party services.\n\nAn online demo is available for academic research purposes only and is not a public service. Access requires a Spotify login and prior authorization—please contact me via email if you’d like to try it. (The server may take 30–60 seconds to wake up.)" },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/wDmgxC9_2-g?si=t1HquZXkYSw7SlEB" },
      { type: "link", url: "https://www.jakob-karolus.de/", text: "Supervisor: Dr. Jakob Karolus" },
      { type: "link", url: "https://github.com/simonroedig/ChordSync", text: "➜ ChordSync on Github" },
      { type: "link", url: "https://chordsync.onrender.com/", text: "➜ ChordSync Online" }
    ]
  },
  {
    id: "rememory",
    category: "University",
    isStarred: false,
    title: "Rememory",
    date: "09/2023",
    sortDate: "2023-09",
    color: "#5ad0b9",
    image: rememoryImg,
    shortDescription: "Interaction Design and Physical Prototyping of a Balloon Game.",
    fullDescription: "",
    richContent: [
      { type: "video", url: "https://www.youtube-nocookie.com/embed/5G2V6S5ESQc?si=Hv4AwMzs-89fx3rN" },
      { type: "text", content: "Rememory is an auditory and visual memory game with balloons, developed by a fellow student and me. Each player holds a balloon with a dedicated color and note, and stands in a circle around an \"instructor\" balloon. This balloon provides a sequence of colors accompanied by a note, corresponding with each color. The players' goal is to match this sequence by squeezing their balloons as a team in the correct order. The instructor balloon then indicates whether this sequence is correct or incorrect and either continues with a more complex sequence each round or gives the players another try.\n\nMy team partner and I both own a 3D printer and we iterated through multiple 3D models until we came up with an airtight device that can be inserted into the balloons. This device holds all the required hardware that we soldered together. The hardware consists of an ESP32 microcontroller from XIAO, a passive buzzer, a pressure sensor, a neopixel jewel LED, as well as a slide switch and a 3.7-volt battery. I programmed the hardware and implemented the game logic in Arduino's C++. The code is based on a station-access point architecture with communication based on HTTP.\n\nYou should really check out my awesome demo video for this project and let the interaction design speak for itself. (Oh, and the game is not mocked, it works flawlessly and is pretty refined. You can find the code on my GitHub profile.)" },
      { type: "link", url: "https://github.com/simonroedig/Rememory", text: "➜ Rememory on Github" }
    ]
  },
  {
    id: "connectivity-control",
    category: "University",
    isStarred: true,
    title: "ConnectivityControl",
    date: "03/2023",
    sortDate: "2023-03",
    color: "#d8c2b0",
    image: connectivityControlImg,
    shortDescription: "IoT: Connectivity Mode Control on Smart Home Devices.",
    fullDescription: "",
    richContent: [
      { type: "video", url: "https://www.youtube-nocookie.com/embed/a8ukL7uDfS4?si=juy4tj0Vkpp_rLrN" },
      { type: "text", content: "In a practical web development course, a team of 16 people and I built \"ConnectivityControl,\" a framework that allows users to switch between four device connectivity levels: Offline, Access Point mode, Local Network mode, and Online.\n\nThe team was divided into a hardware group, middleware group, and software group. I was part of the hardware group and built a smart camera and an environmental sensing unit using multiple hardware components, microcontrollers, Raspberry Pi's, laser cutting, 3D printing, as well as programming the hardware and the interface with the middleware group.\n\nThis course taught me a lot about web programming: IoT, WoT, the HTTP and MQTT protocols, Web Analytics, Web Servers, APIs, React, and Captive Portals. All in a profoundly practical manner.\n\nCheck out my demo of ConnectivityControl." },
      { type: "image", src: ocConnDemo, size: "xxsmall" },
      { type: "link", url: "https://github.com/simonroedig/MotorizedFader_Esp32_MicroPython", text: "➜ Motorized Fader on Github" }
    ]
  },
  {
    id: "webdevelopment",
    category: "Personal",
    isStarred: false,
    title: "Webdevelopment",
    date: "03/2023",
    sortDate: "2023-03",
    color: "#acc8df",
    image: webDevelopmentImg,
    shortDescription: "Some Words About My Website.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocWebRedesign },
      {
        type: "text",
        content: "My website is completely self-written and has evolved over multiple iterations. It was originally built with HTML, CSS, and quite some JavaScript, and is influenced by the \"Neo-Brutalism\" design trend, embracing strong outlines, contrasting colors, and bold typography. With my design, I tried to create something unique and bold, opposing most modern web design trends.\n\nI started by hand-sketching some ideas on my tablet, continued by creating a high-fidelity prototype in Figma, and eventually refined and coded my webpage.\n\nI first got in touch with web development in my first semester at LMU Munich. There, I learned the basics of HTML, CSS, and JavaScript. I thoroughly enjoyed this field and designed and implemented some smaller projects early on (e.g.).\n\nOver time, I gained a lot of advanced skills in this area. Teaching and assisting the subject of web development one year later as a tutor further deepened my knowledge, allowing me to design and build responsive websites with increasing complexity.\n\nIn a later iteration, I migrated the entire project to Next.js, which significantly improved structure, performance, and scalability. This also allowed me to further refine the design system and component-based architecture of the site, making future iterations more modular and maintainable.\n\nI now have advanced skills and a profound understanding of web development, from Frontend to Backend, including various frameworks and libraries like React, Next.js, Node.js, Express.js, Bootstrap, Svelte, Flask, Django, and more.\n\nMy personal website continues to evolve through iterative redesigns and technical improvements, which you can see reflected in its current version."
      }
    ]
  },
  {
    id: "chrome-extension",
    category: "Personal",
    isStarred: false,
    title: "Chrome Extension",
    date: "02/2023",
    sortDate: "2023-02",
    color: "#71ba6a",
    image: chromeExtensionImg,
    shortDescription: "Web Browser Extension: Themes for University Website.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocChromeScreen },
      { type: "text", content: "The main platform most students use at the University of Munich is Uni2Work. During pride season, I noticed students discussing the fact that Uni2Work doesn't adopt a pride theme with the typical rainbow flag, as other websites do during that time. Since Uni2Work's design is predominantly a monotonous green, I decided to program a general browser extension for Chromium, allowing users to select different themes for this webpage, including a pride theme.\n\nAfter some research on how browser extensions work, I finished programming \"Uni2WorkThemes\" and published the extension in the Chrome Web Store for other students to use.\n\nShort explanation: The popup's HTML is only displayed when the user is on the active tab ://.uni2work.ifi.lmu.de/*. Here, the user can select the different themes. On every other website, the extension's popup, when clicked, displays \"Go to Uni2Work\". By clicking on the different themes, a JavaScript file inserts the new CSS within a style tag into the current HTML header. The activated theme is then also stored in the browser's local storage and retrieved by different JavaScript files when opening and changing the theme in the popup, and when browsing on Uni2Work. Check out my extension on the Chrome Web Store and see for yourself." },
      { type: "link", url: "https://chromewebstore.google.com/detail/uni2workthemes/jainhimpodibbfonbpdnijmiejalmbko", text: "➜ Uni2WorkThemes Add-On" },
      { type: "link", url: "https://github.com/simonroedig/Uni2WorkThemes", text: "➜ Uni2WorkThemes on Github" }
    ]
  },
  {
    id: "music",
    category: "Personal",
    isStarred: false,
    title: "Music",
    date: "01/2023",
    sortDate: "2023-01",
    color: "#cda369",
    image: musicImg,
    shortDescription: "My Favourite Recreational Activity Is Creating and Playing Music.",
    fullDescription: "",
    richContent: [
      { type: "text", content: "When I was about 12 years old, I taught myself to play the electric guitar. I quickly made progress and continued to play daily. Now, I am very experienced with plucked string instruments. Besides the electric guitar, I also play the western guitar, ukulele, and classical guitar, which I probably enjoy the most. I also taught myself the piano when I was around 17. Learning the piano helped me visualize the guitar fretboard and understand how chords and scales work on other instruments.\n\nWhat drives me most in playing instruments is music theory. It is essentially the language of music, much like how math is the language of physics. Music theory explains why music works, why certain chord progressions sound good, and which ones evoke feelings of sadness, happiness, confusion, or mystery. It teaches how to build chords that sound unexpected and dissonant, and how to still resolve into a minor cadence.\n\nMusic is closely related to physics because a note is, in essence, an acoustic wave—a vibration that travels through a medium like air. Chords are just interferences of multiple waves or notes. By superimposing certain notes onto a chord and playing multiple chords in a specific sequence, one can evoke specific emotions. I find that very fascinating. This is what music and music theory mean to me and what drives me to continue playing instruments and further educating myself in this field." },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/meXMsbuJh3o?si=Q-yF8579wt2pE6CS" },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/FOKW1iGNSi0?si=AOpezljwrHiE9wZv" },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/IQ0Xdby2QvA?si=cYi_Urx1cqeSfCIE" },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/1ZTGkr1JGyE?si=TteEGqZ3UoXpkUUy" },
      { type: "link", url: "https://www.youtube.com/playlist?list=PL4JueG28xX-fsfojUC99vGewG34qglxhU", text: "➜ Watch All Music Videos" }
    ]
  },
  {
    id: "ecoshower",
    category: "University",
    isStarred: false,
    title: "EcoShower",
    date: "09/2022",
    sortDate: "2022-09",
    color: "#b8d9ea",
    image: ecoShowerImg,
    shortDescription: "Using Practical Research, Analysis, Ideation, and Prototyping.",
    fullDescription: "",
    richContent: [
      { type: "video", url: "https://www.youtube-nocookie.com/embed/7gagMO6CiMA?si=P_6FL2pOrOEw0Fda" },
      { type: "image", src: ocShowerStory },
      { type: "text", content: "In a two week practical course a team of five other students and me systematically elaborated an interaction-concept. Objective was to put the iterative User-Experience design-process into practice and work through its initial convergent and divergent phases. We started by conducting field research in form of multiple In-Context interviews (Contextual Inquiry) with companies in the sustainable-energy sector. We then sorted and interpreted this collected data via Affinity Diagramming, derived insights from clustered data, and continued with generating \"How-Might-We\"-Questions to translate the insights we had into ways we can tackle and solve this problem.\n\nDr. Marin Zec then helped us in the ideation phase. He presented us design-thinking concepts, creative problem-solving ways, and guided us through the \"Crazy-8\", \"6-3-5\", and \"SCAMPER\" methods until we eventually had our concept idea which we then elaborated in storyboards and finally in a video-prototype.\n\nOur concept was a showerhead that indicates the time passed in the shower via a LED-strip which changes colour sequentially from green, to orange, to red. The time can be set with a compatible mobile app which lets the user set a absolute time for showering or a dynamic time based on the water temperature and flow rate. For the app-prototype seen in the final video, we used Figma. For the physical LED-strip on the showerhead we used an ESP8266. This microcontroller has an integrated WiFi module to create a server that hosts a web page which we used to controll the LED-strip remotely. Check out this blog depicting this concepts' progress as well as further information about the user-research and concept." },
      { type: "link", url: "https://xn--kreativittstechniken-jzb.info/", text: "Guided by: Dr. Marin Zec" },
      { type: "link", url: "https://conceptdevelopmentlmu.wordpress.com/author/cd20222/", text: "➜ Project Blog" }
    ]
  },
  {
    id: "quarto",
    category: "Personal",
    isStarred: false,
    title: "\"Quarto\" Game",
    date: "09/2022",
    sortDate: "2022-09",
    color: "#598cc2",
    image: quartoImg,
    shortDescription: "Browser-Based Board Game with an AI.",
    fullDescription: "",
    richContent: [
      { type: "image", src: ocQuarto },
      { type: "text", content: "Quarto is a board game with 16 stones, each having four attributes. The goal is to place the stone given by your opponent in a row where all stones share at least one common attribute. Each turn, your opponent chooses the stone you must place.\n\nAs part of my System Programming course, three fellow students and I programmed a client for this game. We used the C programming language and learned about system programming concepts such as pipes, sockets, protocols, client/server architecture, scheduling, and processes/threads. I enjoyed programming in C because it is a low-level language that contrasts with most modern languages, giving me a sense of \"ownership\" over the computer. For this project, I used Linux and even switched to it as my standard OS for six months.\n\nThe server for the Quarto game, set up by the university, lacked a proper GUI, and I couldn't find any suitable online version with a nice user interface. Therefore, I decided to use my web development skills to create the game as a browser application. My implementation allows players to play Quarto against the computer by dragging and dropping the stones onto the game board.\n\nIn addition to creating an intuitive and attractive UI, I focused on enhancing the game experience by making the player wait for the computer to take its turn. The drag-and-drop interaction, instead of clicking, also contributes to a more realistic feel. Ensuring the visibility of system status was important to me, so the user can always see what the computer is currently doing and understand what to do when it's their turn. I also programmed a simple AI that can be activated, allowing the player to only ever \"win\" in the form of a tie." },
      { type: "link", url: "https://simonroedig.github.io/QuartoGame/", text: "➜ Play Quarto" },
      { type: "link", url: "https://github.com/simonroedig/QuartoGame", text: "➜ Quarto on Github" }
    ]
  },
  {
    id: "meet",
    category: "University",
    isStarred: false,
    title: "\"Meet\" Prototype",
    date: "01/2022",
    sortDate: "2022-01",
    color: "#c9e5d2",
    image: meetImg,
    shortDescription: "Mobile Application Prototype Following a UCD Process.",
    fullDescription: "",
    richContent: [
      { type: "video", url: "https://www.youtube-nocookie.com/embed/ep7bdgp4G1w?si=QVydvHFPVYbMhX5v" },
      { type: "text", content: "Meet is an app designed to connect people through various activities. It allows users to create their own events for others to join or participate in events created by other users. Organization is simplified with an integrated chat function for communicating with new friends.\n\nSix other students and I developed this idea for a mobile application and created a high-fidelity prototype following a user-centered design (UCD) process.\n\nIn brief, we started by brainstorming and sketching out ideas, then created a design brief. We moved on to wireframing in Miro and began prototyping in Adobe XD. With my background in Adobe software and my interest in UX design, I contributed significantly to this project. I generated most of the ideas, guided the group as a leader, and also distributed tasks.\n\nWe conducted a usability heuristic evaluation, worked through a system checklist, iteratively improved our prototype, and concluded with usability testing, after which we refined our prototype further.\n\nWe finished our project with a short video presentation and a portfolio." },
      { type: "image", src: ocMeetPortf, size: "small" }
    ]
  },
  {
    id: "media-design",
    category: "Personal",
    isStarred: false,
    title: "Media Design",
    date: "11/2021",
    sortDate: "2021-11",
    color: "#e393f3",
    image: mediaDesignImg,
    shortDescription: "I Started Freelancing in Video and Graphic Design When I Was 14.",
    fullDescription: "",
    richContent: [
      { type: "video", url: "https://www.youtube-nocookie.com/embed/O944TZy-9dE?si=-x8PMs-bnUOYj9qv" },
      { type: "text", content: "I initially started back in 2014 by creating short 3D introduction animations for YouTubers. I uploaded my final projects on my own YouTube channel, which I named \"DiceFX.\" The channel quickly gained attention, built a community, and I began freelancing by selling my personalized designs as well as presets for creative software to other designers.\n\nIn addition to motion design, I also focused on graphic design by creating logos, banners, thumbnails, and more, which I sold as well. Although I have now ceased creating 3D introductions due to a decline in demand from YouTubers, I continue to work in media design overall. For example, I have designed geographic filters for Snapchat, created a new logo for a small private pub, designed, printed, and sold posters for a kid's TV show, and personally redesigned company logos.\n\nIn another project, I learned to work myself into Autodesk Maya and created a Low-Poly animation that you can see here. I am able to apply my editing skillset to create the video prototypes featured in my various projects.\n\nI am now happy to have advanced skills in creative software like Adobe Photoshop, After Effects, Premiere Pro, Figma, and Maxon's Cinema4D, along with a profound understanding of design concepts." },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/4HeQgUJeqnA?si=T8T9pzHPlhD-N-GX" },
      { type: "video", url: "https://www.youtube-nocookie.com/embed/Io0SBxjQDrU?si=jlmK6dr8OyhJyPj3" },
      { type: "link", url: "https://www.youtube.com/c/DiceFX", text: "➜ YouTube: DiceFX" }
    ]
  }
];
