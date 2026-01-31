import { spring } from "framer-motion";

import {
  mobile,
  home,
  backend,
  hushpad,
  creator,
  web,
  next,
  springBoot,
  java,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
  offlineupi,
  HeAl,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Next JS",
    icon: next,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "Spring Boot",
    icon: springBoot,
  },
];





const projects = [
  {
    quote:
      "An offline-first payment platform that allows users to send and verify transactions without internet access. Uses React PWA, AES encryption, SMS-based communication via Twilio, and a Spring Boot backend to ensure secure and reliable payment processing with multi-language support.",
    name: "Offline upi",
    sourceLink: "https://github.com/Afnankazi/Offline-Upi",
    image: offlineupi,
  },
  {
    quote:
      "A full-stack wellness app that helps users improve emotional well-being through an AI-powered therapist, mood tracking with interactive sliders, personalized wellness goals, and community support features. Built with React 18 and TypeScript on the frontend, using a RAG-based AI system via n8n workflows and ElevenLabs for natural, human-like voice responses.",
    name: "HeAl",
    sourceLink: "https://github.com/Siddharth-The-Dragon-Slayer/Smurfs",
    image: HeAl,
  },
  {
    quote:
      "HushPad is a privacy-focused notes application designed to keep your personal and professional information safe. Built with TypeScript and React for a smooth and responsive frontend experience, and powered by a Spring Boot backend.",
    name: "HushPad",
    image: hushpad,
    sourceLink: "https://github.com/Afnankazi/Hushpad",
  },
  {
    quote:
      "A modern web application that enables VESIT students to easily apply for and manage railway concession passes online. Built with Next.js, the platform streamlines the application process, reduces manual paperwork, and provides a smooth, user-friendly experience.",
    name: "Vesit Rail",
    image: home,
    sourceLink: "https://github.com/VESITRail/VESITRail",
  },
];
export { services, technologies, projects };
