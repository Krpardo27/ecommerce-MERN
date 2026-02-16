import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiSave, FiStar, FiX } from "react-icons/fi";
import { useAddProduct } from "../../hooks/mutations/useAddProduct";
import { categories } from "../../data/categories";
import { useToast } from "../../hooks/useToast";
import { useEffect } from "react";
import { formatCLP } from "../../utils/formatPrice";
import FullscreenLoader from "../../components/FullscreenLoader";
import { useProducto } from "../../hooks/queries/useProducto";
import { useUpdateProduct } from "../../hooks/mutations/useUpdateProduct";
import getPreviewSrc from "../../utils/getPreviewSrc";

const ProductoNuevo = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  const addProduct = useAddProduct();

  const [params] = useSearchParams();
  const duplicateId = params.get("duplicate");

  const { data: productoDuplicado } = useProducto(duplicateId, {
    enabled: !!duplicateId,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
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

  useEffect(() => {
    if (!initialData) return;

    console.log("📦 cargando producto:", initialData);

    reset({
      nombre: initialData.nombre ?? "",
      precio: initialData.precio ?? "",
      precioOferta: initialData.precioOferta ?? "",
      stock: initialData.stock ?? 50,
      sku: initialData.sku ?? "",
      marca: initialData.marca ?? "",
      tags: initialData.tags?.join(", ") ?? "",
      descripcion: initialData.descripcion ?? "",
      categoriaKey: initialData.categoriaKey ?? "",
      subcategoriaKey: initialData.subcategoriaKey ?? "",
      activo: initialData.activo ?? true,
      destacado: initialData.destacado ?? false,
    });

    if (initialData.imagenes?.length) {
      setImagenes(initialData.imagenes);
    }
  }, [initialData, reset]);

  const updateProduct = useUpdateProduct();

  const { showToast } = useToast();

  const [creating, setCreating] = useState(false);

  const [imagenes, setImagenes] = useState([]);
  const [imageError, setImageError] = useState("");

  const [subcategorias, setSubcategorias] = useState([]);

  const [descuentoManual, setDescuentoManual] = useState("");

  const categoriaSeleccionada = watch("categoriaKey");

  const precio = Number(watch("precio") || 0);
  const precioOferta = Number(watch("precioOferta") || 0);

  const descuento =
    precio > 0 && precioOferta > 0 && precioOferta < precio
      ? Math.round(100 - (precioOferta / precio) * 100)
      : null;

  useEffect(() => {
    const categoria = categories.find(
      (cat) => cat.key === categoriaSeleccionada,
    );

    setSubcategorias(categoria?.subcategorias || []);
    setValue("subcategoriaKey", ""); // 👈 CLAVE
  }, [categoriaSeleccionada, setValue]);

  const onSubmit = async (formData) => {
    const isDuplicating = !!duplicateId;

    if (imagenes.length < 1 || imagenes.length > 4) {
      setImageError("Debes agregar entre 1 y 4 imágenes");
      return;
    }

    setCreating(true);

    showToast({
      title: isEdit ? "Actualizando producto…" : "Creando producto…",
      description: "Subiendo imágenes y guardando información",
      type: "loading",
    });

    try {
      if (isEdit) {
        await updateProduct.mutateAsync({
          id: initialData._id,
          data: {
            ...formData,
            precio: Number(formData.precio),
            precioOferta: formData.precioOferta
              ? Number(formData.precioOferta)
              : undefined,
            stock: Number(formData.stock),
          },
          imagenes,
        });

        showToast({ title: "Producto actualizado", type: "success" });
        return;
      }

      // CREATE
      const nuevoProducto = await addProduct.mutateAsync({
        data: {
          ...formData,
          nombre: formData.nombre.trim(),
          precio: Number(formData.precio),
          precioOferta: formData.precioOferta
            ? Number(formData.precioOferta)
            : undefined,
          stock: Number(formData.stock),
          tags: formData.tags
            ? formData.tags.split(",").map((t) => t.trim())
            : [],
        },
        imagenes,
      });

      showToast({
        title: isDuplicating ? "Producto duplicado" : "Producto creado",
        type: "success",
      });

      navigate("/admin/productos");
    } catch (error) {
      showToast({
        title: "Error",
        description: error.response?.data?.message || "Error inesperado",
        type: "error",
      });
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (!initialData) return;

    Object.entries(initialData).forEach(([k, v]) => {
      if (["_id", "imagenes", "createdAt", "updatedAt"].includes(k)) return;
      setValue(k, v);
    });
  }, [initialData]);

  useEffect(() => {
    return () => {
      imagenes.forEach((img) => {
        if (img instanceof File || img instanceof Blob) {
          URL.revokeObjectURL(img);
        }
      });
    };
  }, [imagenes]);

  useEffect(() => {
    const precio = Number(watch("precio"));

    if (!precio || !descuentoManual) return;

    const porcentaje = Number(descuentoManual);

    if (porcentaje <= 0 || porcentaje >= 100) return;

    const nuevoPrecioOferta = Math.round(precio - (precio * porcentaje) / 100);

    setValue("precioOferta", nuevoPrecioOferta);
  }, [descuentoManual, watch("precio")]);

  useEffect(() => {
    if (!productoDuplicado) return;

    const clean = {
      ...productoDuplicado,
      nombre: productoDuplicado.nombre + " copia",
      sku: "",
      stock: productoDuplicado.stock ?? 50,
    };

    Object.entries(clean).forEach(([k, v]) => {
      if (["_id", "imagenes", "createdAt", "updatedAt"].includes(k)) return;
      setValue(k, v);
    });

    setImagenes([]); // opcional
  }, [productoDuplicado, setValue]);

  return (
    <>
      <FullscreenLoader isVisible={creating} label="Creando producto…" />

      <header className="flex items-center justify-between">
        <div className="flex flex-col py-6">
          <h1 className="text-2xl font-semibold text-white">
            {isEdit ? "Editar producto" : "Nuevo producto"}
          </h1>
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

      <section className="container mx-auto space-y-6 py-6 flex lg:flex-row flex-col gap-10">
        <div className="flex-2/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ===================== MAIN ===================== */}
              <div className="space-y-5">
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
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 "
                  />
                  {errors.nombre && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                {/* ===== DESCRIPCIÓN ===== */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">
                    Descripción
                  </label>
                  <textarea
                    rows={5}
                    {...register("descripcion")}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 resize-none"
                  />
                </div>

                {/* ===== IMÁGENES ===== */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">
                    Imágenes del producto (1 a 4)
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
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

                  {imagenes.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                      {imagenes.map((file, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={getPreviewSrc(file)}
                            className="h-24 w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setImagenes((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                            className="absolute top-1 right-1 text-xs bg-black/60 rounded-full px-1"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ===== CATEGORÍAS ===== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Categoría *</label>
                    <select
                      {...register("categoriaKey")}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((cat) => (
                        <option key={cat.key} value={cat.key}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  {subcategorias.length > 0 && (
                    <div>
                      <label className="label">Subcategoría *</label>
                      <select
                        {...register("subcategoriaKey")}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                      >
                        <option value="">Selecciona una subcategoría</option>
                        {subcategorias.map((sub) => (
                          <option key={sub.key} value={sub.key}>
                            {sub.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* ===== TAGS ===== */}
                <div>
                  <label className="label">Tags</label>
                  <input
                    {...register("tags")}
                    placeholder="ram, gaming, corsair"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                  />
                </div>
              </div>

              {/* ===================== SIDEBAR ===================== */}
              <section className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-4 sticky top-24 h-fit">
                <hr className="border-zinc-800" />

                {/* INVENTARIO */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 block">
                    Inventario
                  </label>

                  <div className="flex w-max gap-3">
                    <input
                      type="number"
                      {...register("stock")}
                      placeholder="Stock"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                    />
                  </div>
                </div>

                <hr className="border-zinc-800" />

                {/* PRECIOS */}
                <div className="space-y-3">
                  <label className="text-xs font-medium text-zinc-400 block">
                    Precios
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="number"
                      {...register("precio")}
                      placeholder="Precio normal"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                    />

                    <input
                      type="number"
                      {...register("precioOferta")}
                      placeholder="Precio oferta"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                    />
                  </div>

                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={descuentoManual}
                    onChange={(e) => setDescuentoManual(e.target.value)}
                    placeholder="Descuento (%)"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                  />

                  {descuentoManual && (
                    <p className="text-[11px] text-zinc-500">
                      Precio final con {descuentoManual}% de descuento
                    </p>
                  )}
                </div>

                <hr className="border-zinc-800" />

                {/* IDENTIFICACIÓN */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 block">
                    Identificación
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      {...register("marca")}
                      placeholder="Marca"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                    />

                    <input
                      {...register("sku")}
                      placeholder="SKU"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                    />
                  </div>
                </div>

                {/* ESTADO */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 block">
                    Estado
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" {...register("activo")} />
                      Activo
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" {...register("destacado")} />
                      Destacado
                    </label>
                  </div>
                </div>
              </section>
            </div>

            {/* ACTIONS */}
            <div
              className="
    sticky bottom-0 z-30
    -mx-6 mt-8 px-6 py-4
    bg-zinc-950/80 backdrop-blur
    border-t border-zinc-800
    flex items-center justify-between
    gap-3
  "
            >
              {/* INFO IZQUIERDA */}
              <span className="hidden sm:block text-xs text-zinc-400">
                Los cambios no se guardarán automáticamente
              </span>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => navigate("/admin/productos")}
                  className="
        px-4 py-2 rounded-xl
        text-sm font-medium
        text-zinc-400
        hover:text-white hover:bg-zinc-900
        transition
      "
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={creating || addProduct.isPending}
                  className="
        inline-flex items-center gap-2
        px-5 py-2.5 rounded-xl
        bg-indigo-600 hover:bg-indigo-500
        text-white text-sm font-semibold
        shadow-lg shadow-indigo-600/20
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40
        transition
      "
                >
                  {isEdit ? "Guardar cambios" : "Crear producto"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* VISTA PREVIA */}
        <div className="space-y-3 flex-1/3 border-l border-zinc-800 pl-6">
          <div
            className="
    bg-zinc-950
    border border-zinc-800
    rounded-2xl
    overflow-hidden
    shadow-lg shadow-black/20
    transition
    hover:border-zinc-700
  "
          >
            {/* IMAGE */}
            <div className="relative bg-zinc-900">
              {imagenes[0] ? (
                <img
                  src={getPreviewSrc(imagenes[0])}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-40 flex items-center justify-center text-zinc-600 text-sm">
                  Sin imagen
                </div>
              )}

              {watch("destacado") && (
                <span
                  className="
          absolute top-2 left-2
          inline-flex items-center gap-1
          px-2 py-0.5
          rounded-full
          text-xs font-semibold
          bg-amber-500/20 text-amber-300
          backdrop-blur
          shadow-sm
        "
                >
                  <FiStar className="w-3 h-3" />
                  Destacado
                </span>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">
              {/* NAME */}
              <p className="text-sm font-semibold text-white truncate">
                {watch("nombre") || "Nombre del producto"}
              </p>

              {/* DESCRIPTION */}
              <p className="text-xs text-zinc-400 line-clamp-2">
                {watch("descripcion")
                  ? watch("descripcion")
                  : "Descripción breve del producto"}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-2 flex-wrap">
                {precioOferta ? (
                  <>
                    <span className="text-sm font-semibold text-white">
                      {formatCLP(precioOferta)}
                    </span>

                    <span className="text-xs text-zinc-500 line-through">
                      {formatCLP(precio)}
                    </span>

                    {descuento !== null && (
                      <span
                        className="
            ml-1
            px-1.5 py-0.5
            rounded-full
            text-[10px] font-bold
            bg-emerald-500/20 text-emerald-300
          "
                      >
                        -{descuento}%
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-sm font-semibold text-white">
                    {formatCLP(precio)}
                  </span>
                )}
              </div>

              {/* STOCK */}
              {watch("stock") === 0 ? (
                <span className="text-xs text-red-400">Agotado</span>
              ) : (
                <span className="text-xs text-emerald-400">
                  En stock ({watch("stock")})
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductoNuevo;
