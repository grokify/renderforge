/**
 * Main navigation styles
 */

import { css } from 'lit';
import { sharedStyles } from './shared.styles.js';

export const navStyles = [
  sharedStyles,
  css`
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--ln-height);
      background: var(--ln-bg);
      border-bottom: 1px solid var(--ln-border);
      z-index: var(--ln-z-index);
    }

    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Skip link for accessibility */
    .skip-link {
      position: absolute;
      top: -100%;
      left: 0;
      padding: 0.5rem 1rem;
      background: var(--ln-primary);
      color: var(--ln-bg);
      z-index: calc(var(--ln-z-index) + 1);
      transition: top 0.2s;
    }

    .skip-link:focus {
      top: 0;
    }

    /* Brand */
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 600;
      font-size: 1.25rem;
      color: var(--ln-text);
      transition: opacity 0.2s;
    }

    .nav-brand:hover {
      opacity: 0.9;
    }

    .nav-logo {
      width: 32px;
      height: 32px;
      border-radius: 6px;
    }

    .nav-title {
      display: flex;
      align-items: baseline;
    }

    .nav-title-light {
      font-weight: 400;
      color: var(--ln-text-muted);
    }

    /* Desktop links */
    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.875rem;
      font-size: 0.9375rem;
      color: var(--ln-text-muted);
      border-radius: 6px;
      transition: color 0.2s, background-color 0.2s;
    }

    .nav-link:hover {
      color: var(--ln-text);
      background-color: var(--ln-bg-elevated);
    }

    .nav-link .chevron-icon {
      transition: transform 0.2s;
    }

    .nav-link[aria-expanded="true"] .chevron-icon {
      transform: rotate(180deg);
    }

    /* Dropdown */
    .nav-dropdown {
      position: relative;
    }

    .nav-dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 180px;
      padding: 0.5rem;
      background: var(--ln-bg-elevated);
      border: 1px solid var(--ln-border);
      border-radius: 8px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .nav-dropdown.open .nav-dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(8px);
    }

    .nav-dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 0.75rem;
      font-size: 0.9375rem;
      color: var(--ln-text-muted);
      border-radius: 6px;
      transition: color 0.2s, background-color 0.2s;
    }

    .nav-dropdown-item:hover {
      color: var(--ln-text);
      background-color: rgba(255, 255, 255, 0.05);
    }

    .nav-dropdown-divider {
      height: 1px;
      margin: 0.5rem 0;
      background: var(--ln-border);
    }

    /* GitHub button */
    .nav-github {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      margin-left: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ln-text);
      background: var(--ln-bg-elevated);
      border: 1px solid var(--ln-border);
      border-radius: 6px;
      transition: border-color 0.2s, background-color 0.2s;
    }

    .nav-github:hover {
      border-color: var(--ln-primary);
      background: rgba(6, 182, 212, 0.1);
    }

    .nav-github .github-icon {
      width: 18px;
      height: 18px;
    }

    /* Mobile toggle */
    .nav-mobile-toggle {
      display: none;
      padding: 0.5rem;
      color: var(--ln-text);
    }

    .nav-mobile-toggle .close-icon {
      display: none;
    }

    .nav-mobile-toggle[aria-expanded="true"] .hamburger-icon {
      display: none;
    }

    .nav-mobile-toggle[aria-expanded="true"] .close-icon {
      display: block;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .nav-links {
        display: none;
      }

      .nav-mobile-toggle {
        display: flex;
      }
    }
  `,
];
