# 🚀 Deployment Guide - Torra Portal Admissões

Complete guide for deploying the frontend application with CI/CD automation.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Vercel Deployment](#vercel-deployment)
- [GitHub Actions Setup](#github-actions-setup)
- [Environment Variables](#environment-variables)
- [Deployment Workflow](#deployment-workflow)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

**Frontend Stack:**
- Next.js 15.5.4 with App Router
- React 19.1.1 with TypeScript 5.9.2
- Tailwind CSS 4.1.13
- Zustand 5.0.8 for state management
- Axios for API integration
- Playwright 1.56.0 for E2E testing

**Deployment Targets:**
- **Production**: Vercel (https://torra-portal-admissoes.vercel.app)
- **Preview**: GitHub Pages (for static preview)
- **Backend API**: https://torra-admissoes.mahina.cloud

## 📦 Prerequisites

- Node.js 20.x or higher
- pnpm 9.x
- GitHub account with repository access
- Vercel account (free tier works)
- Backend API running at https://torra-admissoes.mahina.cloud

## 🌐 Vercel Deployment

### 1. Initial Setup

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link
```

### 2. Configure Vercel Project

Create `vercel.json` in project root (already exists):

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "outputDirectory": ".next"
}
```

### 3. Set Environment Variables in Vercel Dashboard

Go to: https://vercel.com/your-org/torra-portal-admissoes/settings/environment-variables

Add:
- `NEXT_PUBLIC_API_URL` = `https://torra-admissoes.mahina.cloud`

### 4. Deploy Manually (First Time)

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

## 🔧 GitHub Actions Setup

### Required GitHub Secrets

Navigate to: `Settings → Secrets and variables → Actions → New repository secret`

Add the following secrets:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `VERCEL_TOKEN` | Vercel authentication token | Vercel Dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | Your Vercel organization ID | Run `vercel link` and check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Vercel project ID | Same as above |

#### Getting Vercel Credentials

1. **VERCEL_TOKEN**:
   ```bash
   # Go to: https://vercel.com/account/tokens
   # Create new token with full access
   ```

2. **VERCEL_ORG_ID & VERCEL_PROJECT_ID**:
   ```bash
   cd /Users/gabrielmaia/Documents/projects/torra/torra-portal-admissoes
   vercel link
   cat .vercel/project.json
   ```

### Workflows Overview

We have 3 GitHub Actions workflows:

#### 1. `ci.yml` - Continuous Integration
**Triggers**: Push to `main`/`develop`, Pull Requests

**Jobs**:
- Linting (Biome)
- Type checking (TypeScript)
- Build verification
- E2E tests (Playwright)

#### 2. `vercel-deploy.yml` - Vercel Deployment
**Triggers**: Push to `main`, Pull Requests

**Environments**:
- `main` branch → Production deployment
- PR → Preview deployment with URL comment

#### 3. `deploy.yml` - GitHub Pages (Existing)
**Triggers**: Push to `main`

**Purpose**: Static export for archival/preview

## 🔐 Environment Variables

### Local Development

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://torra-admissoes.mahina.cloud
```

### Production (Vercel)

Set in Vercel Dashboard:
- `NEXT_PUBLIC_API_URL=https://torra-admissoes.mahina.cloud`

### CI/CD (GitHub Actions)

Already configured in workflow files. No additional setup needed.

## 🚀 Deployment Workflow

### Automated Deployment (Recommended)

1. **Make Changes**:
   ```bash
   git checkout -b feature/new-feature
   # Make your changes
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

2. **Open Pull Request**:
   - CI runs automatically (tests + lint)
   - Preview deployment created on Vercel
   - Preview URL commented on PR

3. **Merge to Main**:
   ```bash
   git checkout main
   git merge feature/new-feature
   git push origin main
   ```

4. **Automatic Production Deployment**:
   - CI runs on main
   - Production deployment to Vercel
   - GitHub Pages updated
   - Deployment URL: https://torra-portal-admissoes.vercel.app

### Manual Deployment

```bash
# Preview
vercel

# Production
vercel --prod

# With custom domain
vercel --prod --alias torra-portal-admissoes.vercel.app
```

## 🧪 Testing

### Run Tests Locally

```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install

# Run all tests
pnpm exec playwright test

# Run tests in UI mode (recommended)
pnpm exec playwright test --ui

# Run specific test file
pnpm exec playwright test e2e/onboarding-flow.spec.ts

# Run tests in headed mode
pnpm exec playwright test --headed

# Debug tests
pnpm exec playwright test --debug
```

### CI Test Results

- Test reports are uploaded as artifacts in GitHub Actions
- Access via: `Actions → CI - Test & Lint → Artifacts`
- Download `playwright-report` or `test-results`

### View Test Report Locally

```bash
pnpm exec playwright show-report
```

## 🔍 Monitoring & Debugging

### Vercel Dashboard

- **Deployments**: https://vercel.com/your-org/torra-portal-admissoes/deployments
- **Analytics**: https://vercel.com/your-org/torra-portal-admissoes/analytics
- **Logs**: Click on deployment → View Function Logs

### GitHub Actions

- **Workflow runs**: https://github.com/hidedevelopment/torra-portal-admissoes/actions
- **Failed jobs**: Check logs in the failed job step

### Local Debugging

```bash
# Check build locally
pnpm build
pnpm start

# Check for TypeScript errors
pnpm tsc --noEmit

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🐛 Troubleshooting

### Build Fails on Vercel

**Error**: `Module not found` or `Cannot find module`

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: update dependencies"
git push
```

### E2E Tests Failing

**Error**: `Test timeout exceeded`

**Solution**:
- Increase timeout in `playwright.config.ts`
- Check if API is reachable: `curl https://torra-admissoes.mahina.cloud/health`

### Deployment Succeeds but Site Not Loading

**Issue**: White screen or errors in browser console

**Check**:
1. Environment variables in Vercel
2. API URL is correct and accessible
3. Browser console for CORS errors

### CORS Errors

**Solution**: Backend API must allow origin `https://torra-portal-admissoes.vercel.app`

Check backend `appsettings.Production.json`:
```json
{
  "Cors": {
    "AllowedOrigins": [
      "https://torra-portal-admissoes.vercel.app",
      "https://torra-admissoes.mahina.cloud"
    ]
  }
}
```

### Playwright Tests Fail in CI but Pass Locally

**Common Causes**:
- Different browser versions
- Missing dependencies
- Timing issues

**Solutions**:
1. Run tests in CI mode locally:
   ```bash
   pnpm exec playwright test --project=chromium
   ```

2. Update browsers:
   ```bash
   pnpm exec playwright install --with-deps
   ```

## 📊 Performance Optimization

### Build Optimization

Already configured:
- Turbopack for faster builds
- Static optimization for pages
- Image optimization with Sharp

### Monitoring

- **Web Vitals**: Available in Vercel Analytics
- **Bundle Size**: Check Vercel build logs
- **Lighthouse**: Run in Chrome DevTools

## 🔄 Rollback Procedure

### Via Vercel Dashboard

1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Via CLI

```bash
vercel rollback
```

## 📝 Checklist Before Deployment

- [ ] All tests passing locally
- [ ] No TypeScript errors
- [ ] Code formatted (Biome)
- [ ] Environment variables configured in Vercel
- [ ] Backend API is accessible
- [ ] CORS configured on backend
- [ ] GitHub Secrets configured
- [ ] PR reviewed and approved

## 🆘 Support

For issues:
1. Check GitHub Actions logs
2. Check Vercel deployment logs
3. Review this troubleshooting guide
4. Contact development team

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Playwright Documentation](https://playwright.dev/)

---

**Last Updated**: October 14, 2025
**Version**: 1.0.0
