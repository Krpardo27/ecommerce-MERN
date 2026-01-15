export const getOptimizedImage = (url, width = 600) => {
  if (!url) return "";

  // Pexels / Unsplash / similares
  if (url.includes("pexels.com") || url.includes("unsplash.com")) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}`;
  }

  // Fallback (local o futura CDN)
  return url;
};
