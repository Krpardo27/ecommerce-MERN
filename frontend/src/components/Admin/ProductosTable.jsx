import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2 } from "react-icons/fi";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useProductos } from "../../hooks/queries/useProductos";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductActions from "./ProductActions";
import { formatCLP } from "../../utils/formatPrice";

const CATEGORY_LABELS = {
  perifericos: "Periféricos",
  "componentes-pc": "Componentes PC",
  "audio-gamer": "Audio Gamer",
  "sillas-gamer": "Sillas Gamer",
  streaming: "Streaming",
};

const ProductosTable = () => {
  const { data = [], isLoading, isError } = useProductos();

  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  /* =========================
     COLUMNS
  ========================== */
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
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 32,
      },

      {
        id: "imagen",
        header: "",
        cell: ({ row }) => (
          <img
            src={row.original.imagen}
            alt={row.original.nombre}
            className="w-10 h-10 rounded-lg object-cover"
          />
        ),
        size: 48,
      },

      {
        accessorKey: "nombre",
        header: "Producto",
      },

      {
        accessorKey: "categoriaKey",
        header: "Categoría",
        cell: ({ getValue }) => CATEGORY_LABELS[getValue()] ?? "Sin categoría",
        filterFn: "equalsString",
      },

      {
        accessorKey: "precio",
        header: "Precio",
        cell: ({ getValue }) => formatCLP(getValue()),
      },

      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ getValue }) =>
          getValue() === 0 ? (
            <span className="text-red-400">Agotado</span>
          ) : (
            <span className="text-zinc-300">{getValue()}</span>
          ),
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

  /* =========================
     TABLE
  ========================== */
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnFilters,
      sorting,
    },
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedCount = table.getSelectedRowModel().rows.length;

  const categoriasUnicas = useMemo(
    () => [...new Set(data.map((p) => p.categoriaKey).filter(Boolean))],
    [data],
  );

  /* =========================
     STATES
  ========================== */
  if (isLoading)
    return <p className="text-zinc-400 text-sm">Cargando productos…</p>;

  if (isError)
    return <p className="text-red-400 text-sm">Error al cargar productos</p>;

  if (!data.length)
    return (
      <div className="text-center p-10 text-zinc-400">
        <p className="text-lg font-semibold text-white">
          Aún no tienes productos
        </p>
        <p className="text-sm mt-2">
          Crea tu primer producto para empezar a vender.
        </p>
      </div>
    );

  /* =========================
     RENDER
  ========================== */
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70">
      {/* ===== Filters ===== */}
      <div className="flex flex-wrap gap-3 p-4 border-b border-zinc-800">
        <input
          type="text"
          placeholder="Buscar producto…"
          value={table.getColumn("nombre")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("nombre")?.setFilterValue(e.target.value)
          }
          className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 w-full sm:w-[260px]"
        />

        <select
          value={table.getColumn("categoriaKey")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table
              .getColumn("categoriaKey")
              ?.setFilterValue(e.target.value || undefined)
          }
          className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-200"
        >
          <option value="">Todas las categorías</option>
          {categoriasUnicas.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat] ?? cat}
            </option>
          ))}
        </select>
      </div>

      {/* ===== Table ===== */}
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-400">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-medium cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
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
                className={`hover:bg-zinc-900/40 transition ${
                  row.getIsSelected() ? "bg-zinc-800/40" : ""
                }`}
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
      </div>

      {/* ===== Pagination ===== */}
      <div className="flex items-center justify-between p-4 text-sm text-zinc-400">
        <span>
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* ===== Bulk Actions ===== */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 flex gap-4 items-center"
          >
            <span className="text-sm text-white font-semibold">
              {selectedCount} seleccionados
            </span>

            <button
              onClick={() => table.resetRowSelection()}
              className="p-1 rounded-full hover:bg-zinc-800"
            >
              <FiX />
            </button>

            <button
              onClick={() => console.log(table.getSelectedRowModel().rows)}
              className="px-3 py-2 rounded-xl text-xs bg-zinc-800 text-zinc-200"
            >
              Exportar
            </button>

            <button
              onClick={() => alert("Eliminar productos")}
              className="px-3 py-2 rounded-xl text-xs bg-red-500/20 text-red-300"
            >
              <FiTrash2 />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductosTable;
