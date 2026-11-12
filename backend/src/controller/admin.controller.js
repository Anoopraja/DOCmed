import bcrypt from "bcrypt"
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import User from "../model/user.model.js"

dotenv.config();


const adminRegister = async (req, res) => {
    try {

        const {
            username,
            gmail,
            password
        } = req.body;

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        const admin = await User.create({
            username,
            gmail,
            password: hash,
            role: "admin"
        });

        return res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            data: {
                id: admin._id,
                username: admin.username,
                gmail: admin.gmail,
                role: admin.role
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const adminLogin = async (req, res) => {
    try {
        const gmail = req.body.gmail?.trim().toLowerCase();
        const { password } = req.body;

        if (!gmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            gmail,
            role: "admin"
        }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Check admin role
        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "You are not an admin"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "7d"
            }
        );

        const isHttps = req.secure || req.headers["x-forwarded-proto"] === "https";

        // Store the cookie with local and deployed transport settings.
        res.cookie("token", token, {
            httpOnly: true,
            secure: isHttps,
            sameSite: isHttps ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Admin logged in successfully",
            data: {
                id: user._id,
                username: user.username,
                gmail: user.gmail,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Admin login error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getCurrentAdmin = async (req, res) => {

    try {
        const admin = req.user;

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Admin not found"
            });
        }

        if (admin.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });
        }

        return res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.gmail,
                college: admin.college,
                branch: admin.branch,
                year: admin.year,
                bio: admin.bio,
                profileImage: admin.profileImage,
                role: admin.role
            }
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid admin session"
        });
    }
}
const adminLogout = async (req, res) => {
  try {
    const isHttps =
      req.secure ||
      req.headers["x-forwarded-proto"] === "https";

    res.clearCookie("token", {
      httpOnly: true,
      secure: isHttps,
      sameSite: isHttps ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      data: users,
    });

  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export { adminRegister, adminLogin, getCurrentAdmin, adminLogout, getAllUser };