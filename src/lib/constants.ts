export const SITE_CONFIG = {
  name: "CuraBotics AI",
  description: "Intelligent Robotics & Healthcare Automation",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "hello@curabotics.ai",
} as const;

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/curabotics",
  twitter: "https://twitter.com/curabotics",
  github: "https://github.com/curabotics",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
