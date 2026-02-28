import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


export const register = async (req, res) => {
  try {
    const {
      rollNo,
      name,
      email,
      password,
      role,
      classAssigned,
      department,
      phone,
      address,
      year
    } = req.body;

    // 🔹 Basic Validation
    if (!rollNo || !name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // 🔹 Email exists check
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 🔹 RollNo exists check
    const existingRoll = await User.findOne({ rollNo });
    if (existingRoll) {
      return res.status(400).json({
        success: false,
        message: "Roll number already exists",
      });
    }

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create user
    const user = await User.create({
      rollNo,
      name,
      email,
      password: hashedPassword,
      role,
      classAssigned,   // ✅ stored for both student & teacher
      department,
      phone,
      address,
      year
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      data: userResponse
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      "SECRET123",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
