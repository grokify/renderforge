/**
 * Shared styles for Lit Navbar components
 */

import { css } from 'lit';

export const sharedStyles = css`
  :host {
    /* Theme variables with defaults */
    --ln-primary: var(--lit-navbar-primary, #06b6d4);
    --ln-secondary: var(--lit-navbar-secondary, #8b5cf6);
    --ln-bg: var(--lit-navbar-bg, #0a0e1a);
    --ln-bg-elevated: var(--lit-navbar-bg-elevated, #111827);
    --ln-text: var(--lit-navbar-text, #e2e8f0);
    --ln-text-muted: var(--lit-navbar-text-muted, #64748b);
    --ln-border: var(--lit-navbar-border, #1e293b);
    --ln-title-gradient: var(--lit-navbar-title-gradient, linear-gradient(135deg, #06b6d4, #8b5cf6));

    /* Layout */
    --ln-height: 64px;
    --ln-z-index: 1000;

    display: block;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    border: none;
    background: none;
    cursor: pointer;
    color: inherit;
  }

  .gradient-text {
    background: var(--ln-title-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
