# Testing & Quality Assurance Guide

## Quick Start

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Run security audit
pnpm audit:security

# Analyze bundle size
pnpm analyze:bundle
```

## Unit Tests

### Structure

Unit tests are located alongside source files with `.test.ts` or `.spec.ts` suffix.

```
packages/
├── our-story/
│   ├── src/
│   │   ├── i18n.ts
│   │   ├── __tests__/
│   │   │   └── i18n.test.ts
```

### Running Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests for specific package
pnpm --filter=our-story test

# Run tests for specific app
pnpm --filter=rishta test

# Watch mode for development
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Coverage Targets

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 75%
- **Statements**: 80%

### Writing Unit Tests

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should do something', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe('expected');
  });

  it('should handle edge cases', () => {
    expect(() => functionToTest(null)).toThrow();
  });
});
```

## Integration Tests

### Structure

Integration tests verify that multiple components work together correctly.

```
packages/theme-engine/src/__tests__/
├── store.integration.test.ts

packages/our-story/src/__tests__/
├── store.integration.test.ts
```

### Running Integration Tests

```bash
# Run integration tests (included in pnpm test)
pnpm test

# Integration tests are identified by .integration.test.ts pattern
```

### Integration Test Examples

- Store state management
- Event emission and listening
- API call handling
- Cross-component data flow

## E2E Tests

### Structure

E2E tests verify complete user workflows.

```
e2e/
├── rishta-matchmaking.spec.ts
├── shaadi-wedding-planning.spec.ts
├── jannat-honeymoon.spec.ts
```

### Running E2E Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run specific test file
pnpm test:e2e -- rishta-matchmaking.spec.ts

# Run in UI mode for debugging
pnpm test:e2e:ui

# Run in headed mode (see browser)
pnpm test:e2e -- --headed

# Run single test
pnpm test:e2e -- --grep "should display matching dashboard"
```

### E2E Test Examples

```typescript
import { test, expect } from '@playwright/test';

test('should complete user flow', async ({ page }) => {
  // Navigate to page
  await page.goto('http://localhost:3001');

  // Wait for content
  await page.waitForLoadState('networkidle');

  // Interact with UI
  const button = page.locator('[data-testid="my-button"]');
  await expect(button).toBeVisible();
  await button.click();

  // Verify result
  const result = page.locator('[data-testid="result"]');
  await expect(result).toBeVisible();
  expect(await result.textContent()).toContain('Success');
});
```

### Best Practices for E2E Tests

1. Use `data-testid` attributes for element selection
2. Wait for elements to be interactive
3. Test user workflows, not implementation details
4. Use page objects for complex pages
5. Keep tests isolated and independent

## Lighthouse Performance Audits

### Running Audits

```bash
# Run performance audits
pnpm test:performance

# This runs Lighthouse against all three apps
# Generates JSON reports in .lighthouseci/
```

### Performance Targets

| Metric | Target | Threshold |
|--------|--------|-----------|
| Performance | >75 | Error if <75 |
| Accessibility | >85 | Error if <85 |
| Best Practices | >80 | Error if <80 |
| SEO | >85 | Error if <85 |
| PWA | >70 | Warning if <70 |

### Core Web Vitals

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | <4s |
| CLS (Cumulative Layout Shift) | <0.25 |
| FID (First Input Delay) | <100ms |

## Security Scanning

### Running Security Audits

```bash
# Audit npm packages
pnpm audit:security

# OWASP Dependency Check (if configured)
pnpm run owasp:check

# ESLint security rules
pnpm lint
```

### Common Issues

```
High: Prototype Pollution
→ Update affected package

High: Cross-Site Scripting (XSS)
→ Review dangerouslySetInnerHTML usage

Medium: Insecure Dependencies
→ Update or replace package

Low: Information Disclosure
→ Remove debug logging in production
```

## Code Quality

### Type Checking

```bash
# Run TypeScript compilation check
pnpm type-check

# Fix TypeScript errors
# Errors must be fixed before merging
```

### Linting

```bash
# Run ESLint
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix
```

### Code Formatting

```bash
# Check formatting
pnpm format:check

# Auto-format code
pnpm format
```

## CI/CD Pipeline

### Local CI Simulation

```bash
# Run full CI pipeline locally
pnpm ci

# This runs:
# 1. Type checking
# 2. Linting
# 3. Unit tests with coverage
# 4. Build
```

### GitHub Actions

All tests run automatically on:
- Push to `main` or `develop`
- Pull requests

View results:
```bash
gh run list
gh run view <run-id>
```

## Test Coverage Reports

### Viewing Coverage

```bash
# Generate coverage report
pnpm test:coverage

# Open HTML report
open coverage/index.html
```

### Coverage by Package

| Package | Line | Function | Branch | Statement |
|---------|------|----------|--------|-----------|
| theme-engine | 85% | 85% | 80% | 85% |
| auth | 80% | 80% | 75% | 80% |
| our-story | 85% | 85% | 80% | 85% |
| ui | 75% | 75% | 70% | 75% |
| rishta | 80% | 80% | 75% | 80% |
| shaadi-sajao | 80% | 80% | 75% | 80% |
| jannat-safar | 80% | 80% | 75% | 80% |

## Debugging Tests

### VSCode Debug Configuration

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Tests",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["test", "--inspect-brk"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Debug with Playwright Inspector

```bash
# Run E2E tests with debugger
PWDEBUG=1 pnpm test:e2e
```

## Performance Profiling

### React Profiler

```typescript
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>
```

## Troubleshooting

### Test Failures

1. Check error message
2. Run test in isolation: `pnpm test -- --grep "test name"`
3. Add debug logs: `console.log()`
4. Use debugger: Add `debugger;` statement
5. Check browser console in E2E tests

### Performance Issues

1. Run Lighthouse audit
2. Check network tab
3. Profile with DevTools
4. Review bundle size: `pnpm analyze:bundle`
5. Optimize slow components

### Flaky Tests

1. Add proper waits: `page.waitForLoadState()`
2. Avoid hardcoded timeouts
3. Use reliable selectors: `data-testid`
4. Check for race conditions
5. Run test multiple times locally

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

---

**Last Updated**: 2024-12-01
