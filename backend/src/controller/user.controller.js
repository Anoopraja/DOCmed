import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


// =====================================
// 1. REGISTER USER
// =====================================

const registerUser = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const gmail = req.body.gmail?.trim().toLowerCase();
    const phone = req.body.phone?.trim();
    const { password } = req.body;

    if (!username || !gmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, gmail and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ gmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Check phone only when provided
    if (phone) {
      const existingPhone = await User.findOne({ phone });

      if (existingPhone) {
        return res.status(409).json({
          success: false,
          message: "Phone number already registered",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      gmail,
      phone: phone || undefined,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        username: user.username,
        gmail: user.gmail,
        phone: user.phone,
        profileImage: user.profileImage,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================
// 2. USER LOGIN
// =====================================

const userLogin = async (req, res) => {
  try {
    const gmail = req.body.gmail?.trim().toLowerCase();
    const { password } = req.body;

    if (!gmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Gmail and password are required",
      });
    }

    // Password is select:false in your schema
    const user = await User.findOne({ gmail }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid gmail or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid gmail or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        gmail: user.gmail,
        profileImage: user.profileImage,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// =====================================
// 3. GET CURRENT USER
// =====================================

const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        gmail: user.gmail,
        phone: user.phone,
        profileImage: user.profileImage,
        role: user.role,
        isVerified: user.isVerified,
        addresses: user.addresses,
      },
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid session",
    });
  }
};


// =====================================
// 4. GET ALL USERS
// =====================================

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


// =====================================
// 5. UPDATE USER PROFILE
// =====================================

const updateProfile = async (req, res) => {
  try {
    // Auth middleware must attach the logged-in user
    const userId = req.user._id;

    // Only allow these fields to be updated
    const allowedFields = [
      "username",
      "phone",
      "profileImage",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (updateData.username !== undefined) {
      updateData.username = updateData.username.trim();

      if (!updateData.username) {
        return res.status(400).json({
          success: false,
          message: "Username cannot be empty",
        });
      }
    }

    if (updateData.phone !== undefined) {
      updateData.phone = updateData.phone.trim();

      if (!updateData.phone) {
        return res.status(400).json({
          success: false,
          message: "Phone cannot be empty",
        });
      }

      const existingPhone = await User.findOne({
        phone: updateData.phone,
        _id: { $ne: userId },
      });

      if (existingPhone) {
        return res.status(409).json({
          success: false,
          message: "Phone number already registered",
        });
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid profile fields provided",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================
// 6. USER LOGOUT
// =====================================

const userLogout = async (req, res) => {
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


export {
  registerUser,
  userLogin,
  getCurrentUser,
  getAllUser,
  updateProfile,
  userLogout,
};
