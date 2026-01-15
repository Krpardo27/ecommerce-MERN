import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Paginator = ({ page, totalPages, onPageChange, className = "" }) => {
  if (totalPages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div
      className={`flex items-center justify-center gap-2 text-sm ${className}`}
    >
      <button
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
        className="
          flex items-center gap-1 px-3 py-2 rounded-lg
          border border-zinc-800
          bg-zinc-900 text-zinc-200
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-zinc-800
        "
      >
        <FiChevronLeft />
        Anterior
      </button>

      <span className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-100">
        {page} / {totalPages}
      </span>

      <button
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
        className="
          flex items-center gap-1 px-3 py-2 rounded-lg
          border border-zinc-800
          bg-zinc-900 text-zinc-200
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-zinc-800
        "
      >
        Siguiente
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Paginator;
