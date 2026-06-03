/**
 * Single source for color-mode resolution (SSR script, client entry, React context).
 */

export const THEME_STORAGE_KEY = 'theme';

export const resolveTheme = storedPreference => {
  if (storedPreference === 'light' || storedPreference === 'dark') {
    return storedPreference;
  }

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark';
};

export const getPreferredTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  try {
    return resolveTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return 'dark';
  }
};

/** Minified script injected in gatsby-ssr to prevent theme flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}else if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;
