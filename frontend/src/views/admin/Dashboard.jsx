import React from "react";
import StatCard from "../../components/Admin/StatCard";

const Dashboard = () => {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-400">
          Resumen general del e-commerce gamer
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Productos" value="—" />
        <StatCard label="Categorías" value="—" />
        <StatCard label="Estado" value="Activo" />
      </div>
    </section>
  );
};

export default Dashboard;
