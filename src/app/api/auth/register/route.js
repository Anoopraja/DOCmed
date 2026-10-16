
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/model/user.model.js";
import connectDB from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!username?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { message: "Username, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Username or email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
