import { useParams } from "react-router-dom";
import { useProducto } from "../../hooks/queries/useProducto.js";
import AdminNewProduct from "../../views/admin/AdminNewProduct.jsx";
import FullscreenLoader from "../../components/FullscreenLoader";

const ProductoEditar = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useProducto(id);

  if (isLoading)
    return <FullscreenLoader isVisible label="Cargando producto…" />;

  if (isError || !data)
    return <p className="text-red-400">Producto no encontrado</p>;

  return <AdminNewProduct initialData={data} isEdit />;
};

export default ProductoEditar;
