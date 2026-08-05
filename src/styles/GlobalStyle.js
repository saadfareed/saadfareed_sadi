import { createGlobalStyle } from 'styled-components';
import Fonts from './fonts';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${Fonts};

  :root {
    /*
     * Ledger / Statement of Record — the whole site reads as a financial
     * ledger: ruled rows, tabular figures, a single "stamp" accent used the
     * way a rubber stamp is used on a real document (sparingly, for the
     * things that matter: status, key figures, one call to action). Almost
     * everything else is differentiated by ink weight and rule structure,
     * not color.
     */
    --font-display: 'Fraunces', 'Iowan Old Style', Georgia, serif;
    --font-sans: 'IBM Plex Sans', -apple-system, system-ui, sans-serif;
    --font-mono: 'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 2px;
    --card-radius: 3px;
    --nav-height: 96px;
    --nav-scroll-height: 68px;

    --tab-height: 42px;
    --tab-width: 120px;

    --content-max-width: 1000px;
    --content-wide: 1000px;
    --content-narrow: 640px;
    --page-gutter: clamp(24px, 5vw, 72px);
    --side-rail-space: 56px;
    --text-line-height: 1.65;
    --paragraph-spacing: 1.25em;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }

  /*
   * Day Ledger (light, default): pale sage ledger paper with a greenbar
   * (alternating accounting-paper stripe) for rows/cards. Night Audit
   * (dark): the same statement read on a CRT at close-of-day — deep ink
   * background, paper-pale text, the stamp brightened for legibility.
   */
  :root,
  [data-theme='light'] {
    --bg: #f7f8f3;
    --surface: #e8efe1;
    --surface-alt: #f1f4ec;
    --border: #8fa087;
    --border-soft: color-mix(in srgb, var(--border) 35%, var(--bg));
    --heading: #14231c;
    --text: #3d4f42;
    --text-muted: #5c6c60;
    --stamp: #b23a2c;
    --stamp-soft: color-mix(in srgb, var(--stamp) 12%, transparent);
    --shadow: color-mix(in srgb, var(--heading) 12%, transparent);
    --nav-bg: color-mix(in srgb, var(--bg) 90%, transparent);
    --nav-bg-scrolled: color-mix(in srgb, var(--bg) 96%, transparent);
    color-scheme: light;
  }

  [data-theme='dark'] {
    --bg: #0e1912;
    --surface: #16241b;
    --surface-alt: #111e15;
    --border: #42603c;
    --border-soft: color-mix(in srgb, var(--border) 35%, var(--bg));
    --heading: #ecf3e6;
    --text: #a9bba9;
    --text-muted: #7c8e7e;
    --stamp: #e2664a;
    --stamp-soft: color-mix(in srgb, var(--stamp) 14%, transparent);
    --shadow: color-mix(in srgb, black 45%, transparent);
    --nav-bg: color-mix(in srgb, var(--bg) 88%, transparent);
    --nav-bg-scrolled: color-mix(in srgb, var(--bg) 95%, transparent);
    color-scheme: dark;
  }

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--stamp-soft);
    color: var(--heading);
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    font-variant-numeric: tabular-nums;
    line-height: var(--text-line-height);
    transition: background-color 0.25s ease, color 0.25s ease;

    @media (max-width: 480px) {
      font-size: var(--fz-md);
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 120px var(--page-gutter);

    @media (max-width: 768px) {
      padding: 100px var(--page-gutter);
    }

    @media (max-width: 480px) {
      padding: 90px var(--page-gutter);
    }

    &.fillHeight {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 var(--page-gutter);

      @media (min-width: 769px) {
        padding-left: calc(var(--page-gutter) + var(--side-rail-space));
        padding-right: calc(var(--page-gutter) + var(--side-rail-space));
      }
    }
  }

  section {
    margin: 0;
    padding: 64px 0;
    max-width: var(--content-max-width);
    width: 100%;

    @media (max-width: 768px) {
      padding: 56px 0;
    }

    @media (max-width: 480px) {
      padding: 48px 0;
    }
  }

  .prose {
    color: var(--text);
    line-height: var(--text-line-height);
    text-align: left;

    p {
      margin: 0 0 var(--paragraph-spacing);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--heading);
    line-height: 1.1;
  }

  .big-heading {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: clamp(40px, 7vw, 76px);
    line-height: 1.04;
  }

  .medium-heading {
    margin: 0;
    padding: 0;
    font-size: clamp(36px, 6vw, 52px);
  }

  /*
   * The standard section header: a mono eyebrow label (like a statement
   * column header — "ENTRY", "SECTION") over a display headline, closed off
   * by a full-width rule. No decorative 01/02/03 — order isn't the point
   * here, the rule is what marks a new part of the statement.
   */
  .ledger-heading {
    margin: 0 0 40px;
    padding: 0;

    .eyebrow {
      display: block;
      margin: 0 0 10px;
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .headline {
      margin: 0 0 16px;
      font-size: clamp(28px, 4vw, var(--fz-heading));
      font-weight: 500;
    }

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--border);
    }
  }

  .section-lead {
    margin: 0 0 12px;
    padding: 0;
    color: var(--heading);
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 500;
    line-height: 1.2;
  }

  .section-intro {
    max-width: 640px;
    margin: 0 0 40px;
    padding: 0;
    color: var(--text);
    font-size: var(--fz-lg);
    line-height: var(--text-line-height);
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;

    &.feather {
      fill: none;
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--heading);
    }

    &.inline-link {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input,
  select,
  textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }

    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 var(--paragraph-spacing);

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    & > code {
      background-color: var(--surface);
      color: var(--heading);
      font-size: var(--fz-sm);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: var(--fz-lg);
      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 10px;
        &:before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--text-muted);
        }
      }
    }
  }

  blockquote {
    border-left-color: var(--stamp);
    border-left-style: solid;
    border-left-width: 2px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
      font-family: var(--font-display);
      font-style: italic;
      font-size: 24px;
    }
  }

  hr {
    background-color: var(--border);
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 1rem;
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--fz-md);
  }

  #logo {
    color: var(--heading);
  }

  .overline {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;
  }

  .subtitle {
    color: var(--text-muted);
    margin: 0 0 20px 0;
    font-size: var(--fz-md);
    font-family: var(--font-mono);
    font-weight: 400;
    line-height: 1.5;
    @media (max-width: 1080px) {
      font-size: var(--fz-sm);
    }
    @media (max-width: 768px) {
      font-size: var(--fz-xs);
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: var(--text-muted);

    .arrow {
      display: block;
      margin-right: 10px;
      padding-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      font-weight: 600;
      line-height: 1.5;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${TransitionStyles};

  ${PrismStyles};
`;

export default GlobalStyle;
