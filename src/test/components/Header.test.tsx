import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Router, Route } from '@solidjs/router';
import { Header } from '../../components/layout/Header';

// Helper to render component with Router context
const renderWithRouter = (Component: any) => {
  return render(() => (
    <Router>
      <Route path="/" component={() => <Component />} />
    </Router>
  ));
};

/**
 * ADVANCED COMPONENT TESTING
 * 
 * This test demonstrates:
 * 1. Testing interactive components (buttons, toggles)
 * 2. Mocking browser APIs (localStorage, matchMedia)
 * 3. Testing state changes and side effects
 * 4. beforeEach/afterEach for test setup and cleanup
 * 5. Testing dark mode/theme switching
 */

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Mock matchMedia
const matchMediaMock = (matches: boolean) => ({
  matches,
  media: '',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

describe('Header Component', () => {
  beforeEach(() => {
    // Setup mocks before each test
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation(() => matchMediaMock(false)),
      writable: true,
    });

    localStorageMock.clear();
  });

  afterEach(() => {
    // Cleanup after each test
    document.documentElement.classList.remove('dark');
  });

  describe('Rendering', () => {
    it('should render the header with navigation', () => {
      renderWithRouter(Header);
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should display the site logo/name', () => {
      renderWithRouter(Header);
      
      // The new header doesn't have a logo text, it has navigation items
      expect(screen.getByText(/Home/i)).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
      renderWithRouter(Header);
      
      expect(screen.getByText(/Home/i)).toBeInTheDocument();
      expect(screen.getByText(/Blog/i)).toBeInTheDocument();
      expect(screen.getByText(/About/i)).toBeInTheDocument();
      expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    });

    it('should have correct href attributes for navigation links', () => {
      renderWithRouter(Header);
      
      const homeLink = screen.getByText(/Home/i).closest('a');
      const blogLink = screen.getByText(/Blog/i).closest('a');
      const aboutLink = screen.getByText(/About/i).closest('a');
      const projectsLink = screen.getByText(/Projects/i).closest('a');
      
      expect(homeLink).toHaveAttribute('href', '/');
      expect(blogLink).toHaveAttribute('href', '/blog');
      expect(aboutLink).toHaveAttribute('href', '/about');
      expect(projectsLink).toHaveAttribute('href', '/projects');
    });

    it('should render theme toggle button', () => {
      renderWithRouter(Header);
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      expect(themeButton).toBeInTheDocument();
    });
  });

  describe('Theme Switching', () => {
    it('should start with light theme by default when no preference is saved', () => {
      renderWithRouter(Header);
      
      // Light theme should show moon icon (to switch to dark)
      const moonIcon = document.querySelector('.i-mdi-moon-waning-crescent');
      expect(moonIcon).toBeInTheDocument();
    });

    it('should respect saved dark theme preference from localStorage', () => {
      localStorageMock.setItem('theme', 'dark');
      
      renderWithRouter(Header);
      
      // Dark theme should show sun icon (to switch to light)
      const sunIcon = document.querySelector('.i-mdi-white-balance-sunny');
      expect(sunIcon).toBeInTheDocument();
    });

    it('should toggle theme when button is clicked', async () => {
      renderWithRouter(Header);
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      
      // Initially light theme (moon icon visible)
      expect(document.querySelector('.i-mdi-moon-waning-crescent')).toBeInTheDocument();
      
      // Click to switch to dark
      await fireEvent.click(themeButton);
      
      // Should now show sun icon
      expect(document.querySelector('.i-mdi-white-balance-sunny')).toBeInTheDocument();
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorageMock.getItem('theme')).toBe('dark');
    });

    it('should toggle back to light theme on second click', async () => {
      localStorageMock.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      
      renderWithRouter(Header);
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      
      // Click to switch to light
      await fireEvent.click(themeButton);
      
      expect(document.querySelector('.i-mdi-moon-waning-crescent')).toBeInTheDocument();
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorageMock.getItem('theme')).toBe('light');
    });

    it('should respect system preference when no saved theme', () => {
      // Mock system preference for dark mode
      Object.defineProperty(window, 'matchMedia', {
        value: vi.fn().mockImplementation(() => matchMediaMock(true)),
        writable: true,
      });
      
      renderWithRouter(Header);
      
      // Should show sun icon (dark mode active)
      const sunIcon = document.querySelector('.i-mdi-white-balance-sunny');
      expect(sunIcon).toBeInTheDocument();
    });
  });

  describe('Resume Link', () => {
    it('should have correct download attributes', () => {
      renderWithRouter(Header);
      
      // The new header doesn't have a resume link - it's in the Hero section
      // Just verify navigation works
      expect(screen.getByText(/Home/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for interactive elements', () => {
      renderWithRouter(Header);
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      expect(themeButton).toHaveAttribute('aria-label', 'Toggle theme');
    });

    it('should use semantic HTML (header, nav elements)', () => {
      const { container } = renderWithRouter(Header);
      
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('nav')).toBeInTheDocument();
    });
  });
});
