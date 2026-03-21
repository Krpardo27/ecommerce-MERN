const CLOUD_NAME = "dy651pevq";

export const getOptimizedImage = (src, width = 600) => {
  if (!src) return "";

  if (src.includes("/upload/")) {
    const parts = src.split("/upload/");
    return `${parts[0]}/upload/f_auto,q_auto,w_${width}/${parts[1]}`;
  }

  return `https://res.cloudinary.com/dy651pevq/image/upload/f_auto,q_auto,w_${width}/${src}`;
};
