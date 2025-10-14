# E2E Test Commands Reference

Quick reference for running Playwright tests on Torra Portal Admissões.

## Installation

```bash
# Install all dependencies
pnpm install

# Install Playwright browsers
pnpm playwright install
```

## Running Tests

### Basic Commands

```bash
# Run all tests
pnpm playwright test

# Run in UI mode (recommended for development)
pnpm playwright test --ui

# Run in headed mode (see browser)
pnpm playwright test --headed

# Debug mode (step-by-step)
pnpm playwright test --debug

# Run and open HTML report
pnpm playwright test && pnpm playwright show-report
```

### By Test File

```bash
# Main flow tests
pnpm playwright test e2e/onboarding-flow.spec.ts

# API integration tests
pnpm playwright test e2e/api-integration.spec.ts

# Edge cases
pnpm playwright test e2e/edge-cases.spec.ts

# Step 1 (Personal Data)
pnpm playwright test e2e/individual-steps/step1-personal-data.spec.ts

# Step 2 (Dependents)
pnpm playwright test e2e/individual-steps/step2-dependents.spec.ts

# All individual steps
pnpm playwright test e2e/individual-steps/
```

### By Browser

```bash
# Chromium only
pnpm playwright test --project=chromium

# Firefox only
pnpm playwright test --project=firefox

# Safari (WebKit) only
pnpm playwright test --project=webkit

# Mobile Chrome
pnpm playwright test --project=mobile-chrome

# Mobile Safari
pnpm playwright test --project=mobile-safari

# All browsers
pnpm playwright test --project=chromium --project=firefox --project=webkit
```

### Filtering Tests

```bash
# Run tests matching pattern
pnpm playwright test -g "should complete all 10 steps"

# Run tests with "validation" in name
pnpm playwright test -g "validation"

# Run tests with "CPF" in name
pnpm playwright test -g "CPF"

# Skip tests matching pattern
pnpm playwright test --grep-invert "slow"
```

### Watch Mode

```bash
# Re-run tests on file changes
pnpm playwright test --watch

# Watch specific file
pnpm playwright test e2e/onboarding-flow.spec.ts --watch
```

## Debugging

```bash
# Open Playwright Inspector
pnpm playwright test --debug

# Debug specific test
pnpm playwright test -g "should validate CPF" --debug

# Show browser console
pnpm playwright test --headed --debug

# Slow down execution
pnpm playwright test --headed --slow-mo=1000

# Generate trace
pnpm playwright test --trace on

# Open trace viewer
pnpm playwright show-trace trace.zip
```

## Reporting

```bash
# Generate HTML report
pnpm playwright test --reporter=html

# Open HTML report
pnpm playwright show-report

# Generate JSON report
pnpm playwright test --reporter=json

# Generate JUnit XML
pnpm playwright test --reporter=junit

# Multiple reporters
pnpm playwright test --reporter=html,json,junit
```

## CI/CD Commands

```bash
# Run in CI mode (with retries)
CI=true pnpm playwright test

# Run with sharded tests (parallel CI)
pnpm playwright test --shard=1/3  # Run 1st third
pnpm playwright test --shard=2/3  # Run 2nd third
pnpm playwright test --shard=3/3  # Run 3rd third
```

## Updating Tests

```bash
# Update snapshots
pnpm playwright test --update-snapshots

# Generate new tests
pnpm playwright codegen http://localhost:3000
```

## Configuration

```bash
# Show Playwright version
pnpm playwright --version

# List all available projects
pnpm playwright test --list

# Show configuration
pnpm playwright show-report --config
```

## Development Workflow

### 1. Development Mode

```bash
# Start dev server
pnpm dev

# In another terminal, run tests in UI mode
pnpm playwright test --ui
```

### 2. Writing Tests

```bash
# Generate test with codegen
pnpm playwright codegen http://localhost:3000/onboarding/1

# Run new test in debug mode
pnpm playwright test e2e/my-new-test.spec.ts --debug
```

### 3. Verification

```bash
# Run affected tests
pnpm playwright test e2e/onboarding-flow.spec.ts

# Run in all browsers
pnpm playwright test --project=chromium --project=firefox

# Check report
pnpm playwright show-report
```

## Troubleshooting

### Port Already in Use

```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in playwright.config.ts
```

### Timeout Errors

```bash
# Increase timeout
pnpm playwright test --timeout=120000

# Or in test file:
test.setTimeout(120000);
```

### Browser Not Installed

```bash
# Install all browsers
pnpm playwright install

# Install specific browser
pnpm playwright install chromium
```

### Clean State

```bash
# Clear Playwright cache
pnpm playwright install --force

# Remove test results
rm -rf test-results playwright-report

# Clear node modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Useful Aliases

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
alias pwt="pnpm playwright test"
alias pwt:ui="pnpm playwright test --ui"
alias pwt:debug="pnpm playwright test --debug"
alias pwt:headed="pnpm playwright test --headed"
alias pwt:report="pnpm playwright show-report"
alias pwt:chrome="pnpm playwright test --project=chromium"
```

## Environment Variables

```bash
# Run with custom base URL
BASE_URL=https://staging.example.com pnpm playwright test

# Run with custom timeout
TIMEOUT=60000 pnpm playwright test

# Run in CI mode
CI=true pnpm playwright test

# Debug Playwright
DEBUG=pw:api pnpm playwright test
```

## Quick Scenarios

### Test a Single Feature

```bash
pnpm playwright test -g "personal data" --project=chromium --headed
```

### Test on Mobile

```bash
pnpm playwright test --project=mobile-chrome --headed
```

### Full Regression Suite

```bash
pnpm playwright test --project=chromium --project=firefox --reporter=html
```

### Accessibility Check

```bash
pnpm playwright test e2e/edge-cases.spec.ts -g "accessibility"
```

### API Integration Check

```bash
pnpm playwright test e2e/api-integration.spec.ts
```

---

For more information, see:
- `e2e/README.md` - Comprehensive documentation
- `e2e/TEST-SUMMARY.md` - Test coverage summary
- [Playwright Documentation](https://playwright.dev)
