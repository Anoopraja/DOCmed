import express from "express";
import { getAllProduct, addProduct } from "../controller/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js"

const route = express.Router();

route.get("/allproducts",authMiddleware, getAllProduct);
route.post("/addproduct", authMiddleware, addProduct)

export default route; 