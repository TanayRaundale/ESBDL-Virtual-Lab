import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"



export const register = async (req, res) => {
 
  try {
    const { name, email, password, role } = req.body;
    console.log({
  name,
  email,
  password,
  role
});

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);


    await User.create({
      name,
      email,
      password: hashedPassword,
      role   
    });

    res.json({ msg: "Registered Successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
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
