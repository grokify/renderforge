# RenderForge v0.1.0 Release Notes

**Release Date:** 2026-05-11

RenderForge is a cross-platform UI component library providing unified navigation across web, mobile, and native applications. This initial release focuses on web components for React + MkDocs site integration.

## Highlights

- **Configurable navigation web component** built with Lit for unified navigation across React and MkDocs sites
- **MkDocs Material integration package** with templates and CSS for seamless documentation subsites

## Packages

### @renderforge/lit-navbar

A framework-agnostic navigation web component that works across different site types.

**Features:**

- Configurable via JavaScript object (no build step required for consumers)
- Three-segment title styling (accent, primary, muted colors)
- Dropdown menus with hover support
- Mobile-responsive with hamburger menu
- Themeable colors via configuration
- IIFE build format for cross-origin loading without CORS issues

**Example:**

```javascript
navbar.config = {
  brand: {
    title: 'AI',
    titlePrimary: 'Standards',
    titleMuted: '.io',
    homeUrl: 'https://aistandards.io'
  },
  menu: [
    { type: 'link', label: 'Docs', url: '/docs' },
    { type: 'dropdown', label: 'Resources', items: [...] }
  ],
  theme: {
    primaryColor: '#ff6b00',
    backgroundColor: '#0a0a0f'
  }
};
```

### @renderforge/mkdocs-integration

Templates and CSS for integrating lit-navbar with MkDocs Material theme.

**Contents:**

| File | Description |
|------|-------------|
| `templates/main.html` | MkDocs override template with navbar configuration |
| `css/mkdocs-nav-offset.css` | Minimal CSS for positioning elements below navbar |
| `css/mkdocs-theme-dark.css` | Full dark theme matching AIStandards.io design |
| `scripts/setup.sh` | Automated setup script |

## Documentation

- [lit-navbar README](packages/lit/navbar/README.md) - API reference and configuration guide
- [mkdocs-integration README](packages/mkdocs-integration/README.md) - Setup instructions
- [Tutorial: React + MkDocs Unified Navigation](docs/tutorials/react-mkdocs-unified-nav.md) - Complete integration guide

## Getting Started

### For React/HTML main sites

```html
<div id="navbar-container"></div>
<script src="https://your-domain.com/js/lit-navbar.js"></script>
<script>
  customElements.whenDefined('lit-navbar').then(function() {
    var navbar = document.createElement('lit-navbar');
    navbar.config = { /* your config */ };
    document.getElementById('navbar-container').appendChild(navbar);
  });
</script>
```

### For MkDocs subsites

1. Copy `templates/main.html` to `docs/overrides/main.html`
2. Update the configuration in the template
3. Add to `mkdocs.yml`:
   ```yaml
   theme:
     custom_dir: docs/overrides
   extra_css:
     - https://your-domain.com/css/mkdocs-nav-offset.css
   ```
4. Deploy: `mkdocs gh-deploy --force`

## Production Usage

This release is used in production on:

- [aistandards.io](https://aistandards.io) - Main site
- [aistandards.io/agent-protocols](https://aistandards.io/agent-protocols) - MkDocs subsite

## Requirements

- Node.js 18+ (for building)
- pnpm 8+ (for monorepo management)
- Python 3.x with MkDocs Material (for documentation sites)

## License

MIT
