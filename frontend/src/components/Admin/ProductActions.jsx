import { FiEdit, FiTrash, FiCopy } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
// import { useDeleteProduct } from "../../hooks/mutations/useDeleteProduct";

const ProductActions = ({ product }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  // const deleteProduct = useDeleteProduct();

  const handleDuplicate = () => {
    navigate(`/admin/productos/nuevo?duplicate=${product._id}`);
  };

  const handleEdit = () => {
    navigate(`/admin/productos/${product._id}/editar`);
  };

  // const handleDelete = async () => {
  //   const ok = confirm(`¿Seguro que quieres eliminar "${product.nombre}"?`);

  //   if (!ok) return;

  //   try {
  //     await deleteProduct.mutateAsync(product._id);

  //     showToast({
  //       title: "Producto eliminado",
  //       description: `"${product.nombre}" fue eliminado`,
  //       type: "success",
  //     });
  //   } catch (err) {
  //     showToast({
  //       title: "Error al eliminar",
  //       description: err.message || "Error inesperado",
  //       type: "error",
  //     });
  //   }
  // };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleEdit}
        title="Editar"
        className="p-1 rounded hover:bg-zinc-800 text-zinc-400 transition"
      >
        <FiEdit />
      </button>

      <button
        onClick={handleDuplicate}
        title="Duplicar"
        className="p-1 rounded hover:bg-indigo-500/10 text-indigo-400 transition"
      >
        <FiCopy />
      </button>

      <button
        // onClick={handleDelete}
        title="Eliminar"
        className="p-1 rounded hover:bg-red-500/10 text-red-400 transition"
      >
        <FiTrash />
      </button>
    </div>
  );
};

export default ProductActions;
