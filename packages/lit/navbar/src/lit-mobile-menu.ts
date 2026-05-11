/**
 * Lit Mobile Menu Component
 * Full-screen mobile navigation menu
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { mobileMenuStyles } from './styles/mobile-menu.styles.js';
import { chevronIcon, githubIcon, getIcon } from './icons.js';
import { DEFAULT_CATEGORY_ORDER, DEFAULT_CATEGORY_PATHS } from './constants.js';
import type { ProductsData, NavbarMenuItem, NavbarGitHub, CategoryPaths } from './types.js';

@customElement('lit-mobile-menu')
export class LitMobileMenu extends LitElement {
  static override styles = mobileMenuStyles;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Object })
  data: ProductsData | null = null;

  @property({ type: String })
  baseUrl = '';

  @property({ type: Array })
  menuItems: NavbarMenuItem[] = [];

  @property({ type: Object })
  github: NavbarGitHub | null = null;

  @property({ type: Object })
  categoryPaths: CategoryPaths = DEFAULT_CATEGORY_PATHS;

  @state()
  private _expandedSections: Set<string> = new Set();

  private _toggleSection(section: string) {
    const newExpanded = new Set(this._expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    this._expandedSections = newExpanded;
  }

  private _close() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  override render() {
    return html`
      <div class="mobile-menu" role="navigation">
        <div class="mobile-menu-container">
          ${this._renderMenuItems()}
          ${this._renderProducts()}
          ${this._renderGitHub()}
        </div>
      </div>
    `;
  }

  private _renderMenuItems() {
    return this.menuItems.map((item) => {
      if (item.type === 'link') {
        return html`
          <div class="mobile-menu-section">
            <a
              href=${item.url}
              class="mobile-menu-link"
              target=${item.external ? '_blank' : nothing}
              rel=${item.external ? 'noopener noreferrer' : nothing}
              @click=${this._close}
            >
              ${item.label}
            </a>
          </div>
        `;
      }

      if (item.type === 'dropdown') {
        const isExpanded = this._expandedSections.has(item.label);
        return html`
          <div class="mobile-menu-section">
            <div class="mobile-menu-accordion" ?open=${isExpanded}>
              <button
                class="mobile-menu-accordion-trigger"
                aria-expanded=${isExpanded}
                @click=${() => this._toggleSection(item.label)}
              >
                ${item.label} ${chevronIcon}
              </button>
              <div class="mobile-menu-accordion-content">
                <div class="mobile-menu-links">
                  ${item.items.map(
                    (subItem, index) => html`
                      ${item.dividerAfter !== undefined && index === item.dividerAfter + 1
                        ? html`<div style="height: 1px; background: var(--ln-border); margin: 0.5rem 0;"></div>`
                        : nothing}
                      <a
                        href=${subItem.url}
                        class="mobile-menu-link"
                        target=${subItem.external ? '_blank' : nothing}
                        rel=${subItem.external ? 'noopener noreferrer' : nothing}
                        @click=${this._close}
                      >
                        ${subItem.icon ? getIcon(subItem.icon) : nothing}
                        ${subItem.label}
                      </a>
                    `
                  )}
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // mega-menu type is handled separately via products data
      return nothing;
    });
  }

  private _renderProducts() {
    if (!this.data) {
      return nothing;
    }

    const categories = DEFAULT_CATEGORY_ORDER.filter(
      (cat) => this.data!.categories[cat]
    );

    return categories.map((category) => {
      const categoryData = this.data!.categories[category];
      const products = this.data!.products.filter((p) => p.category === category);
      const isExpanded = this._expandedSections.has(category);

      if (products.length === 0) {
        return nothing;
      }

      return html`
        <div class="mobile-menu-section">
          <div class="mobile-menu-accordion" ?open=${isExpanded}>
            <button
              class="mobile-menu-accordion-trigger"
              aria-expanded=${isExpanded}
              @click=${() => this._toggleSection(category)}
            >
              ${categoryData.label} ${chevronIcon}
            </button>
            <div class="mobile-menu-accordion-content">
              <div class="mobile-menu-links">
                ${products.map((product) => {
                  const url = product.docsUrl || `${this.baseUrl}/products/${product.slug}`;
                  return html`
                    <a
                      href=${url}
                      class="mobile-menu-product"
                      @click=${this._close}
                    >
                      <span class="mobile-menu-product-name">${product.name}</span>
                      <span class="mobile-menu-product-tagline">${product.tagline}</span>
                    </a>
                  `;
                })}
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }

  private _renderGitHub() {
    if (!this.github) {
      return nothing;
    }

    return html`
      <a
        href=${this.github.url}
        class="mobile-menu-github"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${githubIcon}
        ${this.github.label || 'GitHub'}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-mobile-menu': LitMobileMenu;
  }
}
