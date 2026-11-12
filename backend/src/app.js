import express from "express"
import userRoute from "./route/user.route.js"
import adminRoute from "./route/admin.route.js"
import shopownerRoute from "./route/shopwner.route.js"


const app = express()
app.use(express.json());

// app.use("/", (req, res) => {
//     res.send("Hello from backend")
// }) ;

app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/shopowner", shopownerRoute)


export default app;