import { 
  HardHat, 
  Wrench, 
  Paintbrush, 
  Layers, 
  Droplets, 
  Zap, 
  Building2, 
  Road, 
  Hospital, 
  School 
} from "lucide-react";
import { StaticImageData } from "next/image";

// Images (using placeholders for now or existing assets if available)
import heroImg from "@/assets/hero-crane.jpg";
import project1 from "@/assets/project-orabella.jpg";
import project2 from "@/assets/project-velora.jpg";
import project3 from "@/assets/project-azila.jpg";

export const siteConfig = {
  name: "TRICS",
  fullName: "TRICS Infrastructure & Construction",
  email: "tenders@trics.com",
  phone: "+91 (11) 4567 8900",
  address: "TRICS Corporate Hub, 4th Floor, Global Business Park, New Delhi",
};

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: "Construction" | "Maintenance" | "Finishing" | "MEP";
}

export interface Milestone {
  title: string;
  date: string;
  description: string;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  status: "Active" | "On Leave";
  projectId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "supervisor";
  assignedProjectIds?: string[];
}

export interface Project {
  id: string;
  title: string;
  location: string;
  department: string;
  status: "Completed" | "Ongoing";
  progress?: number;
  image: StaticImageData;
  description: string;
  fullDescription: string;
  year: string;
  client: string;
  milestones: Milestone[];
  gallery: StaticImageData[];
  supervisorId?: string;
}

export interface Department {
  name: string;
  logo?: string;
}

export const services: Service[] = [
  {
    id: "civil-construction",
    title: "Civil Construction",
    description: "Large-scale RCC structures, road networks, and corporate building projects delivered with precision.",
    icon: Building2,
    category: "Construction",
  },
  {
    id: "hospital-maintenance",
    title: "Hospital & Institutional Maintenance",
    description: "Annual Maintenance Contracts (AMC) for specialized facilities, ensuring zero downtime.",
    icon: Hospital,
    category: "Maintenance",
  },
  {
    id: "painting-finishing",
    title: "Professional Painting & Finishing",
    description: "High-durability industrial and decorative coatings for large government complexes.",
    icon: Paintbrush,
    category: "Finishing",
  },
  {
    id: "flooring-waterproofing",
    title: "Flooring & Waterproofing",
    description: "Advanced industrial flooring solutions and comprehensive structural waterproofing.",
    icon: Layers,
    category: "Finishing",
  },
  {
    id: "mep-services",
    title: "Electrical & Plumbing (MEP)",
    description: "Integrated mechanical, electrical, and plumbing solutions for complex infrastructure.",
    icon: Zap,
    category: "MEP",
  },
  {
    id: "road-infrastructure",
    title: "Roads & Infrastructure",
    description: "National Highway projects and rural road development under government tenders.",
    icon: Road,
    category: "Construction",
  },
];

export const projects: Project[] = [
  {
    id: "pwd-hospital-complex",
    title: "PWD Multi-Specialty Hospital",
    location: "Bhopal, MP",
    department: "Public Works Department (PWD)",
    status: "Completed",
    image: project1,
    description: "Complete civil structure and MEP integration for a 500-bed government hospital.",
    fullDescription: "This flagship project for the Madhya Pradesh PWD involved the construction of a state-of-the-art 500-bed multi-specialty hospital. The scope included seismic-resistant RCC framing, specialized medical gas piping, advanced HVAC systems for OTs, and a centralized electrical substation. Our team managed over 400 workers daily to meet the 24-month deadline with zero safety incidents.",
    year: "2024",
    client: "Government of Madhya Pradesh",
    gallery: [project1, project2, project3],
    milestones: [
      { title: "Site Handover", date: "Jan 2022", description: "Official site handover and mobilization of heavy machinery." },
      { title: "Foundation Completion", date: "Jun 2022", description: "Successful completion of deep pile foundations and basement RCC." },
      { title: "Structural Topping Out", date: "Mar 2023", description: "Completion of the 8th-floor roof slab." },
      { title: "Handover & Inauguration", date: "Feb 2024", description: "Final quality checks and official handover to the Health Department." },
    ],
  },
  {
    id: "nhm-regional-center",
    title: "NHM Regional Healthcare Center",
    location: "Raipur, CG",
    department: "National Health Mission (NHM)",
    status: "Ongoing",
    progress: 75,
    image: project2,
    description: "Ongoing development of a regional health research and training facility.",
    fullDescription: "Currently under construction, this Regional Healthcare Center is designed to be a hub for medical research and paramedic training. The project features modular laboratory spaces, high-density server rooms for digital health records, and eco-friendly rainwater harvesting systems. We are utilizing advanced project management tools to ensure 100% compliance with NHM infrastructure guidelines.",
    year: "2025",
    client: "National Health Mission",
    gallery: [project2, project1, project3],
    milestones: [
      { title: "Design Approval", date: "Aug 2023", description: "Approval of architectural and structural blueprints by NHM board." },
      { title: "Excavation Works", date: "Nov 2023", description: "Completion of ground excavation and anti-termite treatment." },
      { title: "Superstructure Work", date: "May 2024", description: "RCC work for the first three floors completed." },
      { title: "Finishing Phase", date: "Scheduled Jan 2025", description: "Interior finishing, painting, and specialized equipment installation." },
    ],
  },
  {
    id: "corporate-it-park",
    title: "CyberOne IT Infrastructure",
    location: "Pune, MH",
    department: "Private Sector",
    status: "Completed",
    image: project3,
    description: "Structural development and finishing for a 20-story corporate IT park.",
    fullDescription: "CyberOne IT Park is a Grade-A commercial development in the heart of Pune's tech corridor. The project stood out for its use of glass curtain walls, post-tensioned slabs for large column-free spans, and a triple-height atrium. We provided end-to-end solutions from core and shell construction to high-end lobby finishing and MEP commissioning.",
    year: "2023",
    client: "CyberOne Tech",
    gallery: [project3, project1, project2],
    milestones: [
      { title: "Piling Works", date: "Oct 2020", description: "Completion of heavy-duty piling for the 20-story structure." },
      { title: "Podium Completion", date: "Apr 2021", description: "Parking podium and retail level structure finished." },
      { title: "Façade Installation", date: "Nov 2022", description: "Unitized glazing system installation completed across all floors." },
      { title: "Occupancy Certificate", date: "Aug 2023", description: "Final OC received and building opened for tenants." },
    ],
  },
];

export const departments: Department[] = [
  { name: "Public Works Department (PWD)" },
  { name: "National Health Mission (NHM)" },
  { name: "Panchayat Raj Department" },
  { name: "National Highways Authority (NHAI)" },
  { name: "Rail Land Development Authority (RLDA)" },
];

export const stats = [
  { value: "15+", label: "Specialized Services" },
  { value: "Govt", label: "Registered Vendor" },
  { value: "Pan India", label: "Project Reach" },
  { value: "250+", label: "Projects Delivered" },
];

export const users: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@trics.com",
    role: "admin",
  },
  {
    id: "sup-1",
    name: "John Supervisor",
    email: "john@trics.com",
    role: "supervisor",
    assignedProjectIds: ["nhm-regional-center"],
  },
];

export const workers: Worker[] = [
  { id: "w-1", name: "Rahul Sharma", role: "Mason", status: "Active", projectId: "nhm-regional-center" },
  { id: "w-2", name: "Amit Kumar", role: "Electrician", status: "Active", projectId: "nhm-regional-center" },
  { id: "w-3", name: "Suresh Singh", role: "Plumber", status: "On Leave", projectId: "nhm-regional-center" },
  { id: "w-4", name: "Vikram Das", role: "Painter", status: "Active", projectId: "pwd-hospital-complex" },
];
