import { ui, defaultLang, type Lang } from './ui';

/** Derive the active locale from the URL path (e.g. /bg/ → 'bg'). */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

/**
 * Returns a translator for `lang`. Falls back to the default locale for any
 * key missing in the target locale — so a half-translated BG page still renders.
 */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    const dict = ui[lang] as Record<string, string>;
    return dict[key] ?? ui[defaultLang][key];
  };
}

/** Prefix an internal path (or /#anchor) with the locale segment when needed. */
export function localizePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path === '/' ? '/' : path}`;
}

/** The equivalent of the current path in another locale (for the EN/BG switcher). */
export function switchLangPath(url: URL, target: Lang): string {
  const bare = url.pathname.replace(/^\/(bg)(?=\/|$)/, '') || '/';
  return target === defaultLang ? bare : `/${target}${bare === '/' ? '/' : bare}`;
}
