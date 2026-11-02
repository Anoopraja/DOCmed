import express from "express"
import userRoute from "./route/user.route.js"


const app = express()
app.use(express.json());

app.use("/", (req, res) => {
    res.send("Hello from backend")
}) ;

app.use("/user", userRoute)


export default app;