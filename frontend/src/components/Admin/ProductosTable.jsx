import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2 } from "react-icons/fi";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useProductos } from "../../hooks/queries/useProductos";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductActions from "./ProductActions";

console.log("BACKEND:", import.meta.env.VITE_BACKEND_URL);

const ProductosTable = () => {
  const { data = [], isLoading, isError } = useProductos();
  console.log("PRODUCTOS QUERY:", data);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            ref={(el) => {
              if (!el) return;
              el.indeterminate = table.getIsSomePageRowsSelected();
            }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 32,
      },

      {
        accessorKey: "nombre",
        header: "Producto",
      },
      {
        accessorKey: "categoriaKey",
        header: "Categoría",
        cell: ({ getValue }) => {
          const map = {
            perifericos: "Periféricos",
            "componentes-pc": "Componentes PC",
            "audio-gamer": "Audio Gamer",
            "sillas-gamer": "Sillas Gamer",
            streaming: "Streaming",
          };

          return map[getValue()] ?? "Sin categoría";
        },
        filterFn: "equalsString",
      },
      {
        accessorKey: "precio",
        header: "Precio",
        cell: ({ getValue }) => `$${Number(getValue() || 0).toLocaleString()}`,
      },
      {
        id: "estado",
        header: "Estado",
        cell: ({ row }) => <ProductStatusBadge product={row.original} />,
      },
      {
        id: "acciones",
        header: "",
        cell: ({ row }) => <ProductActions product={row.original} />,
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const categoriasUnicas = useMemo(() => {
    return [...new Set(safeData.map((p) => p?.categoriaKey).filter(Boolean))];
  }, [safeData]);

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const CATEGORY_LABELS = {
    perifericos: "Periféricos",
    "componentes-pc": "Componentes PC",
    "audio-gamer": "Audio Gamer",
    "sillas-gamer": "Sillas Gamer",
    streaming: "Streaming",
  };

  if (isLoading) {
    return <div className="text-zinc-400 text-sm">Cargando productos…</div>;
  }

  if (isError) {
    return (
      <div className="text-red-400 text-sm">Error al cargar productos</div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-zinc-400 text-sm">No hay productos registrados</div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="flex items-center gap-4 p-4 border-b border-zinc-800">
        <select
          value={table.getColumn("categoriaKey")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table
              .getColumn("categoriaKey")
              ?.setFilterValue(e.target.value || undefined)
          }
          className="
            px-3 py-2
            rounded-lg
            bg-zinc-900
            border border-zinc-800
            text-sm text-zinc-200
          "
        >
          <option value="">Todas las categorías</option>

          {categoriasUnicas.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat] ?? cat}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Tabla */}
      <table className="w-full text-sm">
        <thead className="bg-zinc-900 text-zinc-400">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 text-left font-medium">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-zinc-800">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`
    hover:bg-zinc-900/40
    transition
    ${row.getIsSelected() ? "bg-zinc-800/40" : ""}
  `}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
        fixed bottom-5 left-1/2 -translate-x-1/2 z-50
        bg-zinc-900 text-zinc-400 backdrop-blur-xl
        border border-zinc-800
        shadow-2xl
        rounded-2xl
        w-[95vw] max-w-4xl
        px-4 py-3
        flex flex-col sm:flex-row sm:items-center
        gap-4 sm:gap-6
      "
          >
            {/* ===== INFO ===== */}
            <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
              <span className="text-sm font-bold text-white">
                {selectedCount} producto{selectedCount !== 1 && "s"}{" "}
                seleccionado
                {selectedCount !== 1 && "s"}
              </span>

              <button
                onClick={() => table.resetRowSelection()}
                className="p-1 rounded-full hover:bg-gray-100"
                title="Cancelar selección"
              >
                <FiX />
              </button>
            </div>

            <div className="hidden sm:block h-6 w-px bg-gray-300" />

            {/* ===== ACTIONS ===== */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => console.log(selectedRows)}
                className="
            px-3 py-2 rounded-xl text-xs font-semibold
            flex items-center justify-center gap-2
            bg-gray-100 text-gray-700 hover:bg-gray-200
            transition
          "
              >
                Exportar
              </button>

              <button
                onClick={() => alert("Eliminar productos")}
                className="
            px-3 py-2 rounded-xl text-xs font-semibold
            flex items-center justify-center gap-2
            bg-red-100 text-red-700 hover:bg-red-200
            transition
          "
              >
                <FiTrash2 />
                Eliminar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductosTable;
