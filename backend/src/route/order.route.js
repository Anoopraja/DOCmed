import express from "express";
import { bookOrder, orderCancel, orderAccept } from "../controller/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/book", authMiddleware, bookOrder);
route.put("/cancel/:orderId", authMiddleware, orderCancel);
route.put("/accept/:orderId", authMiddleware, orderAccept);

export default route;