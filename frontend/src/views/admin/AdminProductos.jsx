import ProductosTable from "../../components/Admin/ProductosTable";

const AdminProductos = () => {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Productos</h1>
          <p className="text-sm text-zinc-400">
            Gestión del catálogo del e-commerce
          </p>
        </div>
      </header>

      <ProductosTable />
    </section>
  );
};

export default AdminProductos;
