import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSave, FiX } from "react-icons/fi";

import { useAddProduct } from "../../hooks/mutations/useAddProduct";
import { categories } from "../../data/categories";
import { useEffect } from "react";

const NuevoProducto = () => {
  const navigate = useNavigate();
  const addProduct = useAddProduct();

  const [imagenes, setImagenes] = useState([]);
  const [imageError, setImageError] = useState("");

  const [subcategorias, setSubcategorias] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      precio: "",
      precioOferta: "",
      stock: 50,
      sku: "",
      marca: "",
      tags: "",
      descripcion: "",
      categoriaKey: "",
      subcategoriaKey: "",
      activo: true,
      destacado: false,
    },
  });

  const categoriaSeleccionada = watch("categoriaKey");

  useEffect(() => {
    const categoria = categories.find(
      (cat) => cat.key === categoriaSeleccionada,
    );

    setSubcategorias(categoria?.subcategorias || []);
    setValue("subcategoriaKey", ""); // 👈 CLAVE
  }, [categoriaSeleccionada, setValue]);

  /* ===================== SUBMIT ===================== */
  const onSubmit = async (formData) => {
    if (imagenes.length < 1 || imagenes.length > 4) {
      setImageError("Debes agregar entre 1 y 4 imágenes");
      return;
    }

    try {
      await addProduct.mutateAsync({
        data: {
          nombre: formData.nombre.trim(),
          precio: Number(formData.precio),
          precioOferta: formData.precioOferta
            ? Number(formData.precioOferta)
            : undefined,
          stock: Number(formData.stock),
          sku: formData.sku || undefined,
          marca: formData.marca || undefined,
          tags: formData.tags
            ? formData.tags.split(",").map((t) => t.trim())
            : [],
          descripcion: formData.descripcion,
          categoriaKey: formData.categoriaKey,
          subcategoriaKey: formData.subcategoriaKey,
          activo: formData.activo,
          destacado: formData.destacado,
        },
        imagenes,
      });

      navigate("/admin/productos");
    } catch (error) {
      console.error("❌ Error creando producto:", error);
    }
  };

  useEffect(() => {
    return () => {
      imagenes.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [imagenes]);

  return (
    <section className="max-w-4xl space-y-6">
      {/* ===================== HEADER ===================== */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Nuevo producto</h1>
          <p className="text-sm text-zinc-400">
            Crear un producto para el catálogo
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/productos")}
          className="
            inline-flex items-center gap-2
            px-3 py-2 rounded-lg
            border border-zinc-800
            text-zinc-300
            hover:bg-zinc-900 hover:text-white
            transition
          "
        >
          <FiArrowLeft />
          Volver
        </button>
      </header>

      {/* ===================== FORM ===================== */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          bg-zinc-900
          border border-zinc-800
          rounded-2xl
          p-6
          space-y-5
        "
      >
        {/* ===== NOMBRE ===== */}
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Nombre del producto *
          </label>
          <input
            {...register("nombre", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 3,
                message: "Debe tener al menos 3 caracteres",
              },
            })}
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
          />
          {errors.nombre && (
            <p className="text-xs text-red-400 mt-1">{errors.nombre.message}</p>
          )}
        </div>

        {/* ===== PRECIO ===== */}
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Precio *</label>
          <input
            type="number"
            {...register("precio", {
              required: "El precio es obligatorio",
              min: {
                value: 0,
                message: "El precio no puede ser negativo",
              },
            })}
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
          />
          {errors.precio && (
            <p className="text-xs text-red-400 mt-1">{errors.precio.message}</p>
          )}
        </div>

        {/* ===== DESCRIPCIÓN ===== */}
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Descripción
          </label>
          <textarea
            rows={4}
            {...register("descripcion")}
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 resize-none"
          />
        </div>

        {/* ===== CATEGORÍA ===== */}
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Categoría *
          </label>
          <select
            {...register("categoriaKey", {
              required: "La categoría es obligatoria",
            })}
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.nombre}
              </option>
            ))}
          </select>
          {errors.categoriaKey && (
            <p className="text-xs text-red-400 mt-1">
              {errors.categoriaKey.message}
            </p>
          )}
        </div>

        {subcategorias.length > 0 && (
          <div>
            <label className="block text-sm text-zinc-300 mb-1">
              Subcategoría *
            </label>
            <select
              {...register("subcategoriaKey", {
                required: "La subcategoría es obligatoria",
              })}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
            >
              <option value="">Selecciona una subcategoría</option>
              {subcategorias.map((sub) => (
                <option key={sub.key} value={sub.key}>
                  {sub.nombre}
                </option>
              ))}
            </select>

            {errors.subcategoriaKey && (
              <p className="text-xs text-red-400 mt-1">
                {errors.subcategoriaKey.message}
              </p>
            )}
          </div>
        )}

        {/* ===== IMÁGENES ===== */}
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Imágenes del producto (1 a 4)
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);

              if (files.length + imagenes.length > 4) {
                setImageError("Máximo 4 imágenes");
                return;
              }

              setImagenes((prev) => [...prev, ...files]);
              setImageError("");
            }}
          />

          {imageError && (
            <p className="text-xs text-red-400 mt-1">{imageError}</p>
          )}

          {/* PREVIEW */}
          {imagenes.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              {imagenes.map((file, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImagenes((prev) => prev.filter((_, i) => i !== idx))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Stock inicial *
          </label>
          <input
            type="number"
            {...register("stock", {
              required: "El stock es obligatorio",
              min: { value: 0, message: "No puede ser negativo" },
            })}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-300 mb-1">SKU</label>
          <input {...register("sku")} className="input" />
        </div>

        <div>
          <label className="block text-sm text-zinc-300 mb-1">Marca</label>
          <input {...register("marca")} className="input" />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Precio oferta
          </label>
          <input
            type="number"
            {...register("precioOferta", {
              validate: (value) =>
                !value ||
                Number(value) < Number(watch("precio")) ||
                "Debe ser menor al precio normal",
            })}
            className="input"
          />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" {...register("destacado")} />
          <span className="text-sm text-zinc-300">Producto destacado</span>
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">
            Tags (separados por coma)
          </label>
          <input
            {...register("tags")}
            placeholder="ram, gaming, corsair"
            className="input"
          />
        </div>

        {/* ===== ACTIVO ===== */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("activo")}
            className="accent-indigo-600"
          />
          <span className="text-sm text-zinc-300">Producto activo</span>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/productos")}
            className="px-4 py-2 text-zinc-400 hover:text-white"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={addProduct.isPending}
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-lg
              bg-indigo-600 hover:bg-indigo-500
              text-white text-sm font-medium
              disabled:opacity-50
            "
          >
            <FiSave />
            Crear producto
          </button>
        </div>
      </form>
    </section>
  );
};

export default NuevoProducto;
