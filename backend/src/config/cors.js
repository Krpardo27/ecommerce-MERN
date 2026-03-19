const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-mern-theta-six.vercel.app",
];

export const corsConfig = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS no permitido"));
    }
  },
  credentials: true,
};
