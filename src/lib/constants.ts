/**
 * Application-wide constants
 * Similar to C# const declarations
 */

export const POSTS_PER_PAGE = 10;

export const READING_SPEED_WPM = 200;

export const SITE_NAME = 'tejasm.dev';

export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/tejasm',
  LINKEDIN: 'https://linkedin.com/in/tejasm',
  TWITTER: 'https://twitter.com/tejasm',
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
] as const;

export const BLOG_TAGS = [
  'typescript',
  'nextjs',
  'react',
  'web-development',
  'tutorial',
  'career',
] as const;
