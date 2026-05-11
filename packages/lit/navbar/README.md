# @renderforge/lit-navbar

A configurable navigation web component built with [Lit](https://lit.dev/).

Part of the [RenderForge](https://github.com/grokify/renderforge) cross-platform UI component library.

## Features

- Fully configurable via JSON
- Mega menu with categorized products
- Dropdown menus
- Mobile-responsive with slide-out menu
- Theme customization via CSS variables
- Accessible (keyboard navigation, ARIA attributes, skip links)

## Installation

```bash
npm install @renderforge/lit-navbar
```

## Usage

### Basic Usage

```html
<script type="module">
  import '@renderforge/lit-navbar';
</script>

<lit-navbar id="navbar"></lit-navbar>

<script>
  document.getElementById('navbar').config = {
    brand: {
      title: 'My Site',
      titleGradient: true,
    },
    menu: [
      { type: 'link', label: 'Home', url: '/' },
      { type: 'link', label: 'About', url: '/about' },
    ],
    github: {
      url: 'https://github.com/myorg',
    },
  };
</script>
```

### Load Config from URL

```html
<lit-navbar config-url="/config/navbar.json"></lit-navbar>
```

## Configuration

### NavbarConfig

| Property | Type | Description |
|----------|------|-------------|
| `baseUrl` | `string` | Base URL for all relative links |
| `brand` | `NavbarBrand` | Brand configuration (logo, title) |
| `menu` | `NavbarMenuItem[]` | Menu items (links, dropdowns, mega-menus) |
| `github` | `NavbarGitHub` | GitHub button configuration |
| `theme` | `NavbarTheme` | Theme customization |
| `categoryPaths` | `object` | Category to URL path mappings |

### NavbarBrand

| Property | Type | Description |
|----------|------|-------------|
| `logoUrl` | `string` | URL to logo image |
| `logoAlt` | `string` | Alt text for logo |
| `title` | `string` | Primary title text |
| `titleSecondary` | `string` | Secondary title text |
| `titleGradient` | `boolean` | Apply gradient to primary title |
| `homeUrl` | `string` | URL for brand link |

### NavbarMenuItem

Three types of menu items:

#### Link

```json
{
  "type": "link",
  "label": "About",
  "url": "/about",
  "external": false
}
```

#### Dropdown

```json
{
  "type": "dropdown",
  "label": "Resources",
  "items": [
    { "label": "Blog", "url": "/blog" },
    { "label": "Docs", "url": "/docs" }
  ],
  "dividerAfter": 0
}
```

#### Mega Menu

```json
{
  "type": "mega-menu",
  "label": "Products",
  "dataUrl": "/data/products.json"
}
```

Or with inline data:

```json
{
  "type": "mega-menu",
  "label": "Products",
  "data": {
    "categories": {
      "library": { "label": "Libraries", "description": "...", "order": 1 }
    },
    "products": [
      { "name": "My Lib", "slug": "my-lib", "tagline": "...", "category": "library" }
    ]
  }
}
```

### NavbarTheme

| Property | Type | Description |
|----------|------|-------------|
| `primaryColor` | `string` | Primary accent color |
| `secondaryColor` | `string` | Secondary accent color |
| `backgroundColor` | `string` | Navigation background |
| `textColor` | `string` | Primary text color |
| `mutedColor` | `string` | Muted text color |
| `borderColor` | `string` | Border color |
| `titleGradient` | `string` | CSS gradient for title |

## CSS Variables

Customize the theme using CSS variables:

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

## MkDocs Integration

To use with MkDocs Material theme:

1. Create `docs/overrides/main.html`:

```html
{% extends "base.html" %}

{% block header %}
<div id="navbar-root"></div>
<script type="module">
  import 'https://unpkg.com/@renderforge/lit-navbar';

  fetch('/config/navbar.json')
    .then(res => res.json())
    .then(config => {
      const navbar = document.createElement('lit-navbar');
      navbar.config = config;
      document.getElementById('navbar-root').appendChild(navbar);
    });
</script>

{{ super() }}
{% endblock %}
```

2. Update `mkdocs.yml`:

```yaml
theme:
  custom_dir: docs/overrides
```

3. Add CSS to offset MkDocs header:

```css
.md-header {
  top: 64px;
}

.md-sidebar {
  top: 128px; /* 64px navbar + 64px mkdocs header */
}
```

## Development

```bash
# From monorepo root
pnpm install

# Start dev server
cd packages/lit/navbar
pnpm dev

# Build for production
pnpm build

# Type check
pnpm typecheck
```

## License

MIT
