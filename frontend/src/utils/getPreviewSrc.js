const getPreviewSrc = (img) => {
  if (!img) return "";

  if (typeof img === "string") return img;

  if (img instanceof File || img instanceof Blob)
    return URL.createObjectURL(img);

  return "";
};

export default getPreviewSrc;
