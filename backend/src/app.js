import express from "express"
import cookieParser from "cookie-parser"
import userRoute from "./route/user.route.js"
import adminRoute from "./route/admin.route.js"
import shopownerRoute from "./route/shopwner.route.js"
import productRoute from "./route/product.route.js"


const app = express()
app.use(express.json());
app.use(cookieParser());

// app.use("/", (req, res) => {
//     res.send("Hello from backend")
// }) ;

app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/shopowner", shopownerRoute)
app.use("/product", productRoute)




export default app;