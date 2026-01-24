import { FiEdit, FiTrash } from "react-icons/fi";

const ProductActions = ({ product }) => {
  return (
    <div className="flex gap-2">
      <button
        title="Editar"
        className="p-1 rounded hover:bg-zinc-800 text-zinc-400"
      >
        <FiEdit />
      </button>
      <button
        title="Eliminar"
        className="p-1 rounded hover:bg-red-500/10 text-red-400"
      >
        <FiTrash />
      </button>
    </div>
  );
};

export default ProductActions;
