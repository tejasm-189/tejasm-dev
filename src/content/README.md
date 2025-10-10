# Content

This directory contains all blog posts and content written in MDX format.

## Blog Posts

Blog posts are written in MDX (Markdown + JSX) with frontmatter metadata.

### File Naming Convention
Use ISO date format: `YYYY-MM-DD-slug.mdx`

Example: `2025-10-15-getting-started-with-nextjs.mdx`

### Frontmatter Structure
```yaml
---
title: "Getting Started with Next.js"
description: "A comprehensive guide to building modern web applications with Next.js"
date: "2025-10-15"
tags: ["nextjs", "react", "typescript"]
author: "Tejas M"
image: "/images/blog/nextjs-guide.jpg"
published: true
---
```

### Writing Posts

```mdx
---
title: "My First Blog Post"
description: "An introduction to my blog"
date: "2025-10-10"
tags: ["intro", "personal"]
published: true
---

# Welcome to My Blog

This is my first blog post written in **MDX**!

## Why MDX?

MDX allows you to:
- Write in Markdown
- Embed React components
- Create interactive content

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

## Custom Components

You can even embed custom React components:

<CalloutBox type="info">
  This is a custom callout component!
</CalloutBox>
```

## Guidelines
- ✅ Use descriptive slugs
- ✅ Always include frontmatter
- ✅ Optimize images before adding
- ✅ Use proper Markdown formatting
- ✅ Test posts locally before committing
