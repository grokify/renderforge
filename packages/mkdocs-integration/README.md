# @renderforge/mkdocs-integration

Templates and CSS for integrating the RenderForge lit-navbar with MkDocs Material theme.

This package provides everything you need to add a unified navigation bar to MkDocs documentation sites that matches your main React/HTML site.

## Quick Start

### 1. Copy the template

Copy `templates/main.html` to your MkDocs project:

```bash
mkdir -p docs/overrides
cp templates/main.html docs/overrides/main.html
```

### 2. Configure the navbar

Edit `docs/overrides/main.html` and update the configuration:

```js
navbar.config = {
  baseUrl: 'https://your-domain.com',  // Your main site URL
  brand: {
    logoUrl: 'https://your-domain.com/icon.png',
    title: 'Your',
    titlePrimary: 'Brand',
    titleMuted: '.io',
    homeUrl: 'https://your-domain.com'
  },
  menu: [
    { type: 'link', label: 'Docs', url: 'https://your-domain.com/docs' },
    { type: 'link', label: 'About', url: 'https://your-domain.com/about' }
  ],
  github: { url: 'https://github.com/your-org', label: 'GitHub' },
  theme: {
    primaryColor: '#ff6b00',      // Your accent color
    backgroundColor: '#0a0a0f',
    textColor: '#e4e4ed',
    mutedColor: '#8888a0',
    borderColor: '#1e1e2e'
  }
};
```

### 3. Update mkdocs.yml

```yaml
site_name: Your Project
site_url: https://your-domain.com/project/
repo_url: https://github.com/your-org/project
repo_name: your-org/project

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

### 4. Host the assets

Ensure these files are hosted on your main domain:

- `/js/lit-navbar.js` - The navbar component
- `/css/mkdocs-nav-offset.css` - CSS for positioning

## Files Included

```
packages/mkdocs-integration/
├── README.md                           # This file
├── templates/
│   └── main.html                       # MkDocs override template
├── css/
│   ├── mkdocs-nav-offset.css          # Minimal navbar positioning
│   └── mkdocs-theme-dark.css          # Full dark theme (optional)
└── scripts/
    └── setup.sh                        # Setup script
```

## Template Configuration

### Brand Styling

The navbar supports three-segment title styling:

```js
brand: {
  title: 'AI',           // Accent color (e.g., orange)
  titlePrimary: 'Standards',  // Text color (e.g., white)
  titleMuted: '.io'      // Muted color (e.g., gray)
}
```

### Menu Types

**Simple links:**
```js
{ type: 'link', label: 'About', url: '/about' }
```

**Dropdowns:**
```js
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

| Property | Description | Example |
|----------|-------------|---------|
| `primaryColor` | Accent/brand color | `#ff6b00` |
| `secondaryColor` | Secondary accent | `#00d4ff` |
| `backgroundColor` | Navbar background | `#0a0a0f` |
| `textColor` | Primary text | `#e4e4ed` |
| `mutedColor` | Muted text | `#8888a0` |
| `borderColor` | Border color | `#1e1e2e` |

## Important Notes

### Use Custom Domain URLs

Always use your custom domain, not `*.github.io`:

```js
// CORRECT
'https://mysite.com/js/lit-navbar.js'

// WRONG - causes mixed content blocking
'https://myorg.github.io/js/lit-navbar.js'
```

GitHub Pages redirects `*.github.io` to HTTP, which breaks HTTPS pages.

### MkDocs Navigation

For sidebar navigation (recommended), ensure your `mkdocs.yml` does NOT have `navigation.tabs`:

```yaml
theme:
  features:
    - navigation.sections  # Collapsible sections
    - navigation.expand    # Expand all by default
    # - navigation.tabs    # DON'T include this
```

### Deploy with mkdocs gh-deploy

After making changes, deploy to GitHub Pages:

```bash
mkdocs gh-deploy --force
```

## CSS Reference

### Minimal Offset CSS

The `mkdocs-nav-offset.css` provides essential positioning:

```css
/* Position navbar container */
#navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* Position Material header below navbar */
.md-header {
  top: 64px;
}

/* Position sidebars below navbar + header */
.md-sidebar {
  top: calc(64px + var(--md-header-height, 48px));
  height: calc(100vh - 64px - var(--md-header-height, 48px));
}

/* Offset main content */
.md-main {
  margin-top: 64px;
}
```

### Full Dark Theme

The `mkdocs-theme-dark.css` provides complete Material theme customization to match your brand colors. Copy and modify as needed.

## Troubleshooting

### Navbar not loading

1. Check browser console for errors
2. Verify the JS file is accessible: `curl https://your-domain.com/js/lit-navbar.js`
3. Ensure you're using the custom domain, not `*.github.io`

### Styles not applying

1. Verify the CSS file is accessible
2. Check for CORS errors in console
3. Try hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### Content overlap

1. Check that `mkdocs-nav-offset.css` is loaded
2. Verify the navbar height matches (default: 64px)
3. Adjust offset values if using a different navbar height

## See Also

- [@renderforge/lit-navbar](../lit/navbar/) - The navbar component
- [Tutorial: React + MkDocs Unified Navigation](../../docs/tutorials/react-mkdocs-unified-nav.md)
