import { useForm } from "react-hook-form";

import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useToast } from "../../hooks/useToast";
import api from "../../config/axios";
import { useState } from "react";
import FullscreenLoader from "../../components/FullscreenLoader";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const [loggingIn, setLoggingIn] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const MIN_LOADING_TIME = 2500;

  const handleLogin = async (formData) => {
    setLoggingIn(true);

    try {
      const { data } = await api.post("/admin/login", formData);

      localStorage.setItem("ADMIN_TOKEN", data.token);

      showToast({
        title: "Acceso administrador",
        description: "Bienvenido al panel de administración",
        type: "success",
      });

      // ⏱️ tiempo mínimo de loader
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, MIN_LOADING_TIME);
    } catch (error) {
      setLoggingIn(false);

      if (isAxiosError(error)) {
        showToast({
          title: "Error de acceso",
          description:
            error.response?.data?.message || "Credenciales inválidas",
          type: "error",
        });
      } else {
        showToast({
          title: "Error",
          description: "Ocurrió un error inesperado",
          type: "error",
        });
      }
    }
  };

  return (
    <>
      <FullscreenLoader isVisible={loggingIn} label="Iniciando sesión…" />
      <div className="relative flex justify-center">
        <div className="pointer-events-none absolute inset-0 " />

        <div className="relative w-full max-w-md rounded-3xl border border-zinc-800/60 bg-zinc-950/90 p-8 shadow-2xl backdrop-blur">
          <header className="mb-8 text-center space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Acceso administrador
            </h1>
            <p className="text-sm text-zinc-400">
              Panel de gestión del ecommerce
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-wide text-zinc-400"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido",
                  },
                })}
                className="
              w-full rounded-xl px-4 py-3 mt-2
              bg-zinc-900 border border-zinc-800
              text-zinc-100 placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500/60
              focus:border-emerald-500
              transition
            "
                placeholder="admin@tudominio.cl"
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-xs font-medium uppercase tracking-wide text-zinc-400"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                className="
              w-full rounded-xl px-4 py-3 mt-2
              bg-zinc-900 border border-zinc-800
              text-zinc-100 placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500/60
              focus:border-emerald-500
              transition
            "
                placeholder="••••••••"
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loggingIn}
              className="
            mt-6 w-full rounded-xl py-3
            bg-emerald-500 text-zinc-950
            font-semibold
            hover:bg-emerald-400
            active:scale-[0.98]
            transition
            disabled:opacity-50
          "
            >
              {loggingIn ? "Ingresando…" : "Ingresar al panel"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-zinc-500">
            Acceso restringido · Solo personal autorizado
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
