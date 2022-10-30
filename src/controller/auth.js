import User from "../models/users";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, avatar, role, phone } = await new User(
      req.body
    ).save();

    res.status(201).json({
      name,
      email,
      avatar,
      role,
      phone,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(404).json({
        message: "Email không tồn tại",
      });
      return;
    }

    if (!user.isAuthenticate(password)) {
      res.status(404).json({
        message: "Mật khẩu không chính xác",
      });
      return;
    }

    const token = jwt.sign({ email }, "Happyweekend", { expiresIn: "3h" });

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
