/**
 * Default constants for Lit Navbar
 */

/** Default category order for mega menu */
export const DEFAULT_CATEGORY_ORDER = ['library', 'agent', 'application', 'specification'] as const;

/** Default category to URL path mappings */
export const DEFAULT_CATEGORY_PATHS: Record<string, string> = {
  library: '/libraries',
  agent: '/agents',
  application: '/applications',
  specification: '/specifications',
};

/** Default theme colors (dark mode) */
export const DEFAULT_THEME = {
  primaryColor: '#06b6d4',
  secondaryColor: '#8b5cf6',
  backgroundColor: '#0a0e1a',
  textColor: '#e2e8f0',
  mutedColor: '#64748b',
  borderColor: '#1e293b',
  titleGradient: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
};
