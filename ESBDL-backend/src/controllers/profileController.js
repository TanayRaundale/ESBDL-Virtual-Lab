import User from "../models/User.js";

/* ================= GET PROFILE ================= */
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {
    const {
      photo,
      name,
      phone,
      address,
      year,
      department
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        photo,
        name,
        phone,
        address,
        year,
        department
      },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: "Profile update failed" });
  }
};
