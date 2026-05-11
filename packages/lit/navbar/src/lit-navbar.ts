/**
 * Lit Navbar Component
 * Configurable navigation bar with mega menu, dropdowns, and mobile support
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { navStyles } from './styles/nav.styles.js';
import { chevronIcon, githubIcon, hamburgerIcon, closeIcon, getIcon } from './icons.js';
import { DEFAULT_CATEGORY_PATHS } from './constants.js';
import type { NavbarConfig, ProductsData, NavbarMenuItem, NavbarDropdown } from './types.js';
import './lit-mega-menu.js';
import './lit-mobile-menu.js';

@customElement('lit-navbar')
export class LitNavbar extends LitElement {
  static override styles = navStyles;

  /** Full navbar configuration */
  @property({ type: Object })
  config: NavbarConfig = {
    brand: { title: 'Navbar' },
    menu: [],
  };

  /** URL to load configuration from (alternative to config property) */
  @property({ type: String })
  configUrl = '';

  @state() private _data: ProductsData | null = null;
  @state() private _megaMenuOpen = false;
  @state() private _mobileMenuOpen = false;
  @state() private _activeDropdown: string | null = null;

  @query('.nav-mobile-toggle') private _mobileToggle!: HTMLButtonElement;
  @query('.megamenu-trigger') private _megaMenuTrigger!: HTMLButtonElement;

  private _boundHandleKeydown: (e: KeyboardEvent) => void;
  private _boundHandleClickOutside: (e: MouseEvent) => void;

  constructor() {
    super();
    this._boundHandleKeydown = this._handleKeydown.bind(this);
    this._boundHandleClickOutside = this._handleClickOutside.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    this._loadConfig();
    this._fetchProducts();
    this._applyTheme();
    document.addEventListener('keydown', this._boundHandleKeydown);
    document.addEventListener('mousedown', this._boundHandleClickOutside);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._boundHandleKeydown);
    document.removeEventListener('mousedown', this._boundHandleClickOutside);
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('config')) {
      this._applyTheme();
      this._fetchProducts();
    }
  }

  private async _loadConfig() {
    if (!this.configUrl) return;

    try {
      const res = await fetch(this.configUrl);
      if (!res.ok) throw new Error(`Failed to fetch config: ${res.status}`);
      this.config = await res.json();
    } catch (e) {
      console.warn('LitNavbar: Failed to load config', e);
    }
  }

  private async _fetchProducts() {
    const megaMenuItem = this.config.menu.find((item) => item.type === 'mega-menu');
    if (!megaMenuItem || megaMenuItem.type !== 'mega-menu') return;

    // Use inline data if provided
    if (megaMenuItem.data) {
      this._data = megaMenuItem.data;
      return;
    }

    // Otherwise fetch from URL
    const dataUrl = megaMenuItem.dataUrl;
    if (!dataUrl) return;

    try {
      const res = await fetch(dataUrl);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      this._data = await res.json();
    } catch (e) {
      console.warn('LitNavbar: Failed to load products data', e);
    }
  }

  private _applyTheme() {
    const theme = this.config.theme;
    if (!theme) return;

    const style = this.style;
    if (theme.primaryColor) style.setProperty('--lit-navbar-primary', theme.primaryColor);
    if (theme.secondaryColor) style.setProperty('--lit-navbar-secondary', theme.secondaryColor);
    if (theme.backgroundColor) style.setProperty('--lit-navbar-bg', theme.backgroundColor);
    if (theme.textColor) style.setProperty('--lit-navbar-text', theme.textColor);
    if (theme.mutedColor) style.setProperty('--lit-navbar-text-muted', theme.mutedColor);
    if (theme.borderColor) style.setProperty('--lit-navbar-border', theme.borderColor);
    if (theme.titleGradient) style.setProperty('--lit-navbar-title-gradient', theme.titleGradient);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (this._activeDropdown) {
        this._activeDropdown = null;
      } else if (this._megaMenuOpen) {
        this._megaMenuOpen = false;
        this._megaMenuTrigger?.focus();
      } else if (this._mobileMenuOpen) {
        this._mobileMenuOpen = false;
        this._mobileToggle?.focus();
      }
    }
  }

  private _handleClickOutside(e: MouseEvent) {
    if (!this._activeDropdown) return;

    const target = e.target as Node;
    const dropdown = this.shadowRoot?.querySelector(`[data-dropdown="${this._activeDropdown}"]`);
    if (dropdown && !dropdown.contains(target)) {
      this._activeDropdown = null;
    }
  }

  private _toggleMegaMenu() {
    this._activeDropdown = null;
    this._megaMenuOpen = !this._megaMenuOpen;
  }

  private _toggleDropdown(name: string) {
    this._megaMenuOpen = false;
    this._activeDropdown = this._activeDropdown === name ? null : name;
  }

  private _toggleMobileMenu() {
    this._mobileMenuOpen = !this._mobileMenuOpen;
  }

  private _closeMegaMenu() {
    this._megaMenuOpen = false;
  }

  private _closeMobileMenu() {
    this._mobileMenuOpen = false;
  }

  private _closeDropdowns() {
    this._activeDropdown = null;
  }

  override render() {
    const baseUrl = this.config.baseUrl || '';

    return html`
      <nav class="nav" aria-label="Main navigation">
        <a href="#main-content" class="skip-link">Skip to main content</a>

        <div class="nav-container">
          ${this._renderBrand()}
          ${this._renderDesktopLinks()}
          ${this._renderMobileToggle()}
        </div>

        <lit-mega-menu
          ?open=${this._megaMenuOpen}
          .data=${this._data}
          .baseUrl=${baseUrl}
          .categoryPaths=${this.config.categoryPaths || DEFAULT_CATEGORY_PATHS}
          @close=${this._closeMegaMenu}
        ></lit-mega-menu>

        <lit-mobile-menu
          ?open=${this._mobileMenuOpen}
          .data=${this._data}
          .baseUrl=${baseUrl}
          .menuItems=${this.config.menu}
          .github=${this.config.github || null}
          .categoryPaths=${this.config.categoryPaths || DEFAULT_CATEGORY_PATHS}
          @close=${this._closeMobileMenu}
        ></lit-mobile-menu>
      </nav>
    `;
  }

  private _renderBrand() {
    const { brand, baseUrl = '' } = this.config;
    const homeUrl = brand.homeUrl || baseUrl || '/';

    return html`
      <a href="${homeUrl}" class="nav-brand">
        ${brand.logoUrl
          ? html`<img src="${brand.logoUrl}" alt="${brand.logoAlt || brand.title}" class="nav-logo" />`
          : nothing}
        <span class="nav-title">
          ${brand.titleGradient
            ? html`<span class="gradient-text">${brand.title}</span>`
            : html`<span>${brand.title}</span>`}
          ${brand.titleSecondary
            ? html`<span class="nav-title-light">${brand.titleSecondary}</span>`
            : nothing}
        </span>
      </a>
    `;
  }

  private _renderDesktopLinks() {
    return html`
      <div class="nav-links">
        ${this.config.menu.map((item) => this._renderMenuItem(item))}
        ${this._renderGitHub()}
      </div>
    `;
  }

  private _renderMenuItem(item: NavbarMenuItem) {
    if (item.type === 'mega-menu') {
      return html`
        <button
          class="nav-link megamenu-trigger"
          aria-expanded=${this._megaMenuOpen}
          aria-haspopup="true"
          @click=${this._toggleMegaMenu}
        >
          ${item.label} ${chevronIcon}
        </button>
      `;
    }

    if (item.type === 'link') {
      return html`
        <a
          href=${item.url}
          class="nav-link"
          target=${item.external ? '_blank' : nothing}
          rel=${item.external ? 'noopener noreferrer' : nothing}
        >
          ${item.label}
        </a>
      `;
    }

    if (item.type === 'dropdown') {
      return this._renderDropdown(item);
    }

    return nothing;
  }

  private _renderDropdown(item: NavbarDropdown) {
    const isOpen = this._activeDropdown === item.label;

    return html`
      <div class="nav-dropdown ${isOpen ? 'open' : ''}" data-dropdown=${item.label}>
        <button
          class="nav-link"
          aria-expanded=${isOpen}
          aria-haspopup="true"
          @click=${() => this._toggleDropdown(item.label)}
        >
          ${item.label} ${chevronIcon}
        </button>
        <div class="nav-dropdown-menu">
          ${item.items.map(
            (subItem, index) => html`
              ${item.dividerAfter !== undefined && index === item.dividerAfter + 1
                ? html`<div class="nav-dropdown-divider"></div>`
                : nothing}
              <a
                href=${subItem.url}
                class="nav-dropdown-item"
                target=${subItem.external ? '_blank' : nothing}
                rel=${subItem.external ? 'noopener noreferrer' : nothing}
                @click=${this._closeDropdowns}
              >
                ${subItem.icon ? getIcon(subItem.icon) : nothing}
                ${subItem.label}
              </a>
            `
          )}
        </div>
      </div>
    `;
  }

  private _renderGitHub() {
    const { github } = this.config;
    if (!github) return nothing;

    return html`
      <a
        href="${github.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-github"
      >
        ${githubIcon} ${github.label || 'GitHub'}
      </a>
    `;
  }

  private _renderMobileToggle() {
    return html`
      <button
        class="nav-mobile-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded=${this._mobileMenuOpen}
        aria-controls="mobile-menu"
        @click=${this._toggleMobileMenu}
      >
        ${hamburgerIcon} ${closeIcon}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-navbar': LitNavbar;
  }
}
