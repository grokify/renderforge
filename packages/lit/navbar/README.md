# @renderforge/lit-navbar

A configurable navigation web component built with [Lit](https://lit.dev/). Works seamlessly across React sites, MkDocs documentation, and any HTML page.

Part of the [RenderForge](https://github.com/grokify/renderforge) cross-platform UI component library.

## Features

- **Cross-framework**: Works in React, Vue, vanilla HTML, MkDocs, and any web environment
- **Fully configurable**: JSON-based configuration for brand, menu, theme
- **Responsive**: Desktop dropdowns + mobile hamburger menu
- **Accessible**: ARIA labels, keyboard navigation, skip links
- **Themeable**: CSS custom properties for full color customization
- **CORS-safe**: Built as IIFE to load cross-origin without issues

## Installation

### CDN (Recommended for MkDocs and cross-site usage)

```html
<script src="https://your-domain.com/js/lit-navbar.js"></script>
```

### npm (For bundled projects)

```bash
npm install @renderforge/lit-navbar
```

## Quick Start

### Basic HTML Usage

```html
<div id="navbar-container"></div>
<script src="/js/lit-navbar.js"></script>
<script>
  customElements.whenDefined('lit-navbar').then(function() {
    var container = document.getElementById('navbar-container');
    var navbar = document.createElement('lit-navbar');
    navbar.config = {
      brand: {
        title: 'My',
        titlePrimary: 'Site',
        titleMuted: '.io',
        logoUrl: '/logo.png',
        homeUrl: '/'
      },
      menu: [
        { type: 'link', label: 'Docs', url: '/docs' },
        { type: 'link', label: 'About', url: '/about' }
      ],
      github: {
        url: 'https://github.com/myorg',
        label: 'GitHub'
      }
    };
    container.appendChild(navbar);
  });
</script>
```

### React Integration

Add to your `index.html` (before the React root):

```html
<!-- Unified Navigation -->
<div id="navbar-container"></div>
<script src="/js/lit-navbar.js"></script>
<script>
  customElements.whenDefined('lit-navbar').then(function() {
    var container = document.getElementById('navbar-container');
    var navbar = document.createElement('lit-navbar');
    navbar.config = {
      brand: {
        logoUrl: '/icon.png',
        title: 'My',
        titlePrimary: 'Site',
        titleMuted: '.io',
        homeUrl: '/'
      },
      menu: [
        { type: 'link', label: 'Docs', url: '/docs' },
        { type: 'link', label: 'About', url: '/about' }
      ],
      github: { url: 'https://github.com/myorg', label: 'GitHub' },
      theme: {
        primaryColor: '#ff6b00',
        backgroundColor: '#0a0a0f',
        textColor: '#e4e4ed',
        mutedColor: '#8888a0',
        borderColor: '#1e1e2e'
      }
    };
    container.appendChild(navbar);
  });
</script>

<div id="root"></div>
```

In your React Layout component, remove any existing Nav and add padding:

```tsx
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation handled by lit-navbar in index.html */}
      <main className="flex-1 pt-16"> {/* 64px = navbar height */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

### MkDocs Integration

See the [@renderforge/mkdocs-integration](../mkdocs-integration/) package for complete setup, or follow these steps:

**1. Create `docs/overrides/main.html`:**

```html
{% extends "base.html" %}

{% block header %}
<div id="navbar-container"></div>
<script src="https://your-domain.com/js/lit-navbar.js"></script>
<script>
  customElements.whenDefined('lit-navbar').then(function() {
    var container = document.getElementById('navbar-container');
    var navbar = document.createElement('lit-navbar');
    navbar.config = {
      baseUrl: 'https://your-domain.com',
      brand: {
        logoUrl: 'https://your-domain.com/icon.png',
        title: 'My',
        titlePrimary: 'Site',
        titleMuted: '.io',
        homeUrl: 'https://your-domain.com'
      },
      menu: [
        { type: 'link', label: 'Docs', url: 'https://your-domain.com/docs' },
        { type: 'link', label: 'About', url: 'https://your-domain.com/about' }
      ],
      github: { url: 'https://github.com/myorg', label: 'GitHub' },
      theme: {
        primaryColor: '#ff6b00',
        backgroundColor: '#0a0a0f',
        textColor: '#e4e4ed',
        mutedColor: '#8888a0',
        borderColor: '#1e1e2e'
      }
    };
    container.appendChild(navbar);
  });
</script>

{{ super() }}
{% endblock %}
```

**2. Update `mkdocs.yml`:**

```yaml
theme:
  name: material
  custom_dir: docs/overrides
  features:
    - navigation.sections
    - navigation.expand
    - navigation.top
    - search.highlight
    - content.code.copy

extra_css:
  - https://your-domain.com/css/mkdocs-nav-offset.css
```

**3. Add CSS for navbar offset (or use the provided CSS):**

```css
#navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.md-header {
  top: 64px;
}

.md-sidebar {
  top: calc(64px + var(--md-header-height, 48px));
  height: calc(100vh - 64px - var(--md-header-height, 48px));
}

.md-main {
  margin-top: 64px;
}
```

## Configuration Reference

### NavbarConfig

| Property | Type | Description |
|----------|------|-------------|
| `baseUrl` | `string` | Base URL for relative links |
| `brand` | `NavbarBrand` | Brand/logo configuration |
| `menu` | `NavbarMenuItem[]` | Menu items |
| `github` | `NavbarGitHub` | GitHub button (optional) |
| `theme` | `NavbarTheme` | Color customization |

### NavbarBrand

| Property | Type | Description |
|----------|------|-------------|
| `logoUrl` | `string` | URL to logo image |
| `logoAlt` | `string` | Alt text for logo |
| `title` | `string` | Primary title (displayed in accent color) |
| `titlePrimary` | `string` | Secondary title (displayed in text color) |
| `titleMuted` | `string` | Tertiary title (displayed in muted color, e.g., ".io") |
| `titleGradient` | `boolean` | Apply gradient to title (overrides accent color) |
| `homeUrl` | `string` | Link when clicking brand |

**Example: "AIStandards.io" with colored segments:**

```js
brand: {
  title: 'AI',           // Orange (accent)
  titlePrimary: 'Standards',  // White (text)
  titleMuted: '.io'      // Gray (muted)
}
```

### Menu Items

**Link:**
```js
{ type: 'link', label: 'About', url: '/about', external: false }
```

**Dropdown:**
```js
{
  type: 'dropdown',
  label: 'Products',
  items: [
    { label: 'Product A', url: '/products/a' },
    { label: 'Product B', url: '/products/b' }
  ],
  dividerAfter: 0  // Optional: add divider after first item
}
```

**Mega Menu:**
```js
{
  type: 'mega-menu',
  label: 'Products',
  dataUrl: '/data/products.json'  // Or use inline `data` property
}
```

### NavbarTheme

| Property | CSS Variable | Default |
|----------|-------------|---------|
| `primaryColor` | `--lit-navbar-primary` | `#06b6d4` |
| `secondaryColor` | `--lit-navbar-secondary` | `#8b5cf6` |
| `backgroundColor` | `--lit-navbar-bg` | `#0a0e1a` |
| `textColor` | `--lit-navbar-text` | `#e2e8f0` |
| `mutedColor` | `--lit-navbar-text-muted` | `#64748b` |
| `borderColor` | `--lit-navbar-border` | `#1e293b` |

## Important Notes

### CORS and Build Format

This component is built as an **IIFE** (not ES module) to avoid CORS issues when loading cross-origin. ES modules have strict same-origin policies that prevent cross-site loading.

```js
// vite.config.ts - Build as IIFE
build: {
  lib: {
    formats: ['iife'],  // NOT 'es'
  }
}
```

### URL Best Practices for GitHub Pages

When using a custom domain with GitHub Pages, always use the custom domain directly:

```js
// GOOD - Use custom domain directly
'https://mysite.com/js/lit-navbar.js'

// BAD - GitHub.io redirects to HTTP, causing mixed content blocking
'https://myorg.github.io/js/lit-navbar.js'
```

The `*.github.io` URLs redirect to the custom domain but downgrade from HTTPS to HTTP, which causes browsers to block the resources on HTTPS pages.

### MkDocs Navigation Tips

- **Remove `navigation.tabs`** from mkdocs.yml features to show nav in sidebar (not horizontal tabs)
- **Keep `navigation.sections`** and `navigation.expand`** for collapsible sidebar sections
- **The Material header** shows repo info and search - position it below the custom navbar

## CSS Variables

Override theme colors using CSS variables:

```css
lit-navbar {
  --lit-navbar-primary: #06b6d4;
  --lit-navbar-secondary: #8b5cf6;
  --lit-navbar-bg: #0a0e1a;
  --lit-navbar-bg-elevated: #111827;
  --lit-navbar-text: #e2e8f0;
  --lit-navbar-text-muted: #64748b;
  --lit-navbar-border: #1e293b;
  --lit-navbar-title-gradient: linear-gradient(135deg, #06b6d4, #8b5cf6);
}
```

## Development

```bash
# From monorepo root
pnpm install

# Start dev server
cd packages/lit/navbar
pnpm dev

# Build for production (outputs IIFE)
pnpm build

# Type check
pnpm typecheck
```

## See Also

- [@renderforge/mkdocs-integration](../mkdocs-integration/) - Templates and CSS for MkDocs
- [Tutorial: React + MkDocs Unified Navigation](../../docs/tutorials/react-mkdocs-unified-nav.md)

## License

MIT
