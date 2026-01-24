import ProductosTable from "../../components/Admin/ProductosTable";

const Productos = () => {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Productos</h1>
          <p className="text-sm text-zinc-400">
            Gestión del catálogo del e-commerce
          </p>
        </div>

        <button
          className="
            px-4 py-2 rounded-lg
            bg-indigo-600 hover:bg-indigo-500
            text-sm font-medium text-white
            transition
          "
        >
          + Nuevo producto
        </button>
      </header>

      <ProductosTable />
    </section>
  );
};

export default Productos;
