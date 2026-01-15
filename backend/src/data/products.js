// ===============================
// CATEGORÍAS GAMER
// ===============================

export const categories = [
  {
    key: "perifericos",
    nombre: "Periféricos",
    slug: "perifericos",
    imagen:
      "https://images.pexels.com/photos/1036641/pexels-photo-1036641.jpeg",
  },
  {
    key: "componentes-pc",
    nombre: "Componentes PC",
    slug: "componentes-pc",
    imagen: "https://images.pexels.com/photos/258859/pexels-photo-258859.jpeg",
  },
  {
    key: "audio-gamer",
    nombre: "Audio Gamer",
    slug: "audio-gamer",
    imagen:
      "https://images.pexels.com/photos/159526/headphones-headset-earpads-listen-159526.jpeg",
  },
  {
    key: "sillas-gamer",
    nombre: "Sillas Gamer",
    slug: "sillas-gamer",
    imagen:
      "https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg",
  },
  {
    key: "streaming",
    nombre: "Streaming",
    slug: "streaming",
    imagen:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
  },
];

// ===============================
// PRODUCTOS GAMER
// ===============================

export const products = [
  // ───────────── PERIFÉRICOS ─────────────
  {
    nombre: "Mouse Gamer RGB 16000 DPI",
    slug: "mouse-gamer-rgb-16000dpi",
    precio: 34990,
    descripcion:
      "Mouse gamer con sensor óptico de alta precisión, 16000 DPI y RGB personalizable.",
    categoriaKey: "perifericos",
    imagenes: [
      "https://images.pexels.com/photos/820521/pexels-photo-820521.jpeg",
    ],
    activo: true,
  },
  {
    nombre: "Teclado Mecánico Switch Blue",
    slug: "teclado-mecanico-switch-blue",
    precio: 79990,
    descripcion:
      "Teclado mecánico gamer con switches azules y retroiluminación RGB.",
    categoriaKey: "perifericos",
    imagenes: [
      "https://images.pexels.com/photos/845518/pexels-photo-845518.jpeg",
    ],
    activo: true,
  },
  {
    nombre: "Mousepad XL Antideslizante",
    slug: "mousepad-xl-antideslizante",
    precio: 14990,
    descripcion: "Mousepad gamer tamaño XL con base antideslizante.",
    categoriaKey: "perifericos",
    imagenes: [
      "https://images.pexels.com/photos/1036641/pexels-photo-1036641.jpeg",
    ],
    activo: true,
  },

  // ───────────── COMPONENTES PC ─────────────
  {
    nombre: "Memoria RAM DDR5 32GB 6000MHz",
    slug: "ram-ddr5-32gb-6000mhz",
    precio: 189990,
    descripcion:
      "Memoria RAM DDR5 de alto rendimiento para gaming y creación de contenido.",
    categoriaKey: "componentes-pc",
    imagenes: [
      "https://images.pexels.com/photos/442583/pexels-photo-442583.jpeg",
    ],
    activo: true,
  },
  {
    nombre: "SSD NVMe Gen4 1TB",
    slug: "ssd-nvme-gen4-1tb",
    precio: 119990,
    descripcion: "Unidad SSD NVMe Gen4 con velocidades ultra rápidas.",
    categoriaKey: "componentes-pc",
    imagenes: [
      "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg",
    ],
    activo: true,
  },
  {
    nombre: "Fuente de Poder 850W 80+ Gold",
    slug: "fuente-poder-850w-gold",
    precio: 139990,
    descripcion: "Fuente de poder certificada 80+ Gold, ideal para PCs gamer.",
    categoriaKey: "componentes-pc",
    imagenes: [
      "https://images.pexels.com/photos/258859/pexels-photo-258859.jpeg",
    ],
    activo: true,
  },

  // ───────────── AUDIO GAMER ─────────────
  {
    nombre: "Audífonos Gamer 7.1 Surround",
    slug: "audifonos-gamer-7-1",
    precio: 69990,
    descripcion:
      "Audífonos gamer con sonido envolvente 7.1 y micrófono desmontable.",
    categoriaKey: "audio-gamer",
    imagenes: [
      "https://images.pexels.com/photos/159526/headphones-headset-earpads-listen-159526.jpeg",
    ],
    activo: true,
  },
  {
    nombre: "Headset Gamer Wireless",
    slug: "headset-gamer-wireless",
    precio: 89990,
    descripcion:
      "Headset inalámbrico gamer con baja latencia y gran autonomía.",
    categoriaKey: "audio-gamer",
    imagenes: [
      "https://images.pexels.com/photos/704264/pexels-photo-704264.jpeg",
    ],
    activo: true,
  },

  // ───────────── SILLAS GAMER ─────────────
  {
    nombre: "Silla Gamer Ergonómica Pro",
    slug: "silla-gamer-ergonomica-pro",
    precio: 249990,
    descripcion:
      "Silla gamer con soporte lumbar, apoyabrazos ajustables y reclinación 180°.",
    categoriaKey: "sillas-gamer",
    imagenes: [
      "https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg",
    ],
    activo: true,
  },
  {
    nombre: "Silla Gamer Compact",
    slug: "silla-gamer-compact",
    precio: 179990,
    descripcion: "Silla gamer compacta, ideal para escritorios pequeños.",
    categoriaKey: "sillas-gamer",
    imagenes: [
      "https://images.pexels.com/photos/9117385/pexels-photo-9117385.jpeg",
    ],
    activo: true,
  },

  // ───────────── STREAMING ─────────────
  {
    nombre: "Micrófono Condensador USB",
    slug: "microfono-condensador-usb",
    precio: 89990,
    descripcion: "Micrófono condensador USB ideal para streaming y podcast.",
    categoriaKey: "streaming",
    imagenes: [
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
    ],
    activo: true,
  },
  {
    nombre: "Webcam Full HD 60FPS",
    slug: "webcam-full-hd-60fps",
    precio: 59990,
    descripcion: "Webcam Full HD 1080p a 60FPS para streaming profesional.",
    categoriaKey: "streaming",
    imagenes: [
      "https://images.pexels.com/photos/3815588/pexels-photo-3815588.jpeg",
    ],
    activo: true,
  },
];
