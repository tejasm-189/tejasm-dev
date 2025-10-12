import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import { Hero } from '../../components/home/Hero';

/**
 * COMPONENT TESTING TUTORIAL
 * 
 * Component tests verify that UI components:
 * 1. Render correctly with expected content
 * 2. Handle user interactions properly
 * 3. Display correct data
 * 4. Apply proper styling/classes
 * 
 * Key concepts:
 * - render() - Renders a component into a test DOM
 * - screen - Queries the rendered component
 * - Queries: getByText, getByRole, getByLabelText, etc.
 * - User interactions with @testing-library/user-event
 */

describe('Hero Component', () => {
  it('should render the hero section', () => {
    render(() => <Hero />);
    
    // Verify the main heading is present
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('should display the name from site config', () => {
    render(() => <Hero />);
    
    // Check that "Tejas M" appears in the component
    expect(screen.getByText(/Tejas M/i)).toBeInTheDocument();
  });

  it('should display the subtitle about being a developer', () => {
    render(() => <Hero />);
    
    // Check for key phrases in the subtitle - using getAllByText since "cryptography" appears in multiple places
    expect(screen.getByText(/Full-stack developer/i)).toBeInTheDocument();
    const cryptographyMatches = screen.getAllByText(/cryptography/i);
    expect(cryptographyMatches.length).toBeGreaterThan(0);
  });

  it('should render all CTA buttons with correct text', () => {
    render(() => <Hero />);
    
    // Check for the three main call-to-action buttons
    const blogButton = screen.getByRole('link', { name: /Read My Blog/i });
    const resumeButton = screen.getByRole('link', { name: /Download Resume/i });
    const aboutButton = screen.getByRole('link', { name: /About Me/i });
    
    expect(blogButton).toBeInTheDocument();
    expect(resumeButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
  });

  it('should have correct href attributes on navigation links', () => {
    render(() => <Hero />);
    
    const blogButton = screen.getByRole('link', { name: /Read My Blog/i });
    const aboutButton = screen.getByRole('link', { name: /About Me/i });
    
    expect(blogButton).toHaveAttribute('href', '/blog');
    expect(aboutButton).toHaveAttribute('href', '/about');
  });

  it('should render resume download link with correct attributes', () => {
    render(() => <Hero />);
    
    const resumeButton = screen.getByRole('link', { name: /Download Resume/i });
    
    expect(resumeButton).toHaveAttribute('href', '/documents/Tejas Resume.pdf');
    expect(resumeButton).toHaveAttribute('download', 'Tejas_M_Resume.pdf');
  });

  it('should render social media links', () => {
    render(() => <Hero />);
    
    // Find social links by aria-label
    const githubLink = screen.getByLabelText(/GitHub/i);
    const linkedinLink = screen.getByLabelText(/LinkedIn/i);
    
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
  });

  it('should have correct social media link URLs', () => {
    render(() => <Hero />);
    
    const githubLink = screen.getByLabelText(/GitHub/i);
    const linkedinLink = screen.getByLabelText(/LinkedIn/i);
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com/tejasm-189');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/tejas-m-65656b281/');
  });

  it('should have external links open in new tab with security attributes', () => {
    render(() => <Hero />);
    
    const githubLink = screen.getByLabelText(/GitHub/i);
    const linkedinLink = screen.getByLabelText(/LinkedIn/i);
    
    // Check for target="_blank" and rel="noopener noreferrer" for security
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should display the welcome description', () => {
    render(() => <Hero />);
    
    expect(screen.getByText(/Welcome to my digital space/i)).toBeInTheDocument();
    expect(screen.getByText(/cybersecurity/i)).toBeInTheDocument();
  });

  it('should render within a section element', () => {
    const { container } = render(() => <Hero />);
    
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
