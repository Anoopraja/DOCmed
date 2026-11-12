import bcrypt from "bcrypt"
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import User from "../model/user.model.js"
import Product from '../model/product.model.js'


dotenv.config();

const shopownerRegister = async (req, res) => {
    try {
        const {
            username,
            gmail,
            password,
            role
        } = req.body;

        if (!username || !gmail || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ gmail });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const shopowner = await User.create({
            username,
            gmail,
            password: hash,
            role: "shopowner",
            isVerified: false,
            isActive: true
        });

        return res.status(201).json({
            success: true,
            message: "Shopowner registered successfully",
            data: {
                id: shopowner._id,
                username: shopowner.username,
                gmail: shopowner.gmail,
                role: shopowner.role,
                password: shopowner.password
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const shopownerLogin = async (req, res) => {
    try {
        const { gmail, password } = req.body;

        if (!gmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            gmail,
            role: "shopowner"
        }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Shopowner not found"
            });
        }

        if (!user.password) {
            return res.status(400).json({
                success: false,
                message: "Password not found in database"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "7d"
            }
        );

        const isHttps =
            req.secure ||
            req.headers["x-forwarded-proto"] === "https";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isHttps,
            sameSite: isHttps ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Shopowner login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                gmail: user.gmail,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Shopowner Login Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





export { shopownerRegister, shopownerLogin }