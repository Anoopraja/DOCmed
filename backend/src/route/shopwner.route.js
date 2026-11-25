import express from "express";
import authMiddleware, { requireRole } from "../middleware/auth.middleware.js";
import {
	shopownerRegister,
	shopownerLogin,
	shopownerLogout
} from "../controller/shopowner.controller.js";
import { getCurrentUser } from "../controller/user.controller.js";
const route = express.Router();

route.post("/register", shopownerRegister);
route.post("/login", shopownerLogin);
route.post("/logout", shopownerLogout);
route.get("/me", authMiddleware, requireRole("shopowner"), getCurrentUser);

export default route;   