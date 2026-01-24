import React from "react";

const StatCard = ({
  label,
  value,
  icon: Icon,
  trend, // { value: +12, label: "% vs mes anterior" }
  loading = false,
}) => {
  return (
    <div
      className="
        rounded-xl
        bg-zinc-900/70
        border border-zinc-800
        p-5
        flex flex-col gap-3
        hover:border-zinc-700
        transition
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-400">{label}</span>
        {Icon && <Icon className="w-5 h-5 text-zinc-500" />}
      </div>

      <div className="text-2xl font-semibold text-white">
        {loading ? (
          <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
        ) : (
          value
        )}
      </div>

      {trend && !loading && (
        <span
          className={`text-xs ${
            trend.value >= 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {trend.value >= 0 ? "▲" : "▼"} {Math.abs(trend.value)}
          {trend.label && ` ${trend.label}`}
        </span>
      )}
    </div>
  );
};

export default StatCard;
