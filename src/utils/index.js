export function getRelativeUrl(url) {
  if (url === window.location.origin) {
    return '/';
  }      
  return url.substr(window.location.origin.length);
}

