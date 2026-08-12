# RegionOS

RegionOS is a frontend prototype for a regional university/campus governance and management platform.

## Scope
- **Frontend-only**: Contains mock authentication flows, dashboards, and pages.
- **Mock Data**: Uses pre-configured frontend data models under `src/data/` for demonstration.
- **Service Boundaries**: Implements a service abstraction layer (`src/services/`) mapping to mock data. In the upcoming development phase, backend API connections can easily drop into this service layer without necessitating UI edits.

## Features
- **Authentication**: Minimalist Splash screen transitions, Login inputs validation with password eye-toggles, and Registration screens.
- **Regional Dashboard**: Greeting blocks, date indicators, Campus navigation cards, Aligns metrics, and future integration holders.
- **Campus module consoles**: Detailed modules for RGU campus overviewing:
  - **Faculty**: Search inputs, designation/department filters, and working frontend pagination.
  - **Fees**: overall fiscal collection rates, Area Chart trend lines, Bar Chart course ratios, and Send Reminder toast feedback.
  - **Placements**: Placed ratio progress, recruiter listings, and CSV download targets.
  - **Power BI / Analytics**: Mock embedded workspace analytics, Enrollment area graphs, custom Placement donuts, and Student Performance selectors.
- **System Settings, User Profiles, & expandable FAQ Accordion menus**.

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Launch Vite dev server:
   ```bash
   npm run dev
   ```
3. Compile production bundles:
   ```bash
   npm run build
   ```
