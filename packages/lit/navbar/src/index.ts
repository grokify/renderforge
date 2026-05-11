/**
 * Lit Navbar - Configurable Navigation Web Component
 *
 * @packageDocumentation
 */

// Components
export { LitNavbar } from './lit-navbar.js';
export { LitMegaMenu } from './lit-mega-menu.js';
export { LitMobileMenu } from './lit-mobile-menu.js';

// Types
export type {
  NavbarConfig,
  NavbarBrand,
  NavbarGitHub,
  NavbarMenuItem,
  NavbarLink,
  NavbarDropdown,
  NavbarDropdownItem,
  NavbarMegaMenu,
  NavbarTheme,
  CategoryPaths,
  ProductsData,
  Product,
  Category,
  ProductCategory,
} from './types.js';

// Icons
export { getIcon, chevronIcon, githubIcon, hamburgerIcon, closeIcon, rssIcon, externalIcon } from './icons.js';

// Constants
export { DEFAULT_CATEGORY_ORDER, DEFAULT_CATEGORY_PATHS, DEFAULT_THEME } from './constants.js';
