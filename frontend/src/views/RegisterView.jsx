import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useToast } from "../hooks/useToast";
import api from "../config/axios";

const RegisterView = () => {
  const { showToast } = useToast();

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      isAdmin: false,
    },
  });

  const password = watch("password");

  const handleRegister = async (formData) => {
    try {
      const endpoint = formData.isAdmin
        ? "/auth/register-admin"
        : "/auth/register";

      await api.post(endpoint, formData);

      showToast({
        title: "Registro exitoso",
        description: "Cuenta creada correctamente",
        type: "success",
        autoNavigateTo: "/auth/login",
      });

      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        showToast({
          title: "Error al registrar",
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
        <h1 className="text-3xl font-bold tracking-tight">Crear cuenta</h1>
      </header>

      <form
        method="POST"
        onSubmit={handleSubmit(handleRegister)}
        className="relative space-y-5"
      >
        <div>
          <label htmlFor="name" className="text-sm text-zinc-300">
            Nombre
          </label>
          <input
            id="name"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres",
              },
            })}
            className="mt-1 w-full px-4 py-3 rounded-xl
                       bg-zinc-950 border border-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* Email */}
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
              minLength: {
                value: 8,
                message: "Mínimo 8 caracteres",
              },
            })}
            className="mt-1 w-full px-4 py-3 rounded-xl
                       bg-zinc-950 border border-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label
            htmlFor="password_confirmation"
            className="text-sm text-zinc-300"
          >
            Confirmar contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            {...register("password_confirmation", {
              required: "La confirmación de la contraseña es obligatoria",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
              minLength: {
                value: 8,
                message: "Mínimo 8 caracteres",
              },
            })}
            className="mt-1 w-full px-4 py-3 rounded-xl
                       bg-zinc-950 border border-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-lime-400 text-zinc-950 py-3 rounded-xl
                     font-semibold hover:bg-lime-300 transition
                     disabled:opacity-50"
        >
          Crear cuenta
        </button>
      </form>

      {/* Footer */}
      <nav className="relative text-center">
        <Link
          to="/auth/login"
          className="text-lime-400 text-sm hover:underline"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </nav>
    </div>
  );
};

export default RegisterView;
