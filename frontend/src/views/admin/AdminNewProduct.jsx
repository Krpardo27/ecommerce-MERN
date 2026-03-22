import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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

const AdminNewProduct = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  const addProduct = useAddProduct();

  const [params] = useSearchParams();
  const duplicateId = params.get("duplicate");

  const [features, setFeatures] = useState([]);
  const [specs, setSpecs] = useState([]);

  const [creating, setCreating] = useState(false);

  const [imagenes, setImagenes] = useState([]);
  const [imageError, setImageError] = useState("");

  const [subcategorias, setSubcategorias] = useState([]);

  const [descuentoManual, setDescuentoManual] = useState("");

  const { data: productoDuplicado } = useProducto(duplicateId, {
    enabled: !!duplicateId,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
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

      shortDescription: "",
      longDescription: "",

      categoriaKey: "",
      subcategoriaKey: "",
      activo: true,
      destacado: false,
    },
  });

  useEffect(() => {
    if (!initialData) return;

    reset({
      nombre: initialData.nombre ?? "",
      precio: initialData.precio ?? "",
      precioOferta: initialData.precioOferta ?? "",
      stock: initialData.stock ?? 50,
      sku: initialData.sku ?? "",
      marca: initialData.marca ?? "",
      tags: initialData.tags?.join(", ") ?? "",
      shortDescription: initialData.shortDescription ?? "",
      longDescription: initialData.longDescription ?? "",
      categoriaKey: initialData.categoriaKey ?? "",
      subcategoriaKey: initialData.subcategoriaKey ?? "",
      activo: initialData.activo ?? true,
      destacado: initialData.destacado ?? false,
    });

    setFeatures(initialData.features ?? []);
    setSpecs(initialData.specs ?? []);
    setImagenes(initialData.imagenes ?? []);

    const categoria = categories.find(
      (cat) => cat.key === initialData.categoriaKey,
    );

    setSubcategorias(categoria?.subcategorias ?? []);
  }, [initialData, reset]);

  const updateProduct = useUpdateProduct();

  const { showToast } = useToast();

  const precioWatch = watch("precio");
  const precio = Number(precioWatch || 0);
  const precioOferta = Number(watch("precioOferta") || 0);

  const descuento =
    precio > 0 && precioOferta > 0 && precioOferta < precio
      ? Math.round(100 - (precioOferta / precio) * 100)
      : null;

  const categoriaSeleccionada = useWatch({
    control,
    name: "categoriaKey",
  });

  useEffect(() => {
    if (!categoriaSeleccionada) {
      setSubcategorias([]);
      return;
    }

    const categoria = categories.find(
      (cat) => cat.key === categoriaSeleccionada,
    );

    setSubcategorias(categoria?.subcategorias ?? []);
  }, [categoriaSeleccionada]);

  const onSubmit = async (formData) => {
    const isDuplicating = !!duplicateId;

    // 🔥 SOLO en CREATE
    if (!isEdit && (imagenes.length < 1 || imagenes.length > 4)) {
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
      const payload = {
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

        features: features.filter(Boolean),

        specs: specs.filter((s) => s.key && s.value),
      };

      // 🔥 separar imágenes nuevas vs existentes
      const nuevasImagenes = imagenes.filter((img) => img instanceof File);

      const imagenesExistentes = imagenes.filter(
        (img) => typeof img === "string",
      );

      if (isEdit) {
        await updateProduct.mutateAsync({
          id: initialData._id,
          data: {
            ...payload,
            imagenes: imagenesExistentes, // 👈 importante
          },
          imagenes: nuevasImagenes, // 👈 solo files
        });

        showToast({
          title: "Producto actualizado",
          type: "success",
        });

        return;
      }

      // CREATE
      await addProduct.mutateAsync({
        data: payload,
        imagenes: nuevasImagenes,
      });

      showToast({
        title: isDuplicating ? "Producto duplicado" : "Producto creado",
        type: "success",
      });

      navigate("/admin/productos");
    } catch (error) {
      console.error("❌ ERROR:", error.response?.data);

      showToast({
        title: "Error",
        description:
          error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "Error inesperado",
        type: "error",
      });
    } finally {
      setCreating(false);
    }
  };

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
    const precio = Number(precioWatch);

    if (!precio || !descuentoManual) return;

    const porcentaje = Number(descuentoManual);

    // validación básica
    if (porcentaje <= 0 || porcentaje >= 100) return;

    const nuevoPrecioOferta = Math.round(precio - (precio * porcentaje) / 100);

    setValue("precioOferta", nuevoPrecioOferta);
  }, [descuentoManual, precioWatch, setValue]);

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

      <section className="container mx-auto space-y-6 py-6 lg:grid lg:grid-cols-[minmax(0,1fr)_420px] gap-10">
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ===================== MAIN ===================== */}
              <div className="space-y-5">
                {/* ===== NOMBRE ===== */}
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
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
                    placeholder="Ej: Corsair Vengeance LPX 32GB"
                    className="
      w-full px-3 py-2.5 rounded-xl
      bg-zinc-800/80 text-white
      border border-zinc-700
      placeholder:text-zinc-500
      focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
      transition
    "
                  />

                  {errors.nombre && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                {/* ===== DESCRIPCIÓN ===== */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Descripción corta
                    </label>

                    <textarea
                      rows={3}
                      {...register("shortDescription")}
                      placeholder="Resumen breve para cards"
                      className="
        w-full px-3 py-2.5 rounded-xl
        bg-zinc-800/80 text-white
        border border-zinc-700
        placeholder:text-zinc-500
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
        transition resize-none
      "
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Descripción larga
                    </label>

                    <textarea
                      rows={5}
                      {...register("longDescription")}
                      placeholder="Descripción detallada (SEO)"
                      className="
        w-full px-3 py-2.5 rounded-xl
        bg-zinc-800/80 text-white
        border border-zinc-700
        placeholder:text-zinc-500
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
        transition resize-none
      "
                    />
                  </div>
                </div>

                {/* ===== CARACTERÍSTICAS ===== */}
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Características
                  </label>

                  <div className="space-y-2">
                    {features.map((f, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={f}
                          onChange={(e) => {
                            const updated = [...features];
                            updated[i] = e.target.value;
                            setFeatures(updated);
                          }}
                          placeholder="Ej: Compatible con Intel y AMD"
                          className="
            flex-1 px-3 py-2.5 rounded-xl
            bg-zinc-800/80 text-white
            border border-zinc-700
            placeholder:text-zinc-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
            transition
          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setFeatures(features.filter((_, idx) => idx !== i))
                          }
                          className="
            px-3 rounded-xl
            bg-red-500/10 text-red-400
            hover:bg-red-500/20
            transition
          "
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setFeatures([...features, ""])}
                    className="
      mt-3 w-full py-2 rounded-xl
      border border-dashed border-zinc-700
      text-sm text-zinc-400
      hover:border-indigo-500 hover:text-white
      transition
    "
                  >
                    + Agregar característica
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Especificaciones
                  </label>

                  <div className="space-y-2">
                    {specs.map((s, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          placeholder="Clave (Ej: Frecuencia)"
                          value={s.key}
                          onChange={(e) => {
                            const updated = [...specs];
                            updated[i].key = e.target.value;
                            setSpecs(updated);
                          }}
                          className="
            w-full px-3 py-2.5 rounded-xl
            bg-zinc-800/80 text-white
            border border-zinc-700
            placeholder:text-zinc-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
            transition
          "
                        />

                        <input
                          placeholder="Valor (Ej: 3200 MHz)"
                          value={s.value}
                          onChange={(e) => {
                            const updated = [...specs];
                            updated[i].value = e.target.value;
                            setSpecs(updated);
                          }}
                          className="
            w-full px-3 py-2.5 rounded-xl
            bg-zinc-800/80 text-white
            border border-zinc-700
            placeholder:text-zinc-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
            transition
          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setSpecs(specs.filter((_, idx) => idx !== i))
                          }
                          className="
            px-3 rounded-xl
            bg-red-500/10 text-red-400
            hover:bg-red-500/20
            transition
          "
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSpecs([...specs, { key: "", value: "" }])}
                    className="
      mt-3 w-full py-2 rounded-xl
      border border-dashed border-zinc-700
      text-sm text-zinc-400
      hover:border-indigo-500 hover:text-white
      transition
    "
                  >
                    + Agregar especificación
                  </button>
                </div>

                {/* ===== IMÁGENES ===== */}
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Imágenes del producto (1 a 4)
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="
      w-full px-3 py-2.5 rounded-xl
      bg-zinc-800/80 text-white
      border border-zinc-700
      file:mr-3 file:px-3 file:py-1.5 file:rounded-lg
      file:border-0 file:bg-indigo-600 file:text-white
      file:text-xs file:font-medium
      hover:file:bg-indigo-500
      transition
    "
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                      {imagenes.map((file, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-xl overflow-hidden border border-zinc-800"
                        >
                          <img
                            src={getPreviewSrc(file)}
                            className="h-24 w-full object-cover transition group-hover:scale-105"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setImagenes((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                            className="
              absolute top-1 right-1
              text-xs px-2 py-0.5 rounded-full
              bg-black/70 text-white
              opacity-0 group-hover:opacity-100
              transition
            "
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Categoría *
                    </label>

                    <select
                      {...register("categoriaKey")}
                      className="
        w-full px-3 py-2.5 rounded-xl
        bg-zinc-800/80 text-white
        border border-zinc-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
        transition
      "
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
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Subcategoría *
                      </label>

                      <select
                        {...register("subcategoriaKey")}
                        className="
        w-full px-3 py-2.5 rounded-xl
        bg-zinc-800/80 text-white
        border border-zinc-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
        transition
      "
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
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Tags
                  </label>

                  <input
                    {...register("tags")}
                    placeholder="ram, gaming, corsair"
                    className="
      w-full px-3 py-2.5 rounded-xl
      bg-zinc-800/80 text-white
      border border-zinc-700
      placeholder:text-zinc-500
      focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
      transition
    "
                  />
                </div>
              </div>

              {/* ===================== SIDEBAR ===================== */}
              <section
                className="bg-zinc-950/80 backdrop-blur
  border border-zinc-800
  rounded-2xl p-5
  space-y-6
  sticky top-24 h-fit"
              >
                <hr className="border-zinc-800" />

                {/* INVENTARIO */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">
                    Inventario
                  </label>

                  <input
                    type="number"
                    {...register("stock")}
                    placeholder="Stock disponible"
                    className="
      w-full px-3 py-2.5 rounded-xl
      bg-zinc-800/80 text-white
      border border-zinc-700
      focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
      transition
    "
                  />
                </div>

                <hr className="border-zinc-800" />

                {/* PRECIOS */}
                <div className="space-y-3">
                  <label className="block text-xs font-medium text-zinc-400">
                    Precios
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      {...register("precio")}
                      placeholder="Precio normal"
                      className="
        w-full px-3 py-2.5 rounded-xl
        bg-zinc-800/80 text-white
        border border-zinc-700
        placeholder:text-zinc-500
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
        transition
      "
                    />

                    <input
                      type="number"
                      {...register("precioOferta")}
                      placeholder="Precio oferta"
                      className="
        w-full px-3 py-2.5 rounded-xl
        bg-zinc-800/80 text-white
        border border-zinc-700
        placeholder:text-zinc-500
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
        transition
      "
                    />
                  </div>

                  <input
                    type="number"
                    value={descuentoManual}
                    onChange={(e) => setDescuentoManual(e.target.value)}
                    placeholder="Descuento (%)"
                    className="
      w-full px-3 py-2.5 rounded-xl
      bg-zinc-800/80 text-white
      border border-zinc-700
      placeholder:text-zinc-500
      focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500
      transition
    "
                  />
                </div>

                <hr className="border-zinc-800" />

                {/* IDENTIFICACIÓN */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">
                    Identificación
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      {...register("marca")}
                      placeholder="Marca"
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-800/80 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500/40"
                    />

                    <input
                      {...register("sku")}
                      placeholder="SKU"
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-800/80 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500/40"
                    />
                  </div>
                </div>

                {/* ESTADO */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">
                    Estado
                  </label>

                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                      <input type="checkbox" {...register("activo")} />
                      Activo
                    </label>

                    <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
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
  bg-zinc-950/90 backdrop-blur
  border-t border-zinc-800
  flex items-center justify-between
"
            >
              <span className="hidden sm:block text-xs text-zinc-500">
                Los cambios no se guardan automáticamente
              </span>

              <div className="flex gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => navigate("/admin/productos")}
                  className="
        px-4 py-2 rounded-xl
        text-sm text-zinc-400
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
        px-6 py-2.5 rounded-xl
        bg-gradient-to-r from-indigo-600 to-purple-600
        text-white text-sm font-semibold
        shadow-lg shadow-indigo-600/30
        hover:opacity-90
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
     bg-zinc-950 border border-zinc-800
  rounded-2xl overflow-hidden
  shadow-lg shadow-black/30
  hover:border-zinc-700 transition
  "
          >
            {/* IMAGE */}
            <div className="relative bg-zinc-900">
              {imagenes[0] ? (
                <img
                  src={getPreviewSrc(imagenes[0])}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="h-48 flex items-center justify-center text-zinc-600 text-sm">
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

              <p className="text-xs text-zinc-400 line-clamp-2">
                {watch("shortDescription") || "Descripción breve"}
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

export default AdminNewProduct;
