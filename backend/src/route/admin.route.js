import express from "express";
import { adminRegister, adminLogin, getCurrentAdmin } from "../controller/admin.controller.js";

const route = express.Router();

route.post("/register", adminRegister);
route.post("/login", adminLogin);
route.get("/me", getCurrentAdmin);

export default route;   