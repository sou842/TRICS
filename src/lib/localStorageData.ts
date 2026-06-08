import { projects as defaultProjects } from '@/data/projects';

const PROJECTS_KEY = 'trics_projects_data';

export const getProjects = () => {
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse projects from local storage", e);
    }
  }
  
  // Initialize if empty
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
  return defaultProjects;
};

export const getProjectBySlug = (slug: string) => {
  const projects = getProjects();
  return projects.find((p: any) => p.slug === slug);
};

export const saveProject = (projectData: any) => {
  const projects = getProjects();
  
  // if slug exists, update. Otherwise push
  const index = projects.findIndex((p: any) => p.slug === projectData.slug);
  
  if (index !== -1) {
    projects[index] = { ...projects[index], ...projectData };
  } else {
    projects.push(projectData);
  }
  
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return projectData;
};

export const deleteProject = (slug: string) => {
  const projects = getProjects();
  const updated = projects.filter((p: any) => p.slug !== slug);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
};

// --- INQUIRIES ---
const INQUIRIES_KEY = 'trics_inquiries_data';
const defaultInquiries = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '555-0101', service: 'Civil Construction', message: 'I need a quote for a new community hall in Delhi.', status: 'unread', date: new Date().toISOString() },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-0202', service: 'Maintenance Services', message: 'We are looking for AMC services for our hospital.', status: 'read', date: new Date(Date.now() - 86400000).toISOString() },
];

export const getInquiries = () => {
  const stored = localStorage.getItem(INQUIRIES_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(defaultInquiries));
  return defaultInquiries;
};

export const updateInquiryStatus = (id: string, status: string) => {
  const inquiries = getInquiries();
  const index = inquiries.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    inquiries[index].status = status;
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
  }
};

export const saveInquiry = (inquiry: any) => {
  const inquiries = getInquiries();
  const newInquiry = {
    ...inquiry,
    id: Date.now().toString(),
    status: 'unread',
    date: new Date().toISOString()
  };
  inquiries.push(newInquiry);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
  return newInquiry;
};

export const deleteInquiry = (id: string) => {
  const inquiries = getInquiries();
  const updated = inquiries.filter((i: any) => i.id !== id);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
};

// --- TESTIMONIALS ---
const TESTIMONIALS_KEY = 'trics_testimonials_data';
const defaultTestimonials = [
  { id: '1', name: 'Rajesh Kumar', role: 'Admin, Civil Department', rating: 5, text: 'Trics Research delivered our community infrastructure ahead of schedule with unmatched quality.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', isPublished: true },
  { id: '2', name: 'Dr. Ananya Singh', role: 'Medical Superintendent', rating: 4, text: 'The hospital AMC services provided by TRICS have been transformative.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', isPublished: true },
];

export const getTestimonials = () => {
  const stored = localStorage.getItem(TESTIMONIALS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(defaultTestimonials));
  return defaultTestimonials;
};

export const saveTestimonial = (testimonial: any) => {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex((t: any) => t.id === testimonial.id);
  
  if (index !== -1) {
    testimonials[index] = { ...testimonials[index], ...testimonial };
  } else {
    testimonials.push({ ...testimonial, id: Date.now().toString() });
  }
  
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
  return testimonial;
};

export const deleteTestimonial = (id: string) => {
  const testimonials = getTestimonials();
  const updated = testimonials.filter((t: any) => t.id !== id);
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
};

// --- FINANCE ---
const FINANCE_KEY = 'trics_finance_data';
const defaultFinance = [
  { id: 'INV-2026-001', clientName: 'Delhi Municipal Corp', project: 'Dwarka Drainage Network', amount: 4500000, status: 'paid', issueDate: '2026-01-10', dueDate: '2026-02-10' },
  { id: 'INV-2026-002', clientName: 'Ministry of Health', project: 'AIIMS AMC Q1', amount: 1200000, status: 'paid', issueDate: '2026-02-15', dueDate: '2026-03-15' },
  { id: 'INV-2026-003', clientName: 'Reliance Infra', project: 'Metro Line 4 Enabling Works', amount: 8500000, status: 'pending', issueDate: '2026-05-20', dueDate: '2026-06-20' },
  { id: 'INV-2026-004', clientName: 'State Transport Auth', project: 'Bus Depot Upgrades', amount: 3200000, status: 'overdue', issueDate: '2026-04-05', dueDate: '2026-05-05' },
];

export const getFinanceRecords = () => {
  const stored = localStorage.getItem(FINANCE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(FINANCE_KEY, JSON.stringify(defaultFinance));
  return defaultFinance;
};

export const saveFinanceRecord = (record: any) => {
  const records = getFinanceRecords();
  const index = records.findIndex((r: any) => r.id === record.id);
  
  if (index !== -1) {
    records[index] = { ...records[index], ...record };
  } else {
    // Generate an ID if new
    const id = record.id || `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    records.push({ ...record, id });
  }
  
  localStorage.setItem(FINANCE_KEY, JSON.stringify(records));
  return record;
};

export const deleteFinanceRecord = (id: string) => {
  const records = getFinanceRecords();
  const updated = records.filter((r: any) => r.id !== id);
  localStorage.setItem(FINANCE_KEY, JSON.stringify(updated));
};
