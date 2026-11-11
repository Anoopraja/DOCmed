import express from "express";
import { registerUser,getAllUser,userLogin, userLogout,updateProfile, getCurrentUser, shopownerRegister, adminRegister } from "../controller/user.controller.js";


const route = express.Router();

route.post("/register", registerUser);
route.post("/shopowner/register", shopownerRegister);
route.post("/admin/register", adminRegister);
route.get("/alluser" , getAllUser);
route.post("/login", userLogin);
route.post("/logout", userLogout);
route.get("/me", getCurrentUser);
route.patch("/updateprofile/:id", updateProfile);
// route.post("/shopowner/register", shopownerRegister);

export default route;