const CLOUD_NAME = "dy651pevq";

export const getOptimizedImage = (src, width = 600) => {
  if (!src) return "";

  if (src.startsWith("http")) {
    return src;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${src}`;
};
