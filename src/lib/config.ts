/**
 * Site-wide configuration
 * Centralized place for all site metadata and settings
 */

export const siteConfig = {
  name: 'Tejas M',
  title: 'Tejas M - Software Developer & Tech Enthusiast',
  description: 'Personal website and blog of Tejas M. Sharing experiences, insights, and tutorials about software development.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tejasm.dev',
  author: {
    name: 'Tejas M',
    email: 'contact@tejasm.dev',
    github: 'https://github.com/tejasm',
    linkedin: 'https://linkedin.com/in/tejasm',
  },
  links: {
    github: 'https://github.com/tejasm',
    linkedin: 'https://linkedin.com/in/tejasm',
    twitter: 'https://twitter.com/tejasm',
  },
  ogImage: '/images/og-image.png',
} as const;

export type SiteConfig = typeof siteConfig;
