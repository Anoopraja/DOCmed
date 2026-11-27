import express from "express"
import cookieParser from "cookie-parser"
import userRoute from "./route/user.route.js"
import adminRoute from "./route/admin.route.js"
import shopownerRoute from "./route/shopwner.route.js"
import productRoute from "./route/product.route.js"
import orderRoute from "./route/order.route.js"
import cartRoute from "./route/cart.route.js"
import cors from "cors";

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
    ],
    credentials: true
}));
// app.use("/", (req, res) => {
//     res.send("Hello from backend")
// }) ;

app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/shopowner", shopownerRoute)
app.use("/product", productRoute)
app.use("/order", orderRoute)
app.use("/cart", cartRoute)




export default app;