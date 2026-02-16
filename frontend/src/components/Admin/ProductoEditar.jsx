import { useParams } from "react-router-dom";
import { useProducto } from "../../hooks/queries/useProducto.js";
import ProductoNuevo from "../../views/admin/ProductoNuevo.jsx";
import FullscreenLoader from "../../components/FullscreenLoader";

const ProductoEditar = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useProducto(id);

  if (isLoading)
    return <FullscreenLoader isVisible label="Cargando producto…" />;

  if (isError || !data)
    return <p className="text-red-400">Producto no encontrado</p>;

  return <ProductoNuevo initialData={data} isEdit />;
};

export default ProductoEditar;
