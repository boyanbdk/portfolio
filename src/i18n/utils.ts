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
