# Tutorial: Unified Navigation for React + MkDocs Sites

This tutorial shows how to create a unified navigation experience across a React main site and multiple MkDocs documentation subsites using RenderForge's `lit-navbar` web component.

## Overview

Many projects have:

- A **main marketing/landing site** built with React (or similar)
- Multiple **documentation subsites** built with MkDocs Material

This creates a fragmented user experience where navigation changes between sites. The solution is a shared navigation component that works everywhere.

## Architecture

```
your-domain.com/
├── /                    # React main site
├── /js/lit-navbar.js    # Shared navbar component (hosted once)
├── /css/mkdocs-*.css    # Shared MkDocs styling (hosted once)
├── /project-a/          # MkDocs subsite (loads navbar from main site)
├── /project-b/          # MkDocs subsite (loads navbar from main site)
└── /docs/               # MkDocs subsite (loads navbar from main site)
```

**Key principle**: Host shared assets once on the main domain, load them from all subsites.

## Prerequisites

- A custom domain (e.g., `your-domain.com`)
- GitHub Pages or similar hosting
- Node.js 18+ for building the navbar
- Python 3.x with MkDocs Material for documentation sites

## Building the Navbar Component

The `lit-navbar.js` file must be built from the RenderForge source. It is **not** published to npm.

### Option A: Build from source

```bash
# Clone renderforge
git clone https://github.com/grokify/renderforge.git
cd renderforge/packages/lit/navbar

# Install dependencies and build
npm install
npm run build

# The built file is at:
# dist/lit-navbar.js
```

### Option B: Copy from existing site

If you're adding a subsite to an existing deployment (e.g., aistandards.io), the navbar is already hosted. Skip building and reference it directly:

```html
<script src="https://aistandards.io/js/lit-navbar.js"></script>
```

### Update workflow

When updating the navbar:

1. Make changes in `renderforge/packages/lit/navbar/src/`
2. Build: `npm run build`
3. Copy `dist/lit-navbar.js` to your main site's `/js/` directory
4. Deploy the main site
5. All subsites automatically get the update (they load from main site)

## Step 1: Set Up the Main Site

### 1.1 Add lit-navbar to your React site

The navbar is a framework-agnostic web component. Add it to your HTML:

```html
<!-- In index.html, before the React root -->
<div id="navbar-container"></div>

<script src="/js/lit-navbar.js"></script>
<script>
  customElements.whenDefined('lit-navbar').then(function() {
    var container = document.getElementById('navbar-container');
    var navbar = document.createElement('lit-navbar');

    navbar.config = {
      baseUrl: 'https://your-domain.com',
      brand: {
        logoUrl: 'https://your-domain.com/icon.png',
        logoAlt: 'Your Brand',
        title: 'Your',           // Accent color
        titlePrimary: 'Brand',   // Text color
        titleMuted: '.io',       // Muted color
        homeUrl: 'https://your-domain.com'
      },
      menu: [
        { type: 'link', label: 'Products', url: '/products' },
        { type: 'link', label: 'Docs', url: '/docs' },
        { type: 'link', label: 'About', url: '/about' }
      ],
      github: {
        url: 'https://github.com/your-org',
        label: 'GitHub'
      },
      theme: {
        primaryColor: '#ff6b00',
        secondaryColor: '#00d4ff',
        backgroundColor: '#0a0a0f',
        textColor: '#e4e4ed',
        mutedColor: '#8888a0',
        borderColor: '#1e1e2e'
      }
    };

    container.appendChild(navbar);
  });
</script>
```

### 1.2 Remove React navigation component

If you have an existing React `<Nav>` component, remove it from your layout:

```tsx
// Before
import { Nav } from '../components/Nav';

export function Layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}

// After - Nav handled by lit-navbar in index.html
export function Layout({ children }) {
  return (
    <main>{children}</main>
  );
}
```

### 1.3 Host shared assets

Ensure your build process preserves these files in the output:

```
docs/                    # GitHub Pages output directory
├── js/
│   └── lit-navbar.js   # Built from renderforge/packages/lit/navbar
├── css/
│   └── mkdocs-nav-offset.css  # From renderforge/packages/mkdocs-integration/css/
├── icon.png            # Your logo
└── index.html          # Main site
```

**Source files:**

| Asset | Source Location |
|-------|-----------------|
| `lit-navbar.js` | `renderforge/packages/lit/navbar/dist/lit-navbar.js` |
| `mkdocs-nav-offset.css` | `renderforge/packages/mkdocs-integration/css/mkdocs-nav-offset.css` |
| `mkdocs-theme-dark.css` | `renderforge/packages/mkdocs-integration/css/mkdocs-theme-dark.css` (optional full theme)

Example Vite config to copy shared assets:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

function copySharedAssets() {
  return {
    name: 'copy-shared-assets',
    closeBundle() {
      const outDir = resolve(__dirname, 'docs');

      // Ensure directories exist
      mkdirSync(resolve(outDir, 'js'), { recursive: true });
      mkdirSync(resolve(outDir, 'css'), { recursive: true });

      // Copy navbar component
      copyFileSync(
        resolve(__dirname, 'node_modules/@renderforge/lit-navbar/dist/lit-navbar.js'),
        resolve(outDir, 'js/lit-navbar.js')
      );

      // Copy MkDocs CSS
      copyFileSync(
        resolve(__dirname, 'css/mkdocs-nav-offset.css'),
        resolve(outDir, 'css/mkdocs-nav-offset.css')
      );
    }
  };
}

export default defineConfig({
  plugins: [copySharedAssets()],
  build: {
    outDir: 'docs',
  }
});
```

## Step 2: Set Up MkDocs Subsites

### 2.1 Create the override template

Create `docs/overrides/main.html` in your MkDocs project:

```html
{% extends "base.html" %}

{% block header %}
<!-- Unified Navigation Container -->
<div id="navbar-container"></div>

<!-- Load lit-navbar from main domain -->
<script src="https://your-domain.com/js/lit-navbar.js"></script>

<script>
  customElements.whenDefined('lit-navbar').then(function() {
    var container = document.getElementById('navbar-container');
    var navbar = document.createElement('lit-navbar');

    // SAME configuration as main site
    navbar.config = {
      baseUrl: 'https://your-domain.com',
      brand: {
        logoUrl: 'https://your-domain.com/icon.png',
        logoAlt: 'Your Brand',
        title: 'Your',
        titlePrimary: 'Brand',
        titleMuted: '.io',
        homeUrl: 'https://your-domain.com'
      },
      menu: [
        { type: 'link', label: 'Products', url: 'https://your-domain.com/products' },
        { type: 'link', label: 'Docs', url: 'https://your-domain.com/docs' },
        { type: 'link', label: 'About', url: 'https://your-domain.com/about' }
      ],
      github: {
        url: 'https://github.com/your-org',
        label: 'GitHub'
      },
      theme: {
        primaryColor: '#ff6b00',
        secondaryColor: '#00d4ff',
        backgroundColor: '#0a0a0f',
        textColor: '#e4e4ed',
        mutedColor: '#8888a0',
        borderColor: '#1e1e2e'
      }
    };

    container.appendChild(navbar);
  });
</script>

{# Include the original Material header (search, repo link) #}
{{ super() }}
{% endblock %}
```

### 2.2 Update mkdocs.yml

```yaml
site_name: Your Project
site_url: https://your-domain.com/project/
repo_url: https://github.com/your-org/project
repo_name: your-org/project

theme:
  name: material
  custom_dir: docs/overrides
  palette:
    - scheme: slate
      primary: custom
      accent: custom
  features:
    - navigation.sections
    - navigation.expand
    - navigation.top
    - search.highlight
    - content.code.copy
    # Do NOT include navigation.tabs - use sidebar navigation

extra_css:
  - https://your-domain.com/css/mkdocs-nav-offset.css
```

**Important**: Do NOT include `navigation.tabs` in features. This keeps navigation in the sidebar rather than horizontal tabs, matching the main site layout.

### 2.3 Deploy

```bash
mkdocs gh-deploy --force
```

## Step 3: Common Issues and Solutions

### CORS Errors

**Symptom**: Console shows `Access-Control-Allow-Origin` errors

**Cause**: ES modules have strict CORS requirements

**Solution**: The navbar must be built as IIFE format, not ES module:

```typescript
// vite.config.ts for lit-navbar
export default defineConfig({
  build: {
    lib: {
      formats: ['iife'],  // NOT ['es']
      name: 'LitNavbar',
    }
  }
});
```

### Mixed Content Blocking

**Symptom**: Resources fail to load on HTTPS pages

**Cause**: Using `https://org.github.io/` URLs which redirect to `http://` custom domain

**Solution**: Always use the custom domain URL directly:

```javascript
// WRONG - GitHub Pages redirects to HTTP
'https://your-org.github.io/js/lit-navbar.js'

// CORRECT - Use custom domain directly
'https://your-domain.com/js/lit-navbar.js'
```

### Navbar Not Appearing

**Symptom**: Page loads but navbar is missing

**Cause**: Script loaded but custom element not defined yet

**Solution**: Use `customElements.whenDefined()`:

```javascript
// WRONG - may execute before element is defined
var navbar = document.createElement('lit-navbar');

// CORRECT - waits for element definition
customElements.whenDefined('lit-navbar').then(function() {
  var navbar = document.createElement('lit-navbar');
  // ...
});
```

### Content Overlap

**Symptom**: Page content appears behind the navbar

**Cause**: Missing CSS offset rules

**Solution**: Include the offset CSS in your MkDocs site:

```yaml
extra_css:
  - https://your-domain.com/css/mkdocs-nav-offset.css
```

The CSS provides proper positioning:

```css
/* Position MkDocs header below unified navbar */
.md-header {
  top: 64px;
}

/* Offset sidebar for navbar + header */
.md-sidebar {
  top: calc(64px + var(--md-header-height, 48px));
  height: calc(100vh - 64px - var(--md-header-height, 48px));
}

/* Offset main content area */
.md-main {
  margin-top: 64px;
}
```

## Step 4: Adding More Subsites

To add another MkDocs documentation subsite:

1. Copy the `docs/overrides/main.html` template
2. Update `mkdocs.yml` with:
   - `custom_dir: docs/overrides`
   - `extra_css` pointing to main domain
3. Deploy with `mkdocs gh-deploy --force`

No changes needed to the main site or shared assets.

## Configuration Reference

### Brand Configuration

| Property | Type | Description |
|----------|------|-------------|
| `logoUrl` | string | URL to logo image |
| `logoAlt` | string | Alt text for logo |
| `title` | string | First segment (accent color) |
| `titlePrimary` | string | Second segment (text color) |
| `titleMuted` | string | Third segment (muted color) |
| `homeUrl` | string | URL when clicking brand |

### Menu Items

**Link:**
```javascript
{ type: 'link', label: 'About', url: '/about' }
```

**Dropdown:**
```javascript
{
  type: 'dropdown',
  label: 'Resources',
  items: [
    { label: 'Blog', url: '/blog' },
    { label: 'API', url: '/api' }
  ]
}
```

### Theme Colors

| Property | Description | Default |
|----------|-------------|---------|
| `primaryColor` | Accent/brand color | `#ff6b00` |
| `secondaryColor` | Secondary accent | `#00d4ff` |
| `backgroundColor` | Navbar background | `#0a0a0f` |
| `textColor` | Primary text | `#e4e4ed` |
| `mutedColor` | Muted text | `#8888a0` |
| `borderColor` | Border color | `#1e1e2e` |

## Complete Example

See these real-world implementations:

- **Main site**: [aistandardsio.github.io](https://github.com/aistandardsio/aistandardsio.github.io)
- **MkDocs subsite**: [agent-protocols](https://github.com/aistandardsio/agent-protocols)

## Package Reference

- [@renderforge/lit-navbar](../../packages/lit/navbar/) - The navbar web component
- [@renderforge/mkdocs-integration](../../packages/mkdocs-integration/) - Templates and CSS for MkDocs

## Checklist for New Sites

- [ ] Custom domain configured (not `*.github.io`)
- [ ] `lit-navbar.js` hosted at `/js/lit-navbar.js`
- [ ] `mkdocs-nav-offset.css` hosted at `/css/mkdocs-nav-offset.css`
- [ ] Main site loads navbar with `customElements.whenDefined()`
- [ ] MkDocs site has `docs/overrides/main.html`
- [ ] MkDocs `mkdocs.yml` has `custom_dir: docs/overrides`
- [ ] MkDocs `mkdocs.yml` has `extra_css` with CSS URL
- [ ] All URLs use `https://your-domain.com` (not GitHub Pages URL)
- [ ] `navigation.tabs` NOT included in MkDocs features
