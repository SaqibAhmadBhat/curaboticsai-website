export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  date: string;
  url?: string;
}
