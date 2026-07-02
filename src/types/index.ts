export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  category: string;
  type: "Full Time" | "Part Time" | "Remote" | "Freelance" | "Internship";
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  deadline: string;
  featured: boolean;
  urgent: boolean;
  experience: string;
  education: string;
  tags: string[];
  employerId: string;
}

export interface Employer {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  industry: string;
  location: string;
  website: string;
  founded: string;
  employees: string;
  description: string;
  openJobs: number;
  email: string;
  phone: string;
  socialLinks: { platform: string; url: string }[];
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  bio: string;
  email: string;
  phone: string;
  salary: string;
  availability: string;
  category: string;
  socialLinks: { platform: string; url: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  comments: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  title: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  slug: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  isPopular: boolean;
}
