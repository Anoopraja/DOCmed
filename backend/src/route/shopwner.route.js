import express from "express";
import { shopownerRegister, shopownerLogin } from "../controller/shopowner.controller.js";
const route = express.Router();

route.post("/register", shopownerRegister);
route.post("/login", shopownerLogin);
// route.post("/logout", shopownerLogout);

export default route;   