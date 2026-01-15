import { FiSearch, FiX } from "react-icons/fi";

const ProductsControls = ({
  search,
  limit,
  total,
  visibles,
  onSearch,
  onLimit,
}) => {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="relative w-full md:max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar productos…"
          className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 pl-10 pr-10 py-2.5 text-sm text-zinc-100"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <FiX />
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-zinc-400">
        <span>
          Mostrando <strong>{visibles}</strong> de <strong>{total}</strong>
        </span>

        <select
          value={limit}
          onChange={(e) => onLimit(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100"
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
          <option value="all">Todos</option>
        </select>
      </div>
    </section>
  );
};

export default ProductsControls;
