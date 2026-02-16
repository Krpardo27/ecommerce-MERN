import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ErrorMessage from "../../components/ErrorMessage";
import FullscreenLoader from "../../components/FullscreenLoader";
import { useToast } from "../../hooks/useToast";
import api from "../../config/axios";
import { useQueryClient } from "@tanstack/react-query";

const AdminLogin = () => {
  const queryClient = useQueryClient();

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

  const MIN_LOADING_TIME = 1200;

  const handleLogin = async (formData) => {
    setLoggingIn(true);

    try {
      const { data } = await api.post("/auth/login", formData);

      const token = data.token;
      if (!token) throw new Error("Token no recibido");

      localStorage.setItem("AUTH_TOKEN", token);

      const me = await api.get("/auth/me");
      console.log("ME RESPONSE:", me.data);

      if (me.data.user.role !== "admin") {
        localStorage.removeItem("AUTH_TOKEN");

        showToast({
          title: "Acceso denegado",
          description: "Tu cuenta no tiene permisos de administrador",
          type: "error",
        });

        setLoggingIn(false);
        return;
      }

      showToast({
        title: "Acceso administrador",
        description: "Bienvenido al panel",
        type: "success",
      });

      await queryClient.invalidateQueries(["auth", "me"]);
      sessionStorage.setItem("ADMIN_JUST_LOGGED_IN", "1");
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      setLoggingIn(false);

      if (isAxiosError(error)) {
        showToast({
          title: "Error de acceso",
          description:
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Credenciales inválidas",
          type: "error",
        });
      } else {
        showToast({
          title: "Error",
          description: error.message || "Ocurrió un error inesperado",
          type: "error",
        });
      }
    }
  };

  return (
    <>
      <FullscreenLoader isVisible={loggingIn} label="Iniciando sesión…" />

      <div className="relative flex justify-center">
        <div className="relative w-full max-w-md rounded-3xl border border-zinc-800/60 bg-zinc-950/90 p-8 shadow-2xl backdrop-blur">
          <header className="mb-8 text-center space-y-2">
            <h1 className="text-3xl font-semibold text-white">
              Acceso administrador
            </h1>
            <p className="text-sm text-zinc-400">
              Panel de gestión del ecommerce
            </p>
          </header>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-xs e">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email obligatorio" })}
                className="w-full mt-2 p-3 rounded-xl bg-zinc-900 border text-slate-300"
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-zinc-400">Contraseña</label>
              <input
                type="password"
                {...register("password", { required: "Password obligatorio" })}
                className="w-full mt-2 p-3 rounded-xl bg-zinc-900 border text-slate-300"
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            <button
              disabled={loggingIn}
              className="w-full py-3 rounded-xl bg-emerald-500 font-semibold text-zinc-950 hover:bg-emerald-400"
            >
              {loggingIn ? "Ingresando…" : "Ingresar al panel"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-500">
            Acceso restringido · Solo personal autorizado
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
