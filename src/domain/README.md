# Domain Layer

This directory contains the core business entities and contracts. This layer is **framework-agnostic** and contains no dependencies on external libraries or infrastructure.

## Structure

- **`entities/`** - Domain entities (BlogPost, Project, Comment)
- **`interfaces/`** - Repository interfaces and contracts

## Guidelines

### Entities
Define your domain models with clear types:

```typescript
// entities/BlogPost.ts
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  readingTime: number;
  author: string;
}
```

### Interfaces
Define contracts that infrastructure layer must implement:

```typescript
// interfaces/IBlogRepository.ts
import { BlogPost } from '@/domain/entities/BlogPost';

export interface IBlogRepository {
  getAll(): Promise<BlogPost[]>;
  getBySlug(slug: string): Promise<BlogPost | null>;
  getByTag(tag: string): Promise<BlogPost[]>;
}
```

## Principles
- ✅ No framework dependencies
- ✅ Pure TypeScript types and interfaces
- ✅ Business rules live here
- ✅ Independent of infrastructure
