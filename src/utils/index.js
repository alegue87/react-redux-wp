export function getRelativeUrl(url) {
  if(url.indexOf('page_id')> 0){
    const id = url.split('=')[1]
    return `/page_id/${id}`
  }
  if (url === window.location.origin) {
    return '/';
  }      
  return url.substr(window.location.origin.length);
}

