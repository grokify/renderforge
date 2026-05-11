/**
 * Mobile menu styles
 */

import { css } from 'lit';
import { sharedStyles } from './shared.styles.js';

export const mobileMenuStyles = [
  sharedStyles,
  css`
    .mobile-menu {
      position: fixed;
      top: var(--ln-height);
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--ln-bg);
      z-index: calc(var(--ln-z-index) - 1);
      opacity: 0;
      visibility: hidden;
      transform: translateX(100%);
      transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
      overflow-y: auto;
    }

    :host([open]) .mobile-menu {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }

    .mobile-menu-container {
      padding: 1.5rem;
    }

    .mobile-menu-section {
      padding: 1rem 0;
      border-bottom: 1px solid var(--ln-border);
    }

    .mobile-menu-section:last-child {
      border-bottom: none;
    }

    .mobile-menu-section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ln-text-muted);
      margin-bottom: 0.75rem;
    }

    .mobile-menu-links {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .mobile-menu-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      font-size: 1rem;
      color: var(--ln-text);
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .mobile-menu-link:hover {
      background: var(--ln-bg-elevated);
    }

    .mobile-menu-link.active {
      color: var(--ln-primary);
    }

    .mobile-menu-accordion {
      display: flex;
      flex-direction: column;
    }

    .mobile-menu-accordion-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      color: var(--ln-text);
      text-align: left;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .mobile-menu-accordion-trigger:hover {
      background: var(--ln-bg-elevated);
    }

    .mobile-menu-accordion-trigger .chevron-icon {
      transition: transform 0.2s;
    }

    .mobile-menu-accordion-trigger[aria-expanded="true"] .chevron-icon {
      transform: rotate(180deg);
    }

    .mobile-menu-accordion-content {
      display: none;
      padding-left: 1rem;
    }

    .mobile-menu-accordion[open] .mobile-menu-accordion-content {
      display: block;
    }

    .mobile-menu-product {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.75rem;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .mobile-menu-product:hover {
      background: var(--ln-bg-elevated);
    }

    .mobile-menu-product-name {
      font-size: 0.9375rem;
      color: var(--ln-text);
    }

    .mobile-menu-product-tagline {
      font-size: 0.8125rem;
      color: var(--ln-text-muted);
    }

    .mobile-menu-github {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.875rem;
      margin-top: 1rem;
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--ln-text);
      background: var(--ln-bg-elevated);
      border: 1px solid var(--ln-border);
      border-radius: 8px;
      transition: border-color 0.2s;
    }

    .mobile-menu-github:hover {
      border-color: var(--ln-primary);
    }

    @media (min-width: 1025px) {
      :host {
        display: none;
      }
    }
  `,
];
