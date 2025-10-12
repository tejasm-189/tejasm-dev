# Testing Guide for Your SolidJS Project

Welcome to testing! This guide will help you understand and write tests for your SolidJS application.

## 📚 Table of Contents

- [What is Testing?](#what-is-testing)
- [Why Test?](#why-test)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Types of Tests](#types-of-tests)
- [Writing Your First Test](#writing-your-first-test)
- [Best Practices](#best-practices)
- [Common Testing Patterns](#common-testing-patterns)
- [Troubleshooting](#troubleshooting)

## What is Testing?

Testing is the process of verifying that your code works as expected. Instead of manually checking your app in a browser every time you make a change, you write automated tests that can run in seconds.

## Why Test?

- ✅ **Catch bugs early** - Find issues before users do
- ✅ **Refactor confidently** - Change code without fear of breaking things
- ✅ **Document behavior** - Tests show how code should work
- ✅ **Save time** - Automated tests are faster than manual testing
- ✅ **Better design** - Testable code is usually better structured

## Testing Stack

Your project uses these tools:

| Tool | Purpose |
|------|---------|
| **Vitest** | Fast test runner (like Jest, but better for Vite projects) |
| **@solidjs/testing-library** | Utilities for testing SolidJS components |
| **@testing-library/user-event** | Simulate user interactions (clicks, typing, etc.) |
| **jsdom** | Simulates a browser environment in Node.js |
| **@testing-library/jest-dom** | Extra matchers for better assertions |

## Running Tests

### Basic Commands

```bash
# Run all tests (watch mode - reruns on file changes)
npm test

# Run tests once (useful for CI/CD)
npm test -- --run

# Run tests with UI (visual interface)
npm run test:ui

# Generate coverage report (see which code is tested)
npm run test:coverage
```

### Watch Mode Tips

When you run `npm test`, Vitest watches for file changes:
- Press **a** to run all tests
- Press **f** to run only failed tests
- Press **p** to filter by filename
- Press **t** to filter by test name
- Press **q** to quit

## Types of Tests

### 1. Unit Tests

Test individual functions in isolation.

**Example:** `src/test/utils.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from '../lib/utils';

describe('formatDate', () => {
  it('should format a valid ISO date string', () => {
    const result = formatDate('2024-01-15');
    expect(result).toBe('Jan 15, 2024');
  });
});
```

**When to use:**
- Testing utility functions
- Testing business logic
- Testing data transformations

### 2. Component Tests

Test UI components and user interactions.

**Example:** `src/test/components/Hero.test.tsx`

```typescript
import { render, screen } from '@solidjs/testing-library';
import { Hero } from '../../components/home/Hero';

describe('Hero Component', () => {
  it('should render the hero section', () => {
    render(() => <Hero />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
```

**When to use:**
- Testing component rendering
- Testing user interactions (clicks, input)
- Testing conditional rendering
- Testing props and state

### 3. Integration Tests

Test how multiple components/functions work together.

**Example:** Testing a form that uses multiple components and utility functions.

## Writing Your First Test

Let's write a test step-by-step:

### Step 1: Create a Test File

Test files should be named `*.test.ts` or `*.test.tsx` and placed in the `src/test/` directory.

### Step 2: Import Dependencies

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
```

### Step 3: Write Test Structure

```typescript
describe('MyComponent', () => {
  it('should do something specific', () => {
    // Arrange: Set up test data
    const testValue = 42;
    
    // Act: Execute the code
    const result = myFunction(testValue);
    
    // Assert: Verify the result
    expect(result).toBe(84);
  });
});
```

### Step 4: Run Your Test

```bash
npm test
```

## Best Practices

### ✅ Do's

1. **Test behavior, not implementation**
   ```typescript
   // ✅ Good - tests what user sees
   expect(screen.getByText('Welcome')).toBeInTheDocument();
   
   // ❌ Bad - tests internal state
   expect(component.state.isVisible).toBe(true);
   ```

2. **Use descriptive test names**
   ```typescript
   // ✅ Good - clear and specific
   it('should display error message when email is invalid', () => {
   
   // ❌ Bad - vague
   it('should work', () => {
   ```

3. **Keep tests independent**
   Each test should work on its own, not depend on other tests.

4. **Test edge cases**
   ```typescript
   it('should handle empty strings', () => {});
   it('should handle very long inputs', () => {});
   it('should handle null values', () => {});
   ```

5. **Use setup and teardown**
   ```typescript
   beforeEach(() => {
     // Run before each test
   });
   
   afterEach(() => {
     // Run after each test (cleanup)
   });
   ```

### ❌ Don'ts

1. **Don't test third-party libraries** - They have their own tests
2. **Don't test styles** - Use visual regression tools for that
3. **Don't make tests too complex** - If a test is hard to write, simplify your code
4. **Don't skip error cases** - Test both success and failure paths

## Common Testing Patterns

### Testing Components with Props

```typescript
it('should display custom message', () => {
  render(() => <Greeting name="Alice" />);
  expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();
});
```

### Testing User Interactions

```typescript
import { fireEvent } from '@solidjs/testing-library';

it('should increment counter on click', async () => {
  render(() => <Counter />);
  
  const button = screen.getByRole('button', { name: /increment/i });
  await fireEvent.click(button);
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### Testing Links and Navigation

```typescript
it('should have correct href attribute', () => {
  render(() => <Navigation />);
  
  const homeLink = screen.getByRole('link', { name: /home/i });
  expect(homeLink).toHaveAttribute('href', '/');
});
```

### Mocking Functions

```typescript
import { vi } from 'vitest';

it('should call onClick handler', async () => {
  const handleClick = vi.fn();
  render(() => <Button onClick={handleClick} />);
  
  await fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing Async Code

```typescript
it('should load data', async () => {
  render(() => <DataComponent />);
  
  // Wait for loading to finish
  const data = await screen.findByText('Loaded data');
  expect(data).toBeInTheDocument();
});
```

## Query Priority

When finding elements, use queries in this order:

1. **getByRole** - Most accessible (e.g., `getByRole('button', { name: /submit/i })`)
2. **getByLabelText** - Good for form fields
3. **getByPlaceholderText** - For inputs with placeholders
4. **getByText** - For non-interactive content
5. **getByTestId** - Last resort (requires adding `data-testid` attribute)

### Query Variants

- **getBy...** - Throws error if not found (use for elements that should exist)
- **queryBy...** - Returns null if not found (use for elements that might not exist)
- **findBy...** - Async, waits for element (use for elements that appear after loading)

## Understanding Test Output

### Passing Test
```
✓ src/test/utils.test.ts (4)
  ✓ formatDate (2)
    ✓ should format a valid ISO date string
    ✓ should handle invalid dates
```

### Failing Test
```
❯ src/test/utils.test.ts (1)
  ❯ formatDate
    × should format a valid ISO date string
      Expected: "Jan 15, 2024"
      Received: "January 15, 2024"
```

## Coverage Reports

Coverage shows which parts of your code are tested:

```bash
npm run test:coverage
```

Coverage metrics:
- **Statements** - Individual lines of code
- **Branches** - if/else paths
- **Functions** - Function calls
- **Lines** - Physical lines in files

**Good coverage:** 70-80%+ is generally good. 100% is not always necessary!

## Troubleshooting

### Common Issues

1. **"Cannot find module"**
   - Make sure imports use correct paths
   - Check that file extensions are correct (.ts vs .tsx)

2. **"Element not found"**
   - Use `screen.debug()` to see what's rendered
   - Check if element appears after async operation (use `findBy...`)

3. **"localStorage is not defined"**
   - See `Header.test.tsx` for how to mock localStorage

4. **Tests pass locally but fail in CI**
   - Check for timezone differences
   - Ensure no tests depend on specific local files

### Debugging Tests

```typescript
it('should render correctly', () => {
  render(() => <MyComponent />);
  
  // Print the entire DOM
  screen.debug();
  
  // Print a specific element
  screen.debug(screen.getByRole('button'));
});
```

## Next Steps

Now that you understand testing basics:

1. ✅ Run the existing tests: `npm test`
2. ✅ Explore `src/test/` to see examples
3. ✅ Try writing a test for another component
4. ✅ Aim for testing critical paths first (authentication, payments, etc.)
5. ✅ Gradually increase coverage over time

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/solidjs-testing-library/intro/)
- [SolidJS Testing Guide](https://www.solidjs.com/guides/testing)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Testing Philosophy

> "Write tests. Not too many. Mostly integration." - Guillermo Rauch

Focus on:
- Testing user-facing behavior
- Critical business logic
- Complex algorithms
- Edge cases and error handling

Happy testing! 🧪✨
