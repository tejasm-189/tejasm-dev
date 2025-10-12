import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@solidjs/testing-library';
import '@testing-library/jest-dom';

// Cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});

// Extend Vitest's expect with jest-dom matchers
// This gives us helpful matchers like toBeInTheDocument, toHaveClass, etc.

// Mock IntersectionObserver for components that use intersection detection
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: () => [],
}));
