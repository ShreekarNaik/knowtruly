# KnowTruly Demo Mode Access Guide

## TL;DR

**Yes, all custom dashboards ARE coded and fully accessible in demo mode!**

To access them, use the **Login page** with specific email patterns:

| Role      | Email Example           | Password        | Route                  |
| --------- | ----------------------- | --------------- | ---------------------- |
| Student   | `sophia@knowtruly.me`   | `demo-password` | `/dashboard`           |
| Recruiter | `recruiter@example.com` | `demo-password` | `/recruiter/dashboard` |
| Issuer    | `issuer@example.com`    | `demo-password` | `/issuer/dashboard`    |
| Admin     | `admin@example.com`     | `demo-password` | `/admin/dashboard`     |

Any email containing the keywords `recruiter`, `issuer`, or `admin` triggers the demo mode for that role.

---

## How It Works

### Demo Mode Architecture

The frontend has a **fully functional demo mode** that doesn't require the backend to be running. Here's how:

```
Login Page → Email Pattern Recognition → Role Assignment → Demo Data Injection → Dashboard
```

### The Magic: `demoData/` Directory

All demo data lives in `/frontend/src/demoData/`:

- **`data.ts`** - Mock profiles, resumes, templates, matches, claims, audit logs
- **`service.ts`** - Mock API implementations for auth, profiles, matchmaking, etc.

### Demo Flag: `useDemoData`

The app checks a **global demo flag** (`useConfigStore`) to decide whether to use real APIs or demo data:

```typescript
// From useAuth.ts
if (useDemoData) {
  // Use demoAuth.login() instead of real API
  const response = await demoAuth.login(payload.email, payload.password);
}
```

**Default:** Demo mode is ON by default (configured in `configStore.ts`).

---

## Step-by-Step: Accessing Each Dashboard

### 1. **Student Dashboard** (Default)

1. Go to `/login`
2. Keep email as `sophia@knowtruly.me` (already pre-filled)
3. Click "Sign In"
4. You're redirected to `/dashboard`
5. Explore: Profile, Resumes, Verification, Skills, Projects, etc.

**Features:**

- Edit profile (education, experience, skills, projects)
- Generate resumes with AI rephrase
- View verifiable claims
- Check verification requests

---

### 2. **Recruiter Dashboard**

1. Go to `/login`
2. Change email to: `recruiter@example.com` (or any email with "recruiter" in it)
3. Password: `demo-password`
4. Click "Sign In"
5. You're redirected to `/recruiter/dashboard`

**Available routes:**

- `/recruiter/dashboard` - Overview with recommended candidate matches
- `/recruiter/search` - Talent search (TalentSearchPage)
- `/recruiter/search/results` - Search results with match scoring
- `/recruiter/candidates/:id` - Candidate profile detail
- `/recruiter/requests` - Access request tracking

**Features visible:**

- Semantic matching with % scores
- Candidate preview cards
- Headline and summary preview
- Request access workflows

**Demo data:** Pre-seeded with `demoRecruiterCandidates` from `data.ts`

---

### 3. **Issuer Dashboard**

1. Go to `/login`
2. Change email to: `issuer@example.com` (or any email with "issuer" in it)
3. Password: `demo-password`
4. Click "Sign In"
5. You're redirected to `/issuer/dashboard`

**Available routes:**

- `/issuer/dashboard` - Overview of issued claims with status badges
- `/issuer/claims` - Full list of claims management
- `/issuer/sign` - Sign new verifiable claims
- `/issuer/verify/:signature_id` - Verify existing signatures

**Features visible:**

- List of cryptographic claims (degree, skill, employment)
- Claim status (active, revoked, expired)
- Issue/expiration dates
- Sign new claims form
- Verify signature details

**Demo data:** Pre-seeded with `demoClaims` from `data.ts`

---

### 4. **Admin Dashboard**

1. Go to `/login`
2. Change email to: `admin@example.com` (or any email with "admin" in it)
3. Password: `demo-password`
4. Click "Sign In"
5. You're redirected to `/admin/dashboard`

**Available routes:**

- `/admin/dashboard` - System health metrics and KPIs
- `/admin/users` - User management
- `/admin/templates` - Resume template management
- `/admin/analytics` - System analytics

**Features visible:**

- Profiles count: Shows count of all profiles in system
- Templates count: Resume templates available
- Claims count: Total issued claims
- Match latency: Sample match score (shown as percentage)

**Demo data:**

- Profiles: Pulled from `demoProfiles`
- Templates: From `demoTemplates`
- Claims: From `demoClaims`
- Match results: From `demoMatchResults`

---

## What's Implemented vs Placeholder

### ✅ Fully Implemented Components

**All 4 Role Dashboards:**

- Student Dashboard (`StudentDashboardPage.tsx`)
- Recruiter Dashboard (`RecruiterDashboardPage.tsx`)
- Issuer Dashboard (`IssuerDashboardPage.tsx`)
- Admin Dashboard (`AdminDashboardPage.tsx`)

**Student Features:**

- Full profile management (education, experience, skills, projects)
- Resume generation with template selection
- Verification page for signed claims
- Resume browser with download links
- Settings page (includes demo mode toggle)

**Recruiter Features:**

- Talent search page with job description input
- Semantic matching results with candidate cards
- Candidate detail view
- Access request workflow
- Dashboard with recommended matches

**Issuer Features:**

- Claims management (list, view, edit)
- Sign new claims form
- Verify existing signatures
- Dashboard showing active/expired claims

**Admin Features:**

- System health dashboard (profile count, template count, claims count)
- User management page
- Template management page
- Analytics dashboard

---

## Switching Between Roles

**Option 1: Logout and Re-login**

- Student → Click profile → Settings → Scroll to "Demo Mode" toggle and view logout option
- Or navigate to `/login`, change email pattern

**Option 2: Direct Navigation (if protected route allows)**

- `/recruiter/dashboard` will redirect to `/` if not logged in as recruiter
- `/admin/dashboard` will redirect to `/` if not logged in as admin

**Option 3: Edit Auth Store (Advanced)**

- Open browser DevTools Console and run:

```javascript
// Switch to recruiter
useAuthStore.setState({
  user: {
    id: "demo-recruiter",
    role: "recruiter",
    email: "recruiter@test.com",
  },
  isAuthenticated: true,
});
window.location.href = "/recruiter/dashboard";
```

---

## Demo Data Breakdown

### Profile Data (`data.ts`)

**Sample Profile:**

- Name: Sophia Carter
- Role: AI Product Engineer
- Education: Stanford MS (AI), UW BS (HCI)
- Experience: Founding Engineer at KnowTruly, Product Engineer at TalentCraft
- Skills: FastAPI, React, Gemini API, Vector Databases
- Projects: Semantic Matchmaker, Resume Generation Engine

### Match Results (`demoMatchResults`)

Returns 5 pre-seeded candidates with:

- Match scores (0.82 - 0.95)
- Top matching skills
- Evidence from projects/positions
- Identified skill gaps

### Templates (`demoTemplates`)

3 resume templates:

- **Modern Tech** (two-column layout, tech-optimized)
- **Classic** (single-column, traditional)
- **Academic** (publication-focused, research-heavy)

### Claims (`demoClaims`)

4 sample verifiable claims:

- Stanford degree claim (verified, active)
- Python skill claim (verified, active)
- KnowTruly employment claim (verified, active)
- AWS certification claim (pending)

---

## Key Files to Understand

| File                                                    | Purpose                                          |
| ------------------------------------------------------- | ------------------------------------------------ |
| `/frontend/src/App.tsx`                                 | Route definitions with role-based ProtectedRoute |
| `/frontend/src/stores/configStore.ts`                   | Global `useDemoData` flag (default: true)        |
| `/frontend/src/hooks/useAuth.ts`                        | Login logic that routes to demo vs real API      |
| `/frontend/src/demoData/service.ts`                     | Mock implementations of all API endpoints        |
| `/frontend/src/demoData/data.ts`                        | Sample data for all roles                        |
| `/frontend/src/pages/{student,recruiter,issuer,admin}/` | Dashboard pages                                  |

---

## Enabling/Disabling Demo Mode

### Default Behavior

By default, demo mode is **ENABLED**. Check in `configStore.ts`:

```typescript
const defaultDemoFlag =
  typeof import.meta !== "undefined" &&
  typeof import.meta.env.VITE_USE_DEMO_DATA !== "undefined"
    ? import.meta.env.VITE_USE_DEMO_DATA !== "false"
    : true; // ← Default is TRUE (demo on)
```

### Override with Environment Variable

Create `.env` file in `/frontend`:

```bash
# Use real backend
VITE_USE_DEMO_DATA=false

# Or keep demo on (default)
VITE_USE_DEMO_DATA=true
```

### Toggle at Runtime

In Settings page (student only):

1. Navigate to `/settings`
2. Scroll to "Demo Mode" toggle
3. Toggle off to use real API
4. Toggle on to use demo data

Or programmatically:

```typescript
useConfigStore.setState({ useDemoData: false });
```

---

## Common Issues & Solutions

### Issue: Dashboard says "No data"

- **Cause**: Probably real backend mode enabled without running backend
- **Solution**: Enable demo mode by setting `VITE_USE_DEMO_DATA=true` or toggle in Settings

### Issue: Can't access `/recruiter/dashboard`

- **Cause**: Not logged in as recruiter
- **Solution**: Log in with email containing "recruiter" (e.g., `recruiter@test.com`)

### Issue: Match results show 0%

- **Cause**: You might be looking at match latency, not match score
- **Solution**: Go to `/recruiter/search/results` to see full match details

### Issue: Can't navigate to admin pages

- **Cause**: Not logged in with admin role
- **Solution**: Go to `/login` and use email with "admin" in it (e.g., `admin@test.com`)

---

## Testing Checklist

Use this to verify all dashboards work:

- [ ] **Student**: Login as `sophia@knowtruly.me` → `/dashboard` → Can view profile
- [ ] **Recruiter**: Login as `recruiter@test.com` → `/recruiter/dashboard` → See candidate matches
- [ ] **Issuer**: Login as `issuer@test.com` → `/issuer/dashboard` → See claims list
- [ ] **Admin**: Login as `admin@test.com` → `/admin/dashboard` → See system metrics
- [ ] **Settings**: Student role → `/settings` → Can toggle demo mode
- [ ] **Match Results**: Recruiter → `/recruiter/search` → Run search → See results
- [ ] **Verify Signature**: Issuer → `/issuer/verify/signature-demo` → See claim details

---

## Next Steps to Enhance Demo Mode

If you want to expand demo capabilities:

1. **Add more sample profiles** to `demoRecruiterCandidates`
2. **Create role-specific landing pages** (currently all go to same layout)
3. **Add demo data generators** for realistic candidate variations
4. **Create role-based tour/onboarding** in demo mode
5. **Mock backend endpoints** in `demoData/service.ts` for any missing ones

---

## TL;DR: Quick Access Commands

```bash
# Student Dashboard
# Email: sophia@knowtruly.me | Password: demo-password
# URL: http://localhost:5173/login

# Recruiter Dashboard
# Email: recruiter@anything.com | Password: demo-password
# URL: http://localhost:5173/recruiter/dashboard

# Issuer Dashboard
# Email: issuer@anything.com | Password: demo-password
# URL: http://localhost:5173/issuer/dashboard

# Admin Dashboard
# Email: admin@anything.com | Password: demo-password
# URL: http://localhost:5173/admin/dashboard
```

---

**Created:** 2025-11-09  
**Last Updated:** 2025-11-09
