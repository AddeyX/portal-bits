import { asset, resolve } from '$app/paths';

/** Pathname without the GitHub Pages base, so gallery checks stay `/components`. */
export function galleryPath(pathname: string) {
  const root = resolve('/');
  const prefix = root.length > 1 && root.endsWith('/') ? root.slice(0, -1) : root;
  if (prefix === '/' || prefix === '') return pathname;
  if (pathname === prefix || pathname === `${prefix}/`) return '/';
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}

/** Prefix a gallery route with the Pages base. Local dev and local builds stay at `/`. */
export function galleryHref(path: string) {
  return resolve(path as '/');
}

/** Prefix a file in `static/` with the Pages base. */
export function galleryAsset(file: string) {
  return asset(file as '/favicon.svg');
}

/**
 * Turn a base-free result such as `/get-started#installation` into a link. The route gets the
 * Pages base. The fragment follows it. Only an id from the search index reaches this function.
 */
export function galleryDestination(href: string) {
  const at = href.indexOf('#');
  if (at < 0) return galleryHref(href);
  return `${galleryHref(href.slice(0, at))}${href.slice(at)}`;
}
