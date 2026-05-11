# RenderForge

Cross-platform UI component library for building consistent interfaces across web, mobile, and native applications.

## Vision

RenderForge provides a unified component library that works across multiple rendering targets:

| Platform | Technology | Status |
|----------|------------|--------|
| **Web (Lit)** | [Lit](https://lit.dev/) Web Components | Active |
| **Web (Material)** | Material Design Components | Planned |
| **Web (Carbon)** | IBM Carbon Design System | Planned |
| **Flutter** | Flutter/Dart widgets | Planned |
| **Android** | Jetpack Compose / XML | Planned |
| **iOS** | SwiftUI / UIKit | Planned |

### Design Philosophy

- **Configuration-driven**: Components accept JSON configuration for easy customization
- **Design tokens**: Shared color, typography, and spacing tokens across all platforms
- **Brand consistency**: Same component behavior and appearance everywhere
- **Framework agnostic**: Use what works best for your platform

## Ecosystem

RenderForge is part of the Forge ecosystem:

| Project | Description |
|---------|-------------|
| [systemforge](https://github.com/grokify/systemforge) | API microservices |
| [agentkit](https://github.com/plexusone/agentkit) | Agent microservices |
| [systemforge-web](https://github.com/grokify/systemforge-web) | Web application frontend |
| [dashforge](https://github.com/plexusone/dashforge) | Analytics dashboard (Metabase-like) |
| **renderforge** | Cross-platform UI components |

## Structure

```
renderforge/
├── packages/
│   ├── lit/                  # Lit Web Components
│   │   └── navbar/           # @renderforge/lit-navbar
│   ├── material/             # Material Design (planned)
│   ├── flutter/              # Flutter widgets (planned)
│   └── native/               # iOS/Android (planned)
├── tokens/                   # Design tokens (planned)
└── configs/                  # Brand configurations
    ├── plexusone.json
    └── aistandardsio.json
```

## Packages

### Lit Web Components

| Package | Description | Version |
|---------|-------------|---------|
| [@renderforge/lit-navbar](./packages/lit/navbar/) | Configurable navigation bar with mega menu, dropdowns, and mobile support | 0.1.0 |

## Installation

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

## Development

```bash
# Start dev server for all packages
pnpm dev

# Run type checking
pnpm typecheck
```

## Quick Start

### Lit Navbar

```html
<script type="module" src="https://unpkg.com/@renderforge/lit-navbar"></script>

<lit-navbar config-url="/config/navbar.json"></lit-navbar>
```

Or via npm:

```bash
npm install @renderforge/lit-navbar
```

```typescript
import '@renderforge/lit-navbar';

document.querySelector('lit-navbar').config = {
  brand: { title: 'My Site', titleGradient: true },
  menu: [
    { type: 'link', label: 'Home', url: '/' },
    { type: 'link', label: 'About', url: '/about' },
  ],
  github: { url: 'https://github.com/myorg' },
};
```

## Brand Configurations

Pre-built configurations for specific sites:

- [`plexusone.json`](./configs/plexusone.json) - PlexusOne.dev
- [`aistandardsio.json`](./configs/aistandardsio.json) - AIStandards.io

## Roadmap

### Phase 1: Web Components (Current)

- [x] Lit navbar with mega menu
- [ ] Lit footer
- [ ] Lit sidebar
- [ ] Lit card grid

### Phase 2: Design Tokens

- [ ] Color tokens
- [ ] Typography tokens
- [ ] Spacing tokens
- [ ] Token generation for all platforms

### Phase 3: Additional Frameworks

- [ ] Material Design components
- [ ] Carbon Design components

### Phase 4: Mobile

- [ ] Flutter widgets
- [ ] React Native components

### Phase 5: Native

- [ ] SwiftUI components
- [ ] Jetpack Compose components

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## License

MIT
