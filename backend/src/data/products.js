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
    nombre: "CORSAIR Vengeance DDR5 16 GB (2x8GB) 5200 MHz",
    slug: "ram-ddr5-2x8gb-5200mhz",
    precio: 284990,
    descripcion:
      "La memoria Crucial de 32 GB DDR5 Pro Series: Overclocked Edition (CP2K16G60C36U5B) lleva el rendimiento de los juegos al siguiente nivel con velocidades asombrosas y ancho de banda masivo. Este kit de memoria RAM DDR5 de overclocking (2x16GB) está diseñado con disipadores de calor de aluminio de última generación para disipar el calor de manera efectiva. Inspirados en el arte de Origami, estos difusores de calor cumplen una doble función de lucir lúdico y único mientras mantienen tu sistema más fresco durante los juegos AAA de ritmo rápido o intensivos en memoria. El rendimiento aumenta un nivel con tiempos extendidos de 36-38-38-80, lo que garantiza un rendimiento de overclocking estable y una latencia más baja del 25% en comparación con los módulos DRAM Plug-and-Play de la serie Crucial Pro.",
    categoriaKey: "componentes-pc",
    imagenes: ["../ram/corsair/CORSAIR-Vengeance-DDR5-16GB-(2x8GB).jpg"],
    activo: true,
  },
  {
    nombre: "CORSAIR Vengeance RGB DDR5 RAM 16GB (2x8GB) 5200MHz",
    slug: "ram-ddr5-16gb-5200MHz",
    precio: 284990,
    descripcion:
      "CORSAIR La memoria DDR5 RGB VENGEANCE ofrece rendimiento DDR5, frecuencias más altas y mayores capacidades optimizadas para placas base Intel mientras ilumina su PC con iluminación RGB de diez zonas dinámica y direccionable individualmente. Los chips de memoria de alta frecuencia estrechamente protegidos permiten un procesamiento, renderizado y almacenamiento en búfer más rápidos que nunca, con regulación de voltaje integrada para un overclocking fácil y finamente controlado. Tome el control con el software CORSAIR iCUE y habilite la personalización de iluminación RGB, monitoreo de frecuencia en tiempo real, regulación de voltaje integrada y personalización de perfiles Intel XMP 3.0. Una PCB personalizada proporciona una excelente calidad de señal para un alto rendimiento y estabilidad en las últimas placas base Intel DDR5. Para un rendimiento DDR5 de vanguardia con iluminación RGB fascinante, VENGEANCE RGB DDR5 ilumina el camino.",
    categoriaKey: "componentes-pc",
    imagenes: ["../ram/corsair/CORSAIR-Vengeance-RGB-DDR5-RAM-16GB.jpg"],
    activo: true,
  },
  {
    nombre: "Crucial Pro Kit de RAM DDR5 de 32GB (2x16GB) 6000MHz",
    slug: "ram-ddr5-2x16gb-6000mhz",
    precio: 284990,
    descripcion:
      "La memoria Crucial de 32 GB DDR5 Pro Series: Overclocked Edition (CP2K16G60C36U5B) lleva el rendimiento de los juegos al siguiente nivel con velocidades asombrosas y ancho de banda masivo. Este kit de memoria RAM DDR5 de overclocking (2x16GB) está diseñado con disipadores de calor de aluminio de última generación para disipar el calor de manera efectiva. Inspirados en el arte de Origami, estos difusores de calor cumplen una doble función de lucir lúdico y único mientras mantienen tu sistema más fresco durante los juegos AAA de ritmo rápido o intensivos en memoria. El rendimiento aumenta un nivel con tiempos extendidos de 36-38-38-80, lo que garantiza un rendimiento de overclocking estable y una latencia más baja del 25% en comparación con los módulos DRAM Plug-and-Play de la serie Crucial Pro.",
    categoriaKey: "componentes-pc",
    imagenes: ["../ram/crucial/crucial-memoria-ram-ddr5-32gb.jpg"],
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
    nombre: "Auriculares para juegos Razer Barracuda X Chroma inalámbricos",
    slug: "auriculares-para-juegos-razer-barracuda-x-chroma-inalambricos",
    precio: 69990,
    descripcion:
      "Ya sea que estés en casa o en movimiento, experimenta una verdadera versatilidad de audio y estilo en cualquier lugar con el Razer Barracuda X Chroma. Disfruta de un audio perfecto para cualquier actividad con Razer SmartSwitch Dual Wireless. Alterna rápidamente entre las conexiones inalámbricas Razer HyperSpeed y Bluetooth, así como capta llamadas fácilmente sin tener que jugar con tu teléfono. Con un diseño ergonómico de 10.05 oz, los auriculares están hechos para ser ligeros para comodidad durante todo el día tanto en interiores como en exteriores, con bandas ajustables para adaptarse a cualquier tamaño de cabeza, una banda superior acolchada para una distribución uniforme del peso y almohadillas de espuma viscoelástica para evitar la fatiga. Con iluminación para auriculares de 6 zonas alimentada por Razer Chroma RGB, los auriculares ahora pueden admitir más efectos Razer Chroma RGB: lleva la personalización al siguiente nivel con la aplicación de audio de Razer o personaliza cada zona a través de Chroma Studio para lograr imágenes impresionantes. Los controladores de 1.575 in con un diseño patentado que sintoniza las frecuencias altas, medias y bajas individualmente, asegurando una experiencia auditiva potente y realista. Equipado con un micrófono cardioide HyperClear desmontable mejorado, proporciona una captura de voz mejorada para comunicaciones nítidas del equipo y es fácilmente extraíble cuando sea necesario. Con una duración mejorada de la batería que dura hasta 70 horas para uso de varios días, una carga rápida de 15 minutos producirá aproximadamente 6 horas de juego.",
    categoriaKey: "audio-gamer",
    imagenes: ["../razer/audio/Razer-Barracuda-X-Chroma-inalambricos.jpg"],
    activo: true,
  },
  {
    nombre: "Razer BlackShark V2 X",
    slug: "razer-blackshark-v2-x",
    precio: 89990,
    descripcion:
      "Sumérgete en el sonido de los deportes con los BlackShark V2 X de Razer; te ofrecen un audio increíble, un micrófono de claridad superior y un aislamiento acústico supremo. Este conjunto incluye nuestro mejor micrófono para auriculares y nuestros mejores controladores de sonido en unos auriculares de estilo de aviación únicos; con ellos tu juego de competición está destinado a convertirse en pro.",
    categoriaKey: "audio-gamer",
    imagenes: [
      "../razer/audio/razer-blackshark-v2-x.jpg",
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
