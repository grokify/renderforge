/**
 * Mega menu styles
 */

import { css } from 'lit';
import { sharedStyles } from './shared.styles.js';

export const megaMenuStyles = [
  sharedStyles,
  css`
    .mega-menu {
      position: fixed;
      top: var(--ln-height);
      left: 0;
      right: 0;
      background: var(--ln-bg);
      border-bottom: 1px solid var(--ln-border);
      z-index: calc(var(--ln-z-index) - 1);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-16px);
      transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
    }

    :host([open]) .mega-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .mega-menu-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .mega-menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .mega-menu-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .mega-menu-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--ln-border);
    }

    .mega-menu-section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ln-text-muted);
    }

    .mega-menu-section-link {
      font-size: 0.75rem;
      color: var(--ln-primary);
      transition: opacity 0.2s;
    }

    .mega-menu-section-link:hover {
      opacity: 0.8;
    }

    .mega-menu-products {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .mega-menu-product {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.75rem;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .mega-menu-product:hover {
      background: var(--ln-bg-elevated);
    }

    .mega-menu-product-name {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--ln-text);
    }

    .mega-menu-product.featured .mega-menu-product-name {
      color: var(--ln-primary);
    }

    .mega-menu-product-tagline {
      font-size: 0.8125rem;
      color: var(--ln-text-muted);
      line-height: 1.4;
    }

    .mega-menu-backdrop {
      position: fixed;
      top: var(--ln-height);
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: calc(var(--ln-z-index) - 2);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
    }

    :host([open]) .mega-menu-backdrop {
      opacity: 1;
      visibility: visible;
    }

    @media (max-width: 1024px) {
      .mega-menu {
        display: none;
      }
    }
  `,
];
