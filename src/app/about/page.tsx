import { Container } from '@/components/layout/Container';

/**
 * About page
 */
export default function AboutPage() {
  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About Me
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Hi! I&apos;m Tejas M, a software developer passionate about building
            modern web applications and sharing knowledge with the community.
          </p>
          
          <h2>Background</h2>
          <p>
            With a strong background in C# and .NET, I&apos;ve recently been exploring
            the world of TypeScript and modern web frameworks like Next.js.
          </p>
          
          <h2>Skills & Technologies</h2>
          <ul>
            <li>TypeScript & JavaScript</li>
            <li>React & Next.js</li>
            <li>C# & .NET</li>
            <li>SQL & NoSQL databases</li>
            <li>Cloud platforms (Azure, AWS)</li>
          </ul>
          
          <h2>Interests</h2>
          <p>
            When I&apos;m not coding, I enjoy learning about new technologies,
            contributing to open-source projects, and sharing my knowledge
            through blog posts and tutorials.
          </p>
          
          <h2>Get in Touch</h2>
          <p>
            Feel free to connect with me on GitHub or LinkedIn. I&apos;m always
            happy to chat about technology, collaborate on projects, or help
            fellow developers.
          </p>
        </div>
      </div>
    </Container>
  );
}
