import { Link, useSearchParams } from "react-router-dom";

const Breadcrumbs = () => {
  const [params] = useSearchParams();

  const categoria = params.get("categoria");
  const search = params.get("search");
  const page = params.get("page");

  return (
    <nav className="text-md text-zinc-400 flex flex-wrap gap-1 my-4">
      <Link to="/" className="hover:text-zinc-200">
        Inicio
      </Link>
      <span>/</span>

      <Link to="/categorias" className="hover:text-zinc-200">
        Categorías
      </Link>

      {categoria && (
        <>
          <span>/</span>
          <span className="text-zinc-200 capitalize">{categoria}</span>
        </>
      )}

      {search && (
        <>
          <span>/</span>
          <span className="text-zinc-200">Búsqueda “{search}”</span>
        </>
      )}

      {page && page > 1 && (
        <>
          <span>/</span>
          <span className="text-zinc-500">Página {page}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
