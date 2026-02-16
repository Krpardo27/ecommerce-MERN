import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useToast } from "../hooks/useToast";
import api from "../config/axios.js";

const LoginView = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const { showToast } = useToast();

  const handleLogin = async (formData) => {
    try {
      const { data } = await api.post("/auth/login", formData);

      localStorage.setItem("ADMIN_TOKEN", data.token);

      // Decodificar token para ver role
      const payload = JSON.parse(atob(data.token.split(".")[1]));

      if (payload.role !== "admin") {
        showToast({
          title: "Acceso denegado",
          description: "No tienes permisos de administrador",
          type: "error",
        });
        return;
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        showToast({
          title: "Error login",
          description: error.response.data?.error || "Error inesperado",
          type: "error",
        });
      }
    }
  };

  return (
    <div className="relative space-y-8">
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-lime-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl" />

      <header className="relative space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Iniciar sesión</h1>
        <p className="text-zinc-400 text-sm">
          Accede a tu cuenta para continuar
        </p>
      </header>

      <form onSubmit={handleSubmit(handleLogin)} className="relative space-y-5">
        <div>
          <label htmlFor="email" className="text-sm text-zinc-300">
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
            className="mt-1 w-full px-4 py-3 rounded-xl
                       bg-zinc-950 border border-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="text-sm text-zinc-300">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            className="mt-1 w-full px-4 py-3 rounded-xl
                       bg-zinc-950 border border-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-lime-400 text-zinc-950 py-3 rounded-xl
                     font-semibold hover:bg-lime-300 transition
                     disabled:opacity-50"
        >
          Iniciar sesión
        </button>
      </form>

      {/* Footer */}
      <nav className="relative text-center">
        <Link
          to="/auth/register"
          className="text-lime-400 text-sm hover:underline"
        >
          ¿No tienes cuenta? Crear cuenta
        </Link>
      </nav>
    </div>
  );
};

export default LoginView;
