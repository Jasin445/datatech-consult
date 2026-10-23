# MASTER IMPLEMENTATION PROMPT: DATATECHHUB CONSULTING WEBSITE

> Source brief for this project. Stored verbatim for reference. Where this document and the current code or records disagree, the records (`PROGRESS.md`, `CHECKPOINTS.md`, `IMPLEMENTATION_PLAN.md`, `STYLING.md`) document the decisions actually taken.

## 1. ROLE AND OBJECTIVE

Act as a senior full-stack engineer, frontend architect, UI/UX designer, accessibility specialist, and quality-assurance engineer.

Your task is to design, implement, test, and prepare a complete, production-oriented website for **Datatechhub Consulting**, an existing business associated with the Datatechhub parent brand.

This is a real multi-page business website, not a static mockup, landing-page-only exercise, or collection of disconnected screens.

Build the website with a consistent design system, functional navigation, complete page layouts, reusable components, realistic content structures, appropriate server-side functionality, and production-readiness safeguards.

The website must communicate the business's services clearly, establish credibility without inventing facts, and convert visitors into business enquiries or consultation bookings.

### Critical execution requirement

Implement the website incrementally using persistent page-level checkpoints.

All website code, content, configuration templates, documentation, tests, and checkpoint records must remain inside **one project folder and one Git repository**.

Do not create a separate project for each page. Do not scatter page implementations across unrelated folders. Do not require all pages to be generated in one uninterrupted session.

Complete the project in a sequence of checkpoints. After completing each checkpoint:

1. Save all relevant files to disk.
2. Ensure the project remains runnable.
3. Run the checks appropriate to the work completed.
4. Record exactly what has been completed.
5. Record any errors, missing configuration, and unfinished work.
6. Update the persistent progress manifest.
7. Stop and provide a concise checkpoint report when the checkpoint boundary is reached.

When work resumes in a new session, inspect the existing project and progress manifest before making changes. Continue from the first incomplete checkpoint without overwriting or regenerating completed work unnecessarily.

**Do not implement the entire website in one giant operation. Do not split it into separate projects or unrelated prompts. The project remains one integrated application throughout.**

---

## 2. BUSINESS CONTEXT

### Brand

- Business name: Datatechhub Consulting.
- Parent brand: Datatechhub.
- Existing logo: use the supplied logo unchanged.
- Add “Consulting” as a descriptor where appropriate.
- Existing parent-brand tagline: “Empowering through data.”
- Do not redesign the logo or invent a new corporate identity.

If the logo is unavailable in the project files, create a clearly marked temporary asset reference or placeholder. Do not fabricate a replacement and present it as the official logo.

The final production logo asset must work against the website's intended background.

### Audience

The primary audiences are:

- SMEs and growing businesses.
- Established companies.
- NGOs and development organizations.
- Institutions.

The target markets are Nigeria and wider Africa.

Use clear, professional, accessible business English. The site should feel credible to decision-makers, not like a generic AI startup template.

### Positioning

Datatechhub Consulting is a practical business problem-solving partner. Its work connects business needs with data, technology, implementation, and improved decision-making.

Avoid presenting the business as merely a software development agency, an AI tools reseller, a training platform, or a generic technology consultancy.

The separate Datatechhub learning platform is outside this project's scope.

### Primary conversion goals

Priority 1: business enquiries.

Priority 2: consultation bookings.

Every major page should help visitors understand what the business does, whether the services fit their situation, and how to take the next step.

---

## 3. CONFIRMED SERVICES

All four service categories below are genuinely offered. Implement a dedicated service page for each.

### A. Data Analytics & Business Intelligence

Potential capabilities include:

- Business intelligence dashboards.
- KPI reporting and performance measurement.
- Business and operational data analysis.
- Reporting automation.
- Decision-support reporting.
- Identifying trends, performance gaps, and useful insights.

Focus on helping organisations understand performance and make better-informed decisions.

### B. Data Infrastructure & Engineering

Potential capabilities include:

- Data pipelines and processing.
- Data integration.
- Data quality and consistency.
- Data architecture.
- Reporting infrastructure.
- Connecting information from different systems.
- Data documentation and maintainability.

Explain the importance of dependable data foundations without assuming every client needs a complex data platform.

### C. AI & Automation

Potential capabilities include:

- Workflow automation.
- AI-assisted business processes.
- Internal tools.
- System integrations.
- Repetitive-task reduction.
- Practical AI implementation.

Emphasize problem fit, feasibility, risk, maintainability, and human oversight where appropriate.

Do not imply that AI is always the correct solution.

### D. Business & Technology Consulting

Potential capabilities include:

- Business and technical discovery.
- Requirements gathering.
- Technology assessment.
- Solution architecture.
- Implementation planning.
- Technology advisory.
- Translating business needs into practical technical plans.

Present strategy and implementation as connected activities, while making clear that actual project scope depends on the engagement.

Do not invent additional service categories as if the business has confirmed them.

---

## 4. REQUIRED TECHNOLOGY

Use the following technology direction unless a genuine compatibility issue requires a documented alternative.

- Next.js with App Router.
- TypeScript in strict mode.
- React.
- Server Components by default.
- Client Components only when interactivity requires them.
- Shared CSS design tokens and a consistent styling approach.
- Server-side processing for enquiry forms.
- A configurable external scheduling provider for consultation bookings.
- Code-managed content for services, case studies, articles, and leadership information.

Use current stable, mutually compatible dependency versions available in the development environment. Avoid unnecessary dependencies.

Before installing libraries, inspect the existing project and package manager.

Do not replace a functioning project configuration without understanding it.

If a repository already exists, preserve its working structure where practical. If starting from an empty folder, initialize the application in the current project folder rather than creating nested duplicate applications.

### Explicitly out of scope for the initial release

Do not add these unless a genuine requirement emerges:

- A database.
- A CMS.
- An admin dashboard.
- Authentication.
- User accounts.
- A custom booking engine.
- An unnecessary backend service.
- A separate microservice architecture.

Use local structured content for initial content management.

---

## 5. SINGLE-FOLDER AND PROJECT-PERSISTENCE REQUIREMENTS

The complete application must live in one project root, for example:

`datatechhub-consulting/`

Use the existing root if one has already been established.

Suggested structure:

```text
datatechhub-consulting/
├── README.md
├── IMPLEMENTATION_PLAN.md
├── PROGRESS.md
├── CHECKPOINTS.md
├── RELEASE_CHECKLIST.md
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
├── public/
│   ├── images/
│   ├── logos/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── data-analytics/
│   │   │   │   └── page.tsx
│   │   │   ├── data-infrastructure/
│   │   │   │   └── page.tsx
│   │   │   ├── ai-automation/
│   │   │   │   └── page.tsx
│   │   │   └── business-technology-consulting/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── insights/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── book-consultation/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── sections/
│   │   ├── services/
│   │   ├── case-studies/
│   │   ├── insights/
│   │   ├── forms/
│   │   └── ui/
│   ├── content/
│   │   ├── services/
│   │   ├── case-studies/
│   │   ├── insights/
│   │   └── leadership/
│   ├── lib/
│   │   ├── email/
│   │   ├── validation/
│   │   ├── content/
│   │   └── seo/
│   └── styles/
└── tests/
```

This is a suggested structure, not a requirement to create empty directories or files. Adjust it when a simpler or more appropriate Next.js structure is justified.

Do not put every page into one enormous component.

Do not create one project folder per page.

Do not duplicate the same header, footer, button, form behavior, or service-card implementation across multiple pages.

### Required persistent records

`IMPLEMENTATION_PLAN.md` must describe the architecture, routes, dependencies, design system, integrations, and checkpoint sequence.

`PROGRESS.md` must identify the current checkpoint, completed work, incomplete work, blockers, last successful validation, and exact next action.

`CHECKPOINTS.md` must record each checkpoint's status and the files or features delivered.

`RELEASE_CHECKLIST.md` must track production prerequisites and final verification.

Keep these records updated as work progresses. They are part of the implementation, not optional documentation.

---

## 6. DESIGN SYSTEM

### Confirmed colors

- Primary blue: `#1E64AB`.
- Secondary blue: `#15A8EA`.
- Main background: white.

Proposed supporting colors:

- Charcoal: `#172B3A`.
- Pale blue-gray: `#F3F7FA`.

The supporting colors are proposals, not verified official brand colors. Implement them as design tokens so they can be changed centrally.

Use the primary blue for important buttons, links, and emphasis. Use the secondary blue for accents and graphics only where contrast remains appropriate.

### Visual direction

- Modern sans-serif typography.
- Clean, professional layouts.
- Restrained card shadows.
- Moderately rounded buttons and components.
- Generous whitespace.
- Strong visual hierarchy.
- Professional, natural photography.
- Restrained data-related illustrations and graphics.
- Authentic contextual relevance to Nigeria and wider Africa.
- No generic decorative cultural motifs merely to signal an African identity.

The site should be visually polished without unnecessary animation or excessive decoration.

### Initial layout tokens

Use these as starting points:

- Main content maximum width: approximately 1200px.
- Reading width: approximately 700–780px.
- Desktop horizontal padding: 48–64px.
- Mobile horizontal padding: 20–24px.
- Desktop section spacing: 80–112px.
- Mobile section spacing: 52–72px.

Establish a consistent spacing scale, responsive breakpoints, typography scale, radii, shadows, button dimensions, and animation durations in shared tokens.

Do not scatter arbitrary spacing and color values throughout the application.

### Responsive behavior

Design and verify:

- Mobile.
- Tablet.
- Desktop.
- Wide desktop.

On mobile, prioritize clear text, legible controls, and usable CTAs. Avoid cramped columns, horizontal overflow, excessively tall hero sections, and navigation that obscures content.

The header must be sticky. The mobile menu must be keyboard-accessible and usable with touch.

Ensure sticky navigation does not cover anchored headings or form feedback.

### Motion

Use subtle transitions where they improve feedback or hierarchy.

Respect `prefers-reduced-motion`.

Do not add fake live-data animations, parallax, cursor-following effects, or decorative motion without a clear purpose.

### Accessibility

Target WCAG 2.2 AA.

Implement:

- Semantic HTML.
- Proper heading hierarchy.
- Keyboard navigation.
- Visible focus indicators.
- Accessible labels and descriptions.
- Clear validation and error announcements.
- Suitable color contrast.
- Appropriate touch-target sizing.
- Reduced-motion support.
- Meaningful alternative text.
- Correct dialog and menu behavior where relevant.

Normal text should generally meet a 4.5:1 contrast ratio; large text should generally meet 3:1.

Do not assume that a visually attractive design is accessible.

---

## 7. COMPLETE ROUTE REQUIREMENTS

Implement these routes:

1. `/`
2. `/services`
3. `/services/data-analytics`
4. `/services/data-infrastructure`
5. `/services/ai-automation`
6. `/services/business-technology-consulting`
7. `/about`
8. `/case-studies`
9. `/case-studies/[slug]`
10. `/insights`
11. `/insights/[slug]`
12. `/contact`
13. `/book-consultation`
14. `/privacy`

Every route must use the shared layout and design system.

All internal links must point to real destinations.

Use correct 404 behavior for unknown case-study and article slugs.

Case Studies and Insights are conditional sections. If no approved content exists, hide their navigation links and homepage sections. Do not display empty archives or fabricated evidence.

Do not invent routes beyond this structure without a clear reason.

---

## 8. DETAILED PAGE SPECIFICATIONS

### PAGE 1: GLOBAL APPLICATION FOUNDATION

Create the shared application shell before building the individual pages.

Implement:

- Root layout.
- Global metadata defaults.
- Global styles and design tokens.
- Shared container and section patterns.
- Site header.
- Sticky navigation.
- Accessible mobile navigation.
- Site footer.
- Reusable buttons and links.
- Common loading, error, empty, and not-found states.
- Responsive behavior.
- Base typography and spacing.
- Shared CTA component.
- Environment-variable validation strategy.
- Initial documentation and checkpoint records.

Header navigation should include:

- Logo.
- Services.
- About.
- Case Studies when approved content exists.
- Insights when approved content exists.
- Contact.
- Prominent Book a Consultation CTA.

The footer should include only verified contact details, approved social links, the privacy link, and an appropriate parent-brand link.

If actual details are missing, use explicit placeholders in development and omit or safely disable unavailable production elements.

**Checkpoint 1:** The application shell is functional and saved. The app should run before individual pages are built.

### PAGE 2: HOMEPAGE

Implement the complete homepage at `/`.

#### Section 1: Hero

Proposed headline:

“Make your data and technology work for your business.”

Proposed supporting copy:

“We help organisations solve business challenges, improve decision-making, and streamline operations through practical data, analytics, AI, automation, and technology solutions.”

Primary CTA: “Discuss a business challenge.”

Secondary CTA: “Explore our services.”

Use a desktop two-column composition with text on the left and a professional image or restrained data graphic on the right.

On mobile, show text and actions first.

#### Section 2: Business challenges

Address relevant problems such as:

- Manual reporting.
- Fragmented information.
- Unreliable decision evidence.
- Unclear AI or technology opportunities.
- Repetitive workflows.

Do not claim every prospective client experiences every problem.

#### Section 3: Four service cards

Display all four confirmed service categories.

Each card must include:

- Service title.
- Concise description.
- Business problems addressed or likely outcomes.
- Link to its dedicated service page.

#### Section 4: Why Datatechhub

Use principles such as:

- Start with the business problem.
- Design for the organisation's context.
- Connect strategy to practical implementation.
- Focus on useful outcomes.

Present these as working principles, not unverifiable achievements.

#### Section 5: How we work

Use a clear process:

Understand → Diagnose → Design → Implement, where agreed → Support and improve, where agreed.

#### Section 6: Credibility

Use verified company information, leadership credentials, or approved project evidence when available.

Never fill this section with invented testimonials, logos, certifications, or statistics.

If no approved evidence is available, use a transparent process-oriented section instead.

#### Section 7: Who we help

Include:

- SMEs and growing businesses.
- Established companies.
- NGOs and development organizations.
- Institutions.

#### Section 8: Insights

Render only if at least one approved article exists.

#### Section 9: Final CTA

Suggested copy:

“Let's talk about the challenge you're trying to solve.”

Provide enquiry and consultation actions.

**Checkpoint 2:** The homepage is implemented, responsive, navigable, and saved. All content should be data-driven where practical.

### PAGE 3: SERVICES OVERVIEW

Route: `/services`

Implement:

- Page heading and concise introduction.
- Four service categories.
- Problems the services address.
- How different service areas can work together.
- Overview of the engagement process.
- Clear enquiry and consultation CTAs.

Each service card must link to the correct detail page.

Do not simply repeat the homepage section at greater length. Explain the service offering in enough detail to help a prospective client determine relevance.

**Checkpoint 3:** The services overview is complete and all service links work.

### PAGE 4: DATA ANALYTICS & BUSINESS INTELLIGENCE

Route: `/services/data-analytics`

Implement:

- Service introduction.
- Problems addressed.
- Relevant capabilities.
- Example deliverables.
- Typical engagement approach.
- Expected business value without guarantees.
- Related services.
- CTA.

Possible deliverables include dashboards, KPI reports, performance analysis, and automated reporting where appropriate.

Explain that useful analytics depend on suitable data, clear business questions, and appropriate interpretation.

Do not invent specific client outcomes.

**Checkpoint 4:** This page is complete and independently testable.

### PAGE 5: DATA INFRASTRUCTURE & ENGINEERING

Route: `/services/data-infrastructure`

Implement:

- Service introduction.
- Common data infrastructure problems.
- Data pipelines and integrations.
- Data quality and consistency.
- Architecture and reporting foundations.
- Example deliverables.
- Engagement process.
- Related services and CTA.

Avoid assuming every client requires cloud migration, a data warehouse, or a complex architecture.

**Checkpoint 5:** This page is complete and independently testable.

### PAGE 6: AI & AUTOMATION

Route: `/services/ai-automation`

Implement:

- Service introduction.
- Suitable automation and AI use cases.
- Workflow automation.
- AI-assisted processes.
- Internal tools and integrations.
- Feasibility and implementation considerations.
- Risks, maintenance, and human oversight where relevant.
- Related services and CTA.

Do not promise that AI will eliminate jobs, remove all errors, or deliver guaranteed cost savings.

**Checkpoint 6:** This page is complete and independently testable.

### PAGE 7: BUSINESS & TECHNOLOGY CONSULTING

Route: `/services/business-technology-consulting`

Implement:

- Service introduction.
- Discovery and requirements.
- Business and technical assessment.
- Technology evaluation.
- Solution architecture.
- Implementation planning.
- Advisory and related deliverables.
- Related services and CTA.

Clearly distinguish advisory deliverables from actual implementation work where the engagement scope differs.

**Checkpoint 7:** All four service pages and the services overview are complete.

### PAGE 8: ABOUT

Route: `/about`

Implement:

- Company overview.
- Relationship to Datatechhub.
- Leadership section.
- Working principles.
- Relevant approved evidence.
- CTA.

Do not invent the company's founding year, legal status, company history, leadership identities, professional credentials, mission statement, or partnerships.

Use clearly labeled dummy profiles during development if needed.

Hide unapproved profiles in production.

If the leadership information is unavailable, use an honest company-focused layout instead of publishing fictional people.

**Checkpoint 8:** The About page is complete and safe with missing company information.

### PAGE 9: CASE STUDIES

Routes:

- `/case-studies`
- `/case-studies/[slug]`

Implement:

- Conditional case-study index.
- Reusable case-study cards.
- Typed content registry.
- Individual case-study template.
- Slug validation.
- Proper 404 behavior.
- Related services.
- CTA.

A case study may contain:

- Client or organization, only when permission is granted.
- Challenge.
- Objectives.
- Actual company contribution.
- Approach.
- Solution.
- Deliverables.
- Verified results.
- Lessons learned.
- Related services.

Distinguish completed work, prototypes, internal demonstrations, and ongoing work.

Do not represent a fictional example as a real engagement.

If no approved case studies exist, hide the navigation link and homepage section. The index route must not expose fake projects.

**Checkpoint 9:** Case-study routes work, content filtering is enforced, and unknown slugs return 404.

### PAGE 10: INSIGHTS

Routes:

- `/insights`
- `/insights/[slug]`

Implement:

- Conditional article index.
- Reusable article cards.
- Article detail template.
- Typed content registry or Markdown/MDX content.
- Article metadata.
- Related articles where applicable.
- Related services.
- CTA.
- SEO metadata.
- Correct 404 behavior.

Support appropriate title, summary, body content, author information when verified, publication date, and optional licensed media.

Do not fabricate authors, publication dates, citations, data, statistics, or company experience.

Draft or illustrative articles must not appear as approved production content.

If no approved articles exist, hide Insights navigation and homepage sections.

**Checkpoint 10:** Article routes and conditional publishing rules work.

### PAGE 11: CONTACT AND ENQUIRY SYSTEM

Routes:

- `/contact`
- `/api/contact`

Implement a functional enquiry form.

#### Fields

Required:

- Name.
- Business email.
- Description of the business challenge.

Optional:

- Organization name.
- Organization type.
- Service interest.
- “Not sure yet” as a service-interest option.

Add other fields only when they provide a clear business benefit.

Do not make phone number, budget, or timeline mandatory without a justified requirement.

#### Validation and server processing

Implement:

- Accessible client-side validation.
- Server-side validation.
- Email format validation.
- Sensible input limits.
- Safe normalization and handling of submitted values.
- Appropriate spam protection.
- Rate limiting.
- Server-side email integration.
- Useful success and error states.
- Input preservation after recoverable errors.
- Server-side logging that avoids unnecessary personal information.

Do not trust client validation alone.

Do not expose secrets in browser code.

Do not expose internal exception messages to visitors.

#### Email behavior

Use a provider adapter or similarly clear abstraction so the email provider can be configured without rewriting the entire form.

Use environment variables for credentials and recipient configuration.

Create `.env.example` with variable names and explanatory placeholder values only. Never include real credentials.

Validate required configuration server-side.

Do not silently redirect enquiries to an invented email address.

A success message may be shown only when the application's defined operation has succeeded.

If email delivery is not configured, the form must not claim that an enquiry has been sent. In development, display a clearly labeled configuration warning. In production, disable submission or show an honest alternative contact method.

If a provider only acknowledges receipt of an email request, do not claim final delivery is guaranteed.

Document whether a durable queue or retry strategy is necessary for the chosen hosting environment.

**Checkpoint 11:** The contact page and server-side enquiry flow are implemented and tested for success, invalid input, provider failure, and missing configuration.

### PAGE 12: CONSULTATION BOOKING

Route: `/book-consultation`

Implement:

- Clear explanation of the consultation.
- Expected purpose.
- Meeting duration and format when confirmed.
- Embedded scheduler or provider-approved booking link.
- Fallback contact route.
- Useful configuration and error states.

Use a configurable scheduling provider.

Do not invent booking availability or create a fake calendar.

The provider should manage time zones, confirmations, cancellations, and rescheduling where supported.

If the provider is not configured, display a clear message and an enquiry CTA. Do not imply that the user has booked a meeting.

**Checkpoint 12:** The booking page works with real configuration or safely displays its unconfigured state.

### PAGE 13: PRIVACY

Route: `/privacy`

Create a structured privacy notice that accurately describes the website's actual data practices.

Address, where applicable:

- Data collected.
- Purposes of collection.
- Legal basis where relevant.
- Email and scheduling processors.
- Retention.
- Security practices.
- Applicable individual rights.
- How to make privacy requests.
- Cookies and analytics, if used.
- Relevant business contact details.
- Applicable jurisdictions.

Do not invent a legal entity, physical address, privacy contact, legal claims, or processing practices.

Use clearly labeled draft content during development.

Before collecting real personal information in production, require business review and verification against applicable law, including relevant Nigerian data-protection requirements where applicable.

Do not treat a generic template as proof of legal compliance.

**Checkpoint 13:** The privacy page is implemented, its placeholders are identified, and the remaining review requirements are recorded.

### PAGE 14: SEO AND SITE DISCOVERY

Implement:

- Page-specific metadata.
- Appropriate titles and descriptions.
- Canonical URLs based on verified production configuration.
- Sitemap.
- Robots rules.
- Open Graph metadata.
- Suitable social-sharing metadata.
- Structured data only where accurate and appropriate.
- Descriptive page headings.
- Meaningful link text.
- Correct 404 responses.

Do not invent business addresses, ratings, awards, social profiles, or other structured business facts.

Exclude non-public or unapproved content from the sitemap.

Do not index development-only dummy content.

**Checkpoint 14:** SEO and site-discovery behavior is implemented and verified.

### PAGE 15: FINAL INTEGRATION AND QUALITY ASSURANCE

Integrate and test the entire application.

Check:

- Every required route.
- Header and footer links.
- Mobile menu behavior.
- Service navigation.
- Enquiry and consultation CTAs.
- Content registries and slug validation.
- Conditional Case Studies and Insights sections.
- Dummy-data filtering.
- Missing environment variables.
- Contact form validation and provider errors.
- Booking configuration and fallback behavior.
- Privacy page placeholders.
- Metadata, sitemap, and robots rules.
- Keyboard navigation.
- Focus states.
- Contrast.
- Reduced motion.
- Responsive layouts.
- Image sizing and optimization.
- Loading, empty, error, and not-found states.
- Production build.
- Available lint, type-check, and automated tests.

Fix actual defects rather than merely documenting them as complete.

If a check cannot be run because of missing tools or configuration, report it explicitly. Never claim a test passed without running it.

**Checkpoint 15:** Final integrated review. Update all project documentation and report outstanding launch blockers.

---

## 9. DUMMY DATA AND CONTENT GOVERNANCE

This requirement is mandatory across the entire project.

### Content status model

Implement a typed content status system equivalent to:

```ts
type ContentStatus =
  | "dummy"
  | "draft"
  | "approved";

type ManagedContent<T> = {
  status: ContentStatus;
  data: T;
};
```

Adapt this design to the final content model if needed, but preserve its behavior.

`dummy` means fictional development data.

`draft` means content awaiting approval.

`approved` means verified content authorized for publication.

A content item must never become approved merely because it has been added to a source file.

### Required enforcement

For case studies, articles, leadership profiles, testimonials, and other claims that could be mistaken for verified facts:

- Mark status explicitly.
- Display visible development-only warnings for dummy content.
- Exclude dummy and draft content from production output.
- Filter navigation and page sections based on approved content.
- Prevent unapproved content from appearing in public metadata or the sitemap.
- Add validation that detects invalid or missing content status.
- Make production build validation fail for critical violations where practical.
- Report actionable messages identifying the offending item.

A production build should not fail just because an optional content category is empty.

A production build should fail or block deployment when a critical safeguard is violated, such as an unapproved factual claim being scheduled for public output.

Do not rely solely on a developer remembering to remove dummy content.

### Placeholder format

Use obvious markers such as:

`DUMMY DATA — REPLACE BEFORE LAUNCH`

Never use realistic-looking fabricated contact details, credentials, client results, or endorsements without clearly identifying them as illustrative development content.

Real service categories are confirmed. The detailed marketing copy remains subject to business review.

### Production readiness

Document which placeholders must be replaced before launch, including:

- Official logo asset.
- Company and legal information.
- Leadership details.
- Approved case studies.
- Approved articles.
- Real enquiry recipient and sender configuration.
- Scheduling provider.
- Domain and deployment configuration.
- Privacy notice details.
- Analytics configuration if selected.

Do not silently substitute dummy production values when real values are missing.

---

## 10. CONFIGURATION AND SECURITY

Use environment variables for provider credentials, recipient details, scheduling configuration, and production URL configuration.

Provide `.env.example`.

Ensure `.gitignore` excludes local secrets, environment files containing credentials, build output, dependencies, and other generated files.

Never commit real API keys or email credentials.

Validate required environment variables at the appropriate execution boundary. Avoid making the entire site fail during development merely because an optional integration has not yet been configured.

Differentiate between:

- Required configuration for core application operation.
- Required configuration for a specific feature.
- Optional configuration.
- Launch-only configuration.

Do not add a database or authentication merely to store configuration.

Do not implement unnecessary collection or retention of personal information.

Do not introduce analytics or tracking without an explicit implementation decision and the necessary privacy review.

---

## 11. TESTING AND ACCEPTANCE CRITERIA

Use the project's actual package scripts and available testing tools.

At minimum, establish and run the checks that the project supports:

- Production build.
- TypeScript type checking.
- Linting.
- Relevant automated tests.
- Route verification.
- Responsive and accessibility checks where tooling is available.
- Contact form validation and failure tests.
- Content filtering tests.
- Unknown-slug 404 tests.

Do not claim automated browser, accessibility, delivery, or deployment tests were completed if they were not run.

### Functional acceptance

The website is functionally complete when:

1. All required routes work.
2. All four service pages provide distinct content.
3. All navigation and CTAs have correct destinations.
4. The application uses shared layout and design components.
5. The contact form has actual server-side validation and processing.
6. Missing email configuration cannot produce a false success state.
7. Consultation booking is real or honestly shown as unconfigured.
8. Unknown article and case-study slugs return 404.
9. Unapproved content cannot be published accidentally.
10. Optional content sections disappear cleanly when empty.
11. Secrets remain server-side.
12. Errors are handled without exposing internals.
13. The privacy page does not falsely describe unimplemented practices.

### Quality acceptance

The website must be responsive, keyboard-accessible, visually consistent, appropriately optimized, and built with maintainable code.

Avoid duplicated page structures, arbitrary styling, giant monolithic components, unnecessary dependencies, and fake functionality.

### Production acceptance

A successful development build does not mean the site is launch-ready.

Report separately:

- Development functionality completed.
- Production build and tests completed.
- External integrations configured and tested.
- Business information verified.
- Legal and privacy review completed.
- Domain and deployment configured.
- Remaining blockers.

---

## 12. CHECKPOINT EXECUTION PROTOCOL

This section governs how you must perform the work.

### A. Before starting

Inspect the project folder.

Determine:

- Whether the project already exists.
- Which files are present.
- Whether a package manager and dependencies are configured.
- Which implementation tools are available.
- Whether a Git repository exists.
- Whether any supplied logo or image assets are available.
- Whether any earlier implementation or checkpoint records exist.

Do not overwrite working code simply to match the suggested folder structure.

Initialize or update the documentation files.

Create a baseline Git commit when Git is available and the repository is in a suitable state. Do not commit secrets, generated junk, or unrelated user work.

If Git is unavailable, preserve the checkpoint records and use the existing file persistence mechanism. Do not claim a commit exists unless one was created.

### B. At each checkpoint

A checkpoint is complete only when its deliverables have been saved and the appropriate checks have been performed.

For each checkpoint:

1. Implement the scoped work.
2. Save files to the project folder.
3. Run relevant checks.
4. Fix errors caused by the current work.
5. Confirm the app still runs, where feasible.
6. Update `PROGRESS.md`.
7. Update `CHECKPOINTS.md`.
8. Record changed files and the reason for each major change.
9. Record validation results and any failures.
10. Record the next checkpoint and its exact next action.

Commit the completed checkpoint when Git is available and the changes are safe to commit.

Use clear commit messages, for example:

`checkpoint-02: implement responsive homepage`

Never commit secrets or real credentials.

### C. Stop behavior

At the end of each defined checkpoint, stop before starting the next one.

Provide a concise report containing:

- Checkpoint number and name.
- Pages or features completed.
- Main files created or changed.
- Checks actually run and their results.
- Outstanding issues.
- Current Git commit, if available.
- Next checkpoint and the next concrete task.

Do not proceed automatically into the next checkpoint unless the user has explicitly asked you to run multiple checkpoints in one session.

If the environment has a strict output or time limit, finish and persist the current smallest coherent unit of work before stopping.

Do not begin a large new page when there is insufficient capacity to save and validate it.

### D. Resume behavior

When a new session begins, or the user says “continue,” “resume,” or “next checkpoint”:

1. Inspect the existing project directory.
2. Read `PROGRESS.md`, `CHECKPOINTS.md`, `IMPLEMENTATION_PLAN.md`, and the relevant release checklist.
3. Inspect the current Git status and latest commit if available.
4. Verify that the files for the last completed checkpoint still exist.
5. Run the smallest useful verification before editing.
6. Identify the first incomplete checkpoint.
7. Continue from that checkpoint only.
8. Preserve working pages and existing design decisions.
9. Update the checkpoint records again when finished.

Do not recreate the application from scratch when files already exist.

Do not assume a previous assistant's claim of completion is correct without checking the project state.

If the manifest and files disagree, trust the actual project files and verification results, reconcile the discrepancy, and update the manifest.

If the working tree contains unrelated user changes, preserve them.

If a checkpoint is partly complete, resume the incomplete work inside it rather than restarting the entire website.

### E. Credit exhaustion and interrupted sessions

The project must remain usable even if the AI session ends unexpectedly.

To support this:

- Write files to disk as work progresses.
- Keep the current application compiling at major boundaries whenever feasible.
- Complete one page or small coherent unit before beginning another.
- Avoid retaining essential progress only in conversation history.
- Keep documentation short, explicit, and actionable.
- Do not rely on in-memory state as the only record of completed work.
- Do not regenerate completed pages unless a specific defect requires it.
- Avoid broad refactors that destabilize completed checkpoints without a clear reason.
- Preserve working files and checkpoint history.

The expected recovery mechanism is the persistent project folder, Git history when available, and checkpoint documentation—not a new prompt for each page.

### F. Multiple-checkpoint execution

The user may ask you to complete several checkpoints in one session.

When authorized, complete them sequentially. Do not skip validation or checkpoint updates simply because several checkpoints are being completed together.

If the available environment cannot reliably execute all the requested checkpoints, stop at the last safely completed checkpoint and report where to resume.

---

## 13. FINAL PROJECT DOCUMENTATION

Keep the following documents current.

### `README.md`

Include:

- Project overview.
- Technology stack.
- Installation instructions.
- Development commands.
- Available scripts.
- Environment setup.
- Build and test instructions.
- Folder structure.
- Content management instructions.
- How to resume work using the checkpoint records.

### `IMPLEMENTATION_PLAN.md`

Include:

- Confirmed routes.
- Architecture decisions.
- Design tokens.
- Content model.
- Dummy-data policy.
- Integration boundaries.
- Checkpoint sequence.
- Acceptance criteria.

### `PROGRESS.md`

Use an explicit format similar to:

```text
Current checkpoint: 4
Status: IN PROGRESS

Completed checkpoints:
- Checkpoint 1: complete
- Checkpoint 2: complete
- Checkpoint 3: complete

Current work:
- Checkpoint 4: Data Analytics & Business Intelligence

Files completed:
- [List verified files]

Validation:
- [List checks actually run and results]

Outstanding issues:
- [List issues]

Configuration blockers:
- [List missing external configuration]

Next action:
- [One concrete action]
```

Do not leave this example unchanged. Populate it with the actual project state.

### `CHECKPOINTS.md`

For every checkpoint, record:

- Number and title.
- Status: not started, in progress, complete, or blocked.
- Date of last update where available.
- Deliverables.
- Relevant files.
- Validation results.
- Commit identifier where available.
- Remaining work.

### `RELEASE_CHECKLIST.md`

Track:

- Company information verification.
- Dummy-content removal or exclusion.
- Email configuration.
- Scheduling configuration.
- Privacy review.
- Logo and media approval.
- Domain and hosting.
- SEO and sitemap.
- Accessibility and responsive QA.
- Production build and test results.

---

## 14. REQUIRED INITIAL RESPONSE AND WORKFLOW

Begin by inspecting the existing project environment and available assets.

Do not immediately generate the entire website.

First, create or update the implementation plan, progress manifest, checkpoint register, and release checklist.

Then implement **Checkpoint 1: Global Application Foundation**.

Complete Checkpoint 1, validate it, save the files, update the records, and stop.

Report the result using the checkpoint format defined above.

After that, wait for authorization to proceed to the next checkpoint.

Do not create all fifteen checkpoints as empty files and claim they are complete. Create the actual shared foundation first, and update the records to reflect genuine progress.

---

## 15. FINAL DIRECTIVE

Prioritize correctness, continuity, maintainability, and genuine functionality over raw generation speed.

The end result must be a single cohesive Datatechhub Consulting website in one persistent project folder.

Every completed page must remain available as the project grows.

The checkpoint system must allow implementation to pause and resume without losing completed work, regardless of whether the same AI model or session is available later.

Do not fabricate business facts.

Do not fake functionality.

Do not mark untested work as verified.

Do not overwrite completed pages unnecessarily.

Do not confuse development completion with production readiness.

**Start with project inspection and Checkpoint 1. Build incrementally, preserve all progress, and stop at each checkpoint boundary.**
