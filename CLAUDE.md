# Torra Portal Admissões - Claude AI Configuration

**Project**: Employee Onboarding Portal for Torra Company
**Last Updated**: 2025-09-23
**Analysis Version**: e899924

## Project Overview

This is a modern employee admission and onboarding portal built for Torra company. The application guides new hires through a comprehensive 10-step registration process, collecting personal data, dependent information, address details, contractual information, and required documents.

**Key Features**:
- Multi-step wizard with progress tracking
- Document upload and validation
- Brazilian localization (CPF/RG validation, Portuguese interface)
- Persistent state across browser sessions
- Responsive design with custom Torra branding

## AI Team Configuration

### Detected Technology Stack

**Frontend Framework & Language**:
- Next.js 15.5.4 with App Router and React 19.1.1
- TypeScript 5.9.2 with strict mode
- Static export configuration for CDN deployment

**Styling & UI Components**:
- Tailwind CSS 4.1.13 with custom Torra theme
- Radix UI primitives with shadcn/ui component library
- Lucide React icons
- Custom Sofia Pro font family

**State Management & Forms**:
- Zustand 5.0.8 for global state with localStorage persistence
- React Hook Form 7.63.0 for form management
- Zod 4.1.11 for schema validation and type safety
- TanStack Query 5.90.2 (configured but not yet utilized)

**Development Tools**:
- pnpm for package management with workspace configuration
- Biome 2.2.4 for unified linting and formatting
- Turbopack for enhanced build performance
- Vercel deployment configuration

### Recommended Specialist Agents

Based on the technology stack analysis, the following specialist agents are most suitable for this project:

#### Primary Development Team

1. **react-nextjs-expert**
   - **Use for**: Next.js App Router development, SSG configuration, React 19 features
   - **Specialties**: Server-side rendering, static generation, routing, performance optimization
   - **When to delegate**: New pages, routing changes, Next.js configuration updates

2. **frontend-developer**
   - **Use for**: General React component development, TypeScript implementation
   - **Specialties**: Component architecture, hooks, modern React patterns
   - **When to delegate**: Component creation, React-specific features, TypeScript interfaces

3. **tailwind-frontend-expert**
   - **Use for**: Styling tasks, responsive design, component theming
   - **Specialties**: Tailwind CSS utilities, custom themes, responsive breakpoints
   - **When to delegate**: UI styling, design system updates, responsive layout issues

#### Specialized Support Team

4. **backend-developer**
   - **Use for**: Future API integration, server-side logic (when needed)
   - **Specialties**: RESTful APIs, authentication, file upload handling
   - **When to delegate**: API endpoint creation, server integration, authentication setup

5. **code-reviewer**
   - **Use for**: Code quality assurance, security review, best practices
   - **Specialties**: Security analysis, performance review, code standards
   - **When to delegate**: After major features, before production deployments, security audits

6. **performance-optimizer**
   - **Use for**: Build optimization, bundle analysis, loading performance
   - **Specialties**: Bundle splitting, image optimization, caching strategies
   - **When to delegate**: Performance issues, slow load times, large bundle sizes

### Workflow Patterns

#### Feature Development Workflow
```
1. frontend-developer (or react-nextjs-expert) → Implementation
2. tailwind-frontend-expert → Styling (if needed)
3. code-reviewer → Quality assurance
4. performance-optimizer → Optimization (if performance impact)
```

#### Form & Validation Updates
```
1. frontend-developer → Form logic and Zod schemas
2. tailwind-frontend-expert → Form styling and UX
3. code-reviewer → Validation security and completeness
```

#### API Integration (Future)
```
1. backend-developer → API design and implementation
2. frontend-developer → Frontend integration
3. code-reviewer → Security and error handling review
```

### Task Delegation Rules

#### Automatic Delegations

**Frontend Tasks**:
- New React components → `frontend-developer`
- Next.js routing or configuration → `react-nextjs-expert`
- Styling and design → `tailwind-frontend-expert`

**Quality Assurance**:
- Any significant code changes → `code-reviewer` (always)
- Performance concerns → `performance-optimizer`
- Security-related changes → `code-reviewer` with security focus

**Future Backend Work**:
- API endpoints → `backend-developer`
- File upload implementation → `backend-developer`
- Authentication system → `backend-developer`

#### Manual Delegation Triggers
- Complex multi-step form logic → Consider both `frontend-developer` and `react-nextjs-expert`
- Custom UI components → `frontend-developer` + `tailwind-frontend-expert`
- State management changes → `frontend-developer` (Zustand expert)

### Project-Specific Context

#### Brazilian Localization Requirements
- CPF/RG validation patterns
- CEP (postal code) lookup integration
- Brazilian phone number formatting
- Portuguese language interface

#### Key Business Logic
- 10-step onboarding process with specific validation per step
- Document upload requirements (PDF, JPG, JPEG, PNG)
- Personal data collection compliant with Brazilian regulations
- Employee dependent information management

#### Current Limitations & Future Needs
- **No backend integration** - requires API development
- **File uploads** - need server-side processing
- **Authentication** - user management system needed
- **Testing** - comprehensive test suite required

### Usage Examples

```bash
# Feature development
"I need to add a new onboarding step for emergency contacts"
→ Delegate to frontend-developer for React/TypeScript implementation
→ Follow up with tailwind-frontend-expert for styling
→ Finish with code-reviewer for quality assurance

# UI improvements
"The form validation messages need better styling"
→ Delegate to tailwind-frontend-expert for design improvements
→ May involve frontend-developer if logic changes needed

# Performance issues
"The bundle size is too large and pages load slowly"
→ Delegate to performance-optimizer for analysis and optimization
→ May involve react-nextjs-expert for Next.js-specific optimizations
```

## Development Commands

```bash
# Development
pnpm dev                    # Start development server with Turbopack
pnpm build                  # Build for production
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # Run Biome linter
pnpm format                 # Format code with Biome
biome check --write         # Lint and format in one command

# Dependencies
pnpm install                # Install dependencies
pnpm add <package>          # Add new dependency
pnpm remove <package>       # Remove dependency
```

## Notes for AI Assistants

- **Always run code quality checks** after making changes (`biome check --write`)
- **Preserve TypeScript strict mode** - maintain comprehensive typing
- **Follow existing patterns** - check similar components before creating new ones
- **Maintain Portuguese localization** - all user-facing text should be in Portuguese
- **Consider mobile-first** - all components should be responsive
- **Test in development** - always verify changes work in development mode
- **Respect the 10-step flow** - maintain the sequential onboarding process logic