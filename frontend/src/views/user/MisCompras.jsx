import React from "react";
import ComprasHeader from "../../components/User/ComprasHeader";
import ComprasList from "../../components/User/ComprasList";

const MisCompras = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <ComprasHeader />
      <ComprasList />
    </section>
  );
};

export default MisCompras;
