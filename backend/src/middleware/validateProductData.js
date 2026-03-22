export const validateProductData = (data) => {
  const errors = [];

  if (!data.nombre || data.nombre.length < 3) {
    errors.push("Nombre inválido");
  }

  if (isNaN(data.precio)) {
    errors.push("Precio inválido");
  }

  if (data.features && !Array.isArray(data.features)) {
    errors.push("Features debe ser array");
  }

  if (data.specs && !Array.isArray(data.specs)) {
    errors.push("Specs debe ser array");
  }

  return errors;
};