import { useState } from "react";

const ProductGallery = ({ images = [], nombre }) => {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[90px_1fr] gap-4 w-full">
      {/* MAIN IMAGE */}
      <div className="order-1 lg:order-2 w-full aspect-square bg-white rounded-2xl border border-zinc-800 overflow-hidden">
        <img
          src={images[active]}
          alt={nombre}
          className="w-full h-full object-contain"
        />
      </div>

      {/* THUMBNAILS */}
      <div
        className="
        order-2 lg:order-1
        flex lg:flex-col
        gap-3
        overflow-x-auto lg:overflow-visible
        pb-2 lg:pb-0
      "
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              flex-shrink-0
              w-16 h-16
              rounded-xl border
              transition
              ${
                active === i
                  ? "border-purple-500"
                  : "border-zinc-700 hover:border-zinc-500"
              }
            `}
          >
            <img
              src={img}
              alt={`${nombre} ${i}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
