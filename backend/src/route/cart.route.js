import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
	addToCart,
	clearCart,
	getCartItems,
	removeFromCart,
	updateCartItem,
} from "../controller/cart.controller.js";

const route = express.Router();

route.post("/add",authMiddleware, addToCart);
route.get("/",authMiddleware, getCartItems);
route.delete("/remove/:itemId",authMiddleware, removeFromCart);
route.patch("/:itemId",authMiddleware, updateCartItem);
route.delete("/:itemId",authMiddleware, removeFromCart);
route.delete("/",authMiddleware, clearCart);


export default route;