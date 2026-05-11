/**
 * Lit Mega Menu Component
 * Displays categorized products in a dropdown panel
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { megaMenuStyles } from './styles/mega-menu.styles.js';
import { DEFAULT_CATEGORY_ORDER, DEFAULT_CATEGORY_PATHS } from './constants.js';
import type { ProductsData, CategoryPaths } from './types.js';

@customElement('lit-mega-menu')
export class LitMegaMenu extends LitElement {
  static override styles = megaMenuStyles;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Object })
  data: ProductsData | null = null;

  @property({ type: String })
  baseUrl = '';

  @property({ type: Object })
  categoryPaths: CategoryPaths = DEFAULT_CATEGORY_PATHS;

  private _handleBackdropClick() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  override render() {
    if (!this.data) {
      return nothing;
    }

    const categories = DEFAULT_CATEGORY_ORDER.filter(
      (cat) => this.data!.categories[cat]
    );

    return html`
      <div
        class="mega-menu-backdrop"
        @click=${this._handleBackdropClick}
      ></div>
      <div class="mega-menu" role="menu">
        <div class="mega-menu-container">
          <div class="mega-menu-grid">
            ${categories.map((category) => this._renderCategory(category))}
          </div>
        </div>
      </div>
    `;
  }

  private _renderCategory(category: string) {
    const categoryData = this.data!.categories[category];
    const products = this.data!.products.filter((p) => p.category === category);
    const categoryPath = this.categoryPaths[category] || `/${category}s`;

    if (products.length === 0) {
      return nothing;
    }

    return html`
      <div class="mega-menu-section">
        <div class="mega-menu-section-header">
          <span class="mega-menu-section-title">${categoryData.label}</span>
          <a
            href="${this.baseUrl}${categoryPath}"
            class="mega-menu-section-link"
            @click=${() => this.dispatchEvent(new CustomEvent('close'))}
          >
            View all
          </a>
        </div>
        <div class="mega-menu-products">
          ${products.map((product) => this._renderProduct(product))}
        </div>
      </div>
    `;
  }

  private _renderProduct(product: { name: string; slug: string; tagline: string; featured?: boolean; docsUrl?: string | null }) {
    const url = product.docsUrl || `${this.baseUrl}/products/${product.slug}`;

    return html`
      <a
        href=${url}
        class="mega-menu-product ${product.featured ? 'featured' : ''}"
        @click=${() => this.dispatchEvent(new CustomEvent('close'))}
      >
        <span class="mega-menu-product-name">${product.name}</span>
        <span class="mega-menu-product-tagline">${product.tagline}</span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-mega-menu': LitMegaMenu;
  }
}
