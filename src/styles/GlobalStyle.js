import { createGlobalStyle } from 'styled-components';
import Fonts from './fonts';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${Fonts};

  :root {
    --primary: #0a192f;
    --secondary: #64ffda;
    --brand: #64ffda;
    --font-sans: 'Calibre', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --card-radius: 12px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

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

  :root,
  [data-theme='dark'] {
    --bg: var(--primary);
    --surface: color-mix(in srgb, var(--secondary) 7%, var(--primary));
    --border: color-mix(in srgb, var(--secondary) 20%, var(--primary));
    --text: color-mix(in srgb, var(--secondary) 72%, var(--primary));
    --heading: var(--secondary);
    --secondary-soft: color-mix(in srgb, var(--secondary) 12%, transparent);
    --shadow: color-mix(in srgb, var(--primary) 55%, transparent);
    --nav-bg: color-mix(in srgb, var(--primary) 94%, transparent);
    --nav-bg-scrolled: color-mix(in srgb, var(--primary) 88%, transparent);
    --image-overlay: var(--primary);
    --accent: var(--secondary);
    color-scheme: dark;
  }

  [data-theme='light'] {
    --bg: #ffffff;
    --surface: #f4f6f8;
    --border: #0a192f;
    --text: #0a192f;
    --heading: #0a192f;
    --secondary: #0a192f;
    --brand: #64ffda;
    --secondary-soft: color-mix(in srgb, #0a192f 12%, transparent);
    --shadow: color-mix(in srgb, var(--primary) 8%, transparent);
    --nav-bg: color-mix(in srgb, #ffffff 88%, transparent);
    --nav-bg-scrolled: color-mix(in srgb, #ffffff 94%, transparent);
    --image-overlay: #ffffff;
    --accent: #0a192f;
    color-scheme: light;
  }

  [data-theme='light'] .profile-photo .wrapper:before {
    mix-blend-mode: normal;
    opacity: 0.1;
  }

  :root,
  [data-theme='dark'],
  [data-theme='light'] {
    --green: var(--accent);
    --green-tint: var(--secondary-soft);
    --navy: var(--bg);
    --light-navy: var(--surface);
    --lightest-navy: var(--border);
    --slate: var(--text);
    --light-slate: var(--text);
    --lightest-slate: var(--heading);
    --white: var(--heading);
    --surface-elevated: var(--surface);
    --navy-shadow: var(--shadow);
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
    background-color: color-mix(in srgb, var(--secondary) 35%, var(--primary));
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
    font-size: var(--fz-xl);
    line-height: var(--text-line-height);
    transition: background-color 0.25s ease, color 0.25s ease;

    @media (max-width: 480px) {
      font-size: var(--fz-lg);
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
    font-weight: 600;
    color: var(--heading);
    line-height: 1.1;
  }

  .big-heading {
    margin: 0;
    padding: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  .medium-heading {
    margin: 0;
    padding: 0;
    font-size: clamp(40px, 8vw, 60px);
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 0 16px;
    padding: 0;
    width: 100%;
    font-size: clamp(26px, 5vw, var(--fz-heading));
    white-space: nowrap;

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--border);

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  .section-lead {
    margin: 0 0 12px;
    padding: 0;
    color: var(--heading);
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 600;
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
      color: var(--secondary);
    }

    [data-theme='light'] &:hover,
    [data-theme='light'] &:focus {
      color: #0a192f;
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

    [data-theme='light'] & {
      border-color: #0a192f;
    }

    &:focus {
      outline: 0;
    }

    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }

    [data-theme='light'] &:hover,
    [data-theme='light'] &:focus {
      border-color: #0a192f;
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
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--secondary);
        }
      }
    }
  }

  blockquote {
    border-left-color: var(--secondary);
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
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
    color: var(--brand);

    [data-theme='light'] & {
      color: var(--secondary);
    }
  }

  .overline {
    color: var(--secondary);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;
  }

  .subtitle {
    color: var(--secondary);
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
    color: var(--secondary);

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
