/**
 * Lit Navbar Configuration Types
 *
 * All configuration is passed via the `config` property or loaded from a JSON URL.
 */

/** Brand configuration for the navbar */
export interface NavbarBrand {
  /** URL to the logo image */
  logoUrl?: string;
  /** Alt text for the logo */
  logoAlt?: string;
  /** Primary title text */
  title: string;
  /** Secondary title text (displayed after primary) */
  titleSecondary?: string;
  /** Apply gradient styling to primary title */
  titleGradient?: boolean;
  /** Home URL when clicking the brand */
  homeUrl?: string;
}

/** GitHub button configuration */
export interface NavbarGitHub {
  /** GitHub organization or repo URL */
  url: string;
  /** Button label (default: "GitHub") */
  label?: string;
}

/** Simple navigation link */
export interface NavbarLink {
  type: 'link';
  /** Display label */
  label: string;
  /** URL to navigate to */
  url: string;
  /** Open in new tab */
  external?: boolean;
}

/** Dropdown menu item */
export interface NavbarDropdownItem {
  /** Display label */
  label: string;
  /** URL to navigate to */
  url: string;
  /** Open in new tab */
  external?: boolean;
  /** Icon name (from built-in icons: 'rss', 'external') */
  icon?: string;
}

/** Dropdown menu with multiple items */
export interface NavbarDropdown {
  type: 'dropdown';
  /** Display label for the dropdown trigger */
  label: string;
  /** Dropdown menu items */
  items: NavbarDropdownItem[];
  /** Divider position (items after this index are separated) */
  dividerAfter?: number;
}

/** Mega menu with categorized products */
export interface NavbarMegaMenu {
  type: 'mega-menu';
  /** Display label for the mega menu trigger */
  label: string;
  /** URL to fetch products data JSON */
  dataUrl?: string;
  /** Inline products data (alternative to dataUrl) */
  data?: ProductsData;
}

/** Union type for all menu item types */
export type NavbarMenuItem = NavbarLink | NavbarDropdown | NavbarMegaMenu;

/** Product category type */
export type ProductCategory = 'library' | 'agent' | 'application' | 'specification' | string;

/** Product definition for mega menu */
export interface Product {
  name: string;
  slug: string;
  tagline: string;
  category: ProductCategory;
  featured?: boolean;
  docsUrl?: string | null;
  githubUrl?: string;
}

/** Category definition for mega menu */
export interface Category {
  label: string;
  description: string;
  order: number;
}

/** Products data structure for mega menu */
export interface ProductsData {
  version?: string;
  lastUpdated?: string;
  categories: Record<string, Category>;
  products: Product[];
}

/** Theme configuration */
export interface NavbarTheme {
  /** Primary accent color (e.g., '#ff6b00') */
  primaryColor?: string;
  /** Secondary accent color (e.g., '#00d4ff') */
  secondaryColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Muted text color */
  mutedColor?: string;
  /** Border color */
  borderColor?: string;
  /** Gradient for title (CSS gradient value) */
  titleGradient?: string;
}

/** Category URL path mappings */
export interface CategoryPaths {
  /** Map category key to URL path (e.g., { library: '/libraries' }) */
  [category: string]: string;
}

/** Full navbar configuration */
export interface NavbarConfig {
  /** Base URL for all relative links */
  baseUrl?: string;
  /** Brand configuration */
  brand: NavbarBrand;
  /** Menu items (links, dropdowns, mega-menus) */
  menu: NavbarMenuItem[];
  /** GitHub button configuration */
  github?: NavbarGitHub;
  /** Theme customization */
  theme?: NavbarTheme;
  /** Category to URL path mappings for mega menu */
  categoryPaths?: CategoryPaths;
  /** Currently active product slug (for highlighting) */
  currentProduct?: string;
}
