# 🏗️ Routing Architecture - Visual Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser Request                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Platform                           │
│                                                              │
│  1. Receives request for /menu                              │
│  2. Checks vercel.json config                               │
│  3. Rewrites: /(.*) → /index.html                           │
│  4. Serves index.html BUT keeps URL as /menu                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   React Application                          │
│                                                              │
│  App.tsx (Root Component)                                   │
│    │                                                         │
│    ├─ BrowserRouter                                         │
│    │   │                                                    │
│    │   └─ AppRoutes Component                              │
│    │       │                                                │
│    │       ├─ Layout (SEO + Header logic)                  │
│    │       │   │                                            │
│    │       │   ├─ SEOManager (Dynamic meta tags)           │
│    │       │   └─ Header (Show/hide based on route)        │
│    │       │                                                │
│    │       └─ Routes                                        │
│    │           │                                            │
│    │           ├─ Route: /           → HomePage            │
│    │           ├─ Route: /menu       → MenuPage            │
│    │           ├─ Route: /about      → AboutPage           │
│    │           ├─ Route: /contact    → ContactPage         │
│    │           ├─ Route: /preview... → Dashboard           │
│    │           ├─ Route: /secure...  → Dashboard           │
│    │           ├─ Route: /setup      → SetupDatabase       │
│    │           ├─ Route: /setup-db   → ManualSetup         │
│    │           ├─ Route: /db-check   → DatabaseCheck       │
│    │           ├─ Route: /menu-debug → MenuDebug           │
│    │           ├─ Route: /route-test → RouteTest           │
│    │           └─ Route: *           → NotFound (→ /)      │
│    │                                                         │
│    └─ Toaster (Global toast notifications)                 │
└─────────────────────────────────────────────────────────────┘
```

## Route Flow Examples

### Example 1: Direct URL Access to /menu

```
User enters: https://connectionscafe.vercel.app/menu
       │
       ▼
┌──────────────┐
│   Vercel     │  ① Request received for /menu
└──────────────┘
       │
       ▼
┌──────────────┐
│ vercel.json  │  ② Checks rewrite rules
│              │     Found: /(.*) → /index.html
└──────────────┘
       │
       ▼
┌──────────────┐
│ index.html   │  ③ Serves index.html
│              │     URL stays: /menu
└──────────────┘
       │
       ▼
┌──────────────┐
│ App.tsx      │  ④ React app initializes
│              │     BrowserRouter reads: /menu
└──────────────┘
       │
       ▼
┌──────────────┐
│  Routes      │  ⑤ Matches route /menu
└──────────────┘
       │
       ▼
┌──────────────┐
│  MenuPage    │  ⑥ Renders MenuPage component ✓
└──────────────┘
```

### Example 2: React Router Navigation (Header Click)

```
User clicks "Menu" in Header
       │
       ▼
┌──────────────┐
│   <Link>     │  ① Link component intercepts click
│   to="/menu" │     Prevents default browser behavior
└──────────────┘
       │
       ▼
┌──────────────┐
│ BrowserRouter│  ② Updates browser URL to /menu
│              │     NO page reload!
└──────────────┘
       │
       ▼
┌──────────────┐
│   Routes     │  ③ Re-evaluates routes
└──────────────┘
       │
       ▼
┌──────────────┐
│  MenuPage    │  ④ Renders MenuPage ✓
└──────────────┘
```

### Example 3: 404 Handling

```
User enters: https://connectionscafe.vercel.app/invalid-page
       │
       ▼
┌──────────────┐
│   Vercel     │  ① Request received
└──────────────┘
       │
       ▼
┌──────────────┐
│ vercel.json  │  ② Rewrites to /index.html
└──────────────┘
       │
       ▼
┌──────────────┐
│ App.tsx      │  ③ React app loads
│              │     URL: /invalid-page
└──────────────┘
       │
       ▼
┌──────────────┐
│   Routes     │  ④ No match found
│              │     Falls to * (catch-all)
└──────────────┘
       │
       ▼
┌──────────────┐
│  NotFound    │  ⑤ NotFound component
│              │     Executes: window.location.href = '/'
└──────────────┘
       │
       ▼
┌──────────────┐
│  HomePage    │  ⑥ Browser redirects to / ✓
└──────────────┘
```

## Component Structure

```
src/
├── App.tsx ..................... Main routing logic
│   ├── SEOManager .............. Dynamic SEO tags
│   ├── Layout .................. Header + page wrapper
│   ├── AppRoutes ............... Route definitions
│   └── NotFound ................ 404 handler
│
├── components/
│   ├── Header.tsx .............. Navigation header
│   ├── HomePage.tsx ............ / route
│   ├── MenuPage.tsx ............ /menu route
│   ├── AboutPage.tsx ........... /about route
│   ├── ContactPage.tsx ......... /contact route
│   ├── Dashboard.tsx ........... /preview_page.html & /secure-portal-musanze-2025
│   ├── SetupDatabase.tsx ....... /setup route
│   ├── ManualSetup.tsx ......... /setup-db route
│   ├── DatabaseCheck.tsx ....... /db-check route
│   ├── MenuDebug.tsx ........... /menu-debug route
│   └── RouteTest.tsx ........... /route-test route (diagnostics)
│
└── public/
    ├── 404.html ................ Fallback for direct 404s
    └── vercel.json ............. Vercel routing config
```

## Header Visibility Logic

```javascript
const noHeaderPaths = [
  '/preview_page.html',         // Dashboard
  '/secure-portal-musanze-2025', // Dashboard alt
  '/setup',                      // Setup tools
  '/setup-db',                   // Setup tools
  '/db-check',                   // Setup tools
  '/menu-debug',                 // Debug tools
  '/route-test'                  // Debug tools
];

const hideHeader = noHeaderPaths.includes(location.pathname);
```

**Result:**
- ✅ Header shown: /, /menu, /about, /contact
- ❌ Header hidden: Dashboard, setup pages, debug pages

## SEO Manager Logic

```javascript
const getSEOConfig = () => {
  const path = location.pathname;
  if (path === '/menu') return seoConfig.menu;
  if (path === '/about') return seoConfig.about;
  if (path === '/contact') return seoConfig.contact;
  return seoConfig.home; // Default for all other routes
};
```

**Result:**
- Each page gets appropriate title, description, keywords
- Structured data for search engines
- Open Graph tags for social sharing

## Debugging Tips

### 1. Check Console Logs
```javascript
// Logged on every route change:
=== ROUTE CHANGE ===
Current path: /menu
Current search: 
Current hash: 
===================
```

### 2. Use Route Test Page
Visit `/route-test` to see:
- Current route state
- All available routes
- Direct vs Router navigation tests

### 3. Check Network Tab
- Direct URL: Should load index.html once
- React Router: Should show NO new HTML requests

### 4. Verify URL Behavior
- Direct access: URL stays as requested
- React Router: URL changes without reload
- Page refresh: URL stays the same

## Configuration Files

### vercel.json
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    { "source": "/(.*)", "headers": [...] }
  ]
}
```

### 404.html
```javascript
// Preserves path and redirects there
const path = window.location.pathname;
if (path && path !== '/404.html') {
  window.location.replace(path + search + hash);
} else {
  window.location.replace('/');
}
```

### netlify.toml (backup)
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Success Indicators

✅ **Working Correctly When:**
1. Direct URLs load correct pages
2. Header navigation works without reload
3. Page refresh keeps you on same page
4. Console shows route change logs
5. Invalid URLs redirect to home
6. No 404 errors in console
7. `/route-test` page is accessible

❌ **Issues if:**
1. Direct URLs show wrong page
2. Navigation causes page reload
3. Refresh goes to different page
4. Console shows errors
5. Pages show blank/loading forever

---

**Architecture Status:** ✅ Clean, simple, reliable routing system
