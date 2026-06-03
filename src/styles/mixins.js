import { css } from 'styled-components';

const lightButtonHover = css`
  [data-theme='light'] & {
    border-color: #0a192f;
    color: #0a192f;

    &:hover,
    &:focus,
    &:active {
      background-color: #0a192f;
      color: #ffffff;
    }
  }
`;

const button = css`
  color: var(--accent);
  background-color: transparent;
  border: 1px solid var(--accent);
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.25rem 1.75rem;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--secondary-soft);
    outline: none;
  }
  &:after {
    display: none !important;
  }

  ${lightButtonHover};
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
      color: var(--accent);
      outline: 0;
    }

    [data-theme='light'] &:hover,
    [data-theme='light'] &:active,
    [data-theme='light'] &:focus {
      color: #0a192f;
    }
  `,

  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: var(--transition);
    cursor: pointer;
    color: var(--accent);
    &:hover,
    &:focus,
    &:active {
      color: var(--accent);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--secondary) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--accent);
      transition: var(--transition);
      opacity: 0.5;
    }

    [data-theme='light'] & {
      color: #0a192f;

      &:after {
        background-color: #0a192f;
      }
    }
  `,

  button,

  smallButton: css`
    color: var(--accent);
    background-color: transparent;
    border: 1px solid var(--brand);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--secondary-soft);
    }
    &:after {
      display: none !important;
    }

    ${lightButtonHover};
  `,

  bigButton: css`
    color: var(--accent);
    background-color: transparent;
    border: 1px solid var(--brand);
    border-radius: var(--border-radius);
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--secondary-soft);
    }
    &:after {
      display: none !important;
    }

    ${lightButtonHover};
  `,

  fillButton: css`
    display: inline-block;
    padding: 10px 16px;
    border: none;
    border-radius: var(--border-radius);
    background-color: #64ffda;
    color: #0a192f;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus,
    &:active {
      background-color: #64ffda;
      color: #0a192f;
      filter: brightness(0.92);
      outline: 0;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--shadow);
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 20px 30px -15px var(--shadow);
    }
  `,

  fancyList: css`
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
        color: var(--accent);
      }
    }
  `,
};

export default mixins;
