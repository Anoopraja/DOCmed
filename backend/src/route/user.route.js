import express from "express";
import authMiddleware, { requireRole } from "../middleware/auth.middleware.js";
import { registerUser, userLogin, userLogout,updateProfile, getCurrentUser  } from "../controller/user.controller.js";



const route = express.Router();

route.post("/register", registerUser);
route.post("/login", userLogin);
route.post("/logout", userLogout);
route.get("/me", authMiddleware, requireRole("user"), getCurrentUser);
route.patch("/updateprofile/:id", authMiddleware, requireRole("user"), updateProfile);


export default route;