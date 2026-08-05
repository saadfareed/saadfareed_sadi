import { css } from 'styled-components';

// The primary "stamp" interaction: an outlined ink rectangle that fills
// solid on hover/focus, like a rubber stamp being pressed onto paper.
const button = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--heading);
  background-color: transparent;
  border: 1px solid var(--heading);
  border-radius: var(--border-radius);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.1rem 1.7rem;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--heading);
    color: var(--bg);
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      color: var(--heading);
      outline: 0;
    }
  `,

  // Body-copy links: a quiet rule underneath that strengthens and turns
  // stamp-red on hover — the one place the accent shows up in running text.
  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: var(--transition);
    cursor: pointer;
    color: var(--heading);
    &:hover,
    &:focus,
    &:active {
      color: var(--heading);
      outline: 0;
      &:after {
        width: 100%;
        background-color: var(--stamp);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      position: relative;
      bottom: 0.15em;
      background-color: var(--border);
      transition: var(--transition);
    }
  `,

  button,

  smallButton: css`
    ${button};
    padding: 0.7rem 1.1rem;
  `,

  bigButton: css`
    ${button};
    padding: 1.25rem 1.85rem;
    font-size: var(--fz-sm);
  `,

  // Small in-card CTAs ("Case Study →", "Live ↗") — a plain underlined
  // mono label rather than another boxed button, so the outlined "stamp"
  // treatment above stays reserved for the one or two calls to action that
  // should carry real weight.
  fillButton: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    border: none;
    border-bottom: 1px solid var(--border);
    background-color: transparent;
    color: var(--heading);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1.4;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus,
    &:active {
      border-bottom-color: var(--stamp);
      color: var(--stamp);
      outline: 0;
    }
  `,

  boxShadow: css`
    box-shadow: 0 1px 0 var(--border);
    transition: var(--transition);
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 26px;
      margin-bottom: 10px;
      &:before {
        content: '—';
        position: absolute;
        left: 0;
        color: var(--text-muted);
      }
    }
  `,
};

export default mixins;
