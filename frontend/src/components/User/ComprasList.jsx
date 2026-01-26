import ComprasCard from "./ComprasCard";

const mockCompras = [];

const ComprasList = () => {
  if (mockCompras.length === 0) {
    return (
      <div className="border border-dashed rounded-xl p-10 text-center">
        <p className="text-lg font-medium">Aún no tienes compras</p>
        <p className="text-sm text-zinc-500 mt-2">
          Cuando realices una compra, aparecerá aquí
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mockCompras.map((compra) => (
        <ComprasCard key={compra._id} compra={compra} />
      ))}
    </div>
  );
};

export default ComprasList;
