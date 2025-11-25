
export enum Category {
  HOME = 'Home',
  PROJECTS = 'Projects', // New
  GALLERY = 'Gallery',
  DATA = 'My Data'
}

export type FeedFilter = 'All' | 'Articles' | 'Moments' | 'Curated'; // Added Curated

export type Language = 'en' | 'zh';
export type Theme = 'light' | 'dark';

export interface Comment {
  id: string;
  username: string;
  content: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  tags: string[];
  type: 'article';
  likes: number;
  comments: Comment[];
}

export interface Moment {
  id: string;
  content: string;
  images?: string[];
  date: string;
  tags: string[];
  type: 'moment';
  likes: number;
  comments: Comment[];
}

// New Type: For Daily Shares / Curations (Websites, Products, Stuff)
export interface ShareItem {
  id: string;
  title: string;
  description: string;
  url: string;
  domain: string; // e.g., "github.com" or "youtube.com"
  imageUrl?: string;
  date: string;
  tags: string[];
  type: 'share';
  likes: number;
}

export type FeedItem = BlogPost | Moment | ShareItem;

// New Type: For Portfolio Projects
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  date: string;
  featured?: boolean;
  // New detailed fields
  role?: string;
  year?: string;
  features?: string[];
  stats?: { label: string; value: string }[];
}

// --- Gallery Types ---
export interface ExifData {
  camera: string;
  lens: string;
  aperture: string;
  iso: string;
  shutter: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string; // For videos
  title: string;
  description?: string;
  date: string;
  location?: string;
  exif?: ExifData;
  width?: number; // For masonry layout calc if needed
  height?: number;
}

// --- Life Log Data Types ---
export interface MovieData {
  month: string;
  movies: number;
  series: number;
}

export interface GameGenreData {
  subject: string;
  A: number; // Hours played
  fullMark: number;
}

export interface SkillData {
  name: string;
  level: number; // 0-100
}

export interface PhotoStatsData {
  day: string;
  count: number;
}

export interface RoutineData {
  name: string;
  value: number; // hours or percentage
  color: string;
}

export interface StepData {
  day: string;
  steps: number;
}

export interface User {
  username: string;
  role: 'admin' | 'user';
}
