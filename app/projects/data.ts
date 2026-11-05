import {
  BookOpen, CalendarDays, ClipboardCheck, Clock, GraduationCap, Users,
  type LucideIcon, ScanBarcode, Zap, Layers, Hash, FileDown, Database,
  Smartphone,
  PencilLine,
  ListChecks,
  HardDrive,
  Lock,
  ShieldAlert,
  MapPin,
  Contact,
  PhoneCall,
  Siren,
  Lightbulb,
  MapIcon,
  Landmark,
  PenSquare,
  Languages,
  Volume2,
  Fingerprint, Share2, MessageCircle, BellOff, PhoneOff, ShieldCheck,
  Upload,
  Grid3x3,
  Palette,
  Download,
  History,
} from "lucide-react";
import adminPhoto from "./admin.png";
import timetablePhoto from "./timetablegeneration.png";
import resultPhoto from "./resultextracter.png";
import jyotirlinga from "./jyotirlinga.png";
import notebook from "./securenotebook.jpeg";
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
  /** Optional links; buttons only show if provided */
  links?: {
    live?: string;
    github?: string;
    playStore?: string;
    video?: string;
    apk?: string;
  };
  /** Longer intro on the detail page */
  description: string;
  overview: string[];
  features: { icon: LucideIcon; title: string; text: string }[];
  /** Optional chips, e.g. user roles */
  roles?: string[];
  /** Optional: scheduling approaches section (only used by the timetable project) */
  approaches?: { kind: "csp" | "ga" | "greedy"; title: string; text: string }[];
  stack: { label: string; items: string[] }[];
  /** Optional: imported image files or paths from /public, e.g. { src: "/projects/a.png", alt: "..." } */
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
    title: "Academic Management System",
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
       { src: adminPhoto, alt: "Admin panel" },
       { src: timetablePhoto, alt: "Timetable generation screen" },
       { src: resultPhoto, alt: "Result extraction screen" },
    ],
  },
  {
    slug: "late-comer-barcode-scanner",
    title: "Student Entry Management System",
    category: "Full-Stack Web Application",
    summary:
      "A barcode-based system that records late-coming students at the college gate in one scan and generates branch-wise PDF reports automatically.",
    tags: ["React.js", "Node.js", "SQL", "Barcode Scanning"],
    art: "web",
    description:
      "A web application that replaces manual late-entry registers at the college gate. Security staff scan a student's ID barcode and the entry is recorded instantly, sorted by branch and ready for reporting.",
    overview: [
      "Late entries at the gate were being written down by hand, which was slow for security staff, made students even later, and gave some students a chance to slip away. Compiling the data into branch-wise reports afterwards was another manual job.",
      "This system fixes that: the security staff simply scan each late student's ID card. The record is saved to the database, grouped by branch, roll numbers are organised automatically, and the number of times each student has been scanned is tracked and displayed. Reports can be downloaded as PDFs.",
    ],
    features: [
      { icon: ScanBarcode, title: "One-scan entry", text: "Scan the student ID barcode and the late entry is recorded with no manual typing." },
      { icon: Zap, title: "Faster at the gate", text: "Removes manual writing, so late students are processed quickly and can't slip away unrecorded." },
      { icon: Layers, title: "Branch-wise records", text: "Entries are automatically organised by branch as they are scanned." },
      { icon: Hash, title: "Roll numbers & scan count", text: "Roll numbers are sorted automatically and the system shows how many times each student has been scanned." },
      { icon: FileDown, title: "Downloadable PDF reports", text: "Generate branch-wise late-comer reports as PDFs with one click." },
      { icon: Database, title: "Persistent storage", text: "All entries are stored in a SQL database for reliable record keeping." },
    ],
    stack: [
      { label: "Frontend", items: ["React.js"] },
      { label: "Backend", items: ["Node.js"] },
      { label: "Database", items: ["SQL"] },
      { label: "Input", items: ["Barcode scanner"] },
      { label: "Reports", items: ["PDF generation"] },
    ],
    
  },
  {
    slug: "secure-notebook",
    title: "Secure Notebook",
    category: "Android Application",
    summary:
      "An Android notes app with lockable private notes and a built-in to-do list, storing everything locally on the device.",
    tags: ["Java", "Android Studio", "SharedPreferences", "Mobile App"],
    art: "generic",
    links: { apk: "/apks/NoteBook.apk" },
    description:
      "A native Android notebook application for writing and organising notes, protecting private ones with a lock, and tracking daily tasks in a built-in to-do list.",
    overview: [
      "The app works like a standard notes application: users can create, edit and delete notes in a simple, distraction-free interface.",
      "Sensitive notes can be locked so their content stays hidden until the user unlocks them. A to-do list sits alongside the notes, so ideas and tasks are managed in one app. All data is stored on the device using SharedPreferences, so the app works fully offline.",
    ],
    features: [
      { icon: PencilLine, title: "Create & manage notes", text: "Write, edit and delete notes quickly in a clean interface." },
      { icon: Lock, title: "Locked notes", text: "Lock private notes so their content stays hidden until the user unlocks them." },
      { icon: ListChecks, title: "Built-in to-do list", text: "Add tasks and mark them complete without leaving the app." },
      { icon: HardDrive, title: "Offline, on-device storage", text: "Notes and tasks are saved locally with SharedPreferences, so no internet or account is needed." },
      { icon: Smartphone, title: "Native Android app", text: "Built in Java with Android Studio for a smooth, native mobile experience." },
    ],
    stack: [
      { label: "Frontend", items: ["React Native"] },
       { label: "Backend", items: ["NodeJs"] },
      { label: "Database", items: ["Local Storage"] },
     
     
    ],
    screenshots: [
      { src: notebook, alt: "Secure Notebook app screenshot" },
    ],
  },
  {
    slug: "evetrack",
    title: "EveTrack - Women Safety App",
    category: "Android Application",
    summary:
      "A women's safety app that sends your live location to trusted contacts by SMS in one tap, with a fake call feature and emergency helpline numbers built in.",
    tags: ["Java", "Android Studio", "SharedPreferences", "Safety App"],
    art: "generic",
   links: { apk: "/apks/evetrack_v.apk" },
    description:
      "A native Android application designed to help women respond quickly in unsafe situations. With a single tap, the app sends the user's current location to people they trust, and it also offers ways to get out of uncomfortable situations discreetly.",
    overview: [
      "After installation, the app asks for location and SMS permissions. The user then saves a set of trusted contacts, who will be alerted in an emergency.",
      "In a dangerous situation, one tap sends an SMS with the user's location coordinates to every saved contact. A fake call feature simulates an incoming call so the user can excuse themselves from a risky situation, and a directory of emergency helpline numbers (police, women's safety teams and more) is available in one place. Contacts and settings are stored on the device using SharedPreferences, so the app works without an account.",
    ],
    features: [
      { icon: ShieldAlert, title: "One-tap SOS", text: "A single tap sends an emergency SMS to all trusted contacts instantly." },
      { icon: MapPin, title: "Location sharing", text: "The alert includes the user's current location coordinates so contacts know where to find her." },
      { icon: Contact, title: "Trusted contacts", text: "Choose and save the people who should be alerted, set up once after installation." },
      { icon: PhoneCall, title: "Fake call", text: "Simulates an incoming call to help the user step away from an uncomfortable or unsafe situation." },
      { icon: Siren, title: "Emergency helplines", text: "Police, women's safety teams and other helpline numbers available in one place." },
      { icon: Lightbulb, title: "Safety measures", text: "Quick safety tips and precautions built into the app." },
      { icon: HardDrive, title: "On-device storage", text: "Contacts and settings are saved locally with SharedPreferences." },
    ],
    stack: [
      { label: "Platform", items: ["Android"] },
      { label: "Language", items: ["Java"] },
      { label: "Storage", items: ["SharedPreferences"] },
      { label: "Permissions", items: ["Location", "SMS"] },
    ],
    screenshots: [
      // { src: "/projects/evetrack-1.png", alt: "SOS screen" },
    ],
  },
  {
    slug: "dwadasha-jyotirlinga",
    title: "Dwadasha Jyotirlinga Website",
    category: "Full-Stack Web Application",
    summary:
      "An interactive map-based website that introduces the twelve Jyotirlingas of India, with detailed temple pages, a community blog, multilingual support and read-aloud.",
    tags: ["React.js", "Firebase", "HTML", "Google Maps"],
    art: "web",
    links: {
      live: "https://jyotirlinga.netlify.app",
    },
    description:
      "A culturally focused web application that helps today's generation rediscover the heritage, rituals and stories behind the Dwadasha Jyotirlingas, through an interactive map of India, rich temple pages and a community of shared experiences.",
    overview: [
      "The landing page shows a map of India with a 3D marker at the location of each of the twelve Jyotirlingas. Clicking a marker opens a dedicated page covering why the temple is famous, its specialties, associated offerings, festivals and rituals, how to worship there, and the story of how it was formed.",
      "Visitors can also read and contribute to a community blog, where they upload photos and share their experiences so others can see different perspectives on the culture and the pilgrimage. Each temple has a Google Maps view, the site can be translated into multiple Indian languages, and a read-aloud button narrates the full description for elderly users or anyone who prefers listening.",
      "The project was created to build awareness of Puranic heritage and rituals among younger people and make learning about them engaging.",
    ],
    features: [
      { icon: MapIcon, title: "Interactive India map", text: "A landing page map with a 3D marker for each of the twelve Jyotirlingas." },
      { icon: Landmark, title: "Detailed temple pages", text: "Significance, specialties, offerings, festivals, rituals, worship method and origin story for each temple." },
      { icon: PenSquare, title: "Community blog", text: "Users upload photos and share their pilgrimage experiences for others to read." },
      { icon: MapPin, title: "Google Maps view", text: "Each temple's location is shown through Google Maps to help plan a visit." },
      { icon: Languages, title: "Multilingual access", text: "Content can be read in multiple languages, so people across India can use it." },
      { icon: Volume2, title: "Text-to-speech", text: "A read-aloud button narrates the whole description, helpful for elderly users and those who can't read comfortably." },
      { icon: BookOpen, title: "Heritage awareness", text: "Designed to spark interest in rituals, Puranic stories and cultural heritage among the younger generation." },
    ],
    stack: [
      { label: "Frontend", items: ["React.js", "HTML"] },
      { label: "Backend & Data", items: ["Firebase"] },
      { label: "Maps", items: ["Google Maps"] },
    ],
    screenshots: [
      { src: jyotirlinga, alt: "India map landing page" },
    ],
  },
  {
    slug: "linkchat",
    title: "LinkChat",
    category: "Full-Stack Web Application",
    summary:
      "A chat app that connects people through a unique personal ID instead of a phone number, so you only talk to people you choose to share it with.",
    tags: ["React.js", "Node.js", "Chat App", "Privacy"],
    art: "generic",
    
    description:
      "A web-based messaging application where every user gets a unique ID instead of linking their account to a mobile number. Share your ID with someone and you can start chatting, with no phone number exchange and no flood of unwanted requests.",
    overview: [
      "Most chat apps are built around phone numbers, which means anyone who has your number can find you and send requests. LinkChat replaces this with a unique ID assigned to each user.",
      "Users connect only when someone shares their ID with them. This keeps personal phone numbers private and cuts down on spam and repeated connection requests, giving users more control over who can reach them.",
    ],
    features: [
      { icon: Fingerprint, title: "Unique user ID", text: "Every user gets their own ID, so no phone number is needed to sign up or connect." },
      { icon: Share2, title: "Connect by sharing your ID", text: "Share your ID with someone and they can start a chat with you." },
      { icon: MessageCircle, title: "One-to-one chat", text: "Send and receive messages with your connections in a simple chat interface." },
      { icon: BellOff, title: "Fewer unwanted requests", text: "Because only people who have your ID can reach you, spam and repeated requests are avoided." },
      { icon: PhoneOff, title: "Phone number stays private", text: "Your mobile number is never shared with the people you chat with." },
      { icon: ShieldCheck, title: "Privacy-focused", text: "Designed around giving users control over who can contact them." },
    ],
    stack: [
      { label: "Frontend", items: ["React.js"] },
      { label: "Backend", items: ["Node.js"] },
      { label: "Database", items: ["(add yours)"] },
    ],
    screenshots: [
      // { src: "/projects/linkchat-1.png", alt: "Chat screen" },
    ],
  },
  {
    slug: "photo-negative-converter",
    title: "Photo Negative Converter",
    category: "Mobile Application",
    summary:
      "A mobile app that restores old film negatives into full-color digital photos by reversing the colors of every pixel.",
    tags: ["React Native", "Node.js", "Image Processing", "RGB"],
    art: "generic",
    description:
      "A mobile application that brings forgotten film negatives back to life. Upload a photographed or scanned negative and the app converts it into a full-color digital photo you can save and share.",
    overview: [
      "Many households still have film negatives from the 1980s and 90s, but the printers and converters needed to view them are no longer easy to find. The negatives themselves show only reversed colors, so the memories on them stay hidden.",
      "This app solves that. A negative stores the opposite of every color: a dark area appears light, and a light area appears dark. The app reads each pixel of the uploaded negative, reverses its RGB color values and rebuilds the original image, so black hair that appears white in the negative comes back black in the final photo. The result is a digital photo ready to save on your phone.",
    ],
    features: [
      { icon: Upload, title: "Upload your negative", text: "Add an image of a film negative directly from your phone." },
      { icon: Grid3x3, title: "Pixel-by-pixel conversion", text: "Every pixel of the image is analysed and its RGB values are reversed to recover the original colors." },
      { icon: Palette, title: "Full-color restoration", text: "Converts the inverted tones back into the natural colors of the original photo." },
      { icon: Download, title: "Save to your device", text: "The restored photo is ready to save and share right away." },
      { icon: History, title: "Preserve family memories", text: "Gives old negatives a second life without needing special printers or equipment." },
      { icon: Smartphone, title: "Built for mobile", text: "Made with React Native, so the whole process happens from your phone." },
    ],
    stack: [
      { label: "Mobile App", items: ["React Native"] },
      { label: "Backend", items: ["Node.js"] },
      { label: "Language", items: ["JavaScript"] },
      { label: "Processing", items: ["RGB color inversion"] },
    ],
    screenshots: [
      // { src: "/projects/negative-1.png", alt: "Negative and converted photo side by side" },
    ],
  },
];