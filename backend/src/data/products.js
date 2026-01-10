export const categories = [
  {
    key: "ropa",
    nombre: "Ropa",
    slug: "ropa",
    imagen: "https://i.imgur.com/QkIa5tT.jpeg",
  },
  {
    key: "deportivo",
    nombre: "Deportivo",
    slug: "deportivo",
    imagen: "https://i.imgur.com/ZKGofuB.jpeg",
  },
  {
    key: "calzado",
    nombre: "Calzado",
    slug: "calzado",
    imagen: "https://i.imgur.com/R3iobJA.jpeg",
  },
  {
    key: "accesorios",
    nombre: "Accesorios",
    slug: "accesorios",
    imagen: "https://i.imgur.com/76HAxcA.jpeg",
  },
  {
    key: "invierno",
    nombre: "Invierno",
    slug: "invierno",
    imagen: "https://i.imgur.com/R2PN9Wq.jpeg",
  },
];

export const products = [
  // ───────────── ROPA ─────────────
  {
    nombre: "Polerón Gris Básico",
    slug: "poleron-gris-basico",
    precio: 27.990,
    descripcion:
      "Polerón de algodón con interior afelpado. Ideal para uso diario.",
    categoriaKey: "ropa",
    imagenes: ["https://i.imgur.com/cHddUCu.jpeg"],
    activo: true,
  },
  {
    nombre: "Polera Blanca Algodón",
    slug: "polera-blanca-algodon",
    precio: 9.990,
    descripcion: "Polera blanca clásica, algodón suave, corte regular.",
    categoriaKey: "ropa",
    imagenes: ["https://i.imgur.com/QkIa5tT.jpeg"],
    activo: true,
  },
  {
    nombre: "Camisa Cuadrillé Roja",
    slug: "camisa-cuadrille-roja",
    precio: 18.990,
    descripcion:
      "Camisa manga larga estilo leñador, ideal para media estación.",
    categoriaKey: "ropa",
    imagenes: ["https://i.imgur.com/UlxxXyG.jpeg"],
    activo: true,
  },
  {
    nombre: "Chaqueta Denim Azul",
    slug: "chaqueta-denim-azul",
    precio: 44.990,
    descripcion: "Chaqueta de mezclilla clásica, resistente y versátil.",
    categoriaKey: "ropa",
    imagenes: ["https://i.imgur.com/IvxMPFr.jpeg"],
    activo: true,
  },

  // ───────────── DEPORTIVO ─────────────
  {
    nombre: "Jogger Deportivo Negro",
    slug: "jogger-deportivo-negro",
    precio: 22.990,
    descripcion:
      "Jogger liviano con ajuste elástico, ideal para entrenamiento.",
    categoriaKey: "deportivo",
    imagenes: ["https://i.imgur.com/ZKGofuB.jpeg"],
    activo: true,
  },
  {
    nombre: "Short Deportivo Azul",
    slug: "short-deportivo-azul",
    precio: 14.990,
    descripcion: "Short deportivo transpirable, ideal para running.",
    categoriaKey: "deportivo",
    imagenes: ["https://i.imgur.com/GJi73H0.jpeg"],
    activo: true,
  },
  {
    nombre: "Polera Dry Fit Negra",
    slug: "polera-dry-fit-negra",
    precio: 12.990,
    descripcion: "Polera deportiva de secado rápido.",
    categoriaKey: "deportivo",
    imagenes: ["https://i.imgur.com/633Fqrz.jpeg"],
    activo: true,
  },

  // ───────────── CALZADO ─────────────
  {
    nombre: "Zapatillas Urbanas Negras",
    slug: "zapatillas-urbanas-negras",
    precio: 54.990,
    descripcion: "Zapatillas urbanas cómodas para uso diario.",
    categoriaKey: "calzado",
    imagenes: ["https://i.imgur.com/R3iobJA.jpeg"],
    activo: true,
  },
  {
    nombre: "Zapatillas Running Gris",
    slug: "zapatillas-running-gris",
    precio: 69.990,
    descripcion: "Zapatillas ligeras diseñadas para running.",
    categoriaKey: "calzado",
    imagenes: ["https://i.imgur.com/wXuQ7bm.jpeg"],
    activo: true,
  },
  {
    nombre: "Botines de Cuero Café",
    slug: "botines-cuero-cafe",
    precio: 79.990,
    descripcion: "Botines de cuero natural, elegantes y resistentes.",
    categoriaKey: "calzado",
    imagenes: ["https://i.imgur.com/BZrIEmb.jpeg"],
    activo: true,
  },

  // ───────────── ACCESORIOS ─────────────
  {
    nombre: "Gorro Lana Invierno",
    slug: "gorro-lana-invierno",
    precio: 7.990,
    descripcion: "Gorro tejido ideal para días fríos.",
    categoriaKey: "accesorios",
    imagenes: ["https://i.imgur.com/76HAxcA.jpeg"],
    activo: true,
  },
  {
    nombre: "Mochila Urbana Negra",
    slug: "mochila-urbana-negra",
    precio: 34.990,
    descripcion: "Mochila urbana con compartimento para notebook.",
    categoriaKey: "accesorios",
    imagenes: ["https://i.imgur.com/Wv2KTsf.jpeg"],
    activo: true,
  },
  {
    nombre: "Cinturón Cuero Negro",
    slug: "cinturon-cuero-negro",
    precio: 15.990,
    descripcion: "Cinturón de cuero legítimo.",
    categoriaKey: "accesorios",
    imagenes: ["https://i.imgur.com/KcT6BE0.jpeg"],
    activo: true,
  },

  // ───────────── INVIERNO ─────────────
  {
    nombre: "Parka Acolchada Negra",
    slug: "parka-acolchada-negra",
    precio: 89.990,
    descripcion: "Parka térmica ideal para bajas temperaturas.",
    categoriaKey: "invierno",
    imagenes: ["https://i.imgur.com/R2PN9Wq.jpeg"],
    activo: true,
  },
  {
    nombre: "Bufanda Lana Gris",
    slug: "bufanda-lana-gris",
    precio: 10.990,
    descripcion: "Bufanda suave de lana sintética.",
    categoriaKey: "invierno",
    imagenes: ["https://i.imgur.com/cSytoSD.jpeg"],
    activo: true,
  },
  {
    nombre: "Guantes Térmicos Negros",
    slug: "guantes-termicos-negros",
    precio: 8.990,
    descripcion: "Guantes térmicos para frío intenso.",
    categoriaKey: "invierno",
    imagenes: ["https://i.imgur.com/WwKucXb.jpeg"],
    activo: true,
  },
];
