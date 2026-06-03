import { getPreferredTheme } from '@lib/theme';

export const onClientEntry = () => {
  document.documentElement.setAttribute('data-theme', getPreferredTheme());
};
