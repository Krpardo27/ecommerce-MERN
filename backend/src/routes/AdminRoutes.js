import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate, requireAdmin);

router.get("/profile", (req, res) => {
  res.json({
    message: "Bienvenido admin",
    admin: req.user,
  });
});

router.get("/dashboard", (req, res) => {
  res.json({
    message: "Dashboard admin",
    admin: req.user,
  });
});

export default router;
