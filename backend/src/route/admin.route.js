import express from "express";
import authMiddleware, { requireRole } from "../middleware/auth.middleware.js";
import { adminRegister, adminLogin, getCurrentAdmin, adminLogout, getAllUser } from "../controller/admin.controller.js";

const route = express.Router();

route.post("/register", adminRegister);
route.post("/login", adminLogin);
route.get("/me", authMiddleware, requireRole("admin"), getCurrentAdmin);
route.post("/logout", adminLogout);
route.get("/alluser", authMiddleware, requireRole("admin"), getAllUser);

export default route;   