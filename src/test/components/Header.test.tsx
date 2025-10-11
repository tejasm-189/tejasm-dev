import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Header } from '../../components/layout/Header';

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
      render(() => <Header />);
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should display the site logo/name', () => {
      render(() => <Header />);
      
      const logo = screen.getByText('Tejas M');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('href', '/');
    });

    it('should render all navigation links', () => {
      render(() => <Header />);
      
      expect(screen.getByRole('link', { name: /^Home$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^Blog$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^About$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^Projects$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Resume/i })).toBeInTheDocument();
    });

    it('should have correct href attributes for navigation links', () => {
      render(() => <Header />);
      
      expect(screen.getByRole('link', { name: /^Home$/i })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: /^Blog$/i })).toHaveAttribute('href', '/blog');
      expect(screen.getByRole('link', { name: /^About$/i })).toHaveAttribute('href', '/about');
      expect(screen.getByRole('link', { name: /^Projects$/i })).toHaveAttribute('href', '/projects');
    });

    it('should render theme toggle button', () => {
      render(() => <Header />);
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      expect(themeButton).toBeInTheDocument();
    });
  });

  describe('Theme Switching', () => {
    it('should start with light theme by default when no preference is saved', () => {
      render(() => <Header />);
      
      // Light theme should show moon icon (to switch to dark)
      const moonIcon = document.querySelector('.i-mdi-moon-waning-crescent');
      expect(moonIcon).toBeInTheDocument();
    });

    it('should respect saved dark theme preference from localStorage', () => {
      localStorageMock.setItem('theme', 'dark');
      
      render(() => <Header />);
      
      // Dark theme should show sun icon (to switch to light)
      const sunIcon = document.querySelector('.i-mdi-white-balance-sunny');
      expect(sunIcon).toBeInTheDocument();
    });

    it('should toggle theme when button is clicked', async () => {
      render(() => <Header />);
      
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
      
      render(() => <Header />);
      
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
      
      render(() => <Header />);
      
      // Should show sun icon (dark mode active)
      const sunIcon = document.querySelector('.i-mdi-white-balance-sunny');
      expect(sunIcon).toBeInTheDocument();
    });
  });

  describe('Resume Link', () => {
    it('should have correct download attributes', () => {
      render(() => <Header />);
      
      const resumeLink = screen.getByRole('link', { name: /Resume/i });
      
      expect(resumeLink).toHaveAttribute('href', '/documents/Tejas Resume.pdf');
      expect(resumeLink).toHaveAttribute('download', 'Tejas_M_Resume.pdf');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for interactive elements', () => {
      render(() => <Header />);
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      expect(themeButton).toHaveAttribute('aria-label', 'Toggle theme');
    });

    it('should use semantic HTML (header, nav elements)', () => {
      const { container } = render(() => <Header />);
      
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('nav')).toBeInTheDocument();
    });
  });
});
